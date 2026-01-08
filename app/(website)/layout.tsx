import { Navbar, Footer } from "@/components/layout";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}

