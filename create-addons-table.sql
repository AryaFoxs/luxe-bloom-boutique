-- =====================================================
-- Luxe Bloom Boutique - Create Addons Table
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- =====================================================

-- Create addons table
CREATE TABLE IF NOT EXISTS public.addons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL CHECK (price >= 0),
    image_url TEXT DEFAULT '/images/placeholder.jpg',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at timestamp
CREATE TRIGGER update_addons_updated_at
    BEFORE UPDATE ON public.addons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.addons ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Addons are viewable by everyone" 
    ON public.addons FOR SELECT 
    USING (true);

CREATE POLICY "Addons are manageable by authenticated users only" 
    ON public.addons FOR ALL 
    TO authenticated 
    USING (true)
    WITH CHECK (true);

-- Seed with initial data from hardcoded list
INSERT INTO public.addons (name, description, price, image_url) VALUES
    ('Ferrero Rocher Box', '16 pcs premium chocolate', 150000, '/images/addons/chocolate.jpg'),
    ('Teddy Bear', 'Soft plush teddy bear 30cm', 200000, '/images/addons/teddy.jpg'),
    ('Premium Card', 'Handwritten message card', 50000, '/images/addons/card.jpg'),
    ('Helium Balloon', 'Heart-shaped foil balloon', 75000, '/images/addons/balloon.jpg'),
    ('Chocolate Truffle', 'Artisan chocolate truffles', 120000, '/images/addons/truffle.jpg'),
    ('Scented Candle', 'Luxury rose-scented candle', 180000, '/images/addons/candle.jpg')
ON CONFLICT DO NOTHING;
