/**
 * Builds multi-size favicon.ico from src/app/icon.png (Bunny/SNB asset).
 * Run: npm run generate-favicon
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const toIco = require("to-ico");

const root = path.join(__dirname, "..");
const iconPath = path.join(root, "src", "app", "icon.png");

async function main() {
  if (!fs.existsSync(iconPath)) {
    throw new Error(`Missing ${iconPath}`);
  }

  const sizes = [16, 32, 48, 64];
  const buffers = await Promise.all(
    sizes.map((size) =>
      sharp(iconPath).resize(size, size).png().toBuffer(),
    ),
  );

  const ico = await toIco(buffers);

  const appIco = path.join(root, "src", "app", "favicon.ico");
  const publicIco = path.join(root, "public", "favicon.ico");
  fs.writeFileSync(appIco, ico);
  fs.mkdirSync(path.dirname(publicIco), { recursive: true });
  fs.writeFileSync(publicIco, ico);

  console.log(`Wrote ${ico.length} bytes → ${appIco} and ${publicIco}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
