# Website Changes Documentation

This document lists only the website changes implemented from `2026-05-09` onward, based on the git history and the actual code changes in those commits. It is intended to be used as a source document for fuller documentation later.

## Scope

Covered commit window:

- `892a3d4` on `2026-05-09`
- `8004832` on `2026-05-09`
- `2b9a82f` on `2026-05-09`
- `c416833` on `2026-05-14`
- `1d03400` on `2026-05-18`
- `9f54b0d` on `2026-05-18`
- `6df178c` on `2026-05-18`

This report intentionally excludes changes made before `2026-05-09`.

## High-Level Summary

From `2026-05-09` onward, the website changed in three major ways:

- The hero section was repaired and visually tightened.
- The products experience was rebuilt around category-specific browsing.
- The catalog, visual identity, and product classification logic were expanded and refined.

## Changes Implemented From 2026-05-09 Onward

## 1. Hero Section Updates

### What changed

The hero slider received a focused round of fixes and presentation adjustments across the `2026-05-09` commits.

Implemented changes:

- Replaced externally hosted hero images with local project assets in `public/images/hero/`
- Added a fourth hero image temporarily during the first slider fix pass
- Reduced the overall hero section width and height for a tighter composition
- Reduced heading and body text sizing slightly to improve balance inside the slider
- Adjusted horizontal and bottom spacing for copy and indicators
- Updated the second hero image again in the later image-only commit
- Removed the temporary `hero-4.jpg` asset after the purse image update

### What the git changes show

From the `HeroSlider.tsx` diff:

- Slide image sources were changed from remote Google-hosted URLs to local files like `/images/hero/hero-1.jpg`
- The hero container changed from a larger `650px` layout to a smaller responsive layout around `480px` to `540px`
- Text spacing and indicator spacing were tightened

### Key result

- The hero section became more stable, more self-contained, and visually cleaner.

## 2. Product Category Browsing System

### What changed

The `2026-05-14` work introduced a full category-based product browsing flow instead of relying on a single broader products listing.

Implemented changes:

- Added centralized category definitions in `src/lib/productCatalog.ts`
- Added a new reusable product grid component in `src/components/ProductCatalogueGrid.tsx`
- Added a new product-fetching hook in `src/hooks/useProductsCatalog.ts`
- Added a dedicated route and page for `/products/category/:slug`
- Changed the main products page into a category-entry page instead of a flat product list
- Added category-based product counting
- Added category query matching so a query can redirect into the correct category page
- Added category-aware empty states and loading states

### Initial category model introduced on 2026-05-14

The first category implementation grouped products into:

- Wallets
- Bags
- Shoes
- Accessories

### UI changes on the products side

The products page was restructured to:

- Show category cards instead of directly rendering the full product catalog
- Display category-level descriptions and counts
- Route users into dedicated category pages

The new category page was designed to:

- Show category-specific hero imagery
- Present category description and navigation chips
- Render only products relevant to the selected category

### Key result

- Product discovery shifted from a generic list into a more intentional browsing flow with dedicated category landing pages.

## 3. Product Grid And Catalog Fetching Improvements

### What changed

The new category experience was supported by dedicated front-end catalog utilities.

Implemented changes:

- Added a reusable `ProductCatalogueGrid` for product cards
- Added price formatting with a fallback state of `Price on request`
- Added impact formatting for `CO2` and `Waste` values
- Added a dedicated `useProductsCatalog()` hook for fetching `/api/catalog`
- Added network error handling and loading states for product fetches

### Key result

- The product experience became more modular and production-ready, with shared fetch logic and a reusable grid renderer.

## 4. Catalog Expansion And Product Asset Build-Out

### What changed

The first `2026-05-18` commit (`1d03400`) significantly expanded the product set, supporting imagery, and seed data.

Implemented changes:

- Added a large batch of new product image assets in `product_images/`
- Added `product_images_contact_sheet.jpg`
- Added the `logo_eko.png` brand asset and published it into `public/`
- Added `supabase_products_seed.sql`
- Expanded the server-side fallback product catalog in `server.ts`

### New product families and examples added

The expanded catalog included:

- New bag products such as sling bags, structured totes, messenger bags, travel duffels, belt bags, laptop briefcases, and shopper totes
- New accessories such as logo keychains, luggage tags, patchwork keychains, and mini sneaker keychains
- New wallet and cardholder entries
- New men's footwear entries
- New women's footwear entries

### What the backend diff shows

The fallback `sampleProducts` array in `server.ts` was replaced with a much broader product list containing:

- More distinct names
- More detailed descriptions
- Expanded pricing
- Expanded `co2_factor` and `waste_factor` coverage

