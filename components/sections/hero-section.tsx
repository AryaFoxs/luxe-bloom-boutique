import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20 md:pt-16">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] scale-105"
        style={{
          backgroundImage: `linear-gradient(
            to bottom,
            rgba(20, 10, 10, 0.3) 0%,
            rgba(20, 10, 10, 0.5) 50%,
            rgba(20, 10, 10, 0.8) 100%
          ), url('/Hero Section.jpg')`,
        }}
      />
      
      {/* Soft Glow Overlays */}
      <div className="absolute top-1/4 -left-20 w-[40vw] h-[40vw] bg-rose/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-[30vw] h-[30vw] bg-gold/10 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center py-20 pb-28 md:pb-36 flex flex-col items-center">
        <div className="max-w-4xl w-full flex flex-col items-center space-y-6 md:space-y-10">
          
          {/* Top Label */}
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 animate-fadeIn">
            <div className="w-1 h-1 rounded-full bg-gold animate-ping" />
            <span className="text-white/80 text-xs font-bold uppercase tracking-[0.3em] select-none">
              Artisan Florals Since 2020
            </span>
          </div>

          {/* Main Content Area */}
          <div className="space-y-6 md:space-y-8">
            <h1 
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold text-white leading-tight animate-fadeIn"
              style={{ animationDelay: '0.2s' }}
            >
              Boutique Florist & <br /> 
              <span className="text-rose-light">Flower Delivery</span>
            </h1>

            <p 
              className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fadeIn font-light px-4"
              style={{ animationDelay: '0.4s' }}
            >
              Where every stem tells a story and every bouquet is a work of heart. 
              We thoughtfully craft unique bouquets inspired by nature&apos;s splendor.
            </p>
          </div>

          {/* Trust badges - Restored original style */}
          <div 
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/70 animate-fadeIn"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
              <span className="text-sm font-medium">Same-Day Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-sm font-medium">Fresh Flowers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-light animate-pulse" />
              <span className="text-sm font-medium">Satin Flower</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
              <span className="text-sm font-medium">Expert Florists</span>
            </div>
          </div>

          {/* Action Buttons - Restored original labels */}
          <div 
            className="flex flex-wrap items-center justify-center gap-4 pt-2 animate-fadeIn"
            style={{ animationDelay: '0.8s' }}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-base bg-rose hover:bg-rose-dark text-white shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link href="#fresh-flowers">
                Fresh Flower
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-base bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <Link href="#satin-flowers">
                Satin Flower
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-base bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <Link href="#all-flowers">
                All Flower
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 animate-fadeIn">
        <Link 
          href="#valentine-event"
          className="flex flex-col items-center gap-2 group transition-opacity hover:opacity-100 opacity-40"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent overflow-hidden">
            <div className="w-full h-full bg-white animate-bounce" />
          </div>
          <span className="text-[9px] uppercase tracking-[0.4em] font-black text-white">Scroll</span>
        </Link>
      </div>
    </section>
  );
}

