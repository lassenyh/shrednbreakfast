/** Bunny Stream (and other HLS) manifests — .m3u8 */
export function isHlsUrl(url: string): boolean {
  const u = url.toLowerCase();
  return u.includes(".m3u8");
}
