import {
  HeroSection,
  OnSaleSection,
  BespokeServiceSection,
  RoseCollection,
  UpgradesSection,
  DeliverySection,
  BallerPackagesSection,
  AboutSection,
  ContactSection,
  ProductCollectionSection,
  WomensDayBanner,
} from "@/components/sections";

import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Women's Day Special Banner */}
      <WomensDayBanner />

      {/* 3. Signature Bouquets (On Sale) */}
      <OnSaleSection />

      
      {/* 4. Fresh Flower Section */}

      <ProductCollectionSection 
        id="fresh-flowers"
        title="Fresh Flower"
        subtitle="Daily Arrivals"
        description="Experience the beauty of nature with our daily selection of premium fresh blossoms, handpicked for their vibrancy and longevity."
        category="Bouquets"
        limit={8}
        viewAllHref="/bouquets"
        viewAllText="Explore Fresh Collection"
      />
      
      {/* 5. Rose Collection */}

      <RoseCollection />
      
      {/* 6. Satin Flower Section (Artificial) */}

      <ProductCollectionSection 
        id="satin-flowers"
        title="Satin Flower"
        subtitle="Everlasting Beauty"
        description="Indulge in the timeless elegance of our handcrafted satin and silk flowers. Eternal blooms that capture beauty forever."
        category="Artificial"
        limit={8}
        viewAllHref="/artificial-bouquets"
        viewAllText="Explore Satin Collection"
      />
      
      {/* 7. All Flower Section */}

      <ProductCollectionSection 
        id="all-flowers"
        title="All Flower"
        subtitle="Complete Gallery"
        description="Browse our entire collection of floral masterpieces, from fresh seasonal favorites to exquisite artificial arrangements."
        limit={12}
        viewAllHref="/bouquets"
        viewAllText="See Everything"
      />
      
      {/* 8. Grand Gestures (Baller Packages) */}

      <BallerPackagesSection />
      
      {/* 9. Make It Even More Special (Upgrades) */}

      <UpgradesSection />
      
      {/* 10. Order Your Custom Bouquet (Bespoke) */}

      <BespokeServiceSection />
      
      {/* 11. Same Day Delivery Across Bali */}

      <DeliverySection />
      
      {/* 12. Where Poetry Meets Petals (About) */}

      <AboutSection />
      
      {/* 13. Let's Talk Flowers (Contact) */}

      <ContactSection />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </>
  );
}
