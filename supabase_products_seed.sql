BEGIN;

-- 1. Replace the base URL below with your own Supabase project URL after uploading
--    the renamed files to the public bucket `product-images`.
-- 2. This script removes older entries for these product names, then inserts the
--    new catalog with category-specific descriptions and storage URLs.

DELETE FROM public.products
WHERE category = 'Men''s Footwear'
  AND name NOT IN (
    'Dune Mosaic Runner Sneaker',
    'Forest Runner Sneaker',
    'Graphite Runner Sneaker',
    'Olive Patchwork Sneaker',
    'Stone Hex Court Sneaker'
  );

DELETE FROM public.products
WHERE name IN (
  'Mosaic Sling Bag',
  'Mosaic Structured Tote',
  'Mosaic City Backpack',
  'Mosaic Messenger Bag',
  'Mosaic Weekender Briefcase',
  'Round Logo Keychain',
  'Hexagon Patchwork Keychain',
  'Signature Luggage Tag',
  'Mini Sneaker Keychain',
  'Teardrop Tree Keychain',
  'Dune Mosaic Runner Sneaker',
  'Forest Runner Sneaker',
  'Graphite Runner Sneaker',
  'Olive Patchwork Sneaker',
  'Stone Hex Court Sneaker',
  'Compact Zip Backpack',
  'Mosaic Shopper Tote',
  'Mosaic Crossbody Camera Bag',
  'Mosaic Travel Duffel',
  'Mosaic Belt Bag',
  'Mosaic Laptop Briefcase',
  'Patchwork Bifold Wallet',
  'Patchwork Cardholder',
  'Mosaic Bifold Wallet',
  'Patchwork Passport Holder',
  'Indigo Floral Ballet Flats',
  'Espresso Floral Ballet Flats',
  'Sand Floral Ballet Flats',
  'Meadow Floral Ballet Flats',
  'Sunrise Floral Ballet Flats'
);

