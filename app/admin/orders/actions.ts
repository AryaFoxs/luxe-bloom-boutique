"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
  addons?: { name: string; price: number }[];
}

export interface Order {
  id?: string;
  order_number: string;
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  customer_address?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// Generate unique order number
function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `ORD-${year}${month}${day}-${random}`;
}

export async function getOrders() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching orders:", error);
      return { error: error.message, data: [] };
    }
    
    return { data: data || [] };
  } catch (err) {
    console.error("Server action error:", err);
    return { error: "An unexpected error occurred.", data: [] };
  }
}

export async function getOrder(id: string) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) {
      return { error: error.message };
    }
    
    return { data };
  } catch (err) {
    console.error("Server action error:", err);
    return { error: "An unexpected error occurred." };
  }
}

export async function createOrder(orderData: {
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  customer_address?: string;
  items: OrderItem[];
  subtotal: number;
  discount?: number;
  total: number;
  notes?: string;
}) {
  try {
    const supabase = await createClient();
    
    const order_number = generateOrderNumber();
    
    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_number,
        customer_name: orderData.customer_name,
        customer_phone: orderData.customer_phone || null,
        customer_email: orderData.customer_email || null,
        customer_address: orderData.customer_address || null,
        items: orderData.items,
        subtotal: orderData.subtotal,
        discount: orderData.discount || 0,
        total: orderData.total,
        status: "pending",
        notes: orderData.notes || null,
      })
      .select()
      .single();
    
    if (error) {
      console.error("Create order error:", error);
      return { error: error.message };
    }
    
    revalidatePath("/admin/orders");
    return { data };
  } catch (err) {
    console.error("Server action error:", err);
    return { error: "An unexpected error occurred." };
  }
}

export async function updateOrder(id: string, orderData: Partial<Order>) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("orders")
      .update({
        ...orderData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Update order error:", error);
      return { error: error.message };
    }
    
    revalidatePath("/admin/orders");
    return { data };
  } catch (err) {
    console.error("Server action error:", err);
    return { error: "An unexpected error occurred." };
  }
}

export async function updateOrderStatus(id: string, status: Order["status"]) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("orders")
      .update({ 
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Update status error:", error);
      return { error: error.message };
    }
    
    revalidatePath("/admin/orders");
    return { data };
  } catch (err) {
    console.error("Server action error:", err);
    return { error: "An unexpected error occurred." };
  }
}

export async function deleteOrder(id: string) {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", id);
    
    if (error) {
      console.error("Delete order error:", error);
      return { error: error.message };
    }
    
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (err) {
    console.error("Server action error:", err);
    return { error: "An unexpected error occurred." };
  }
}
