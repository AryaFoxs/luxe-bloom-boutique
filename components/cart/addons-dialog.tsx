"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShoppingBag, Plus, Minus, Check, Gift } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface Addon {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface BouquetItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

const addons: Addon[] = [
  {
    id: "chocolate-ferrero",
    name: "Ferrero Rocher Box",
    price: 150000,
    image: "/images/addons/chocolate.jpg",
    description: "16 pcs premium chocolate",
  },
  {
    id: "teddy-bear",
    name: "Teddy Bear",
    price: 200000,
    image: "/images/addons/teddy.jpg",
    description: "Soft plush teddy bear 30cm",
  },
  {
    id: "greeting-card",
    name: "Premium Card",
    price: 50000,
    image: "/images/addons/card.jpg",
    description: "Handwritten message card",
  },
  {
    id: "balloon",
    name: "Helium Balloon",
    price: 75000,
    image: "/images/addons/balloon.jpg",
    description: "Heart-shaped foil balloon",
  },
  {
    id: "chocolate-box",
    name: "Chocolate Truffle",
    price: 120000,
    image: "/images/addons/truffle.jpg",
    description: "Artisan chocolate truffles",
  },
  {
    id: "candle",
    name: "Scented Candle",
    price: 180000,
    image: "/images/addons/candle.jpg",
    description: "Luxury rose-scented candle",
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

interface AddonsDialogProps {
  bouquet: BouquetItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AddonsDialog({ bouquet, isOpen, onClose }: AddonsDialogProps) {
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>({});
  const { addItem, addBundleItem } = useCart();

  if (!bouquet) return null;

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => {
      if (prev[addonId]) {
        const { [addonId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [addonId]: 1 };
    });
  };

  const updateAddonQuantity = (addonId: string, delta: number) => {
    setSelectedAddons((prev) => {
      const current = prev[addonId] || 0;
      const newQty = current + delta;
      if (newQty <= 0) {
        const { [addonId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [addonId]: newQty };
    });
  };

  const selectedAddonsList = addons.filter((addon) => selectedAddons[addon.id]);
  const addonsTotal = selectedAddonsList.reduce(
    (sum, addon) => sum + addon.price * (selectedAddons[addon.id] || 0),
    0
  );
  const grandTotal = bouquet.price + addonsTotal;

  const handleAddToCart = () => {
    // Create addons array for bundle
    const bundleAddons = selectedAddonsList.map((addon) => ({
      id: addon.id,
      name: addon.name,
      price: addon.price,
      quantity: selectedAddons[addon.id] || 1,
    }));

    // Add as bundle
    addBundleItem(
      {
        id: bouquet.id,
        name: bouquet.name,
        price: bouquet.price,
        image: bouquet.image,
      },
      bundleAddons
    );

    // Reset and close
    setSelectedAddons({});
    onClose();
  };

  const handleSkip = () => {
    addItem({
      id: bouquet.id,
      name: bouquet.name,
      price: bouquet.price,
      image: bouquet.image,
    });
    setSelectedAddons({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-2">
            <Gift className="w-6 h-6 text-rose" />
            Make it Extra Special
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Add something extra to your {bouquet.name} bouquet
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {addons.map((addon) => {
              const isSelected = !!selectedAddons[addon.id];
              const quantity = selectedAddons[addon.id] || 0;

              return (
                <div
                  key={addon.id}
                  className={`relative rounded-xl border-2 overflow-hidden transition-all cursor-pointer ${
                    isSelected
                      ? "border-rose bg-rose/5"
                      : "border-gray-100 hover:border-rose/30"
                  }`}
                  onClick={() => !isSelected && toggleAddon(addon.id)}
                >
                  {/* Check mark */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-rose text-white rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  )}

                  {/* Image placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-rose/10 to-gold/10 flex items-center justify-center">
                    <Gift className="w-10 h-10 text-rose/40" />
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {addon.name}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {addon.description}
                    </p>
                    <p className="text-rose font-semibold text-sm mt-1">
                      +{formatPrice(addon.price)}
                    </p>

                    {/* Quantity controls */}
                    {isSelected && (
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateAddonQuantity(addon.id, -1);
                          }}
                          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-medium text-sm">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateAddonQuantity(addon.id, 1);
                          }}
                          className="w-7 h-7 rounded-full bg-rose/10 hover:bg-rose/20 text-rose flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-4 space-y-3">
          {/* Summary */}
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{bouquet.name}</span>
              <span>{formatPrice(bouquet.price)}</span>
            </div>
            {selectedAddonsList.map((addon) => (
              <div key={addon.id} className="flex justify-between text-muted-foreground">
                <span>
                  {addon.name} x{selectedAddons[addon.id]}
                </span>
                <span>{formatPrice(addon.price * (selectedAddons[addon.id] || 0))}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-base pt-2 border-t">
              <span>Total</span>
              <span className="text-rose">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1 rounded-full py-5"
            >
              Skip Add-ons
            </Button>
            <Button
              onClick={handleAddToCart}
              className="flex-1 rounded-full bg-rose hover:bg-rose-dark text-white py-5"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
