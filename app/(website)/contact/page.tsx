import { ContactSection } from "@/components/sections";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Luxe Bloom Boutique",
  description: "Get in touch with Luxe Bloom Boutique. Visit our boutique, call us, or send a message. We're here to help with all your floral needs.",
};

const quickLinks = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    subtitle: "Chat with us instantly",
    href: "https://wa.me/6281234567890?text=Hello,%20I'd%20like%20to%20inquire%20about%20your%20services.",
    color: "bg-green-500",
  },
  {
    icon: Instagram,
    title: "Instagram",
    subtitle: "@luxebloomboutique",
    href: "https://instagram.com/luxebloomboutique",
    color: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
  },
  {
    icon: Facebook,
    title: "Facebook",
    subtitle: "Luxe Bloom Boutique",
    href: "https://facebook.com/luxebloomboutique",
    color: "bg-blue-600",
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-rose via-rose to-rose-light overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-white text-sm font-medium uppercase tracking-[0.25em] mb-4 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              💬 Get in Touch
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Contact{" "}
              <span className="text-gold">Us</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Have questions about our flowers or services? We&apos;d love to hear from you. 
              Reach out and let&apos;s create something beautiful together.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Links */}
      <section className="py-12 bg-burgundy">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {quickLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl ${link.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{link.title}</h3>
                    <p className="text-white/70 text-sm">{link.subtitle}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <ContactSection />

      {/* FAQ Teaser */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-rose text-sm font-medium uppercase tracking-widest mb-4">
              Common Questions
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
              Frequently Asked{" "}
              <span className="text-rose">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Have questions about our services, delivery, or how to order? 
              Check out some of our most commonly asked questions below.
            </p>

            <div className="space-y-4 text-left">
              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="font-semibold text-foreground mb-2">
                  What are your delivery areas?
                </h3>
                <p className="text-muted-foreground">
                  We deliver throughout Jakarta, Bali, and surrounding areas. 
                  Same-day delivery is available for orders placed before 2 PM.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="font-semibold text-foreground mb-2">
                  Can I customize my bouquet?
                </h3>
                <p className="text-muted-foreground">
                  Absolutely! We offer fully customizable bouquets. Contact us via WhatsApp 
                  to discuss your preferences and we&apos;ll create something special for you.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="font-semibold text-foreground mb-2">
                  How long do the flowers last?
                </h3>
                <p className="text-muted-foreground">
                  With proper care, our fresh flowers typically last 7-14 days. 
                  We include care instructions with every delivery to help extend their beauty.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-rose hover:bg-rose-dark text-white shadow-lg"
              >
                <Link href="https://wa.me/6281234567890?text=Hello,%20I%20have%20a%20question%20about%20your%20services." target="_blank">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Ask Us Anything
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
