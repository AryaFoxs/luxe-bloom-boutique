import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-28 lg:pt-24">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(
            to bottom,
            rgba(45, 27, 26, 0.4) 0%,
            rgba(45, 27, 26, 0.6) 50%,
            rgba(45, 27, 26, 0.8) 100%
          ), url('/Hero Section.jpg')`,
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-rose/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-20 w-40 h-40 bg-gold/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-sage/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm border border-white/20 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Artisan Florals Since 2020</span>
          </div>

          {/* Main Heading */}
          <h1 
            className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white leading-tight animate-fadeIn"
            style={{ animationDelay: '0.2s' }}
          >
            Boutique Florist &{" "}
            <span className="text-rose-light">Flower Delivery</span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fadeIn font-light"
            style={{ animationDelay: '0.4s' }}
          >
            Where every stem tells a story and every bouquet is a work of heart. 
            We thoughtfully craft unique bouquets inspired by nature&apos;s splendor.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fadeIn"
            style={{ animationDelay: '0.6s' }}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-lg bg-rose hover:bg-rose-dark text-white shadow-2xl hover:shadow-rose/30 transition-all duration-300 hover:scale-105 group"
            >
              <Link href="#bouquets">
                Explore Our Fresh Bouquets
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-lg bg-transparent border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              <Link href="#contact">
                Contact Us
              </Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div 
            className="pt-12 pb-20 md:pb-0 flex flex-wrap items-center justify-center gap-8 text-white/60 animate-fadeIn"
            style={{ animationDelay: '0.8s' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              <span className="text-sm">Same-Day Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm">Fresh Flowers Daily</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-light animate-pulse" />
              <span className="text-sm">Expert Florists</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Link 
          href="#bouquets"
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
