"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  original_price?: number | null;
  category: string;
  image_url: string;
  is_promo?: boolean;
  is_hidden?: boolean;
  created_at?: string;
}

export async function addProduct(formData: FormData) {
  try {
    const supabase = await createClient();
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const original_price_str = formData.get("original_price") as string;
    const original_price = original_price_str ? parseInt(original_price_str) : null;
    const category = formData.get("category") as string;
    const is_promo = formData.get("is_promo") === "true";
    const imageFile = formData.get("image") as File;
    
    // Validate required fields
    if (!name || !description || !price || !category) {
      return { error: "Please fill in all required fields." };
    }
    
    let image_url = "/images/placeholder.jpg";
    
    // Upload image to Supabase Storage if provided
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, imageFile);
      
      if (uploadError) {
        console.error("Upload error:", uploadError);
        return { error: `Image upload failed: ${uploadError.message}. Make sure 'products' storage bucket exists in Supabase.` };
      }
      
      const { data: urlData } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);
      
      image_url = urlData.publicUrl;
    }
    
    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        description,
        price,
        original_price,
        category,
        image_url,
        is_promo,
      })
      .select()
      .single();
    
    if (error) {
      console.error("Database error:", error);
      return { error: `Database error: ${error.message}. Make sure 'products' table exists in Supabase.` };
    }
    
    revalidatePath("/admin/products");
    return { data };
  } catch (err) {
    console.error("Server action error:", err);
    return { error: err instanceof Error ? err.message : "An unexpected error occurred." };
  }
}

export async function getProducts() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) {
    return { error: error.message, data: [] };
  }
  
  return { data: data || [] };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  
  if (error) {
    return { error: error.message };
  }
  
  revalidatePath("/admin/products");
  return { success: true };
}

export async function updateProduct(formData: FormData) {
  try {
    const supabase = await createClient();
    
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const original_price_str = formData.get("original_price") as string;
    const original_price = original_price_str ? parseInt(original_price_str) : null;
    const category = formData.get("category") as string;
    const is_promo = formData.get("is_promo") === "true";
    const imageFile = formData.get("image") as File;
    
    // Validate required fields
    if (!id || !name || !description || !price || !category) {
      return { error: "Please fill in all required fields." };
    }
    
    let updateData: Record<string, unknown> = {
      name,
      description,
      price,
      original_price,
      category,
      is_promo,
    };
    
    // Upload new image if provided
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, imageFile);
      
      if (uploadError) {
        console.error("Upload error:", uploadError);
        return { error: `Image upload failed: ${uploadError.message}` };
      }
      
      const { data: urlData } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);
      
      updateData.image_url = urlData.publicUrl;
    }
    
    const { data, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Database error:", error);
      return { error: `Database error: ${error.message}` };
    }
    
    revalidatePath("/admin/products");
    return { data };
  } catch (err) {
    console.error("Server action error:", err);
    return { error: err instanceof Error ? err.message : "An unexpected error occurred." };
  }
}

export async function toggleProductVisibility(id: string, isHidden: boolean) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("products")
      .update({ is_hidden: isHidden })
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Toggle visibility error:", error);
      return { error: error.message };
    }
    
    revalidatePath("/admin/products");
    return { data };
  } catch (err) {
    console.error("Server action error:", err);
    return { error: err instanceof Error ? err.message : "An unexpected error occurred." };
  }
}
