import Image from "next/image";

const LOGO_PATH = "/logo/Snb_logo.png";

type SiteLogoProps = {
  /** header: top nav · footer: page footer · watch: compact centered on player page */
  variant?: "header" | "footer" | "watch";
  className?: string;
  priority?: boolean;
};

export function SiteLogo({
  variant = "header",
  className = "",
  priority = false,
}: SiteLogoProps) {
  const size =
    variant === "header"
      ? "h-8 w-auto max-h-9 sm:h-10 sm:max-h-10"
      : variant === "footer"
        ? "h-6 w-auto max-h-7 sm:h-7"
        : "h-5 w-auto max-h-6 sm:h-6";

  const align =
    variant === "watch" || variant === "footer"
      ? "object-center"
      : "object-left";

  return (
    <Image
      src={LOGO_PATH}
      alt="Shred' n Breakfast"
      width={320}
      height={96}
      priority={priority}
      className={`object-contain ${align} ${size} ${className}`}
    />
  );
}
