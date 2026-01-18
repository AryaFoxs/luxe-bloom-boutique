"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, removeAddonFromItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-rose" />
            <h2 className="text-xl font-serif font-semibold">Your Cart</h2>
            {totalItems > 0 && (
              <span className="px-2 py-0.5 bg-rose/10 text-rose text-sm font-medium rounded-full">
                {totalItems} items
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Add some beautiful bouquets to your cart
              </p>
              <Button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-rose hover:bg-rose-dark text-white"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const addonsTotal = item.addons?.reduce((sum, addon) => sum + addon.price * addon.quantity, 0) || 0;
                const itemTotalPrice = (item.price + addonsTotal) * item.quantity;
                
                return (
                  <div
                    key={item.id}
                    className="p-4 bg-gray-50 rounded-2xl"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">
                          {item.name}
                        </h4>
                        <p className="text-rose font-semibold text-sm mt-1">
                          {formatPrice(item.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Add-ons List */}
                    {item.addons && item.addons.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Add-ons:</p>
                        {item.addons.map((addon) => (
                          <div key={addon.id} className="flex justify-between items-center text-sm text-muted-foreground py-1">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => removeAddonFromItem(item.id, addon.id)}
                                className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                title="Remove add-on"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              <span>{addon.name} {addon.quantity > 1 && `x${addon.quantity}`}</span>
                            </div>
                            <span>{formatPrice(addon.price * addon.quantity)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-sm font-medium text-foreground pt-1">
                          <span>Item Total</span>
                          <span className="text-rose">{formatPrice(itemTotalPrice)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-xl font-semibold text-foreground">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                asChild
                className="w-full rounded-full bg-rose hover:bg-rose-dark text-white py-6 text-base"
              >
                <a 
                  href={`https://wa.me/6287825830959?text=${encodeURIComponent(
                    `Hello Luxe Bloom Boutique!\n\nI would like to order:\n\n${items.map(item => {
                      const addonsTotal = item.addons?.reduce((sum, addon) => sum + addon.price * addon.quantity, 0) || 0;
                      const itemTotal = (item.price + addonsTotal) * item.quantity;
                      let text = `- ${item.name} (${item.quantity}x) - ${formatPrice(item.price)}`;
                      if (item.addons && item.addons.length > 0) {
                        text += '\n  Add-ons:';
                        item.addons.forEach(addon => {
                          text += `\n  + ${addon.name}${addon.quantity > 1 ? ` x${addon.quantity}` : ''} - ${formatPrice(addon.price * addon.quantity)}`;
                        });
                        text += `\n  Subtotal: ${formatPrice(itemTotal)}`;
                      }
                      return text;
                    }).join('\n\n')}\n\n*Grand Total: ${formatPrice(totalPrice)}*\n\nPlease confirm availability and process my order. Thank you!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  Proceed to Checkout
                </a>
              </Button>
              <Button
                variant="outline"
                onClick={clearCart}
                className="w-full rounded-full py-6 text-base"
              >
                Clear Cart
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Order via WhatsApp for fastest response
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export function CartButton({ isScrolled = true }: { isScrolled?: boolean }) {
  const { totalItems, setIsOpen } = useCart();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className={`relative p-2 rounded-lg transition-colors ${
        isScrolled 
          ? "text-foreground hover:bg-gray-100" 
          : "text-white hover:bg-white/10"
      }`}
      aria-label="Open cart"
    >
      <ShoppingBag className="w-5 h-5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose text-white text-xs font-medium rounded-full flex items-center justify-center">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}
