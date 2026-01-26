import { ServicesSection } from "@/components/sections";
import { BespokeServiceSection } from "@/components/sections/bespoke-service-section";
import { UpgradesSection } from "@/components/sections/upgrades-section";
import { BallerPackagesSection } from "@/components/sections/baller-packages-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Luxe Bloom Boutique",
  description: "Explore our premium florist services including Build Your Own Bloom, Bespoke Wedding Florals, and Custom Event Styling.",
};

export default function ServicesPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-burgundy via-burgundy to-rose overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.25em] mb-4 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              ✨ Our Services
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Premium Florist{" "}
              <span className="text-gold">Services</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              From crafting your own bouquet to designing breathtaking wedding florals, 
              we offer unique floral experiences tailored to your special moments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services - Hidden temporarily, will enable next month */}
      {/* <ServicesSection /> */}

      {/* Bespoke Service */}
      <BespokeServiceSection />

      {/* Upgrades Section */}
      <UpgradesSection />

      {/* Baller Packages */}
      <BallerPackagesSection />
    </main>
  );
}
