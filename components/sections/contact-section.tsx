"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone, Clock, Send, MessageCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Boutique",
    lines: ["Jl. Bunga Indah No.123", "Jakarta Selatan, 12345"],
    link: "https://maps.google.com",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["hello@luxebloomboutique.com", "orders@luxebloomboutique.com"],
    link: "mailto:hello@luxebloomboutique.com",
  },
  {
    icon: Phone,
    title: "Call or WhatsApp",
    lines: ["+62 878 2583 0959"],
    link: "https://wa.me/6287825830959",
  },
  {
    icon: Clock,
    title: "Opening Hours",
    lines: ["Open 24/7", "Always ready to serve you"],
    link: null,
  },
];

export function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // In a real app, this would send to Supabase or an API
    console.log("Form submitted:", data);
    
    // Build WhatsApp message
    const message = encodeURIComponent(
      `Hello, I'm ${data.name}.\n\nEmail: ${data.email}\nPhone: ${data.phone}\n\nMessage: ${data.message}`
    );
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/6287825830959?text=${message}`, "_blank");
    
    reset();
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-sage/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-rose text-sm font-medium uppercase tracking-widest mb-4">
            Get in Touch
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Let&apos;s Talk{" "}
            <span className="text-rose">Flowers</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Come find us right in the heart of Bali! Our doors at Luxe Bloom Boutique 
            are always open, ready to welcome you with beautiful, fresh flowers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info) => {
                const IconComponent = info.icon;
                const content = (
                  <div className="group p-6 bg-cream rounded-2xl hover:shadow-lg transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-rose/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-rose" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-muted-foreground text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                );

                if (info.link) {
                  return (
                    <a
                      key={info.title}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {content}
                    </a>
                  );
                }
                return <div key={info.title}>{content}</div>;
              })}
            </div>

            {/* Map Placeholder */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
              <div className="absolute inset-0 bg-gradient-to-br from-sage/20 to-gold/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-rose mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium">Interactive Map</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose hover:underline text-sm"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-cream rounded-3xl p-8 lg:p-10 shadow-xl">
            <div className="mb-8">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                Send Us a Message
              </h3>
              <p className="text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="rounded-xl border-border bg-white focus:border-rose focus:ring-rose"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="rounded-xl border-border bg-white focus:border-rose focus:ring-rose"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+62 878 2583 0959"
                  className="rounded-xl border-border bg-white focus:border-rose focus:ring-rose"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your flower needs..."
                  rows={4}
                  className="rounded-xl border-border bg-white focus:border-rose focus:ring-rose resize-none"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full py-6 bg-rose hover:bg-rose-dark text-white shadow-lg hover:shadow-rose/30 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>

            {/* WhatsApp Alternative */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-center text-muted-foreground text-sm mb-4">
                Or contact us directly via WhatsApp
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-2 border-sage text-sage hover:bg-sage hover:text-white transition-all duration-300"
              >
                <a
                  href="https://wa.me/6287825830959?text=Hello,%20I'd%20like%20to%20inquire%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
