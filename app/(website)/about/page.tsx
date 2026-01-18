import { AboutSection } from "@/components/sections";
import { QualityStandards } from "@/components/sections/quality-standards";
import { DeliverySection } from "@/components/sections/delivery-section";
import { Metadata } from "next";
import Image from "next/image";
import { Award, Users, Flower2, Heart, Star, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Luxe Bloom Boutique",
  description: "Discover the story behind Luxe Bloom Boutique - where poetry meets petals. Learn about our passion for sustainable, artisan-quality floristry.",
};

const achievements = [
  { icon: Award, label: "Award Winning", value: "10+" },
  { icon: Users, label: "Happy Clients", value: "5,000+" },
  { icon: Flower2, label: "Bouquets Crafted", value: "15,000+" },
  { icon: Star, label: "5-Star Reviews", value: "2,000+" },
];

const team = [
  {
    name: "Sarah Florencia",
    role: "Founder & Lead Florist",
    image: "/images/bouquets/IMG20251213170623.jpg",
  },
  {
    name: "David Pratama",
    role: "Wedding Specialist",
    image: "/images/bouquets/IMG20251224202736.jpg",
  },
  {
    name: "Luna Dewi",
    role: "Creative Director",
    image: "/images/bouquets/IMG20251217142845.jpg",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-sage-dark via-sage to-sage-light overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.25em] mb-4 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              🌸 Our Story
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              About{" "}
              <span className="text-gold">Luxe Bloom</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Where passion for floristry meets artisan craftsmanship. 
              We believe every bloom tells a story, and we&apos;re here to help you tell yours.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Counter */}
      <section className="py-12 bg-burgundy">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.label} className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-3">
                    <IconComponent className="w-7 h-7 text-gold" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-white mb-1">
                    {item.value}
                  </div>
                  <div className="text-white/70 text-sm">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section from component */}
      <AboutSection />

      {/* Our Team */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-rose text-sm font-medium uppercase tracking-widest mb-4">
              The Team
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
              Meet Our{" "}
              <span className="text-rose">Artisans</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our talented team of florists brings passion, creativity, and years of 
              experience to every arrangement we create.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="group text-center"
              >
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 ring-4 ring-white shadow-xl group-hover:ring-rose/30 transition-all duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="192px"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-rose">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <QualityStandards />

      {/* Delivery Section */}
      <DeliverySection />

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sage text-sm font-medium uppercase tracking-widest mb-4">
              Our Philosophy
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
              What We{" "}
              <span className="text-sage">Stand For</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-rose/5 to-rose-light/10 rounded-3xl text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-rose/10 flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-rose" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Passion
              </h3>
              <p className="text-muted-foreground">
                Every arrangement is crafted with love and dedication, reflecting our 
                deep passion for the art of floristry.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-sage/5 to-sage-light/10 rounded-3xl text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-sage/10 flex items-center justify-center mb-6">
                <Flower2 className="w-8 h-8 text-sage" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Sustainability
              </h3>
              <p className="text-muted-foreground">
                We source our blooms from local, ethical farms, ensuring every flower 
                is as kind to the earth as it is beautiful.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-gold/5 to-gold-light/10 rounded-3xl text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Excellence
              </h3>
              <p className="text-muted-foreground">
                From sourcing to delivery, we maintain the highest standards to ensure 
                your flowers arrive fresh and perfect.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
