"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2, Trash2, Search, Minus, X, Gift, User, Phone, Mail, MapPin, FileText, ChevronRight, ChevronLeft } from "lucide-react";
import { createOrder, type OrderItem } from "./actions";
import { getProducts, type Product } from "../products/actions";
import { getActiveAddons, type Addon } from "@/lib/services/products";

interface AddOrderDialogProps {
  onSuccess?: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function AddOrderDialog({ onSuccess }: AddOrderDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // Products from database
  const [products, setProducts] = useState<Product[]>([]);
  const [productSearch, setProductSearch] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);
  
  // Form state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [discount, setDiscount] = useState(0);
  
  // Add-ons from database
  const [availableAddons, setAvailableAddons] = useState<Addon[]>([]);
  
  // Order items with add-ons
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (open) {
      fetchProducts();
    }
  }, [open]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const result = await getProducts();
    if (result.data) {
      setProducts(result.data.filter((p: Product) => !p.is_hidden));
    }
    
    // Also fetch addons
    const addonsData = await getActiveAddons();
    setAvailableAddons(addonsData);
    
    setLoadingProducts(false);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const addProduct = (product: Product) => {
    const existingIndex = orderItems.findIndex(
      (item) => item.productId === product.id
    );
    
    if (existingIndex >= 0) {
      const newItems = [...orderItems];
      newItems[existingIndex].quantity += 1;
      setOrderItems(newItems);
    } else {
      setOrderItems([
        ...orderItems,
        {
          productId: product.id!,
          productName: product.name,
          price: product.price,
          quantity: 1,
          image: product.image_url,
          addons: [],
        },
      ]);
    }
    setProductSearch("");
  };

  const updateQuantity = (index: number, delta: number) => {
    const newItems = [...orderItems];
    newItems[index].quantity = Math.max(1, newItems[index].quantity + delta);
    setOrderItems(newItems);
  };

  const removeItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const toggleAddon = (itemIndex: number, addon: { name: string; price: number }) => {
    const newItems = [...orderItems];
    const currentAddons = newItems[itemIndex].addons || [];
    const addonIndex = currentAddons.findIndex((a) => a.name === addon.name);
    
    if (addonIndex >= 0) {
      newItems[itemIndex].addons = currentAddons.filter((_, i) => i !== addonIndex);
    } else {
      newItems[itemIndex].addons = [...currentAddons, addon];
    }
    setOrderItems(newItems);
  };

  const getItemTotal = (item: OrderItem): number => {
    const addonsTotal = (item.addons || []).reduce((sum, a) => sum + a.price, 0);
    return (item.price + addonsTotal) * item.quantity;
  };

  const subtotal = orderItems.reduce((sum, item) => sum + getItemTotal(item), 0);
  const total = Math.max(0, subtotal - discount);

  const resetForm = () => {
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setCustomerAddress("");
    setNotes("");
    setDiscount(0);
    setOrderItems([]);
    setError(null);
    setStep(1);
  };

  const handleSubmit = async () => {
    if (orderItems.length === 0) {
      setError("Please add at least one product to the order.");
      return;
    }
    if (!customerName.trim()) {
      setError("Customer name is required.");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const result = await createOrder({
        customer_name: customerName,
        customer_phone: customerPhone || undefined,
        customer_email: customerEmail || undefined,
        customer_address: customerAddress || undefined,
        items: orderItems,
        subtotal,
        discount,
        total,
        notes: notes || undefined,
      });

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setLoading(false);
      setOpen(false);
      resetForm();
      onSuccess?.();
    } catch (err) {
      console.error("Error creating order:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="bg-rose hover:bg-rose-dark text-white rounded-xl">
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Create New Order</DialogTitle>
          {/* Step Indicator */}
          <div className="flex items-center gap-2 mt-3">
            {[
              { num: 1, label: "Products" },
              { num: 2, label: "Add-ons" },
              { num: 3, label: "Customer" },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setStep(s.num as 1 | 2 | 3)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  step === s.num
                    ? "bg-rose text-white"
                    : step > s.num
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {s.num}. {s.label}
              </button>
            ))}
          </div>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4 mt-2">
          {/* Step 1: Products */}
          {step === 1 && (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products..."
                  className="pl-10 rounded-xl"
                />
              </div>
              
              {loadingProducts ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-rose" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => addProduct(product)}
                      className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-rose hover:shadow-md transition-all text-left"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image_url || "/images/placeholder.jpg"}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <p className="text-rose text-sm font-semibold">{formatPrice(product.price)}</p>
                      </div>
                      <Plus className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              )}

              {/* Selected Items */}
              {orderItems.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium mb-3">Selected Products ({orderItems.length})</h4>
                  <div className="space-y-2">
                    {orderItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/images/placeholder.jpg"}
                            alt={item.productName}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.productName}</p>
                          <p className="text-rose text-sm">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(index, -1)}
                            className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, 1)}
                            className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(index)} className="text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Step 2: Add-ons */}
          {step === 2 && (
            <>
              {orderItems.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  <Gift className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Add products first to select add-ons</p>
                  <Button variant="outline" onClick={() => setStep(1)} className="mt-3">
                    Go to Products
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orderItems.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-gray-50 rounded-xl p-4">
                      <p className="font-medium mb-3 flex items-center gap-2">
                        <Gift className="w-4 h-4 text-rose" />
                        Add-ons for {item.productName}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {availableAddons.map((addon) => {
                          const isSelected = item.addons?.some((a) => a.name === addon.name);
                          return (
                            <button
                              key={addon.id}
                              onClick={() => toggleAddon(itemIndex, { name: addon.name, price: addon.price })}
                              className={`flex items-center justify-between p-3 rounded-lg border transition-colors text-left ${
                                isSelected
                                  ? "border-rose bg-rose/5"
                                  : "border-gray-200 bg-white hover:border-rose"
                              }`}
                            >
                              <span className="text-sm">{addon.name}</span>
                              <span className="text-sm text-rose font-medium">{formatPrice(addon.price)}</span>
                            </button>
                          );
                        })}
                      </div>
                      {item.addons && item.addons.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-muted-foreground">
                            Selected: {item.addons.map((a) => a.name).join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Step 3: Customer Info */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name *</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                    <User className="w-4 h-4 text-gray-400" />
                    <Input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Customer name"
                      className="border-0 bg-transparent focus-visible:ring-0 p-0 h-auto"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <Input
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className="border-0 bg-transparent focus-visible:ring-0 p-0 h-auto"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="customer@email.com"
                    className="border-0 bg-transparent focus-visible:ring-0 p-0 h-auto"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <Textarea
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Delivery address"
                    className="border-0 bg-transparent focus-visible:ring-0 p-0 min-h-[60px]"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
                  <FileText className="w-4 h-4 text-gray-400 mt-1" />
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Order notes (optional)"
                    className="border-0 bg-transparent focus-visible:ring-0 p-0 min-h-[60px]"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <h4 className="font-medium mb-2">Order Summary</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                    min="0"
                    className="w-28 h-8 text-right rounded-lg"
                  />
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-rose">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep((step - 1) as 1 | 2)} className="flex-1 rounded-xl">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button 
              onClick={() => setStep((step + 1) as 2 | 3)} 
              className="flex-1 bg-rose hover:bg-rose-dark text-white rounded-xl"
              disabled={step === 1 && orderItems.length === 0}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={loading || orderItems.length === 0 || !customerName.trim()}
              className="flex-1 bg-rose hover:bg-rose-dark text-white rounded-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Order"
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
