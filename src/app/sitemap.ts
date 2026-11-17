import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { getAllProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: siteConfig.url },
    { url: `${siteConfig.url}/shop` },
  ];

  const products: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: `${siteConfig.url}/shop/${product.slug}`,
    lastModified: product.createdAt,
  }));

  return [...pages, ...products];
}