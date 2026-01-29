"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface Addon {
  id?: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_active?: boolean;
  created_at?: string;
}

export async function getAddons() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("addons")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("Error fetching addons:", error);
    return { error: error.message, data: [] };
  }
  
  return { data: data || [] };
}

export async function addAddon(formData: FormData) {
  try {
    const supabase = await createClient();
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const imageFile = formData.get("image") as File;
    
    if (!name || isNaN(price)) {
      return { error: "Please fill in all required fields." };
    }
    
    let image_url = "/images/placeholder.jpg";
    
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
      
      image_url = urlData.publicUrl;
    }
    
    const { data, error } = await supabase
      .from("addons")
      .insert({
        name,
        description,
        price,
        image_url,
      })
      .select()
      .single();
    
    if (error) {
      console.error("Database error:", error);
      return { error: `Database error: ${error.message}` };
    }
    
    revalidatePath("/admin/addons");
    return { data };
  } catch (err) {
    console.error("Server action error:", err);
    return { error: err instanceof Error ? err.message : "An unexpected error occurred." };
  }
}

export async function updateAddon(formData: FormData) {
  try {
    const supabase = await createClient();
    
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const imageFile = formData.get("image") as File;
    
    if (!id || !name || isNaN(price)) {
      return { error: "Please fill in all required fields." };
    }
    
    let updateData: Record<string, any> = {
      name,
      description,
      price,
    };
    
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
      .from("addons")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Database error:", error);
      return { error: `Database error: ${error.message}` };
    }
    
    revalidatePath("/admin/addons");
    return { data };
  } catch (err) {
    console.error("Server action error:", err);
    return { error: err instanceof Error ? err.message : "An unexpected error occurred." };
  }
}

export async function deleteAddon(id: string) {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from("addons")
      .delete()
      .eq("id", id);
    
    if (error) {
      console.error("Delete error:", error);
      return { error: error.message };
    }
    
    revalidatePath("/admin/addons");
    return { success: true };
  } catch (err) {
    console.error("Server action error:", err);
    return { error: err instanceof Error ? err.message : "An unexpected error occurred." };
  }
}

export async function toggleAddonStatus(id: string, isActive: boolean) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("addons")
      .update({ is_active: isActive })
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Toggle status error:", error);
      return { error: error.message };
    }
    
    revalidatePath("/admin/addons");
    return { data };
  } catch (err) {
    console.error("Server action error:", err);
    return { error: err instanceof Error ? err.message : "An unexpected error occurred." };
  }
}
