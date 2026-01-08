-- ==============================================
-- LUXE BLOOM BOUTIQUE - PRODUCTS SEED DATA
-- ==============================================
-- Jalankan SQL ini di Supabase SQL Editor untuk menambahkan semua produk
-- ==============================================

-- Insert produk (tanpa kolom updated_at yang tidak ada)
INSERT INTO products (name, description, price, category, stock, image_url, is_hidden, created_at)
VALUES 
  (
    'Violet Blossom',
    'Pink roses, lavender chrysanthemums, and vibrant hydrangeas wrapped in elegant perforated cover.',
    850000,
    'Bouquets',
    12,
    '/images/bouquets/IMG20251213170623.jpg',
    false,
    NOW()
  ),
  (
    'Pink Paradise',
    'Stunning bouquet of lilies, roses, and soft pink blooms—perfect for romantic gestures.',
    1200000,
    'Bouquets',
    8,
    '/images/bouquets/IMG20251217142845.jpg',
    false,
    NOW()
  ),
  (
    'Pastel Haze',
    'Dreamy bouquet of hydrangeas, gerberas, and soft pink blooms for gentle expressions.',
    950000,
    'Bouquets',
    15,
    '/images/bouquets/IMG20251217151154.jpg',
    false,
    NOW()
  ),
  (
    'Rose Royale',
    'One hundred stunning premium roses in deep red, symbolizing eternal love and passion.',
    2500000,
    'Premium',
    5,
    '/images/bouquets/IMG20251222164127.jpg',
    false,
    NOW()
  ),
  (
    'Blush Rose Box',
    'Charming box of pastel roses in soft blush tones, perfect for heartfelt moments.',
    750000,
    'Box',
    20,
    '/images/bouquets/IMG20251224202736.jpg',
    false,
    NOW()
  ),
  (
    'Sunny Cheer',
    'Radiant bouquet with orange gerberas, white lilies, and cheerful yellow blooms.',
    680000,
    'Bouquets',
    18,
    '/images/bouquets/IMG20251226095117.jpg',
    false,
    NOW()
  ),
  (
    'Sunshine Love',
    'Joyful burst of colors featuring bright blooms arranged in a sky blue box.',
    720000,
    'Box',
    10,
    '/images/bouquets/IMG-20251226-WA0009.jpg',
    false,
    NOW()
  ),
  (
    'Cinta Kuning',
    'Brighten their day with radiant mix of yellow lilies and cheerful blooms.',
    650000,
    'Bouquets',
    14,
    '/images/bouquets/IMG-20251231-WA0014.jpg',
    false,
    NOW()
  )
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  stock = EXCLUDED.stock,
  image_url = EXCLUDED.image_url;

-- ==============================================
-- Verifikasi hasil insert
-- ==============================================
SELECT id, name, category, price, stock, is_hidden, created_at 
FROM products 
ORDER BY created_at DESC;
