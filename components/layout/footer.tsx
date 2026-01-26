import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, Instagram, MessageCircle } from "lucide-react";

const shopLinks = [
  { href: "/bouquets", label: "All Bouquets" },
  { href: "/wedding-flowers", label: "Wedding Flowers" },
  { href: "/corporate", label: "Corporate Arrangements" },
  { href: "/gift-cards", label: "Gift Cards" },
];

const serviceLinks = [
  { href: "#services", label: "Subscriptions" },
  { href: "#services", label: "Event Planning" },
  { href: "#services", label: "Custom Designs" },
  { href: "#services", label: "Workshops" },
];

const infoLinks = [
  { href: "/about", label: "About Us" },
  { href: "/delivery", label: "Delivery Info" },
  { href: "/care-guide", label: "Care Guide" },
  { href: "/faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="bg-burgundy text-cream">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-gold transition-all duration-300 shadow-lg">
                <Image
                  src="/Logo Luxe Bloom Boutique.jpeg"
                  alt="Luxe Bloom Boutique Logo"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-semibold tracking-wide text-white">
                  Luxe Bloom
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] -mt-1 text-rose-light">
                  Boutique
                </span>
              </div>
            </Link>
            <p className="text-cream/70 max-w-sm leading-relaxed mb-6">
              From the heart of the city, we pour passion into every petal, 
              crafting beautiful floral stories for every occasion. Your cherished 
              local flower shop, dedicated to delivering fresh beauty and joy, 
              around the clock.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://wa.me/6287825830959"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-rose transition-all duration-300 flex items-center justify-center group"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-cream group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://instagram.com/luxebloomboutique"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-rose transition-all duration-300 flex items-center justify-center group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-cream group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-rose transition-all duration-300 flex items-center justify-center group"
                aria-label="Location"
              >
                <MapPin className="w-5 h-5 text-cream group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-5 text-white">Shop</h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-rose-light transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-5 text-white">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-rose-light transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-5 text-white">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-cream/70 hover:text-rose-light transition-colors duration-300 text-sm group"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-light" />
                  <span>Jalan Teuku Umar No.43, Denpasar Barat</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:luxebloomboutique26@gmail.com"
                  className="flex items-center gap-3 text-cream/70 hover:text-rose-light transition-colors duration-300 text-sm"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-rose-light" />
                  <span>luxebloomboutique26@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+6287825830959"
                  className="flex items-center gap-3 text-cream/70 hover:text-rose-light transition-colors duration-300 text-sm"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-rose-light" />
                  <span>+62 878 2583 0959</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream/50 text-sm">
              © {new Date().getFullYear()} Luxe Bloom Boutique. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-cream/50 hover:text-rose-light transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-cream/50 hover:text-rose-light transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
