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
    slug: "belts",
    title: "Leather Belt Products",
    shortTitle: "Belts",
    eyebrow: "Zero-Waste Cinch",
    description: "Earthy leather belts made from circular patchwork strips.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/Ekokintsugi-Products_categorywise/BELTS/1.png",
    categoryLabels: ["belts", "belt"],
    queryTerms: ["belt", "belts"]
  },
  {
    slug: "clutches",
    title: "Clutch Products",
    shortTitle: "Clutches",
    eyebrow: "Refined Wraps",
    description: "Refined evening clutches and daytime card wraps.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/Ekokintsugi-Products_categorywise/CLUTCHES/1.png",
    categoryLabels: ["clutches", "clutch"],
    queryTerms: ["clutch", "clutches"]
  },
  {
    slug: "handbag-collections",
    title: "Handbag Collections",
    shortTitle: "Handbag Collections",
    eyebrow: "Artisanal Totes",
    description: "Premium handcrafted luxury bags built from mosaic leather uppers.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/Ekokintsugi-Products_categorywise/HANDBAG%20COLLECTIONS/1.png",
    categoryLabels: ["handbag collections", "handbag", "handbags", "bags", "bag"],
    queryTerms: ["tote", "shoulder bag", "hobo", "handbag", "satchel", "bag", "bags"]
  },
  {
    slug: "jackets",
    title: "Leather Jacket Products",
    shortTitle: "Jackets",
    eyebrow: "Circular Tailoring",
    description: "Collectible circular patchwork jackets celebrating absolute zero-waste tailoring.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/Ekokintsugi-Products_categorywise/JACKETS/1.png",
    categoryLabels: ["jackets", "jacket"],
    queryTerms: ["jacket", "jackets", "bomber", "rider", "blazer", "crop jacket", "parka", "vest"]
  },
  {
    slug: "keychains",
    title: "Keychains & Small Goods",
    shortTitle: "Keychains",
    eyebrow: "Small Tokens",
    description: "Charming mini accessories built from precise material offcuts.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/Ekokintsugi-Products_categorywise/KEYCHAINS/1.png",
    categoryLabels: ["keychains", "keychain", "accessories", "accessory"],
    queryTerms: ["keychain", "keychains", "luggage tag", "charm", "fob"]
  },
  {
    slug: "laptop-bags",
    title: "Laptop Bags & Sleeves",
    shortTitle: "Laptop Bags",
    eyebrow: "Digital Carry",
    description: "Structured commute-ready briefcases and sleeves.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/Ekokintsugi-Products_categorywise/LAPTOP%20BAGS/1.png",
    categoryLabels: ["laptop bags", "laptop bag", "laptop sleeve"],
    queryTerms: ["laptop", "briefcase", "portfolio", "folio", "sleeve"]
  },
  {
    slug: "mens-footwear",
    title: "Men's Footwear Products",
    shortTitle: "Men's Footwear",
    eyebrow: "Performance Line",
    description: "Athletic-inspired sneakers with circular leather panels, comfort-driven construction, and everyday versatility.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/Ekokintsugi-Products_categorywise/MEN_S%20FOOTWEAR/1.png",
    categoryLabels: ["men's footwear", "mens footwear", "men footwear"],
    queryTerms: ["men", "men's", "mens", "sneaker", "sneakers", "runner", "trainer"]
  },
  {
    slug: "wallets",
    title: "Wallet & Cardholder Products",
    shortTitle: "Wallets",
    eyebrow: "Compact Essentials",
    description: "Bifold wallets, cardholders, and passport-ready organizers designed for refined everyday carry with circular materials.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/Ekokintsugi-Products_categorywise/WALLETS/1.png",
    categoryLabels: ["wallets & cardholders", "wallets and cardholders", "wallets", "wallet", "cardholders", "cardholder"],
    queryTerms: ["wallet", "wallets", "cardholder", "cardholders", "passport", "passport holder", "bifold", "billfold"]
  },
  {
    slug: "womens-footwear",
    title: "Women's Footwear Products",
    shortTitle: "Women's Footwear",
    eyebrow: "Floral Flats",
    description: "Ballet flats finished with floral patchwork uppers, softer palettes, and lightweight comfort for everyday dressing.",
    image: "https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/Ekokintsugi-Products_categorywise/WOMEN_S%20FOOTWEAR/1.png",
    categoryLabels: ["women's footwear", "womens footwear", "women footwear"],
    queryTerms: ["women", "women's", "womens", "flats", "ballet flats", "ballerina", "floral flats", "loafer"]
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
    return category.categoryLabels.some((label) => normalizedCategory === normalizeText(label));
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
