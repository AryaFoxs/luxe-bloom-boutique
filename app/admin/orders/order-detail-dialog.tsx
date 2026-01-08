"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, User, Phone, Mail, MapPin, FileText, Package, Calendar, Printer, ChevronDown } from "lucide-react";
import { updateOrderStatus, updateOrder, type Order, type OrderItem } from "./actions";

interface OrderDetailDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const statusConfig: Record<string, { color: string; bg: string }> = {
  pending: { color: "text-yellow-700", bg: "bg-yellow-100" },
  processing: { color: "text-blue-700", bg: "bg-blue-100" },
  completed: { color: "text-green-700", bg: "bg-green-100" },
  cancelled: { color: "text-red-700", bg: "bg-red-100" },
};

export function OrderDetailDialog({ order, isOpen, onClose, onSuccess }: OrderDetailDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState(order?.notes || "");
  const [editingNotes, setEditingNotes] = useState(false);

  if (!order) return null;

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await updateOrderStatus(order.id!, newStatus as Order["status"]);
      
      if (result.error) {
        setError(result.error);
      } else {
        onSuccess?.();
      }
    } catch (err) {
      setError("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await updateOrder(order.id!, { notes });
      
      if (result.error) {
        setError(result.error);
      } else {
        setEditingNotes(false);
        onSuccess?.();
      }
    } catch (err) {
      setError("Failed to save notes");
    } finally {
      setLoading(false);
    }
  };

  const items = (order.items || []) as OrderItem[];
  const statusStyle = statusConfig[order.status] || statusConfig.pending;

  const getItemTotal = (item: OrderItem): number => {
    const addonsTotal = (item.addons || []).reduce((sum, a) => sum + a.price, 0);
    return (item.price + addonsTotal) * item.quantity;
  };

  // Print Receipt (80mm thermal)
  const handlePrintReceipt = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Format simple date for receipt
    const receiptDate = new Date(order.created_at!).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Format price without currency symbol for compact display
    const formatReceiptPrice = (price: number) => {
      return new Intl.NumberFormat("id-ID").format(price);
    };

    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt ${order.order_number}</title>
        <style>
          @page {
            size: 80mm auto;
            margin: 0;
          }
          * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
          }
          body { 
            font-family: 'Courier New', monospace; 
            font-size: 12px;
            width: 72mm;
            padding: 5mm;
            line-height: 1.4;
          }
          .center { text-align: center; }
          .right { text-align: right; }
          .bold { font-weight: bold; }
          .divider {
            border-top: 1px dashed #000;
            margin: 8px 0;
          }
          .double-divider {
            border-top: 2px solid #000;
            margin: 8px 0;
          }
          .header {
            text-align: center;
            margin-bottom: 10px;
          }
          .header h1 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 2px;
          }
          .header p {
            font-size: 10px;
          }
          .info {
            margin: 8px 0;
            font-size: 11px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
          }
          .item {
            margin: 6px 0;
          }
          .item-name {
            font-weight: bold;
          }
          .item-detail {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            padding-left: 10px;
          }
          .addon {
            font-size: 10px;
            padding-left: 10px;
            color: #555;
          }
          .summary {
            margin-top: 8px;
          }
          .summary-row {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            font-weight: bold;
            margin-top: 5px;
          }
          .footer {
            text-align: center;
            margin-top: 15px;
            font-size: 10px;
          }
          .notes {
            margin-top: 8px;
            font-size: 10px;
            padding: 5px;
            border: 1px dashed #000;
          }
          @media print {
            body {
              width: 72mm;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>LUXE BLOOM BOUTIQUE</h1>
          <p>Premium Flower Boutique</p>
          <p>Bali, Indonesia</p>
        </div>
        
        <div class="divider"></div>
        
        <div class="info">
          <div class="info-row">
            <span>No:</span>
            <span class="bold">${order.order_number}</span>
          </div>
          <div class="info-row">
            <span>Date:</span>
            <span>${receiptDate}</span>
          </div>
          <div class="info-row">
            <span>Customer:</span>
            <span>${order.customer_name}</span>
          </div>
          ${order.customer_phone ? `
          <div class="info-row">
            <span>Phone:</span>
            <span>${order.customer_phone}</span>
          </div>
          ` : ""}
        </div>
        
        <div class="double-divider"></div>
        
        ${items.map(item => `
          <div class="item">
            <div class="item-name">${item.productName}</div>
            <div class="item-detail">
              <span>${item.quantity}x Rp ${formatReceiptPrice(item.price)}</span>
              <span>Rp ${formatReceiptPrice(item.price * item.quantity)}</span>
            </div>
            ${item.addons && item.addons.length > 0 ? item.addons.map(addon => `
              <div class="item-detail addon">
                <span>+ ${addon.name}</span>
                <span>Rp ${formatReceiptPrice(addon.price * item.quantity)}</span>
              </div>
            `).join("") : ""}
          </div>
        `).join("")}
        
        <div class="double-divider"></div>
        
        <div class="summary">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>Rp ${formatReceiptPrice(order.subtotal)}</span>
          </div>
          ${order.discount > 0 ? `
          <div class="summary-row">
            <span>Discount</span>
            <span>-Rp ${formatReceiptPrice(order.discount)}</span>
          </div>
          ` : ""}
          <div class="divider"></div>
          <div class="total-row">
            <span>TOTAL</span>
            <span>Rp ${formatReceiptPrice(order.total)}</span>
          </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="footer">
          <p class="bold">Thank You!</p>
          <p>www.luxebloomboutique.com</p>
        </div>
        
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
  };

  // Download Invoice as PNG (for customer)
  const handlePrintInvoice = async () => {
    // Dynamically import html2canvas
    const html2canvas = (await import("html2canvas")).default;

    // Create a temporary container
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = "800px";
    container.style.backgroundColor = "white";
    
    container.innerHTML = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto; background: white; display: flex;">
        <!-- Left Accent Bar -->
        <div style="width: 8px; background: linear-gradient(180deg, #e91e63, #9c27b0); flex-shrink: 0;"></div>
        
        <!-- Main Content -->
        <div style="flex: 1; padding: 40px;">
          <!-- Header Row -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px;">
            <div>
              <h1 style="font-size: 32px; color: #1a1a1a; margin: 0; font-weight: 300; letter-spacing: -1px;">INVOICE</h1>
              <p style="color: #e91e63; font-size: 14px; margin: 5px 0 0 0; font-weight: 600;">${order.order_number}</p>
            </div>
            <div style="text-align: right;">
              <img src="/Logo Luxe Bloom Boutique.jpeg" alt="Logo" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;" />
            </div>
          </div>
          
          <!-- Info Section -->
          <div style="display: flex; justify-content: space-between; margin-bottom: 35px; padding-bottom: 25px; border-bottom: 1px solid #eee;">
            <div>
              <p style="color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Bill To</p>
              <p style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin: 0;">${order.customer_name}</p>
              ${order.customer_phone ? `<p style="color: #666; font-size: 13px; margin: 4px 0 0 0;">${order.customer_phone}</p>` : ""}
              ${order.customer_email ? `<p style="color: #666; font-size: 13px; margin: 2px 0 0 0;">${order.customer_email}</p>` : ""}
              ${order.customer_address ? `<p style="color: #666; font-size: 13px; margin: 2px 0 0 0;">${order.customer_address}</p>` : ""}
            </div>
            <div style="text-align: right;">
              <p style="color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Invoice Date</p>
              <p style="color: #1a1a1a; font-size: 14px; margin: 0;">${formatDate(order.created_at!)}</p>
              <p style="color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 15px 0 8px 0;">Status</p>
              <p style="color: #e91e63; font-size: 14px; font-weight: 600; margin: 0;">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
            </div>
          </div>
          
          <!-- Items Table -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <thead>
              <tr style="border-bottom: 2px solid #1a1a1a;">
                <th style="padding: 12px 0; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #1a1a1a; font-weight: 600;">Description</th>
                <th style="padding: 12px 0; text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #1a1a1a; font-weight: 600; width: 60px;">Qty</th>
                <th style="padding: 12px 0; text-align: right; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #1a1a1a; font-weight: 600; width: 120px;">Price</th>
                <th style="padding: 12px 0; text-align: right; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #1a1a1a; font-weight: 600; width: 120px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr style="border-bottom: 1px solid #f0f0f0;">
                  <td style="padding: 14px 0; font-size: 14px; color: #1a1a1a;">${item.productName}</td>
                  <td style="padding: 14px 0; font-size: 14px; text-align: center; color: #666;">${item.quantity}</td>
                  <td style="padding: 14px 0; font-size: 14px; text-align: right; color: #666;">${formatPrice(item.price)}</td>
                  <td style="padding: 14px 0; font-size: 14px; text-align: right; color: #1a1a1a; font-weight: 500;">${formatPrice(item.price * item.quantity)}</td>
                </tr>
                ${item.addons && item.addons.length > 0 ? item.addons.map(addon => `
                <tr style="border-bottom: 1px solid #f0f0f0;">
                  <td style="padding: 10px 0 10px 20px; font-size: 13px; color: #888;">↳ ${addon.name}</td>
                  <td style="padding: 10px 0; font-size: 13px; text-align: center; color: #888;">${item.quantity}</td>
                  <td style="padding: 10px 0; font-size: 13px; text-align: right; color: #888;">${formatPrice(addon.price)}</td>
                  <td style="padding: 10px 0; font-size: 13px; text-align: right; color: #666;">${formatPrice(addon.price * item.quantity)}</td>
                </tr>
                `).join("") : ""}
              `).join("")}
            </tbody>
          </table>
          
          <!-- Summary -->
          <div style="display: flex; justify-content: flex-end;">
            <div style="width: 280px;">
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                <span style="color: #666; font-size: 14px;">Subtotal</span>
                <span style="color: #1a1a1a; font-size: 14px;">${formatPrice(order.subtotal)}</span>
              </div>
              ${order.discount > 0 ? `
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                <span style="color: #666; font-size: 14px;">Discount</span>
                <span style="color: #22c55e; font-size: 14px;">-${formatPrice(order.discount)}</span>
              </div>
              ` : ""}
              <div style="display: flex; justify-content: space-between; padding: 15px 0; background: #fce4ec; margin: 10px -15px -10px -15px; padding: 15px;">
                <span style="color: #1a1a1a; font-size: 16px; font-weight: 600;">Total</span>
                <span style="color: #e91e63; font-size: 20px; font-weight: 700;">${formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
          
          ${order.notes ? `
          <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-left: 3px solid #e91e63;">
            <p style="color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0;">Notes</p>
            <p style="color: #666; font-size: 13px; margin: 0;">${order.notes}</p>
          </div>
          ` : ""}
          
          <!-- Footer -->
          <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #1a1a1a; font-size: 14px; font-weight: 600; margin: 0;">Luxe Bloom Boutique</p>
            <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">Premium Flower Arrangements | www.luxebloomboutique.com</p>
            <p style="color: #e91e63; font-size: 12px; margin: 10px 0 0 0;">Thank you for your order! 🌸</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      // Create download link
      const link = document.createElement("a");
      link.download = `Invoice-${order.order_number}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("Failed to generate invoice. Please try again.");
    } finally {
      document.body.removeChild(container);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="font-serif text-2xl">{order.order_number}</DialogTitle>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {formatDate(order.created_at!)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                  >
                    <Printer className="w-4 h-4 mr-1" />
                    Print
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handlePrintReceipt} className="cursor-pointer">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Receipt (80mm)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handlePrintInvoice} className="cursor-pointer">
                    <FileText className="w-4 h-4 mr-2" />
                    Print Invoice (To Cust)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusStyle.bg} ${statusStyle.color}`}>
                {order.status}
              </span>
            </div>
          </div>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6 mt-2">
          {/* Status Update */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-rose" />
              Update Status
            </h3>
            <Select
              value={order.status}
              onValueChange={handleStatusChange}
              disabled={loading}
            >
              <SelectTrigger className="rounded-xl bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">🟡 Pending</SelectItem>
                <SelectItem value="processing">🔵 Processing</SelectItem>
                <SelectItem value="completed">🟢 Completed</SelectItem>
                <SelectItem value="cancelled">🔴 Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Customer Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-rose" />
              Customer Information
            </h3>
            <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-rose" />
                </div>
                <div>
                  <p className="font-semibold">{order.customer_name}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                {order.customer_phone && (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{order.customer_phone}</span>
                  </div>
                )}
                {order.customer_email && (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{order.customer_email}</span>
                  </div>
                )}
              </div>

              {order.customer_address && (
                <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="whitespace-pre-line">{order.customer_address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Package className="w-4 h-4 text-rose" />
              Order Items
            </h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    {item.image && (
                      <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/images/placeholder.jpg"}
                          alt={item.productName}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-rose font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.quantity}x {formatPrice(item.price)}</p>
                    </div>
                  </div>

                  {/* Add-ons */}
                  {item.addons && item.addons.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Add-ons</p>
                      <div className="space-y-1">
                        {item.addons.map((addon, addonIdx) => (
                          <div key={addonIdx} className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">+ {addon.name}</span>
                            <span className="text-rose">{formatPrice(addon.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between text-sm">
                    <span className="text-muted-foreground">Item Total</span>
                    <span className="font-semibold">{formatPrice(getItemTotal(item))}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-green-600">-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-rose">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose" />
                Notes
              </h3>
              {!editingNotes && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setNotes(order.notes || "");
                    setEditingNotes(true);
                  }}
                >
                  Edit
                </Button>
              )}
            </div>
            {editingNotes ? (
              <div className="space-y-2">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes..."
                  className="rounded-xl min-h-[80px]"
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingNotes(false)}>
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveNotes}
                    disabled={loading}
                    className="bg-rose hover:bg-rose-dark text-white"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">
                  {order.notes || "No notes added."}
                </p>
              </div>
            )}
          </div>

          {/* Close Button */}
          <Button variant="outline" onClick={onClose} className="w-full rounded-xl">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
