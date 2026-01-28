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
  DialogTitle 
} from "@/components/ui/dialog";
import { ArrowRight, Heart, ShoppingBag, Loader2 } from "lucide-react";
import { AddonsDialog } from "@/components/cart";
import { formatPrice } from "@/lib/format";
import { getProductsByCategory, type Product } from "@/lib/services/products";

function ProductCard({ 
  product, 
  onViewDetails,
  onAddToCart,
}: { 
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}) {
  return (
    <Card className="group relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {product.isPromo && (
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

      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/20 transition-colors duration-300" />
      </div>

      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-rose transition-colors">
            {product.name}
          </h3>
          <div className="text-right">
            {product.originalPrice && product.originalPrice > product.price ? (
              <>
                <span className="text-muted-foreground text-xs line-through block">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-rose font-semibold text-sm">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-rose font-semibold text-sm whitespace-nowrap">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 rounded-full border-rose/30 text-rose hover:bg-rose hover:text-white hover:border-rose transition-all duration-300"
            onClick={() => onViewDetails(product)}
          >
            See Details
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-rose hover:bg-rose-dark text-white px-4 transition-all duration-300"
            aria-label="Add to cart"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductCollectionSection({
  title,
  subtitle,
  description,
  category,
  limit = 8,
  id,
  showViewAll = true,
  viewAllHref = "/bouquets",
  viewAllText = "Discover Our Entire Collection"
}: {
  title: string;
  subtitle: string;
  description: string;
  category?: string;
  limit?: number;
  id?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
  viewAllText?: string;
}) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addonsProduct, setAddonsProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProductsByCategory(category, limit);
        setProducts(data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, limit]);


  return (
    <section id={id} className="py-12 lg:py-20 bg-white first:pt-20 last:pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-rose text-sm font-medium uppercase tracking-widest mb-4">
            {subtitle}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            {title.split(' ')[0]}{" "}
            <span className="text-rose">{title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-rose" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={setSelectedProduct}
                onAddToCart={setAddonsProduct}
              />
            ))}
          </div>
        )}

        {showViewAll && !loading && products.length > 0 && (
          <div className="text-center mt-14">
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 py-6 bg-rose hover:bg-rose-dark text-white shadow-xl hover:shadow-rose/30 transition-all duration-300 group"
            >
              <Link href={viewAllHref}>
                {viewAllText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Add-ons Dialog */}
      <AddonsDialog
        bouquet={addonsProduct as any}
        isOpen={!!addonsProduct}
        onClose={() => setAddonsProduct(null)}
      />

      {/* Detail Dialog would go here, omitting for brevity or using existing dialogs if possible */}
    </section>
  );
}
