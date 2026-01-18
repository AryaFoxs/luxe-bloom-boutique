import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const roseProducts = [
  { 
    name: "Crimson Velvet", 
    description: "Deep red roses wrapped in luxury", 
    originalPrice: 850000,
    salePrice: 599000,
    discount: 30,
    image: "/images/bouquets/IMG-20251231-WA0014 (1).jpg",
    badge: "Best Seller"
  },
  { 
    name: "Blush Romance", 
    description: "Soft pink roses with baby's breath", 
    originalPrice: 750000,
    salePrice: 525000,
    discount: 30,
    image: "/images/bouquets/IMG-20251231-WA0013 (1).jpg",
    badge: null
  },
  { 
    name: "Eternal White", 
    description: "Pure white roses in elegant box", 
    originalPrice: 950000,
    salePrice: 712500,
    discount: 25,
    image: "/images/bouquets/IMG-20251231-WA0017.jpg",
    badge: "New"
  },
  { 
    name: "Sunset Peach", 
    description: "Delicate peach tones with eucalyptus", 
    originalPrice: 680000,
    salePrice: 476000,
    discount: 30,
    image: "/images/bouquets/IMG-20251231-WA0016.jpg",
    badge: null
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export function RoseCollection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-cream to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block text-rose text-sm font-medium uppercase tracking-[0.25em] mb-4 px-4 py-2 bg-rose/5 rounded-full">
            ✨ Romantic Picks
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
            Rose{" "}
            <span className="text-rose">Collection</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Roses, timeless messengers of affection, are perfect for any occasion 
            to show them just how much you care. Let their exquisite beauty 
            convey your deepest sentiments.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {roseProducts.map((product, index) => (
            <div
              key={product.name}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Discount Badge */}
                <div className="absolute top-3 right-3 bg-rose text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  -{product.discount}%
                </div>
                
                {/* Special Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-gold text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {product.badge}
                  </div>
                )}
                
                {/* Quick View Button - appears on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Button
                    asChild
                    size="sm"
                    className="bg-white text-rose hover:bg-rose hover:text-white rounded-full px-6 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                  >
                    <Link href="/shop/roses">
                      Quick View
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1 group-hover:text-rose transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-1">
                  {product.description}
                </p>
                
                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-muted-foreground text-sm line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-rose font-bold text-lg">
                    {formatPrice(product.salePrice)}
                  </span>
                </div>
                
                {/* Order Button */}
                <Button
                  asChild
                  className="w-full rounded-full bg-rose/10 text-rose hover:bg-rose hover:text-white border-2 border-rose/20 hover:border-rose font-semibold transition-all duration-300"
                >
                  <Link href="/shop/roses">
                    ORDER NOW
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-10 py-6 text-rose border-2 border-rose hover:bg-rose hover:text-white transition-all duration-300 font-semibold"
          >
            <Link href="/shop/roses">
              View All Rose Collection →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
