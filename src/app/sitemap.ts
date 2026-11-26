import type { MetadataRoute } from "next";
import { demoCategories } from "@/lib/mock-data";

const origin = "https://trimex.co.ke";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/marketplace", "/procurement", "/about", "/journal", ...demoCategories.map(({ slug }) => `/marketplace/${slug}`)];
  return paths.map((path) => ({ url: `${origin}${path}` }));
}
