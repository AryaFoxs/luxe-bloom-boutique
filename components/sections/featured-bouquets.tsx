import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";

interface Bouquet {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isPromo?: boolean;
}

const bouquets: Bouquet[] = [
  {
    id: "violet-blossom",
    name: "Violet Blossom",
    description: "Pink roses, lavender chrysanthemums, and vibrant hydrangeas wrapped in elegant perforated cover.",
    price: 850000,
    image: "/images/bouquets/IMG20251213170623.jpg",
    isPromo: true,
  },
  {
    id: "pink-paradise",
    name: "Pink Paradise",
    description: "Stunning bouquet of lilies, roses, and soft pink blooms—perfect for romantic gestures.",
    price: 1200000,
    image: "/images/bouquets/IMG20251217142845.jpg",
  },
  {
    id: "pastel-haze",
    name: "Pastel Haze",
    description: "Dreamy bouquet of hydrangeas, gerberas, and soft pink blooms for gentle expressions.",
    price: 950000,
    image: "/images/bouquets/IMG20251217151154.jpg",
    isPromo: true,
  },
  {
    id: "rose-royale",
    name: "Rose Royale",
    description: "One hundred stunning premium roses in deep red, symbolizing eternal love and passion.",
    price: 2500000,
    image: "/images/bouquets/IMG20251222164127.jpg",
  },
  {
    id: "blush-rose-box",
    name: "Blush Rose Box",
    description: "Charming box of pastel roses in soft blush tones, perfect for heartfelt moments.",
    price: 750000,
    image: "/images/bouquets/IMG20251224202736.jpg",
  },
  {
    id: "sunny-cheer",
    name: "Sunny Cheer",
    description: "Radiant bouquet with orange gerberas, white lilies, and cheerful yellow blooms.",
    price: 680000,
    image: "/images/bouquets/IMG20251226095117.jpg",
  },
  {
    id: "sunshine-love",
    name: "Sunshine Love",
    description: "Joyful burst of colors featuring bright blooms arranged in a sky blue box.",
    price: 720000,
    image: "/images/bouquets/IMG-20251226-WA0009.jpg",
  },
  {
    id: "cinta-kuning",
    name: "Cinta Kuning",
    description: "Brighten their day with radiant mix of yellow lilies and cheerful blooms.",
    price: 650000,
    image: "/images/bouquets/IMG-20251231-WA0014.jpg",
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function BouquetCard({ bouquet }: { bouquet: Bouquet }) {
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          <span className="text-rose font-semibold text-sm whitespace-nowrap">
            {formatPrice(bouquet.price)}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {bouquet.description}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 rounded-full border-rose/30 text-rose hover:bg-rose hover:text-white hover:border-rose transition-all duration-300"
          >
            <Link href={`/shop/${bouquet.id}`}>
              See Details
            </Link>
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-rose hover:bg-rose-dark text-white px-4 transition-all duration-300"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function FeaturedBouquets() {
  return (
    <section id="bouquets" className="py-20 lg:py-28 bg-gradient-to-b from-cream to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-rose text-sm font-medium uppercase tracking-widest mb-4">
            Our Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Fresh Bouquets from{" "}
            <span className="text-rose">Luxe Bloom</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Handpicked by our expert florists, these fresh bouquets are perfect for any occasion. 
            Same-day delivery or pickup from our boutique available.
          </p>
        </div>

        {/* Bouquet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bouquets.map((bouquet) => (
            <BouquetCard key={bouquet.id} bouquet={bouquet} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-14">
          <Button
            asChild
            size="lg"
            className="rounded-full px-10 py-6 bg-rose hover:bg-rose-dark text-white shadow-xl hover:shadow-rose/30 transition-all duration-300 group"
          >
            <Link href="/shop">
              Discover Our Entire Collection
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