WITH config AS (
  SELECT 'https://adykwrunnuwgwmbzfsxj.supabase.co/storage/v1/object/public/product-images/products/'::text AS base_url
),
catalog AS (
  SELECT *
  FROM (
    VALUES
      ('Mosaic Sling Bag', 3.8, 0.7, 92, 'mosaic-sling-bag.jpeg', 'Compact crossbody sling with reclaimed hexagon panels and a hands-free everyday profile.', 'Leather Bags'),
      ('Mosaic Structured Tote', 4.6, 0.9, 128, 'mosaic-structured-tote.jpeg', 'Clean-lined shoulder tote with a structured base, double handles, and premium circular leather construction.', 'Leather Bags'),
      ('Mosaic City Backpack', 4.9, 1.0, 136, 'mosaic-city-backpack.jpeg', 'Medium-format backpack built for daily commuting with a mosaic upper and durable black trim.', 'Leather Backpacks'),
      ('Mosaic Messenger Bag', 4.3, 0.8, 118, 'mosaic-messenger-bag.jpeg', 'Boxy messenger silhouette with flap closure for tablets, notebooks, and on-the-go essentials.', 'Leather Bags'),
      ('Mosaic Weekender Briefcase', 5.2, 1.1, 154, 'mosaic-weekender-briefcase.jpeg', 'Travel-ready briefcase with top handles and detachable strap for work trips and light overnights.', 'Leather Bags'),
      ('Round Logo Keychain', 0.2, 0.04, 18, 'round-logo-keychain.jpeg', 'Round branded key fob in earthy leather tones, sized for everyday carry and gifting.', 'Accessories'),
      ('Hexagon Patchwork Keychain', 0.2, 0.04, 22, 'hexagon-patchwork-keychain.jpeg', 'Patchwork hexagon keychain cut from leather offcuts to celebrate zero-waste detailing.', 'Accessories'),
      ('Signature Luggage Tag', 0.2, 0.04, 20, 'signature-luggage-tag.jpeg', 'Slim travel tag with branded motif and reinforced loop for luggage, totes, or work bags.', 'Accessories'),
      ('Mini Sneaker Keychain', 0.3, 0.05, 26, 'mini-sneaker-keychain.jpeg', 'Collectible sneaker-shaped keychain that mirrors the brand''s circular footwear design language.', 'Accessories'),
      ('Teardrop Tree Keychain', 0.2, 0.04, 19, 'teardrop-tree-keychain.jpeg', 'Teardrop keychain embossed with a tree mark, designed from compact reclaimed leather pieces.', 'Accessories'),
      ('Dune Mosaic Runner Sneaker', 4.4, 0.9, 122, 'dune-mosaic-runner-sneaker.jpeg', 'Neutral-toned runner sneaker featuring stitched hexagon patchwork and a versatile smart-casual finish.', 'Men''s Footwear'),
      ('Forest Runner Sneaker', 4.2, 0.9, 112, 'forest-runner-sneaker.jpeg', 'Athletic-inspired sneaker in moss and cocoa tones with lightweight comfort and mosaic side panels.', 'Men''s Footwear'),
      ('Graphite Runner Sneaker', 4.3, 0.9, 116, 'graphite-runner-sneaker.jpeg', 'Charcoal performance sneaker with a streamlined profile for versatile smart-casual wear.', 'Men''s Footwear'),
      ('Olive Patchwork Sneaker', 4.3, 0.9, 118, 'olive-patchwork-sneaker.jpeg', 'Soft olive sneaker with suede-rich patchwork panels, tonal branding, and lightweight daily comfort.', 'Men''s Footwear'),
      ('Stone Hex Court Sneaker', 4.5, 0.95, 124, 'stone-hex-court-sneaker.jpeg', 'Low-top court sneaker with layered stone-toned hexagon panels, contrast sole, and an elevated everyday profile.', 'Men''s Footwear'),
      ('Compact Zip Backpack', 4.4, 0.9, 124, 'compact-zip-backpack.jpeg', 'Slim backpack with front zip pocket, upright silhouette, and easy day-trip capacity.', 'Leather Backpacks'),
      ('Mosaic Shopper Tote', 4.5, 0.9, 122, 'mosaic-shopper-tote.jpeg', 'Tall shopper tote with elongated handles for workday carry, retail presentation, and weekend movement.', 'Leather Bags'),
      ('Mosaic Crossbody Camera Bag', 3.7, 0.7, 94, 'mosaic-crossbody-camera-bag.jpeg', 'Compact zip crossbody with wide strap and boxy proportions for essentials-first daily use.', 'Leather Bags'),
      ('Mosaic Travel Duffel', 5.8, 1.2, 168, 'mosaic-travel-duffel.jpeg', 'Soft travel duffel with structured ends and generous storage for short stays and carry-on duty.', 'Leather Bags'),
      ('Mosaic Belt Bag', 2.9, 0.5, 74, 'mosaic-belt-bag.jpeg', 'Curved belt bag with front-facing style and lightweight convenience for urban movement.', 'Leather Bags'),
      ('Mosaic Laptop Briefcase', 5.0, 1.0, 148, 'mosaic-laptop-briefcase.jpeg', 'Professional briefcase with top handles, shoulder strap, and space for a laptop and documents.', 'Leather Bags'),
      ('Patchwork Bifold Wallet', 1.1, 0.14, 42, 'patchwork-bifold-wallet.jpeg', 'Classic bifold wallet finished in warm patchwork leather blocks for a handcrafted premium look.', 'Wallets & Cardholders'),
      ('Patchwork Cardholder', 0.6, 0.08, 28, 'patchwork-cardholder.jpeg', 'Slim multi-slot cardholder with a compact footprint and color-blocked reclaimed leather face.', 'Wallets & Cardholders'),
      ('Mosaic Bifold Wallet', 1.2, 0.15, 44, 'mosaic-bifold-wallet.jpeg', 'Everyday bifold wallet featuring a geometric mosaic pattern and practical bill-and-card organization.', 'Wallets & Cardholders'),
      ('Patchwork Passport Holder', 0.9, 0.12, 38, 'patchwork-passport-holder.jpeg', 'Travel document holder with a vertical format designed for passports, tickets, and slim itineraries.', 'Wallets & Cardholders'),
      ('Indigo Floral Ballet Flats', 3.1, 0.6, 86, 'indigo-floral-ballet-flats.jpeg', 'Ballet flats with indigo-toned floral patchwork, almond toe shape, and lightweight everyday comfort.', 'Women''s Footwear'),
      ('Espresso Floral Ballet Flats', 3.1, 0.6, 86, 'espresso-floral-ballet-flats.jpeg', 'Warm espresso floral flats designed to blend artisanal surface detail with easy slip-on wear.', 'Women''s Footwear'),
      ('Sand Floral Ballet Flats', 3.0, 0.6, 84, 'sand-floral-ballet-flats.jpeg', 'Soft sand-colored ballet flats with floral patchwork panels suited to lighter seasonal wardrobes.', 'Women''s Footwear'),
      ('Meadow Floral Ballet Flats', 3.2, 0.6, 88, 'meadow-floral-ballet-flats.jpeg', 'Multicolor floral flats with a greener palette and flexible day-to-evening styling.', 'Women''s Footwear'),
      ('Sunrise Floral Ballet Flats', 3.2, 0.6, 88, 'sunrise-floral-ballet-flats.jpeg', 'Bright floral flats with golden and amber patchwork accents for expressive casual dressing.', 'Women''s Footwear')
  ) AS product_data(name, co2_factor, waste_factor, base_price, image_file, description, category)
)
INSERT INTO public.products (
  name,
  co2_factor,
  waste_factor,
  base_price,
  image_url,
  description,
  category
)
SELECT
  catalog.name,
  catalog.co2_factor,
  catalog.waste_factor,
  catalog.base_price,
  config.base_url || catalog.image_file AS image_url,
  catalog.description,
  catalog.category
FROM catalog
CROSS JOIN config;

COMMIT;
