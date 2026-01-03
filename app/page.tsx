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
    </>
  );
}
