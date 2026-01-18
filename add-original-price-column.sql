-- =====================================================
-- Luxe Bloom Boutique - Add Original Price Column
-- =====================================================
-- Run this SQL in Supabase SQL Editor to add the original_price column
-- to existing products table for strikethrough pricing feature
-- =====================================================

-- Add original_price column to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS original_price INTEGER CHECK (original_price IS NULL OR original_price >= 0);

-- Comment explaining the field
COMMENT ON COLUMN public.products.original_price IS 'Original price before discount. If set and higher than price, displays as strikethrough on website.';

-- =====================================================
-- DONE! Original price column has been added.
-- =====================================================
-- You can now set original prices in the admin dashboard
-- for products to show strikethrough pricing on the website.
-- =====================================================
