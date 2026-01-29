"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, MoreHorizontal, Edit, Trash2, Loader2, Eye, EyeOff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AddAddonDialog } from "./add-addon-dialog";
import { EditAddonDialog } from "./edit-addon-dialog";
import { getAddons, deleteAddon, toggleAddonStatus, type Addon } from "./actions";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function AddonsPage() {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingAddon, setEditingAddon] = useState<Addon | null>(null);

  const fetchAddons = async () => {
    setLoading(true);
    const result = await getAddons();
    setAddons(result.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAddons();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this add-on?")) return;
    await deleteAddon(id);
    fetchAddons();
  };

  const handleToggleStatus = async (id: string, currentlyActive: boolean) => {
    await toggleAddonStatus(id, !currentlyActive);
    fetchAddons();
  };

  const filteredAddons = addons.filter((addon) => {
    return addon.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
            Add-ons
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage chocolates, teddy bears, and other extras
          </p>
        </div>
        <AddAddonDialog onSuccess={fetchAddons} />
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search add-ons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-rose" />
        </div>
      ) : (
        /* Addons Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAddons.map((addon) => (
            <div
              key={addon.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={addon.image_url || "/images/placeholder.jpg"}
                  alt={addon.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="rounded-lg"
                    onClick={() => setEditingAddon(addon)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="rounded-lg"
                    onClick={() => handleDelete(addon.id!)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {/* Inactive overlay indicator */}
                {!addon.is_active && (
                  <div className="absolute inset-0 bg-gray-800/60 flex items-center justify-center">
                    <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Inactive
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-medium text-lg truncate">{addon.name}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 rounded-xl">
                      <DropdownMenuItem
                        onClick={() => setEditingAddon(addon)}
                        className="cursor-pointer"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleToggleStatus(addon.id!, addon.is_active!)}
                        className="cursor-pointer"
                      >
                        {addon.is_active ? (
                          <>
                            <EyeOff className="w-4 h-4 mr-2" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-2" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(addon.id!)}
                        className="text-red-600 focus:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-rose font-semibold mb-1">{formatPrice(addon.price)}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
                  {addon.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredAddons.length === 0 && (
        <div className="text-center py-20">
          <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-1">No add-ons found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? "Try a different search term" : "Add your first add-on to get started"}
          </p>
        </div>
      )}

      {/* Edit Addon Dialog */}
      <EditAddonDialog
        addon={editingAddon}
        isOpen={!!editingAddon}
        onClose={() => setEditingAddon(null)}
        onSuccess={fetchAddons}
      />
    </div>
  );
}
