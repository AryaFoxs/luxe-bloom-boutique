import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.luxebloombali.com'),
  title: "Luxe Bloom Boutique | Premium Florist Bali & Flower Delivery",
  description: "Premium florist in Bali offering fresh flowers for all occasions. Order online for same-day delivery. Luxury bouquets, wedding florals, and custom arrangements.",
  keywords: ["florist Bali", "flower delivery Bali", "bouquets", "wedding flowers Bali", "flower shop Bali", "premium flowers", "Bali florist", "luxury flowers Bali"],
  authors: [{ name: "Luxe Bloom Boutique" }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Luxe Bloom Boutique | Premium Florist Bali & Flower Delivery",
    description: "Premium florist in Bali offering fresh flowers for all occasions. Order online for same-day delivery.",
    type: "website",
    locale: "id_ID",
    siteName: "Luxe Bloom Boutique",
    url: 'https://www.luxebloombali.com',
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe Bloom Boutique | Premium Florist Bali & Flower Delivery",
    description: "Premium florist in Bali offering fresh flowers for all occasions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

