import Image from "next/image";
import { Package, Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const products = [
  { id: 1, name: "Violet Blossom", price: 850000, stock: 12, category: "Bouquets", image: "/images/bouquets/IMG20251213170623.jpg" },
  { id: 2, name: "Pink Paradise", price: 1200000, stock: 8, category: "Bouquets", image: "/images/bouquets/IMG20251217142845.jpg" },
  { id: 3, name: "Pastel Haze", price: 950000, stock: 15, category: "Bouquets", image: "/images/bouquets/IMG20251217151154.jpg" },
  { id: 4, name: "Rose Royale", price: 2500000, stock: 5, category: "Premium", image: "/images/bouquets/IMG20251222164127.jpg" },
  { id: 5, name: "Blush Rose Box", price: 750000, stock: 20, category: "Box", image: "/images/bouquets/IMG20251224202736.jpg" },
  { id: 6, name: "Sunny Cheer", price: 680000, stock: 18, category: "Bouquets", image: "/images/bouquets/IMG20251226095117.jpg" },
  { id: 7, name: "Sunshine Love", price: 720000, stock: 10, category: "Box", image: "/images/bouquets/IMG-20251226-WA0009.jpg" },
  { id: 8, name: "Cinta Kuning", price: 650000, stock: 14, category: "Bouquets", image: "/images/bouquets/IMG-20251231-WA0014.jpg" },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
            Products
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your flower collection
          </p>
        </div>
        <Button className="bg-rose hover:bg-rose-dark text-white rounded-xl">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10 rounded-xl"
          />
        </div>
        <Button variant="outline" className="rounded-xl">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="relative aspect-square bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <Button size="sm" variant="secondary" className="rounded-lg">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive" className="rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-foreground">{product.name}</h3>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {product.category}
                </span>
              </div>
              <p className="text-rose font-semibold">{formatPrice(product.price)}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Package className="w-4 h-4" />
                  <span>{product.stock} in stock</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
