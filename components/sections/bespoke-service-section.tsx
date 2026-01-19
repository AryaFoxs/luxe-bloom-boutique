import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Palette, MessageCircle } from "lucide-react";

export function BespokeServiceSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-rose/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/bouquets/IMG20251217142845.jpg"
                alt="Custom Bouquet Service"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy/40 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 lg:right-8 bg-gold text-burgundy p-6 rounded-2xl shadow-2xl">
              <Palette className="w-8 h-8 mb-2" />
              <div className="font-serif text-xl font-semibold">Custom</div>
              <div className="text-sm opacity-80">Made for You</div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <span className="inline-block text-rose text-sm font-medium uppercase tracking-widest mb-4">
                Bespoke Service
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
                Order Your{" "}
                <span className="text-rose">Custom Bouquet</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Can&apos;t find exactly what you&apos;re looking for? Let our expert florists 
                create a one-of-a-kind arrangement tailored to your vision, occasion, 
                and budget. Every petal placed with purpose, every stem selected with care.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-rose font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Share Your Vision</h4>
                  <p className="text-muted-foreground text-sm">Tell us about the occasion, preferences, and budget</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-rose font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">We Design</h4>
                  <p className="text-muted-foreground text-sm">Our florists craft a unique arrangement just for you</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-rose font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Delivered With Love</h4>
                  <p className="text-muted-foreground text-sm">Same-day delivery across Bali available</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 bg-rose hover:bg-rose-dark text-white shadow-xl hover:shadow-rose/30 transition-all duration-300 group"
            >
              <Link
                href="https://wa.me/6287825830959?text=Hello,%20I'd%20like%20to%20order%20a%20custom%20bouquet."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Your Custom Order
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
