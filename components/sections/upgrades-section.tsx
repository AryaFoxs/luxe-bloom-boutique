"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Wine, Candy, PartyPopper } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface Upgrade {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "chocolate" | "wine" | "balloon" | "teddy";
}

const upgrades: Upgrade[] = [
  {
    id: "premium-chocolate-box",
    name: "Premium Chocolate Box",
    description: "Exquisite Belgian chocolates in a luxury gift box",
    price: 350000,
    image: "/images/bouquets/IMG20251224202736.jpg",
    category: "chocolate",
  },
  {
    id: "red-wine-bottle",
    name: "Red Wine Bottle",
    description: "Premium imported red wine to complement your flowers",
    price: 650000,
    image: "/images/bouquets/IMG20251222164127.jpg",
    category: "wine",
  },
  {
    id: "balloon-bouquet",
    name: "Balloon Bouquet",
    description: "Colorful helium balloons for extra celebration",
    price: 150000,
    image: "/images/bouquets/IMG-20251226-WA0009.jpg",
    category: "balloon",
  },
  {
    id: "teddy-bear-large",
    name: "Giant Teddy Bear",
    description: "Soft and cuddly teddy bear, perfect for hugs",
    price: 450000,
    image: "/images/bouquets/IMG20251217151154.jpg",
    category: "teddy",
  },
];

const categoryIcons = {
  chocolate: Candy,
  wine: Wine,
  balloon: PartyPopper,
  teddy: "🧸",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function UpgradeCard({
  upgrade,
  onAddToCart,
}: {
  upgrade: Upgrade;
  onAddToCart: (upgrade: Upgrade) => void;
}) {
  const IconComponent = categoryIcons[upgrade.category];
  const isEmoji = typeof IconComponent === "string";

  return (
    <Card className="group relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gold/90 backdrop-blur-sm text-burgundy text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1">
        {isEmoji ? (
          <span>{IconComponent}</span>
        ) : (
          <IconComponent className="w-3 h-3" />
        )}
        {upgrade.category}
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={upgrade.image}
          alt={upgrade.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/20 transition-colors duration-300" />
      </div>

      <CardContent className="p-5">
        {/* Title */}
        <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-gold transition-colors mb-1">
          {upgrade.name}
        </h3>

        {/* Price */}
        <span className="text-gold font-bold text-lg mb-3 block">
          + {formatPrice(upgrade.price)}
        </span>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {upgrade.description}
        </p>

        {/* Add to Cart */}
        <Button
          size="sm"
          variant="outline"
          className="w-full rounded-full border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300"
          onClick={() => onAddToCart(upgrade)}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Add Upgrade
        </Button>
      </CardContent>
    </Card>
  );
}

export function UpgradesSection() {
  const { addItem } = useCart();

  const handleAddToCart = (upgrade: Upgrade) => {
    addItem({
      id: upgrade.id,
      name: upgrade.name,
      price: upgrade.price,
      image: upgrade.image,
    });
  };

  return (
    <section id="upgrades" className="py-20 lg:py-28 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-gold text-sm font-bold uppercase tracking-widest mb-4">
            Upgrades
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Make It Even{" "}
            <span className="text-gold">More Special</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Elevate your gift with our premium add-ons. From gourmet chocolates to fine wines, 
            balloons to cuddly teddy bears—create an unforgettable moment.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { name: "Chocolates", icon: Candy },
            { name: "Wine", icon: Wine },
            { name: "Balloons", icon: PartyPopper },
            { name: "Teddy Bears", emoji: "🧸" },
          ].map((cat) => (
            <div
              key={cat.name}
              className="flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-md text-foreground"
            >
              {cat.icon ? (
                <cat.icon className="w-4 h-4 text-gold" />
              ) : (
                <span>{cat.emoji}</span>
              )}
              <span className="text-sm font-medium">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {upgrades.map((upgrade) => (
            <UpgradeCard
              key={upgrade.id}
              upgrade={upgrade}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
