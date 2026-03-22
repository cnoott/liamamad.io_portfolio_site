# LiamAmad.io Photography Portfolio

Two deliverables live in this repo:

- `/site`: static Astro portfolio for Cloudflare Pages
- `/uploader`: local TypeScript CLI for Sharp processing and Cloudflare R2 uploads

Use a current Node LTS runtime. Node 20.19+ or Node 22+ is the safe baseline here. If `pnpm` is not installed yet, run `corepack enable pnpm` once before using the commands below.

## Site

Install and run:

```bash
cd site
pnpm install
pnpm dev
```

Build for Cloudflare Pages:

```bash
cd site
pnpm build
```

Cloudflare Pages settings:

- Project root: `site`
- Build command: `pnpm build`
- Build output directory: `dist`

The site ships with example data in `/Users/liam/Projects/liamamad.io_portfolio_site/site/src/data/photos.ts`. Replace those records with your real uploaded photo metadata when the R2 assets are ready.

## Uploader

Install and run:

```bash
cd uploader
cp .env.example .env
pnpm install
pnpm photo-upload ./exports/kid-through-gate.jpg \
  --slug kid-through-gate \
  --title "Kid Through Gate" \
  --alt "Child peering through a metal gate in Brooklyn" \
  --year 2026 \
  --location "Brooklyn, NY" \
  --order 1
```

Required environment variables:

- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET`
- `R2_PUBLIC_BASE_URL`

The CLI:

1. validates the source JPEG
2. generates `thumb`, `main`, and `large` progressive JPEG variants
3. uploads them to `photos/{slug}/{variant}.jpg`
4. prints the metadata object to paste into the Astro data file
