"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CartButton } from "@/components/cart";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/bouquets", label: "Bouquets" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-gold transition-all duration-300 shadow-lg">
              <Image
                src="/Logo Luxe Bloom Boutique.jpeg"
                alt="Luxe Bloom Boutique Logo"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-serif text-xl font-semibold tracking-wide transition-colors duration-300",
                  isScrolled ? "text-burgundy" : "text-white"
                )}
              >
                Luxe Bloom
              </span>
              <span
                className={cn(
                  "text-[10px] uppercase tracking-[0.2em] -mt-1 transition-colors duration-300",
                  isScrolled ? "text-rose" : "text-white/80"
                )}
              >
                Boutique
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors duration-300 group",
                  isScrolled
                    ? "text-foreground hover:text-rose"
                    : "text-white/90 hover:text-white"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Button & Cart */}
          <div className="hidden md:flex items-center gap-3">
            <CartButton isScrolled={isScrolled} />
            <Button
              asChild
              className={cn(
                "rounded-full px-6 transition-all duration-300 hover:scale-105",
                isScrolled
                  ? "bg-rose hover:bg-rose-dark text-white"
                  : "bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
              )}
            >
              <Link href="/bouquets">Shop Now</Link>
            </Button>
          </div>

          {/* Mobile Cart & Menu Buttons */}
          <div className="md:hidden flex items-center gap-2">
            <CartButton isScrolled={isScrolled} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isScrolled
                  ? "text-foreground hover:bg-rose/10"
                  : "text-white hover:bg-white/10"
              )}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-in-out",
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-foreground hover:text-rose hover:bg-rose/5 rounded-lg transition-all duration-300 font-medium"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <Button
                asChild
                className="w-full rounded-full bg-rose hover:bg-rose-dark text-white"
              >
                <Link href="#bouquets" onClick={() => setIsOpen(false)}>
                  Shop Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
