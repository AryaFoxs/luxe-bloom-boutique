"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, Heart, ShoppingBag, Loader2 } from "lucide-react";
import { AddonsDialog } from "@/components/cart";
import { createClient } from "@/lib/supabase/client";

interface Bouquet {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  isPromo?: boolean;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function BouquetCard({ 
  bouquet, 
  onViewDetails,
  onAddToCart,
}: { 
  bouquet: Bouquet;
  onViewDetails: (bouquet: Bouquet) => void;
  onAddToCart: (bouquet: Bouquet) => void;
}) {
  return (
    <Card className="group relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Promo Badge */}
      {bouquet.isPromo && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gold text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg">
          Promo
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
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/20 transition-colors duration-300" />
      </div>

      <CardContent className="p-5">
        {/* Title & Price */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-rose transition-colors">
            {bouquet.name}
          </h3>
          <div className="text-right">
            {bouquet.originalPrice && bouquet.originalPrice > bouquet.price ? (
              <>
                <span className="text-muted-foreground text-xs line-through block">
                  {formatPrice(bouquet.originalPrice)}
                </span>
                <span className="text-rose font-semibold text-sm">
                  {formatPrice(bouquet.price)}
                </span>
              </>
            ) : (
              <span className="text-rose font-semibold text-sm whitespace-nowrap">
                {formatPrice(bouquet.price)}
              </span>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {bouquet.description}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 rounded-full border-rose/30 text-rose hover:bg-rose hover:text-white hover:border-rose transition-all duration-300"
            onClick={() => onViewDetails(bouquet)}
          >
            See Details
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-rose hover:bg-rose-dark text-white px-4 transition-all duration-300"
            aria-label="Add to cart"
            onClick={() => onAddToCart(bouquet)}
          >
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function BouquetDetailDialog({
  bouquet,
  isOpen,
  onClose,
  onAddToCart,
}: {
  bouquet: Bouquet | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (bouquet: Bouquet) => void;
}) {
  if (!bouquet) return null;


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden bg-white">
        <div className="grid md:grid-cols-2 gap-0 max-h-[90vh] overflow-y-auto">
          {/* Image Section */}
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[200px] md:min-h-[400px] bg-muted">
            <Image
              src={bouquet.image}
              alt={bouquet.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {bouquet.isPromo && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-gold text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg">
                Promo
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-5 md:p-8 flex flex-col">
            <DialogHeader className="mb-3 md:mb-4">
              <DialogTitle className="font-serif text-xl md:text-3xl font-semibold text-foreground">
                {bouquet.name}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 space-y-4 md:space-y-6">
              {/* Price */}
              <div className="inline-block px-4 py-2 bg-rose/10 rounded-full">
                {bouquet.originalPrice && bouquet.originalPrice > bouquet.price ? (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm line-through">
                      {formatPrice(bouquet.originalPrice)}
                    </span>
                    <span className="text-rose font-semibold text-lg md:text-xl">
                      {formatPrice(bouquet.price)}
                    </span>
                  </div>
                ) : (
                  <span className="text-rose font-semibold text-lg md:text-xl">
                    {formatPrice(bouquet.price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
                  Description
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {bouquet.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider mb-2 md:mb-3">
                  Includes
                </h4>
                <ul className="space-y-1.5 md:space-y-2 text-muted-foreground text-xs md:text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-rose rounded-full flex-shrink-0" />
                    Premium fresh flowers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-rose rounded-full flex-shrink-0" />
                    Elegant wrapping
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-rose rounded-full flex-shrink-0" />
                    Personalized message card
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-rose rounded-full flex-shrink-0" />
                    Same-day delivery available
                  </li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
              <Button
                className="flex-1 rounded-full bg-rose hover:bg-rose-dark text-white py-5 md:py-6 text-sm md:text-base transition-all duration-300"
                onClick={() => {
                  onAddToCart(bouquet);
                  onClose();
                }}
              >
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10 md:w-12 md:h-12 border-rose/30 text-rose hover:bg-rose hover:text-white transition-all duration-300"
                aria-label="Add to wishlist"
              >
                <Heart className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function FeaturedBouquets() {
  const [selectedBouquet, setSelectedBouquet] = useState<Bouquet | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addonsBouquet, setAddonsBouquet] = useState<Bouquet | null>(null);
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase - get 6 random products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_hidden", false)
          .order("created_at", { ascending: false })
          .limit(12);

        if (error) {
          console.error("Error fetching products:", error);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          const supabaseProducts: Bouquet[] = data.map(
            (product: {
              id: string;
              name: string;
              description?: string;
              price: number;
              original_price?: number | null;
              image_url?: string;
              is_promo?: boolean;
            }) => ({
              id: product.id,
              name: product.name,
              description: product.description || "",
              price: product.price,
              originalPrice: product.original_price || null,
              image: product.image_url || "/images/placeholder.jpg",
              isPromo: product.is_promo || false,
            })
          );

          setBouquets(supabaseProducts);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleViewDetails = (bouquet: Bouquet) => {
    setSelectedBouquet(bouquet);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedBouquet(null);
  };

  const handleAddToCart = (bouquet: Bouquet) => {
    setAddonsBouquet(bouquet);
  };

  return (
    <section id="bouquets" className="py-20 lg:py-28 bg-gradient-to-b from-cream to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-rose text-sm font-medium uppercase tracking-widest mb-4">
            Featured Products
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Curated{" "}
            <span className="text-rose">Collection</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Handpicked by our expert florists, these fresh bouquets are perfect for any occasion. 
            Same-day delivery or pickup from our boutique available.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-rose" />
          </div>
        ) : bouquets.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products available at the moment.</p>
          </div>
        ) : (
          /* Bouquet Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bouquets.map((bouquet) => (
              <BouquetCard 
                key={bouquet.id} 
                bouquet={bouquet} 
                onViewDetails={handleViewDetails}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-14">
          <Button
            asChild
            size="lg"
            className="rounded-full px-10 py-6 bg-rose hover:bg-rose-dark text-white shadow-xl hover:shadow-rose/30 transition-all duration-300 group"
          >
            <Link href="/bouquets">
              Discover Our Entire Collection
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Bouquet Detail Dialog */}
      <BouquetDetailDialog
        bouquet={selectedBouquet}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAddToCart={handleAddToCart}
      />

      {/* Add-ons Dialog */}
      <AddonsDialog
        bouquet={addonsBouquet}
        isOpen={!!addonsBouquet}
        onClose={() => setAddonsBouquet(null)}
      />
    </section>
  );
}
