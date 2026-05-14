import type { Product } from "./supabase";

export interface CatalogProduct extends Omit<Product, "co2_factor" | "waste_factor" | "base_price"> {
  category?: string;
  description?: string;
  image_url?: string;
  base_price?: number | string;
  co2_factor?: number | string;
  waste_factor?: number | string;
}

export interface ProductCategory {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  image: string;
  queryTerms: string[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: "wallets",
    title: "Wallet Products",
    shortTitle: "Wallets",
    eyebrow: "Compact Essentials",
    description:
      "Bifold wallets, zip wallets, and refined cardholders designed for premium utility with recovered leather.",
    image: "/images/products/wallet-classic.jpg",
    queryTerms: ["wallet", "wallets", "cardholder", "cardholders", "fold wallet", "zip wallet"]
  },
  {
    slug: "bags",
    title: "Bag Products",
    shortTitle: "Bags",
    eyebrow: "Carry Systems",
    description:
      "Backpacks, totes, and handbags built for daily movement with structured silhouettes and durable circular materials.",
    image: "/images/products/urban-backpack.jpg",
    queryTerms: ["bag", "bags", "backpack", "backpacks", "tote", "totes", "handbag", "handbags"]
  },
  {
    slug: "shoes",
    title: "Shoe Products",
    shortTitle: "Shoes",
    eyebrow: "Footwear Line",
    description:
      "Loafers, derbies, sneakers, and boots that pair craftsmanship with recycled leather performance.",
    image: "/images/products/loafer.jpg",
    queryTerms: ["shoe", "shoes", "footwear", "loafer", "derby", "sneaker", "boot"]
  },
  {
    slug: "accessories",
    title: "Accessory Products",
    shortTitle: "Accessories",
    eyebrow: "Small Goods",
    description:
      "Zero-waste finishing pieces created from precise offcuts, including keychains and other compact accessories.",
    image: "/images/products/braided-keychain.jpg",
    queryTerms: ["accessory", "accessories", "keychain", "keychains"]
  }
];

function normalizeText(value: string | null | undefined) {
  return (value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getCategoryBySlug(slug: string | null | undefined) {
  if (!slug) {
    return null;
  }

  return PRODUCT_CATEGORIES.find((category) => category.slug === normalizeText(slug).replace(/\s+/g, "-")) ?? null;
}

export function getCategoryFromQuery(query: string | null | undefined) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return null;
  }

  return (
    PRODUCT_CATEGORIES.find((category) => {
      const normalizedSlug = category.slug.replace(/-/g, " ");
      return (
        normalizedQuery === normalizedSlug ||
        normalizedQuery === normalizeText(category.shortTitle) ||
        category.queryTerms.some((term) => normalizedQuery.includes(normalizeText(term)))
      );
    }) ?? null
  );
}

export function productBelongsToCategory(product: CatalogProduct, category: ProductCategory) {
  const haystack = normalizeText([product.name, product.category, product.description].filter(Boolean).join(" "));
  return category.queryTerms.some((term) => haystack.includes(normalizeText(term)));
}

export function getProductsForCategory(products: CatalogProduct[], category: ProductCategory) {
  return products.filter((product) => productBelongsToCategory(product, category));
}

export function getProductCountByCategory(products: CatalogProduct[]) {
  return PRODUCT_CATEGORIES.reduce<Record<string, number>>((counts, category) => {
    counts[category.slug] = getProductsForCategory(products, category).length;
    return counts;
  }, {});
}
