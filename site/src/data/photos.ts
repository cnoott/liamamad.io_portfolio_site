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
    slug: "000193360037",
    title: "000193360037",
    alt: "",
    caption: "",
    order: 1,
    width: 3130,
    height: 2075,
    aspectRatio: 1.508,
    urls: {
      thumb: `${imageBaseUrl}/photos/000193360037/thumb.jpg`,
      main: `${imageBaseUrl}/photos/000193360037/main.jpg`,
      large: `${imageBaseUrl}/photos/000193360037/large.jpg`,
    },
  },
  {
    slug: "kodak-100-c-41-31927-109096-246364-002463640017",
    title: "kodak-100-c-41-31927-109096-246364-002463640017",
    alt: "",
    caption: "",
    order: 2,
    width: 3017,
    height: 2000,
    aspectRatio: 1.508,
    urls: {
      thumb: `${imageBaseUrl}/photos/kodak-100-c-41-31927-109096-246364-002463640017/thumb.jpg`,
      main: `${imageBaseUrl}/photos/kodak-100-c-41-31927-109096-246364-002463640017/main.jpg`,
      large: `${imageBaseUrl}/photos/kodak-100-c-41-31927-109096-246364-002463640017/large.jpg`,
    },
  },
  {
    slug: "kodak-400-c-41-31927-112835-255040-002518400006",
    title: "kodak-400-c-41-31927-112835-255040-002518400006",
    alt: "",
    caption: "",
    order: 3,
    width: 3017,
    height: 2000,
    aspectRatio: 1.508,
    urls: {
      thumb: `${imageBaseUrl}/photos/kodak-400-c-41-31927-112835-255040-002518400006/thumb.jpg`,
      main: `${imageBaseUrl}/photos/kodak-400-c-41-31927-112835-255040-002518400006/main.jpg`,
      large: `${imageBaseUrl}/photos/kodak-400-c-41-31927-112835-255040-002518400006/large.jpg`,
    },
  },
  {
    slug: "dsc-5214",
    title: "dsc-5214",
    alt: "",
    caption: "",
    order: 4,
    width: 8256,
    height: 5504,
    aspectRatio: 1.5,
    urls: {
      thumb: `${imageBaseUrl}/photos/dsc-5214/thumb.jpg`,
      main: `${imageBaseUrl}/photos/dsc-5214/main.jpg`,
      large: `${imageBaseUrl}/photos/dsc-5214/large.jpg`,
    },
  },
  {
    slug: "kodak-800-c-41-31927-101412-226623-002266230017-1",
    title: "kodak-800-c-41-31927-101412-226623-002266230017-1",
    alt: "",
    caption: "",
    order: 5,
    width: 3017,
    height: 2000,
    aspectRatio: 1.508,
    urls: {
      thumb: `${imageBaseUrl}/photos/kodak-800-c-41-31927-101412-226623-002266230017-1/thumb.jpg`,
      main: `${imageBaseUrl}/photos/kodak-800-c-41-31927-101412-226623-002266230017-1/main.jpg`,
      large: `${imageBaseUrl}/photos/kodak-800-c-41-31927-101412-226623-002266230017-1/large.jpg`,
    },
  },
  {
    slug: "000069770018",
    title: "000069770018",
    alt: "",
    caption: "",
    order: 6,
    width: 3089,
    height: 2048,
    aspectRatio: 1.508,
    urls: {
      thumb: `${imageBaseUrl}/photos/000069770018/thumb.jpg`,
      main: `${imageBaseUrl}/photos/000069770018/main.jpg`,
      large: `${imageBaseUrl}/photos/000069770018/large.jpg`,
    },
  },
  {
    slug: "241008000029190008",
    title: "241008000029190008",
    alt: "",
    caption: "",
    order: 7,
    width: 1565,
    height: 1037,
    aspectRatio: 1.509,
    urls: {
      thumb: `${imageBaseUrl}/photos/241008000029190008/thumb.jpg`,
      main: `${imageBaseUrl}/photos/241008000029190008/main.jpg`,
      large: `${imageBaseUrl}/photos/241008000029190008/large.jpg`,
    },
  },
  {
    slug: "241013000032040025",
    title: "241013000032040025",
    alt: "",
    caption: "",
    order: 8,
    width: 1565,
    height: 1037,
    aspectRatio: 1.509,
    urls: {
      thumb: `${imageBaseUrl}/photos/241013000032040025/thumb.jpg`,
      main: `${imageBaseUrl}/photos/241013000032040025/main.jpg`,
      large: `${imageBaseUrl}/photos/241013000032040025/large.jpg`,
    },
  },
  {
    slug: "dsc-4826",
    title: "dsc-4826",
    alt: "",
    caption: "",
    order: 9,
    width: 8256,
    height: 5504,
    aspectRatio: 1.5,
    urls: {
      thumb: `${imageBaseUrl}/photos/dsc-4826/thumb.jpg`,
      main: `${imageBaseUrl}/photos/dsc-4826/main.jpg`,
      large: `${imageBaseUrl}/photos/dsc-4826/large.jpg`,
    },
  },
  {
    slug: "kodak-400-c-41-31927-105584-237035-002370350032",
    title: "kodak-400-c-41-31927-105584-237035-002370350032",
    alt: "",
    caption: "",
    order: 10,
    width: 3017,
    height: 2000,
    aspectRatio: 1.508,
    urls: {
      thumb: `${imageBaseUrl}/photos/kodak-400-c-41-31927-105584-237035-002370350032/thumb.jpg`,
      main: `${imageBaseUrl}/photos/kodak-400-c-41-31927-105584-237035-002370350032/main.jpg`,
      large: `${imageBaseUrl}/photos/kodak-400-c-41-31927-105584-237035-002370350032/large.jpg`,
    },
  },
  {
    slug: "l1170517",
    title: "l1170517",
    alt: "",
    caption: "",
    order: 11,
    width: 6000,
    height: 4000,
    aspectRatio: 1.5,
    urls: {
      thumb: `${imageBaseUrl}/photos/l1170517/thumb.jpg`,
      main: `${imageBaseUrl}/photos/l1170517/main.jpg`,
      large: `${imageBaseUrl}/photos/l1170517/large.jpg`,
    },
  },
  {
    slug: "l1002948-instagram",
    title: "l1002948-instagram",
    alt: "",
    caption: "",
    order: 12,
    width: 5976,
    height: 3992,
    aspectRatio: 1.497,
    urls: {
      thumb: `${imageBaseUrl}/photos/l1002948-instagram/thumb.jpg`,
      main: `${imageBaseUrl}/photos/l1002948-instagram/main.jpg`,
      large: `${imageBaseUrl}/photos/l1002948-instagram/large.jpg`,
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
