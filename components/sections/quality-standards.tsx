import { Leaf, Globe, Truck, Clock } from "lucide-react";

interface QualityFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const qualityFeatures: QualityFeature[] = [
  {
    icon: Leaf,
    title: "Uncompromising Freshness & Quality",
    description: "Each bloom is meticulously selected by our expert florists for peak vitality, ensuring your arrangements radiate beauty longer.",
  },
  {
    icon: Globe,
    title: "Artfully Sourced: The Best & Beyond",
    description: "We partner with the finest local growers and select international farms to bring you a diverse, premium palette of fresh-cut flowers daily.",
  },
  {
    icon: Truck,
    title: "Reliable 24/7 Delivery",
    description: "Our dedicated team ensures your flowers arrive beautifully presented, anytime, anywhere in our delivery coverage area.",
  },
  {
    icon: Clock,
    title: "Always Open: Your Around-the-Clock Partner",
    description: "For every spontaneous gesture or planned event, our boutique and expert florist services are available 24/7 to meet your needs.",
  },
];

export function QualityStandards() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-gradient-to-b from-cream to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
            Why Choose Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            The Luxe Bloom{" "}
            <span className="text-rose">Standard</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We take pride in delivering excellence in every aspect of our service, 
            from sourcing the finest flowers to ensuring they reach you in perfect condition.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {qualityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-transparent hover:border-rose/20"
              >
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-rose text-white rounded-full flex items-center justify-center font-serif font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                
                <div className="flex gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose/10 to-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-rose" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl lg:text-2xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-burgundy/5 rounded-full border border-burgundy/10">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-rose to-gold border-2 border-white"
                />
              ))}
            </div>
            <div className="text-left">
              <div className="font-semibold text-foreground">Trusted by 5,000+ customers</div>
              <div className="text-muted-foreground text-sm">⭐⭐⭐⭐⭐ 4.9 average rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
