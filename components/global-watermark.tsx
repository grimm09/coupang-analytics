const WATERMARK_CONFIG = {
  text: "[confidential-FJY]",
  color: "#1f2937",
  opacity: 0.13,
  tileWidth: 420,
  tileHeight: 220,
  fontSize: 12,
  fontWeight: 700,
  rotate: -30,
  zIndex: 999999,
} as const;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function createWatermarkImage() {
  const {
    text,
    color,
    tileWidth,
    tileHeight,
    fontSize,
    fontWeight,
    rotate,
  } = WATERMARK_CONFIG;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${tileWidth}" height="${tileHeight}" viewBox="0 0 ${tileWidth} ${tileHeight}">
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        transform="rotate(${rotate}, ${tileWidth / 2}, ${tileHeight / 2})"
        fill="${color}"
        font-size="${fontSize}"
        font-weight="${fontWeight}"
        font-family="Arial, Microsoft YaHei, PingFang SC, sans-serif"
      >${escapeXml(text)}</text>
    </svg>
  `;

  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`;
}

export default function GlobalWatermark() {
  return (
    <div
      aria-hidden="true"
      className="global-watermark"
      style={
        {
          "--watermark-opacity": WATERMARK_CONFIG.opacity,
          "--watermark-width": `${WATERMARK_CONFIG.tileWidth}px`,
          "--watermark-height": `${WATERMARK_CONFIG.tileHeight}px`,
          "--watermark-z-index": WATERMARK_CONFIG.zIndex,
          backgroundImage: createWatermarkImage(),
        } as React.CSSProperties
      }
    />
  );
}
