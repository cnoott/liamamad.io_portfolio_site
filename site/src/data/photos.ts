import { siteMeta } from "./site";

export type Photo = {
  slug: string;
  title: string;
  alt: string;
  year?: number;
  location?: string;
  caption?: string;
  order: number;
  width: number;
  height: number;
  aspectRatio: number;
  urls: {
    thumb: string;
    main: string;
    large: string;
  };
};

const imageBaseUrl = siteMeta.imageBaseUrl;

const rawPhotos: Photo[] = [
  {
    slug: "kid-through-gate",
    title: "Kid Through Gate",
    alt: "Child peering through a metal gate in Brooklyn",
    year: 2026,
    location: "Brooklyn, NY",
    caption: "",
    order: 1,
    width: 6048,
    height: 4024,
    aspectRatio: 1.503,
    urls: {
      thumb: `${imageBaseUrl}/photos/kid-through-gate/thumb.jpg`,
      main: `${imageBaseUrl}/photos/kid-through-gate/main.jpg`,
      large: `${imageBaseUrl}/photos/kid-through-gate/large.jpg`,
    },
  },
  {
    slug: "corner-diner-window",
    title: "Corner Diner Window",
    alt: "A late-night diner window glowing onto a quiet street corner",
    year: 2026,
    location: "Queens, NY",
    caption: "",
    order: 2,
    width: 5304,
    height: 7952,
    aspectRatio: 0.667,
    urls: {
      thumb: `${imageBaseUrl}/photos/corner-diner-window/thumb.jpg`,
      main: `${imageBaseUrl}/photos/corner-diner-window/main.jpg`,
      large: `${imageBaseUrl}/photos/corner-diner-window/large.jpg`,
    },
  },
  {
    slug: "subway-platform-blue-hour",
    title: "Subway Platform, Blue Hour",
    alt: "Commuters waiting beneath cool fluorescent lights on an outdoor platform",
    year: 2025,
    location: "Brooklyn, NY",
    caption: "",
    order: 3,
    width: 6240,
    height: 4160,
    aspectRatio: 1.5,
    urls: {
      thumb: `${imageBaseUrl}/photos/subway-platform-blue-hour/thumb.jpg`,
      main: `${imageBaseUrl}/photos/subway-platform-blue-hour/main.jpg`,
      large: `${imageBaseUrl}/photos/subway-platform-blue-hour/large.jpg`,
    },
  },
  {
    slug: "laundromat-sunday",
    title: "Laundromat Sunday",
    alt: "Rows of washers and dryers in a quiet laundromat on a Sunday afternoon",
    year: 2025,
    location: "Lower East Side, NY",
    caption: "",
    order: 4,
    width: 6000,
    height: 4000,
    aspectRatio: 1.5,
    urls: {
      thumb: `${imageBaseUrl}/photos/laundromat-sunday/thumb.jpg`,
      main: `${imageBaseUrl}/photos/laundromat-sunday/main.jpg`,
      large: `${imageBaseUrl}/photos/laundromat-sunday/large.jpg`,
    },
  },
];

export const photos = rawPhotos.slice().sort((left, right) => left.order - right.order);

export function getPhotoBySlug(slug: string) {
  return photos.find((photo) => photo.slug === slug);
}

export function getPhotoPath(slug: string) {
  return `/photo/${slug}`;
}

export function getPhotoIndex(slug: string) {
  return photos.findIndex((photo) => photo.slug === slug);
}

export function getPrevPhoto(slug: string) {
  const index = getPhotoIndex(slug);
  return index > 0 ? photos[index - 1] : undefined;
}

export function getNextPhoto(slug: string) {
  const index = getPhotoIndex(slug);
  return index >= 0 && index < photos.length - 1 ? photos[index + 1] : undefined;
}
