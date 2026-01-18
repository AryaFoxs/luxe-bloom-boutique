-- =====================================================
-- Luxe Bloom Boutique - Supabase Database Schema
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- Make sure to run each section in order
-- =====================================================

-- =====================================================
-- 1. EXTENSIONS
-- =====================================================
-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 2. PRODUCTS TABLE
-- =====================================================
-- Main products table for storing bouquets and flower products
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL CHECK (price >= 0),
    original_price INTEGER CHECK (original_price IS NULL OR original_price >= 0),
    category VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL DEFAULT '/images/placeholder.jpg',
    is_promo BOOLEAN DEFAULT FALSE,
    is_hidden BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_promo ON public.products(is_promo);
CREATE INDEX IF NOT EXISTS idx_products_is_hidden ON public.products(is_hidden);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 3. ORDERS TABLE
-- =====================================================
-- Orders table for storing customer orders
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    customer_email VARCHAR(255),
    customer_address TEXT,
    items JSONB NOT NULL DEFAULT '[]',
    subtotal INTEGER NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    discount INTEGER NOT NULL DEFAULT 0 CHECK (discount >= 0),
    total INTEGER NOT NULL DEFAULT 0 CHECK (total >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_name ON public.orders(customer_name);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- Auto-update updated_at timestamp for orders
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4. CATEGORIES TABLE (Optional - for dynamic categories)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories
INSERT INTO public.categories (name, slug, description, display_order) VALUES
    ('Roses', 'roses', 'Classic and beautiful rose arrangements', 1),
    ('Mixed Bouquets', 'mixed-bouquets', 'Beautiful mixed flower arrangements', 2),
    ('Wedding', 'wedding', 'Elegant wedding florals and arrangements', 3),
    ('Birthday', 'birthday', 'Perfect birthday flower gifts', 4),
    ('Anniversary', 'anniversary', 'Romantic anniversary bouquets', 5),
    ('Sympathy', 'sympathy', 'Thoughtful sympathy arrangements', 6),
    ('Congratulations', 'congratulations', 'Celebration flower arrangements', 7),
    ('Premium', 'premium', 'Luxury premium arrangements', 8)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 5. CONTACT MESSAGES TABLE (Optional)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON public.contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);

-- =====================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================
-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Products policies: Public read, authenticated write
CREATE POLICY "Products are viewable by everyone" 
    ON public.products FOR SELECT 
    USING (true);

CREATE POLICY "Products are insertable by authenticated users only" 
    ON public.products FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY "Products are updatable by authenticated users only" 
    ON public.products FOR UPDATE 
    TO authenticated 
    USING (true);

CREATE POLICY "Products are deletable by authenticated users only" 
    ON public.products FOR DELETE 
    TO authenticated 
    USING (true);

-- Orders policies: Only authenticated users can manage orders
CREATE POLICY "Orders are viewable by authenticated users only" 
    ON public.orders FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY "Orders are insertable by authenticated users only" 
    ON public.orders FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY "Orders are updatable by authenticated users only" 
    ON public.orders FOR UPDATE 
    TO authenticated 
    USING (true);

CREATE POLICY "Orders are deletable by authenticated users only" 
    ON public.orders FOR DELETE 
    TO authenticated 
    USING (true);

-- Categories policies: Public read, authenticated write
CREATE POLICY "Categories are viewable by everyone" 
    ON public.categories FOR SELECT 
    USING (true);

CREATE POLICY "Categories are insertable by authenticated users only" 
    ON public.categories FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY "Categories are updatable by authenticated users only" 
    ON public.categories FOR UPDATE 
    TO authenticated 
    USING (true);

CREATE POLICY "Categories are deletable by authenticated users only" 
    ON public.categories FOR DELETE 
    TO authenticated 
    USING (true);

-- Contact messages policies: Anyone can insert, only authenticated can read
CREATE POLICY "Contact messages are insertable by anyone" 
    ON public.contact_messages FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Contact messages are viewable by authenticated users only" 
    ON public.contact_messages FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY "Contact messages are updatable by authenticated users only" 
    ON public.contact_messages FOR UPDATE 
    TO authenticated 
    USING (true);

CREATE POLICY "Contact messages are deletable by authenticated users only" 
    ON public.contact_messages FOR DELETE 
    TO authenticated 
    USING (true);

