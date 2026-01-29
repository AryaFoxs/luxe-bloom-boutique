import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Leaf, Sparkles } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-12 lg:py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-sage/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 text-sage text-sm font-medium uppercase tracking-widest mb-4">
                <Leaf className="w-4 h-4" />
                About Us
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
                Where Poetry Meets{" "}
                <span className="text-rose">Petals</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                At Luxe Bloom Boutique, we believe flowers are more than just botanical beauty—
                they&apos;re messengers of the heart, carriers of emotion, and vessels of memory. 
                Each arrangement we create is a poem written in petals.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Founded in the heart of Bali, our boutique draws inspiration from the island&apos;s 
                natural splendor—the lush tropical gardens, the vibrant sunsets over rice terraces, 
                and the warm spirit of its people. We bring this essence to every bouquet we craft.
              </p>
            </div>

            {/* Values */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-cream rounded-2xl">
                <div className="w-12 h-12 mx-auto rounded-full bg-rose/10 flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 text-rose" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Crafted with Love</h4>
                <p className="text-muted-foreground text-sm">Every stem placed with intention</p>
              </div>
              <div className="text-center p-6 bg-cream rounded-2xl">
                <div className="w-12 h-12 mx-auto rounded-full bg-sage/10 flex items-center justify-center mb-3">
                  <Leaf className="w-6 h-6 text-sage" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Sustainably Sourced</h4>
                <p className="text-muted-foreground text-sm">Local farms, ethical practices</p>
              </div>
              <div className="text-center p-6 bg-cream rounded-2xl">
                <div className="w-12 h-12 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6 text-gold" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Artisan Quality</h4>
                <p className="text-muted-foreground text-sm">Expert florists, premium blooms</p>
              </div>
            </div>

            {/* CTA */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 border-2 border-rose text-rose hover:bg-rose hover:text-white transition-all duration-300"
            >
              <Link href="/about">
                Discover Our Story
              </Link>
            </Button>
          </div>

          {/* Right - Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/bouquets/IMG20251213170623.jpg"
                    alt="Our Florist at Work"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/bouquets/IMG_53431.jpg"
                    alt="Premium Flowers"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/bouquets/IMG20251217142845.jpg"
                    alt="Beautiful Arrangement"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/bouquets/IMG_52101.jpg"
                    alt="Fresh Bouquet"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-burgundy text-cream px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-8">
              <div className="text-center">
                <div className="font-serif text-2xl font-bold text-gold">5+</div>
                <div className="text-sm opacity-80">Years</div>
              </div>
              <div className="w-px h-10 bg-cream/20" />
              <div className="text-center">
                <div className="font-serif text-2xl font-bold text-rose-light">5000+</div>
                <div className="text-sm opacity-80">Happy Clients</div>
              </div>
              <div className="w-px h-10 bg-cream/20" />
              <div className="text-center">
                <div className="font-serif text-2xl font-bold text-sage-light">100%</div>
                <div className="text-sm opacity-80">Fresh Daily</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
