"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WomensDayBanner() {
  return (
    <section className="relative overflow-hidden py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative group overflow-hidden rounded-[2rem] bg-[#702963] shadow-2xl min-h-[300px] flex items-center">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(112, 41, 99, 0.95) 0%, rgba(112, 41, 99, 0.8) 50%, rgba(112, 41, 99, 0.4) 100%), url('/images/bouquets/IMG20251217151154.jpg')`,
            }}
          />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose/20 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-125" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -ml-32 -mb-32 transition-transform duration-700 group-hover:scale-125" />
          
          <div className="relative z-10 w-full p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-4 md:max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] animate-fadeIn">
                <Sparkles className="w-3.5 h-3.5 text-rose-light" />
                March 8 Celebration
              </div>
              
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                Celebrate the Women <br className="hidden md:block" />
                <span className="text-rose-light italic">Who Inspire Us</span>
              </h2>
              
              <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-xl animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                Make International Women&apos;s Day unforgettable with our curated 
                collection of elegant bouquets. Pre-order now for delivery across Bali.
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#702963] hover:bg-rose-light hover:text-white rounded-full px-10 py-8 text-xl font-bold shadow-2xl transition-all duration-300 hover:scale-105 group/btn"
              >
                <Link href="#fresh-flowers">
                  Pre-order Now
                  <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover/btn:translate-x-2" />
                </Link>
              </Button>
              <p className="text-white/60 text-sm font-medium uppercase tracking-widest">
                Limited Edition Collections
              </p>
            </div>
          </div>
          
          {/* Subtle Glow Accent */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
