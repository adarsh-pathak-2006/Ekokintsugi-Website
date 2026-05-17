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
  imagePosition?: string;
  categoryLabels: string[];
  queryTerms: string[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: "leather-backpacks",
    title: "Leather Backpack Products",
    shortTitle: "Leather Backpacks",
    eyebrow: "Structured Carry",
    description:
      "Commuter-ready and travel-oriented backpacks built from reclaimed leather mosaics with structured silhouettes and premium utility.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/products/mosaic-city-backpack.jpeg",
    imagePosition: "center 32%",
    categoryLabels: ["leather backpacks", "leather backpack", "backpacks", "backpack"],
    queryTerms: [
      "backpack",
      "backpacks",
      "commuter backpack",
      "utility backpack",
      "travel backpack",
      "zip backpack"
    ]
  },
  {
    slug: "leather-bags",
    title: "Leather Bag Products",
    shortTitle: "Leather Bags",
    eyebrow: "Carry Collection",
    description:
      "Totes, slings, messenger bags, duffels, bucket bags, and briefcase-inspired silhouettes crafted from circular leather materials.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/products/mosaic-structured-tote.jpeg",
    imagePosition: "center 36%",
    categoryLabels: ["leather bags", "leather bag", "bags", "bag"],
    queryTerms: [
      "bag",
      "bags",
      "tote",
      "shopper",
      "crossbody",
      "messenger",
      "briefcase",
      "duffel",
      "belt bag",
      "sling",
      "bucket bag",
      "camera bag"
    ]
  },
  {
    slug: "wallets",
    title: "Wallet & Cardholder Products",
    shortTitle: "Wallets",
    eyebrow: "Compact Essentials",
    description:
      "Bifold wallets, cardholders, and passport-ready organizers designed for refined everyday carry with circular materials.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/products/mosaic-bifold-wallet.jpeg",
    categoryLabels: ["wallets & cardholders", "wallets and cardholders", "wallets", "wallet", "cardholders", "cardholder"],
    queryTerms: ["wallet", "wallets", "cardholder", "cardholders", "passport", "passport holder", "bifold"]
  },
  {
    slug: "accessories",
    title: "Accessory Products",
    shortTitle: "Accessories",
    eyebrow: "Small Goods",
    description:
      "Keychains, luggage tags, and collectible mini accessories made from precise offcuts so even the smallest material has value.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/products/teardrop-tree-keychain.jpeg",
    categoryLabels: ["accessories", "accessory"],
    queryTerms: ["keychain", "keychains", "luggage tag", "mini sneaker"]
  },
  {
    slug: "mens-footwear",
    title: "Men's Footwear Products",
    shortTitle: "Men's Footwear",
    eyebrow: "Performance Line",
    description:
      "Athletic-inspired sneakers with circular leather panels, comfort-driven construction, and everyday versatility.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/products/forest-runner-sneaker.jpeg",
    categoryLabels: ["men's footwear", "mens footwear", "men footwear"],
    queryTerms: ["men", "men's", "mens", "sneaker", "sneakers", "runner"]
  },
  {
    slug: "womens-footwear",
    title: "Women's Footwear Products",
    shortTitle: "Women's Footwear",
    eyebrow: "Floral Flats",
    description:
      "Ballet flats finished with floral patchwork uppers, softer palettes, and lightweight comfort for everyday dressing.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/products/sunrise-floral-ballet-flats.jpeg",
    imagePosition: "center 24%",
    categoryLabels: ["women's footwear", "womens footwear", "women footwear"],
    queryTerms: ["women", "women's", "womens", "flats", "ballet flats", "ballerina", "floral flats"]
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
  const normalizedCategory = normalizeText(product.category);
  const haystack = normalizeText([product.category, product.name, product.description].filter(Boolean).join(" "));

  if (normalizedCategory) {
    if (category.categoryLabels.some((label) => normalizedCategory === normalizeText(label))) {
      return true;
    }
  }

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
