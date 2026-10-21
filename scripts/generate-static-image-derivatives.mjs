import { stat } from "node:fs/promises";
import { join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const publicDir = fileURLToPath(new URL("../public/", import.meta.url));
const files = [
  "revov-hero-panorama-v3.webp",
  "revov-about-hd.webp",
  "revov-original-product.webp",
  "engineering-services.webp",
  "software-services.webp",
  "revov-journey-hd.webp",
  ...Array.from({ length: 6 }, (_, i) => `revov-gallery-${i + 1}.webp`),
  ...Array.from({ length: 4 }, (_, i) => `team-${i + 1}.jpg`),
  ...Array.from({ length: 6 }, (_, i) => `gallery-${i + 1}.jpg`),
  "revov-home-hero-vending-crop.png",
  "revov-hero-2026.png",
  "satev-about-logo.png",
  "partner-aastu-trim.jpg",
  "partner-cocacola-trim.jpg",
  "partner-elias-trim.jpg",
  "partner-santimpay-trim.jpg",
];

for (const name of files) {
  const source = join(publicDir, name);
  const output = join(publicDir, `${parse(name).name}.avif`);
  const info = await stat(source).catch(() => null);
  if (!info) continue;
  await sharp(source).avif({ quality: 95, effort: 4, alphaQuality: 100 }).toFile(output);
  console.log(`${name} ${info.size} -> ${parse(name).name}.avif ${(await stat(output)).size}`);
  const metadata = await sharp(source).metadata();
  for (const width of [480, 768, 1024, 1440]) {
    if (width >= (metadata.width ?? 0)) continue;
    const variant = join(publicDir, `${parse(name).name}-${width}.avif`);
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 95, effort: 4, alphaQuality: 100 })
      .toFile(variant);
    console.log(`  ${width}px -> ${(await stat(variant)).size}`);
  }
}
