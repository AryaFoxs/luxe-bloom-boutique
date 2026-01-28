import {
  HeroSection,
  OnSaleSection,
  BespokeServiceSection,
  RoseCollection,
  UpgradesSection,
  DeliverySection,
  BallerPackagesSection,
  AboutSection,
  FeaturedBouquets,
  ContactSection,
} from "@/components/sections";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />
      
      {/* 2. ON SALE - Signature Bouquets */}
      <OnSaleSection />
      
      {/* 3. ROMANTIC PICKS - Rose Collection */}
      <RoseCollection />
      
      {/* 4. FEATURED PRODUCTS - Curated Collection */}
      <FeaturedBouquets />
      
      {/* 5. UPGRADES - Chocolates, Wine, Balloons, Teddy Bears */}
      <UpgradesSection />
      
      {/* 6. BESPOKE SERVICE - Order Your Custom Bouquet */}
      <BespokeServiceSection />
      
      {/* 7. ISLAND-WIDE DELIVERY - Same Day Delivery Across Bali */}
      <DeliverySection />
      
      {/* 8. BALLER PACKAGES - Grand Gestures */}
      <BallerPackagesSection />
      
      {/* 9. ABOUT US - Where Poetry Meets Petals */}
      <AboutSection />
      
      {/* 10. GET IN TOUCH - Let's Talk Flowers */}
      <ContactSection />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </>
  );
}
