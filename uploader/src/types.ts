export type VariantName = "thumb" | "main" | "large";

export type VariantConfig = {
  name: VariantName;
  longEdge: number;
  quality: number;
};

export type ProcessedVariant = {
  name: VariantName;
  buffer: Buffer;
  width: number;
  height: number;
  bytes: number;
};

export type ProcessedImageResult = {
  width: number;
  height: number;
  aspectRatio: number;
  variants: Record<VariantName, ProcessedVariant>;
};

export type UploadEnvironment = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicBaseUrl: string;
};

export type UploadInput = {
  slug: string;
  title: string;
  alt: string;
  year?: number;
  location?: string;
  caption: string;
  order: number;
};

export type PhotoMetadata = {
  slug: string;
  title: string;
  alt: string;
  year?: number;
  location?: string;
  caption: string;
  order: number;
  width: number;
  height: number;
  aspectRatio: number;
  urls: Record<VariantName, string>;
};

export const VARIANTS: readonly VariantConfig[] = [
  { name: "thumb", longEdge: 800, quality: 74 },
  { name: "main", longEdge: 2048, quality: 82 },
  { name: "large", longEdge: 3200, quality: 86 },
] as const;
