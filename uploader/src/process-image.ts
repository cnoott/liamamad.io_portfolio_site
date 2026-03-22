import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { VARIANTS, type ProcessedImageResult, type ProcessedVariant, type VariantName } from "./types.js";

const JPEG_EXTENSIONS = new Set([".jpg", ".jpeg"]);

function getDisplayDimensions(width: number, height: number, orientation?: number) {
  const rotatesCanvas = orientation ? [5, 6, 7, 8].includes(orientation) : false;
  return rotatesCanvas ? { width: height, height: width } : { width, height };
}

async function assertValidInput(filePath: string) {
  const sourcePath = path.resolve(filePath);
  let fileStats;

  try {
    fileStats = await fs.stat(sourcePath);
  } catch {
    throw new Error(`Input file does not exist: ${sourcePath}`);
  }

  if (!fileStats.isFile()) {
    throw new Error(`Input path is not a file: ${sourcePath}`);
  }

  const extension = path.extname(sourcePath).toLowerCase();

  if (!JPEG_EXTENSIONS.has(extension)) {
    throw new Error(`Input must be a JPEG file: ${sourcePath}`);
  }

  return sourcePath;
}

export async function processImage(filePath: string): Promise<ProcessedImageResult> {
  const sourcePath = await assertValidInput(filePath);
  const inputBuffer = await fs.readFile(sourcePath);
  const metadata = await sharp(inputBuffer).metadata();

  if (metadata.format !== "jpeg") {
    throw new Error(`Input must be a JPEG file: ${sourcePath}`);
  }

  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not read dimensions from JPEG: ${sourcePath}`);
  }

  const displayDimensions = getDisplayDimensions(metadata.width, metadata.height, metadata.orientation);
  const variants = {} as Record<VariantName, ProcessedVariant>;

  for (const variant of VARIANTS) {
    const { data, info } = await sharp(inputBuffer)
      .rotate()
      .resize({
        width: variant.longEdge,
        height: variant.longEdge,
        fit: "inside",
        withoutEnlargement: true,
      })
      .toColourspace("srgb")
      .jpeg({
        quality: variant.quality,
        progressive: true,
        mozjpeg: true,
      })
      .toBuffer({ resolveWithObject: true });

    if (!info.width || !info.height) {
      throw new Error(`Sharp did not return output dimensions for ${variant.name}: ${sourcePath}`);
    }

    variants[variant.name] = {
      name: variant.name,
      buffer: data,
      width: info.width,
      height: info.height,
      bytes: data.byteLength,
    };
  }

  return {
    width: displayDimensions.width,
    height: displayDimensions.height,
    aspectRatio: displayDimensions.width / displayDimensions.height,
    variants,
  };
}
