import type { CSSProperties, ImgHTMLAttributes } from "react";

type ResponsiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  alt: string;
  src: string;
  width: number;
  height: number;
  sizes: string;
  fill?: boolean;
};

const candidateWidths = [480, 768, 1024, 1440];

export function ResponsiveImage({ src, alt, width, height, sizes, fill = false, style, ...props }: ResponsiveImageProps) {
  const lastDot = src.lastIndexOf(".");
  const base = lastDot < 0 ? src : src.slice(0, lastDot);
  const extension = lastDot < 0 ? ".avif" : src.slice(lastDot);
  const variants = candidateWidths.filter((candidate) => candidate < width);
  const srcSet = [
    ...variants.map((candidate) => `${base}-${candidate}${extension} ${candidate}w`),
    `${src} ${width}w`,
  ].join(", ");
  const fillStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }
    : style ?? {};

  return <img {...props} alt={alt} src={src} srcSet={srcSet} sizes={sizes} width={width} height={height} style={fillStyle} />;
}
