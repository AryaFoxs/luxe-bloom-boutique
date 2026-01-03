import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const roseVarieties = [
  { name: "Red Roses", description: "Classic symbol of love", count: "50+" },
  { name: "Pink Roses", description: "Grace and gratitude", count: "30+" },
  { name: "White Roses", description: "Purity and innocence", count: "25+" },
  { name: "Yellow Roses", description: "Friendship and joy", count: "20+" },
  { name: "Peach Roses", description: "Appreciation and sincerity", count: "15+" },
];

export function RoseCollection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-cream relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/bouquets/IMG-20251231-WA0014 (1).jpg"
                alt="Premium Rose Collection"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-sage/20 rounded-full blur-2xl" />
            
            {/* Floating badge */}
            <div className="absolute -right-4 top-1/4 bg-white p-4 rounded-2xl shadow-xl">
              <div className="text-rose font-serif text-3xl font-bold">140+</div>
              <div className="text-muted-foreground text-sm">Rose Varieties</div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
                Premium Selection
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
                Exquisite Roses for{" "}
                <span className="text-rose">Every Occasion</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Roses, timeless messengers of affection, are perfect for any occasion 
                to show them just how much you care. Let their exquisite beauty 
                convey your deepest sentiments.
              </p>
            </div>

            {/* Varieties List */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground mb-4">Varieties Available:</h3>
              <div className="grid gap-3">
                {roseVarieties.map((variety) => (
                  <div
                    key={variety.name}
                    className="group flex items-center justify-between p-4 bg-white rounded-xl border border-border hover:border-rose/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      <h4 className="font-medium text-foreground group-hover:text-rose transition-colors">
                        {variety.name}
                      </h4>
                      <p className="text-muted-foreground text-sm">{variety.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-rose font-semibold">{variety.count}</span>
                      <p className="text-muted-foreground text-xs">stems daily</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 bg-rose hover:bg-rose-dark text-white shadow-lg hover:shadow-rose/30 transition-all duration-300"
            >
              <Link href="/shop/roses">
                Explore Rose Collection
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