-- =====================================================
-- 7. STORAGE BUCKET FOR PRODUCT IMAGES
-- =====================================================
-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'products', 
    'products', 
    true,
    5242880, -- 5MB max file size
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for product images
CREATE POLICY "Product images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'products');

CREATE POLICY "Authenticated users can upload product images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'products');

CREATE POLICY "Authenticated users can update product images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'products');

CREATE POLICY "Authenticated users can delete product images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'products');

-- =====================================================
-- 8. SAMPLE DATA FOR TESTING
-- =====================================================
-- Insert sample products (you can modify or remove these)
INSERT INTO public.products (name, description, price, stock, category, image_url, is_promo) VALUES
    ('Crimson Velvet', 'Deep red roses wrapped in luxury velvet packaging. Perfect for romantic occasions and anniversaries.', 599000, 20, 'Roses', '/images/bouquets/IMG-20251231-WA0014 (1).jpg', true),
    ('Blush Romance', 'Soft pink roses with delicate baby''s breath accents. A gentle expression of love and appreciation.', 525000, 15, 'Roses', '/images/bouquets/IMG-20251231-WA0013 (1).jpg', false),
    ('Eternal White', 'Pure white roses in an elegant box arrangement. Symbol of purity, innocence, and new beginnings.', 712500, 10, 'Mixed Bouquets', '/images/bouquets/IMG-20251231-WA0017.jpg', true),
    ('Sunset Peach', 'Delicate peach tones with fresh eucalyptus leaves. Warm and inviting arrangement for any occasion.', 476000, 25, 'Mixed Bouquets', '/images/bouquets/IMG-20251231-WA0016.jpg', false),
    ('Royal Purple Majesty', 'Luxurious purple roses with elegant golden accents. A premium choice for special celebrations.', 850000, 8, 'Premium', '/images/bouquets/IMG20251213170623.jpg', true),
    ('Garden Symphony', 'A harmonious blend of seasonal flowers in pastel colors. Fresh from the garden to your doorstep.', 450000, 30, 'Mixed Bouquets', '/images/bouquets/IMG20251224202736.jpg', false),
    ('Birthday Bloom Box', 'Colorful celebration flowers in a stylish box. Perfect birthday surprise for your loved ones.', 550000, 18, 'Birthday', '/images/bouquets/IMG20251217142845.jpg', true),
    ('Anniversary Love', 'Red and white roses symbolizing eternal love. The perfect gift to celebrate years of togetherness.', 680000, 12, 'Anniversary', '/images/bouquets/IMG-20251231-WA0014.jpg', false);

-- =====================================================
-- 9. ADMIN USER ACCOUNT
-- =====================================================
-- Create admin user for dashboard access
-- Email: lyana@luxebloom.com
-- Password: Lyana123!

-- First, check if user already exists and create if not
DO $$
DECLARE
    new_user_id UUID;
BEGIN
    -- Check if user already exists
    SELECT id INTO new_user_id FROM auth.users WHERE email = 'lyana@luxebloom.com';
    
    -- If user doesn't exist, create one
    IF new_user_id IS NULL THEN
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            raw_app_meta_data,
            raw_user_meta_data,
            is_super_admin,
            created_at,
            updated_at
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'lyana@luxebloom.com',
            crypt('Lyana123!', gen_salt('bf')),
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"name": "Lyana Admin", "role": "admin"}',
            FALSE,
            NOW(),
            NOW()
        )
        RETURNING id INTO new_user_id;
        
        -- Create identity for the new user
        INSERT INTO auth.identities (
            id,
            user_id,
            identity_data,
            provider,
            provider_id,
            last_sign_in_at,
            created_at,
            updated_at
        ) VALUES (
            gen_random_uuid(),
            new_user_id,
            jsonb_build_object('sub', new_user_id::text, 'email', 'lyana@luxebloom.com'),
            'email',
            new_user_id::text,
            NOW(),
            NOW(),
            NOW()
        );
        
        RAISE NOTICE 'Admin user created successfully!';
    ELSE
        RAISE NOTICE 'Admin user already exists, skipping...';
    END IF;
END $$;

-- =====================================================
-- DONE! Your database is ready.
-- =====================================================
-- All tables, storage buckets, sample data, and admin user have been created.
-- 
-- Admin Login:
-- Email: lyana@luxebloom.com
-- Password: Lyana123!
-- =====================================================
