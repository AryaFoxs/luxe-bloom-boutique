"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, ShoppingBag, Search, Filter, X, ChevronDown, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { AddonsDialog } from "@/components/cart";
import { createClient } from "@/lib/supabase/client";

interface Bouquet {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  category: string;
  isPromo?: boolean;
}

const categories = ["All", "Bouquets", "Premium", "Box"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under Rp 700K", min: 0, max: 700000 },
  { label: "Rp 700K - 1M", min: 700000, max: 1000000 },
  { label: "Rp 1M - 2M", min: 1000000, max: 2000000 },
  { label: "Above Rp 2M", min: 2000000, max: Infinity },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function BouquetsPage() {
  const [allBouquets, setAllBouquets] = useState<Bouquet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBouquet, setSelectedBouquet] = useState<Bouquet | null>(null);
  const [addonsBouquet, setAddonsBouquet] = useState<Bouquet | null>(null);

  // Fetch products from Supabase
  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("price", { ascending: true });

        if (error) {
          console.error("Error fetching products:", error);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          // Convert Supabase products to Bouquet format, filter out hidden products
          const supabaseProducts: Bouquet[] = data
            .filter((product: { is_hidden?: boolean }) => !product.is_hidden)
            .map((product: { id: string; name: string; description?: string; price: number; original_price?: number | null; image_url?: string; category?: string; is_promo?: boolean }) => ({
              id: product.id,
              name: product.name,
              description: product.description || "",
              price: product.price,
              originalPrice: product.original_price || null,
              image: product.image_url || "/images/placeholder.jpg",
              category: product.category || "Bouquets",
              isPromo: product.is_promo || false,
            }));

          // Set products from Supabase
          setAllBouquets(supabaseProducts);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredBouquets = allBouquets.filter((bouquet) => {
    const matchesSearch = bouquet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bouquet.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || bouquet.category === selectedCategory;
    const priceRange = priceRanges[selectedPriceRange];
    const matchesPrice = bouquet.price >= priceRange.min && bouquet.price <= priceRange.max;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleAddToCart = (bouquet: Bouquet) => {
    setAddonsBouquet(bouquet);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-burgundy via-rose-dark to-burgundy pt-32 pb-16">
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-[url('/images/bouquets/IMG20251222164127.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/80 to-burgundy/95" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
              Our Collection
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4">
              Bouquet Collection
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Explore our handcrafted bouquets, each made with premium fresh flowers 
              and designed to capture every emotion and occasion.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search bouquets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 rounded-full bg-white"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden rounded-full"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <div className="hidden md:flex gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full ${
                  selectedCategory === cat ? "bg-rose hover:bg-rose-dark text-white" : ""
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="md:hidden bg-white rounded-2xl p-4 mb-6 space-y-4">
            <div>
              <p className="font-medium mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full ${
                      selectedCategory === cat ? "bg-rose hover:bg-rose-dark text-white" : ""
                    }`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Price Range</p>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range, idx) => (
                  <Button
                    key={range.label}
                    variant={selectedPriceRange === idx ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPriceRange(idx)}
                    className={`rounded-full ${
                      selectedPriceRange === idx ? "bg-rose hover:bg-rose-dark text-white" : ""
                    }`}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          Showing {filteredBouquets.length} bouquets
        </p>

        {/* Bouquet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBouquets.map((bouquet) => (
            <Card
              key={bouquet.id}
              className="group relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {bouquet.isPromo && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gold text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg">
                  Promo
                </div>
              )}
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-rose hover:text-white shadow-lg"
                aria-label="Add to wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>
              <div
                className="relative aspect-square overflow-hidden bg-muted cursor-pointer"
                onClick={() => setSelectedBouquet(bouquet)}
              >
                <Image
                  src={bouquet.image}
                  alt={bouquet.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <CardContent className="p-5">
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
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {bouquet.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-full border-rose/30 text-rose hover:bg-rose hover:text-white hover:border-rose"
                    onClick={() => setSelectedBouquet(bouquet)}
                  >
                    See Details
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full bg-rose hover:bg-rose-dark text-white px-4"
                    onClick={() => handleAddToCart(bouquet)}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBouquets.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No bouquets found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4 rounded-full"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedPriceRange(0);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Bouquet Detail Dialog */}
      <Dialog open={!!selectedBouquet} onOpenChange={() => setSelectedBouquet(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden bg-white">
          {selectedBouquet && (
            <div className="grid md:grid-cols-2 gap-0 max-h-[90vh] overflow-y-auto">
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[200px] md:min-h-[400px] bg-muted">
                <Image
                  src={selectedBouquet.image}
                  alt={selectedBouquet.name}
                  fill
                  className="object-cover"
                />
                {selectedBouquet.isPromo && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-gold text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg">
                    Promo
                  </div>
                )}
              </div>
              <div className="p-5 md:p-8 flex flex-col">
                <DialogHeader className="mb-3">
                  <DialogTitle className="font-serif text-xl md:text-3xl font-semibold text-foreground">
                    {selectedBouquet.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-1 space-y-4">
                  <div className="inline-block px-4 py-2 bg-rose/10 rounded-full">
                    {selectedBouquet.originalPrice && selectedBouquet.originalPrice > selectedBouquet.price ? (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm line-through">
                          {formatPrice(selectedBouquet.originalPrice)}
                        </span>
                        <span className="text-rose font-semibold text-lg">
                          {formatPrice(selectedBouquet.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-rose font-semibold text-lg">
                        {formatPrice(selectedBouquet.price)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                      Description
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {selectedBouquet.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                      Includes
                    </h4>
                    <ul className="space-y-1.5 text-muted-foreground text-xs">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-rose rounded-full" />
                        Premium fresh flowers
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-rose rounded-full" />
                        Elegant wrapping
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-rose rounded-full" />
                        Personalized message card
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-rose rounded-full" />
                        Same-day delivery available
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                  <Button
                    className="flex-1 rounded-full bg-rose hover:bg-rose-dark text-white py-5"
                    onClick={() => {
                      handleAddToCart(selectedBouquet);
                      setSelectedBouquet(null);
                    }}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10 border-rose/30 text-rose hover:bg-rose hover:text-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add-ons Dialog */}
      <AddonsDialog
        bouquet={addonsBouquet}
        isOpen={!!addonsBouquet}
        onClose={() => setAddonsBouquet(null)}
      />
    </div>
  );
}
