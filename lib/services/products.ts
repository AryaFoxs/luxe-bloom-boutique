import { createClient } from "@/lib/supabase/client";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  category: string;
  isPromo?: boolean;
  badge?: string | null;
}

const supabase = createClient();

/**
 * Normalizes a string for consistent comparison
 */
const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();

/**
 * Fetch products by their names
 */
export async function getProductsByNames(names: string[]): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order('name');

  if (error) {
    console.error("Error fetching products by names:", error);
    return [];
  }

  if (!data) return [];

  const normalizedTargets = names.map(normalize);
  
  const matchedData = data.filter((item: any) => 
    normalizedTargets.includes(normalize(item.name))
  );

  return matchedData.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description || "",
    price: p.price,
    originalPrice: p.original_price || null,
    image: p.image_url || "/images/placeholder.jpg",
    category: p.category,
    isPromo: p.is_promo || false,
    badge: p.badge || (p.is_new ? "New" : null)
  }));
}

/**
 * Fetch products by category with optional limit
 */
export async function getProductsByCategory(category?: string, limit: number = 8): Promise<Product[]> {
  let query = supabase
    .from("products")
    .select("*")
    .eq("is_hidden", false)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }

  return (data || []).map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description || "",
    price: p.price,
    originalPrice: p.original_price || null,
    image: p.image_url || "/images/placeholder.jpg",
    category: p.category,
    isPromo: p.is_promo || false,
    badge: p.badge || (p.is_new ? "New" : null)
  }));
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isActive: boolean;
}

/**
 * Fetch all active addons
 */
export async function getActiveAddons(): Promise<Addon[]> {
  const { data, error } = await supabase
    .from("addons")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching active addons:", error);
    return [];
  }

  return (data || []).map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description || "",
    price: a.price,
    image: a.image_url || "/images/placeholder.jpg",
    isActive: a.is_active,
  }));
}
