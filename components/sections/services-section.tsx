import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Palette, Heart, Sparkles, Check } from "lucide-react";

interface Service {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  gradient: string;
}

const services: Service[] = [
  {
    id: "build-your-bloom",
    icon: Palette,
    title: "Build Your Own Bloom",
    description: "Unleash your inner florist at our boutique studio! Select fresh blooms and craft a personalized bouquet with guidance from our experts.",
    features: [
      "Guided by experienced florists",
      "All fresh flowers & materials provided",
      "Learn essential floral design techniques",
      "Take home your unique, self-made bouquet",
      "Perfect creative activity or unique gift",
    ],
    ctaText: "Book Your Session",
    ctaLink: "https://wa.me/6281234567890?text=Hello,%20I'd%20like%20to%20book%20a%20Build%20Your%20Own%20Bloom%20session.",
    gradient: "from-rose/10 to-rose-light/10",
  },
  {
    id: "wedding-florals",
    icon: Heart,
    title: "Bespoke Wedding Florals",
    description: "Your special day deserves enchanting florals. Our designers craft breathtaking, custom arrangements reflecting your unique love story.",
    features: [
      "Personalized consultation",
      "Custom designs: bridal bouquets, ceremony, reception",
      "Sourcing premium local & imported flowers",
      "Full floral styling and on-site setup",
      "Tailored to your unique wedding vision",
    ],
    ctaText: "Book Consultation",
    ctaLink: "https://wa.me/6281234567890?text=Hello,%20I'd%20like%20to%20book%20a%20wedding%20florals%20consultation.",
    gradient: "from-gold/10 to-gold-light/10",
  },
  {
    id: "event-styling",
    icon: Sparkles,
    title: "Custom Event Floral Styling",
    description: "Elevate your event with unforgettable floral artistry. We design impactful arrangements for corporate functions and special celebrations.",
    features: [
      "Consultation for your event's floral needs",
      "Bespoke floral designs for all event types",
      "Large-scale installations and themed decor",
      "Collaboration with event planners",
      "Professional setup and delivery",
    ],
    ctaText: "Get Quote",
    ctaLink: "https://wa.me/6281234567890?text=Hello,%20I'd%20like%20to%20get%20a%20quote%20for%20event%20floral%20styling.",
    gradient: "from-sage/10 to-sage-light/10",
  },
];

function ServiceCard({ service }: { service: Service }) {
  const IconComponent = service.icon;
  
  return (
    <Card className={`group relative overflow-hidden border-0 bg-gradient-to-br ${service.gradient} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/50 rounded-bl-full opacity-50" />
      
      <CardHeader className="pb-4">
        <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="w-7 h-7 text-rose" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-foreground">
          {service.title}
        </h3>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          {service.description}
        </p>
        
        {/* Features List */}
        <ul className="space-y-3">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-rose" />
              </div>
              <span className="text-foreground text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA Button */}
        <Button
          asChild
          className="w-full rounded-full bg-rose hover:bg-rose-dark text-white shadow-lg hover:shadow-rose/30 transition-all duration-300 mt-4"
        >
          <Link href={service.ctaLink} target="_blank" rel="noopener noreferrer">
            {service.ctaText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-rose text-sm font-medium uppercase tracking-widest mb-4">
            What We Offer
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Your Premier{" "}
            <span className="text-rose">Florist Services</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Craft your dream bouquet, design stunning wedding florals, or elevate 
            your event with our expert floral arrangements. We offer unique 
            floral experiences for every occasion.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
