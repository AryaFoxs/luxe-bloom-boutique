"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, Filter, MoreHorizontal, Edit, Trash2, Loader2, Eye, EyeOff, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddProductDialog } from "./add-product-dialog";
import { EditProductDialog } from "./edit-product-dialog";
import { getProducts, deleteProduct, toggleProductVisibility, type Product } from "./actions";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const result = await getProducts();
    setProducts(result.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await deleteProduct(id);
    fetchProducts();
  };

  const handleToggleVisibility = async (id: string, currentlyHidden: boolean) => {
    await toggleProductVisibility(id, !currentlyHidden);
    fetchProducts();
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        <AddProductDialog onSuccess={fetchProducts} />
      </div>

      {/* Filters & Tabs */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 border-b border-gray-100">
          {["All", "Bouquets", "Artificial"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedCategory(tab)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors relative",
                selectedCategory === tab
                  ? "text-rose"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
              {selectedCategory === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose" />
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
          <Button variant="outline" className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-rose" />
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={product.image_url || "/images/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="rounded-lg"
                    onClick={() => setEditingProduct(product as Product)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="rounded-lg"
                    onClick={() => handleDelete(product.id!)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {/* Hidden overlay indicator */}
                {product.is_hidden && (
                  <div className="absolute inset-0 bg-gray-800/60 flex items-center justify-center">
                    <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Hidden
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-lg">{product.name}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 rounded-xl">
                      <DropdownMenuItem
                        onClick={() => setEditingProduct(product)}
                        className="cursor-pointer"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleToggleVisibility(product.id!, !product.is_hidden)}
                        className="cursor-pointer"
                      >
                        {product.is_hidden ? (
                          <>
                            <Eye className="w-4 h-4 mr-2" />
                            Show
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4 mr-2" />
                            Hide
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(product.id!)}
                        className="text-red-600 focus:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-rose font-semibold">{formatPrice(product.price)}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-muted-foreground rounded-full">
                      {product.category}
                    </span>
                    {product.is_promo && (
                      <span className="text-xs px-2 py-0.5 bg-rose/10 text-rose font-medium rounded-full">
                        PROMO
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-1">No products found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? "Try a different search term" : "Add your first product to get started"}
          </p>
        </div>
      )}

      {/* Edit Product Dialog */}
      <EditProductDialog
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSuccess={fetchProducts}
      />
    </div>
  );
}