### Key result

- The website moved from a relatively small sample catalog to a much more complete merchandise presentation.

## 5. Impact, Branding, And Visual Refinement Pass

### What changed

The same `2026-05-18` implementation pass also refined the website presentation beyond products.

Implemented changes:

- Replaced older logo usage with `/logo_eko.png` in the impact dashboard and certificate areas
- Updated parts of the impact UI to improve text contrast and readability
- Expanded the certification presentation in `ImpactSection.tsx`
- Introduced richer certification cards with icons and structured labels instead of simpler flat entries
- Refined theme tokens in `src/index.css`, including accent color, muted foreground, and border values
- Simplified `.logo-surface` styling

### Key result

- The website presentation became more branded and visually consistent, especially in the impact-related areas.

## 6. Category Model Upgrade On 2026-05-18

### What changed

The later `2026-05-18` commit (`9f54b0d`) refined the category system beyond the initial May 14 version.

Implemented changes:

- Split the older general `Bags` category into:
  - `Leather Backpacks`
  - `Leather Bags`
- Kept `Wallets`, `Accessories`, `Men's Footwear`, and `Women's Footwear`
- Added `imagePosition` support for category hero images
- Updated product page copy to reflect the more specific category model
- Added a new category image asset: `public/images/products/hexagon-commuter-backpack.jpg`
- Added `.section-badge` and `.section-badge-label` styling in `src/index.css`
- Updated product seed data to use the newer category names
- Added more men's footwear entries in seed and fallback data

### Revised category structure after this update

The category system became:

- Leather Backpacks
- Leather Bags
- Wallets
- Accessories
- Men's Footwear
- Women's Footwear

### What the diffs show

The category definitions were upgraded to include:

- More precise product copy
- More precise image selection
- Separate query terms for backpacks versus other leather bags
- Better image positioning support for category banners

### Key result

- The product taxonomy became clearer and more aligned with the actual catalog being shown.

## 7. Product Classification Logic Fix

### What changed

The final commit in this range (`6df178c`) fixed a classification edge case in `src/lib/productCatalog.ts`.

Implemented logic fix:

- Older database rows that still use a generic `"Bags"` or `"Bag"` category are no longer automatically treated as leather bags
- The code now checks product content for backpack-like terms
- Backpack-like items are mapped into `leather-backpacks`
- Non-backpack bag items are mapped into `leather-bags`
- Text-query inference is now used only when a product has no category value at all

### Why this matters

Without this fix, older rows with generic bag labels could appear in the wrong category after the taxonomy split.

### Key result

- Category results became more accurate and backward-compatible with older catalog records.

## Commit-By-Commit Breakdown

| Date | Commit | Actual change implemented |
| --- | --- | --- |
| 2026-05-09 | `892a3d4` | Hero slider switched from remote image URLs to local hero assets, added a fourth hero image, and resized the section layout for a tighter composition. |
| 2026-05-09 | `8004832` | Hero slider spacing and presentation were further adjusted inside `HeroSlider.tsx`. |
| 2026-05-09 | `2b9a82f` | Hero imagery was revised again by replacing the purse image and removing the temporary fourth hero image. |
| 2026-05-14 | `c416833` | Introduced the category-driven product browsing system with new catalog utilities, a reusable product grid, and dedicated product category pages. |
| 2026-05-18 | `1d03400` | Expanded product assets and catalog content, added seed SQL, updated branding assets, and refined impact/visual presentation. |
| 2026-05-18 | `9f54b0d` | Refined category taxonomy, styling, seed data, and category page presentation, including splitting bags into leather backpacks and leather bags. |
| 2026-05-18 | `6df178c` | Fixed category matching logic so older generic bag records are assigned to the correct new category. |

## Main Files Affected In This Date Range

Core files changed from `2026-05-09` onward include:

- `src/components/HeroSlider.tsx`
- `src/components/ProductCatalogueGrid.tsx`
- `src/components/ProductSection.tsx`
- `src/pages/ProductsPage.tsx`
- `src/pages/ProductCategoryPage.tsx`
- `src/hooks/useProductsCatalog.ts`
- `src/lib/productCatalog.ts`
- `src/components/ImpactSection.tsx`
- `src/components/ImpactDashboard.tsx`
- `src/index.css`
- `server.ts`
- `supabase_products_seed.sql`
- `public/images/hero/*`
- `product_images/*`
- `public/logo_eko.png`

## Documentation Use Notes

This file is now best suited for generating:

- A May 9 onward implementation report
- A release-note style website update summary
- A stakeholder-facing summary of the recent product and design work
- A documentation section specifically about the category and catalog expansion phase
