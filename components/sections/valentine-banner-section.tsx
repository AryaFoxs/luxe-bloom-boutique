"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";

export function ValentineBannerSection() {
  return (
    <section id="valentine-event" className="relative w-full overflow-hidden bg-[#ffe4e9]">
      <div className="relative w-full min-h-[300px] flex flex-col items-center justify-center py-12 md:py-16 px-6 md:px-10 text-center">
        
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fff3f5_0%,_#ffe4e9_100%)] opacity-90" />

        {/* Decorative Paper-cut Hearts - Repositioned for tighter layout */}
        <div className="absolute top-4 left-4 w-16 h-16 text-rose-light/40 -rotate-12 animate-pulse hidden sm:block">
          <Heart className="w-full h-full fill-current" />
        </div>
        <div className="absolute top-4 right-8 w-20 h-20 text-rose-light/30 rotate-12 animate-bounce hidden sm:block">
          <Heart className="w-full h-full fill-current" />
        </div>
        <div className="absolute bottom-4 left-1/4 w-10 h-10 text-rose-light/20 rotate-45 hidden sm:block">
          <Heart className="w-full h-full fill-current" />
        </div>
        <div className="absolute bottom-6 right-[10%] w-24 h-24 text-rose-light/25 -rotate-12 animate-pulse hidden sm:block">
          <Heart className="w-full h-full fill-current" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row items-center justify-around gap-6 md:gap-12">
          
          {/* Left Side: Typography */}
          <div className="space-y-1">
            <h3 className="text-xs md:text-sm font-bold text-rose tracking-[0.4em] uppercase opacity-70">
              HAPPY
            </h3>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-rose font-bold italic -rotate-1 select-none leading-none mb-1">
              Valentine&apos;s
            </h2>
            <h3 className="text-xs md:text-sm font-bold text-rose tracking-[0.4em] uppercase opacity-70">
              DAY
            </h3>
            <p className="text-[10px] md:text-xs font-bold text-rose/60 tracking-[0.2em] mt-2">
              14 FEBRUARY 2026
            </p>
          </div>

          {/* Right Side: Info & CTA */}
          <div className="max-w-md space-y-4 flex flex-col items-center text-center">
            <p className="text-xs md:text-sm text-rose/70 font-medium leading-relaxed uppercase tracking-wider">
              Romantic arrangements handcrafted to speak the language of the heart.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="default" className="rounded-full bg-rose hover:bg-rose-dark text-white shadow-lg px-8 py-5 transition-all duration-300 hover:scale-105">
                <Link href="/bouquets">
                  Shop Season of Love
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Sparkles */}
        <div className="absolute top-1/4 right-1/4 text-gold/30 animate-ping">
          <Sparkles className="w-3 h-3" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 text-gold/30 animate-ping delay-700">
          <Sparkles className="w-3 h-3" />
        </div>
      </div>
    </section>
  );
}
