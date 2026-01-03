import { Truck, Clock, MapPin, Phone } from "lucide-react";

const deliveryAreas = [
  "Jakarta Selatan",
  "Jakarta Pusat",
  "Jakarta Barat",
  "Jakarta Timur",
  "Jakarta Utara",
  "Tangerang",
  "Depok",
  "Bekasi",
  "Bogor",
];

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders above Rp 500.000",
  },
  {
    icon: Clock,
    title: "24/7 Available",
    description: "Order anytime, we're always here",
  },
  {
    icon: MapPin,
    title: "Wide Coverage",
    description: "Jabodetabek area",
  },
  {
    icon: Phone,
    title: "Quick Support",
    description: "Fast response via WhatsApp",
  },
];

export function DeliverySection() {
  return (
    <section className="py-20 lg:py-28 bg-burgundy text-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
                Always Ready
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
                24/7 Flower{" "}
                <span className="text-rose-light">Delivery</span>
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed max-w-lg">
                At Luxe Bloom Boutique, we understand that beautiful moments can&apos;t 
                always wait. That&apos;s why we&apos;re here for you night and day, ready to 
                deliver fresh flowers whenever you need them.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <feature.icon className="w-8 h-8 text-gold mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-cream/60 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Delivery Areas */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 lg:p-10">
              <h3 className="font-serif text-2xl font-semibold text-white mb-6">
                We serve thousands of happy flower lovers in:
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {deliveryAreas.map((area, index) => (
                  <span
                    key={area}
                    className="px-4 py-2 bg-gradient-to-r from-rose/20 to-gold/20 text-cream rounded-full text-sm border border-white/10 hover:border-rose/50 hover:scale-105 transition-all duration-300 cursor-default"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {area}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="font-serif text-3xl md:text-4xl font-bold text-gold mb-1">5000+</div>
                  <div className="text-cream/60 text-sm">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-3xl md:text-4xl font-bold text-rose-light mb-1">50+</div>
                  <div className="text-cream/60 text-sm">Bouquet Designs</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-3xl md:text-4xl font-bold text-sage-light mb-1">4.9</div>
                  <div className="text-cream/60 text-sm">Rating</div>
                </div>
              </div>
            </div>

            {/* Decorative floating card */}
            <div className="hidden lg:block absolute -bottom-6 -left-6 bg-gold text-burgundy p-4 rounded-2xl shadow-2xl">
              <div className="font-serif text-lg font-semibold">Same Day</div>
              <div className="text-sm opacity-80">Guaranteed Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
