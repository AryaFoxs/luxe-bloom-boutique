"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingBag, Sparkles, Loader2 } from "lucide-react";
import { AddonsDialog } from "@/components/cart";
import { createClient } from "@/lib/supabase/client";

interface Bouquet {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  discount?: number;
}

// List of product names to show in Signature Bouquets section
const SIGNATURE_BOUQUET_NAMES = [
  "Petal Blush",
  "Mystic Purple",
  "Imperial Pink",
  "Midnight Blue",
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function calculateDiscount(price: number, originalPrice: number | null | undefined): number | undefined {
  if (!originalPrice || originalPrice <= price) return undefined;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

function SaleProductCard({
  bouquet,
  onAddToCart,
}: {
  bouquet: Bouquet;
  onAddToCart: (bouquet: Bouquet) => void;
}) {
  return (
    <Card className="group relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Sale Badge */}
      {bouquet.discount && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          SALE {bouquet.discount}%
        </div>
      )}

      {/* Wishlist Button */}
      <button
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-rose hover:text-white shadow-lg"
        aria-label="Add to wishlist"
      >
        <Heart className="w-5 h-5" />
      </button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={bouquet.image}
          alt={bouquet.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/20 transition-colors duration-300" />
      </div>

      <CardContent className="p-5">
        {/* Title */}
        <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-rose transition-colors mb-1">
          {bouquet.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-rose font-bold text-lg">
            {formatPrice(bouquet.price)}
          </span>
          {bouquet.originalPrice && bouquet.originalPrice > bouquet.price && (
            <span className="text-muted-foreground text-sm line-through">
              {formatPrice(bouquet.originalPrice)}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {bouquet.description}
        </p>

        {/* Add to Cart */}
        <Button
          size="sm"
          className="w-full rounded-full bg-rose hover:bg-rose-dark text-white transition-all duration-300"
          onClick={() => onAddToCart(bouquet)}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export function OnSaleSection() {
  const [addonsBouquet, setAddonsBouquet] = useState<Bouquet | null>(null);
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase
  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .in("name", SIGNATURE_BOUQUET_NAMES);

        if (error) {
          console.error("Error fetching products:", error);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          // Convert Supabase products to Bouquet format
          const supabaseProducts: Bouquet[] = data.map(
            (product: {
              id: string;
              name: string;
              description?: string;
              price: number;
              original_price?: number | null;
              image_url?: string;
            }) => ({
              id: product.id,
              name: product.name,
              description: product.description || "",
              price: product.price,
              originalPrice: product.original_price || null,
              image: product.image_url || "/images/placeholder.jpg",
              discount: calculateDiscount(product.price, product.original_price),
            })
          );

          // Sort by the order defined in SIGNATURE_BOUQUET_NAMES
          const sortedProducts = supabaseProducts.sort((a, b) => {
            const indexA = SIGNATURE_BOUQUET_NAMES.indexOf(a.name);
            const indexB = SIGNATURE_BOUQUET_NAMES.indexOf(b.name);
            return indexA - indexB;
          });

          setBouquets(sortedProducts);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = (bouquet: Bouquet) => {
    setAddonsBouquet(bouquet);
  };

  return (
    <section id="on-sale" className="py-20 lg:py-28 bg-gradient-to-b from-cream to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-red-500 text-sm font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4" />
            On Sale
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Signature{" "}
            <span className="text-rose">Bouquets</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Limited time offers on our most beloved arrangements. 
            Fresh flowers at exceptional prices—grab yours before they&apos;re gone!
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-rose" />
          </div>
        ) : bouquets.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No signature bouquets available at the moment.</p>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bouquets.map((bouquet) => (
              <SaleProductCard
                key={bouquet.id}
                bouquet={bouquet}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add-ons Dialog */}
      <AddonsDialog
        bouquet={addonsBouquet}
        isOpen={!!addonsBouquet}
        onClose={() => setAddonsBouquet(null)}
      />
    </section>
  );
}
