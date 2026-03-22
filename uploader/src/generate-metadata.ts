import type { PhotoMetadata, ProcessedImageResult, UploadEnvironment, UploadInput } from "./types.js";

function normalizeBaseUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export function generateMetadata(
  input: UploadInput,
  processed: ProcessedImageResult,
  env: UploadEnvironment,
): PhotoMetadata {
  const baseUrl = normalizeBaseUrl(env.publicBaseUrl);

  return {
    slug: input.slug,
    title: input.title,
    alt: input.alt,
    year: input.year,
    location: input.location,
    caption: input.caption,
    order: input.order,
    width: processed.width,
    height: processed.height,
    aspectRatio: Number(processed.aspectRatio.toFixed(3)),
    urls: {
      thumb: `${baseUrl}/photos/${input.slug}/thumb.jpg`,
      main: `${baseUrl}/photos/${input.slug}/main.jpg`,
      large: `${baseUrl}/photos/${input.slug}/large.jpg`,
    },
  };
}
