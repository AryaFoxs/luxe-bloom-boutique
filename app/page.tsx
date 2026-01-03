import {
  HeroSection,
  FeaturedBouquets,
  DeliverySection,
  RoseCollection,
  ServicesSection,
  InstagramFeed,
  QualityStandards,
  ContactSection,
} from "@/components/sections";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedBouquets />
      <DeliverySection />
      <RoseCollection />
      <ServicesSection />
      <InstagramFeed />
      <QualityStandards />
      <ContactSection />
      <WhatsAppButton />
    </>
  );
}
