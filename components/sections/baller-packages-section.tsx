"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingBag, Crown, Loader2 } from "lucide-react";
import { AddonsDialog } from "@/components/cart";
import { formatPrice } from "@/lib/format";
import { GRAND_GESTURE_NAMES, DEFAULT_PACKAGE_INCLUDES } from "@/lib/constants";
import { getProductsByNames, type Product } from "@/lib/services/products";

function PackageCard({
  pkg,
  onAddToCart,
}: {
  pkg: Product;
  onAddToCart: (pkg: Product) => void;
}) {
  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-burgundy to-burgundy/90 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
      {/* Premium Badge */}
      <div className="absolute top-4 left-4 z-10 px-4 py-1 bg-gold text-burgundy text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1">
        <Crown className="w-3 h-3" />
        Grand Gesture
      </div>


      {/* Wishlist Button */}
      <button
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:text-burgundy text-white shadow-lg"
        aria-label="Add to wishlist"
      >
        <Heart className="w-5 h-5" />
      </button>

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy via-transparent to-transparent" />
      </div>

      <CardContent className="p-6 text-white relative">
        {/* Title & Price */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-serif text-2xl font-semibold text-white group-hover:text-gold transition-colors">
            {pkg.name}
          </h3>
          <span className="text-gold font-bold text-xl whitespace-nowrap">
            {formatPrice(pkg.price)}
          </span>
        </div>

        {/* Description */}
        <p className="text-cream/80 text-sm leading-relaxed mb-4">
          {pkg.description}
        </p>

        {/* Includes */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">Includes:</h4>
          <ul className="space-y-1">
            {DEFAULT_PACKAGE_INCLUDES.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-cream/80 text-sm">
                <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Add to Cart */}
        <Button
          size="lg"
          className="w-full rounded-full bg-gold hover:bg-gold/90 text-burgundy font-semibold transition-all duration-300"
          onClick={() => onAddToCart(pkg)}
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Order Now
        </Button>
      </CardContent>
    </Card>
  );
}

export function BallerPackagesSection() {
  const [addonsPkg, setAddonsPkg] = useState<Product | null>(null);
  const [packages, setPackages] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProductsByNames(GRAND_GESTURE_NAMES);
        
        // Sort by the order defined in GRAND_GESTURE_NAMES
        const sortedProducts = data.sort((a, b) => {
          const indexA = GRAND_GESTURE_NAMES.indexOf(a.name);
          const indexB = GRAND_GESTURE_NAMES.indexOf(b.name);
          return indexA - indexB;
        });

        setPackages(sortedProducts);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = (pkg: Product) => {
    setAddonsPkg(pkg);
  };


  return (
    <section id="baller-packages" className="py-12 lg:py-20 bg-gradient-to-b from-cream to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-gold text-sm font-bold uppercase tracking-widest mb-4">
            <Crown className="w-4 h-4" />
            Baller Packages
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Grand{" "}
            <span className="text-rose">Gestures</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            For when ordinary just won&apos;t do. Our premium packages make statements 
            that leave lasting impressions. Perfect for proposals, anniversaries, 
            and moments that matter.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No grand gesture packages available at the moment.</p>
          </div>
        ) : (
          /* Package Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add-ons Dialog */}
      <AddonsDialog
        bouquet={addonsPkg}
        isOpen={!!addonsPkg}
        onClose={() => setAddonsPkg(null)}
      />
    </section>
  );
}
