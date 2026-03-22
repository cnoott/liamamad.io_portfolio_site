import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { ProcessedImageResult, UploadEnvironment } from "./types.js";

function createR2Client(env: UploadEnvironment) {
  return new S3Client({
    region: "auto",
    endpoint: `https://${env.accountId}.r2.cloudflarestorage.com`,
    forcePathStyle: true,
    credentials: {
      accessKeyId: env.accessKeyId,
      secretAccessKey: env.secretAccessKey,
    },
  });
}

export async function uploadVariants(
  slug: string,
  processed: ProcessedImageResult,
  env: UploadEnvironment,
) {
  const client = createR2Client(env);

  await Promise.all(
    Object.values(processed.variants).map(async (variant) => {
      const key = `photos/${slug}/${variant.name}.jpg`;

      try {
        await client.send(
          new PutObjectCommand({
            Bucket: env.bucket,
            Key: key,
            Body: variant.buffer,
            ContentType: "image/jpeg",
            CacheControl: "public, max-age=31536000, immutable",
          }),
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to upload ${variant.name} to R2 (${key}): ${message}`);
      }
    }),
  );
}
