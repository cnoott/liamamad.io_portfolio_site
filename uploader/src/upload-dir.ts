import "dotenv/config";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Command } from "commander";
import { generateMetadata } from "./generate-metadata.js";
import { processImage } from "./process-image.js";
import { uploadVariants } from "./upload-r2.js";
import type { PhotoMetadata, UploadEnvironment, UploadInput } from "./types.js";

const JPEG_EXTENSIONS = new Set([".jpg", ".jpeg"]);

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

function deriveSlug(filename: string) {
  return filename
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function readJpegFiles(directory: string) {
  const resolvedDirectory = path.resolve(directory);
  const stats = await fs
    .stat(resolvedDirectory)
    .catch(() => Promise.reject(new Error(`Directory does not exist: ${resolvedDirectory}`)));

  if (!stats.isDirectory()) {
    throw new Error(`Path is not a directory: ${resolvedDirectory}`);
  }

  const entries = await fs.readdir(resolvedDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .filter((entry) => JPEG_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => ({
      name: entry.name,
      absolutePath: path.join(resolvedDirectory, entry.name),
      slug: deriveSlug(entry.name),
    }))
    .sort((left, right) => left.name.localeCompare(right.name, undefined, { numeric: true }));
}

function assertUniqueSlugs(files: Array<{ name: string; slug: string }>) {
  const seen = new Map<string, string>();

  for (const file of files) {
    if (!file.slug) {
      throw new Error(`Could not derive a valid slug from filename: ${file.name}`);
    }

    const existing = seen.get(file.slug);

    if (existing) {
      throw new Error(`Slug collision: "${existing}" and "${file.name}" both resolve to "${file.slug}"`);
    }

    seen.set(file.slug, file.name);
  }
}

async function uploadDirectory(directory: string, startOrder: number) {
  const env = readEnvironment();
  const files = await readJpegFiles(directory);

  if (files.length === 0) {
    throw new Error(`No JPEG files found in directory: ${path.resolve(directory)}`);
  }

  assertUniqueSlugs(files);

  const output: PhotoMetadata[] = [];

  for (const [index, file] of files.entries()) {
    const order = startOrder + index;
    const uploadInput: UploadInput = {
      slug: file.slug,
      title: "",
      alt: "",
      caption: "",
      order,
    };

    process.stderr.write(`Uploading ${file.name} as ${file.slug} (${order})\n`);

    const processed = await processImage(file.absolutePath);
    await uploadVariants(uploadInput.slug, processed, env);

    output.push(generateMetadata(uploadInput, processed, env));
  }

  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}

const program = new Command();

program
  .name("photo-upload-dir")
  .description("Upload every JPEG in a directory to R2 and print a metadata array with filename-derived slugs.")
  .argument("<directory>", "Directory containing final JPEG files.")
  .option("--start-order <number>", "Starting order number.", "1")
  .action(async (directory, options) => {
    const startOrder = Number.parseInt(String(options.startOrder), 10);

    if (!Number.isInteger(startOrder) || startOrder < 1) {
      throw new Error("start-order must be a positive integer.");
    }

    await uploadDirectory(directory, startOrder);
  });

program.parseAsync(process.argv).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
