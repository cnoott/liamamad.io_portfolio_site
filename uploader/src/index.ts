import "dotenv/config";
import path from "node:path";
import { Command, InvalidArgumentError } from "commander";
import { generateMetadata } from "./generate-metadata.js";
import { processImage } from "./process-image.js";
import { uploadVariants } from "./upload-r2.js";
import type { UploadEnvironment, UploadInput } from "./types.js";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseInteger(value: string, label: string) {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed)) {
    throw new InvalidArgumentError(`${label} must be an integer.`);
  }

  return parsed;
}

function parsePositiveInteger(value: string, label: string) {
  const parsed = parseInteger(value, label);

  if (parsed < 1) {
    throw new InvalidArgumentError(`${label} must be greater than 0.`);
  }

  return parsed;
}

function parseRequiredText(value: string, label: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    throw new InvalidArgumentError(`${label} is required.`);
  }

  return trimmed;
}

function validateSlug(value: string) {
  const slug = parseRequiredText(value, "slug");

  if (!SLUG_PATTERN.test(slug)) {
    throw new InvalidArgumentError("slug must be URL-safe and use lowercase letters, numbers, and hyphens only.");
  }

  return slug;
}

function requireEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function readEnvironment(): UploadEnvironment {
  return {
    accountId: requireEnv("R2_ACCOUNT_ID"),
    accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
    secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    bucket: requireEnv("R2_BUCKET"),
    publicBaseUrl: requireEnv("R2_PUBLIC_BASE_URL"),
  };
}

const program = new Command();

program
  .name("photo-upload")
  .description("Process a JPEG into thumb/main/large variants, upload to R2, and print portfolio metadata JSON.")
  .argument("<input>", "Path to a final edited high-resolution JPEG.")
  .requiredOption("--slug <slug>", "URL-safe unique slug.", validateSlug)
  .requiredOption("--title <title>", "Photo title.", (value) => parseRequiredText(value, "title"))
  .requiredOption("--alt <alt>", "Meaningful alt text.", (value) => parseRequiredText(value, "alt"))
  .requiredOption("--order <order>", "Photo sequence order.", (value) => parsePositiveInteger(value, "order"))
  .option("--year <year>", "Capture year.", (value) => parsePositiveInteger(value, "year"))
  .option("--location <location>", "Optional location label.", (value) => parseRequiredText(value, "location"))
  .option("--caption <caption>", "Optional caption.", "")
  .action(async (inputPath, options) => {
    const env = readEnvironment();
    const uploadInput: UploadInput = {
      slug: options.slug,
      title: options.title,
      alt: options.alt,
      year: options.year,
      location: options.location,
      caption: options.caption ?? "",
      order: options.order,
    };

    const resolvedInput = path.resolve(inputPath);
    const processed = await processImage(resolvedInput);

    await uploadVariants(uploadInput.slug, processed, env);

    const metadata = generateMetadata(uploadInput, processed, env);
    process.stdout.write(`${JSON.stringify(metadata, null, 2)}\n`);
  });

program.parseAsync(process.argv).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
