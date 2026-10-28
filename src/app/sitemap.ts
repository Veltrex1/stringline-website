import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/apply", "/contact"].map((path) => ({ url: `${siteUrl}${path}` }));
}
