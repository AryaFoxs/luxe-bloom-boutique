"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Upload, X, Crop } from "lucide-react";
import { updateProduct, type Product } from "./actions";
import Image from "next/image";
import { ImageCropDialog } from "@/components/ui/image-crop-dialog";

const categories = ["Bouquets", "Artificial", "Premium", "Box", "Arrangement", "Wedding"];

interface EditProductDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function EditProductDialog({ product, isOpen, onClose, onSuccess }: EditProductDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Crop dialog state
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isPromo, setIsPromo] = useState(false);

  // Initialize form when product changes
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(String(product.price) || "");
      setOriginalPrice(product.original_price ? String(product.original_price) : "");
      setCategory(product.category || "");
      setIsPromo(product.is_promo || false);
      setImagePreview(product.image_url || null);
      setImageFile(null);
    }
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImageSrc(reader.result as string);
        setShowCropDialog(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedBlob: Blob) => {
    const croppedFile = new File([croppedBlob], "cropped-image.jpg", {
      type: "image/jpeg",
    });
    setImageFile(croppedFile);
    
    const previewUrl = URL.createObjectURL(croppedBlob);
    setImagePreview(previewUrl);
    setTempImageSrc(null);
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product?.id) return;
    
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("id", product.id);
      
      if (imageFile) {
        formData.set("image", imageFile);
      }
      
      const result = await updateProduct(formData);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setLoading(false);
      onClose();
      onSuccess?.();
      
      window.location.reload();
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Edit Product</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                Product Image
                <span className="text-xs text-muted-foreground font-normal">(will be cropped to square)</span>
              </label>
              <div className="relative">
                {imagePreview ? (
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    {/* Overlay to change image - z-10 */}
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10">
                      <div className="text-center text-white">
                        <Upload className="w-6 h-6 mx-auto mb-1" />
                        <span className="text-sm">Change Image</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {/* Crop and remove buttons - z-20 (above overlay) */}
                    <div className="absolute top-2 right-2 flex gap-1 z-20">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setTempImageSrc(imagePreview);
                          setShowCropDialog(true);
                        }}
                        className="p-1.5 bg-white rounded-full shadow-lg hover:bg-gray-100"
                        title="Re-crop image"
                      >
                        <Crop className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          clearImage();
                        }}
                        className="p-1.5 bg-white rounded-full shadow-lg hover:bg-gray-100"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-rose/50 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload image</span>
                    <span className="text-xs text-gray-400 mt-1">Image will be cropped to square</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Product Name</label>
              <Input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Rose Elegance"
                required
                className="rounded-xl"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product..."
                required
                className="rounded-xl min-h-[100px]"
              />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Sale Price (IDR)</label>
                <Input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="850000"
                  required
                  min="0"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Original Price <span className="text-muted-foreground">(optional)</span>
                </label>
                <Input
                  type="number"
                  name="original_price"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="1000000"
                  min="0"
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white focus:border-rose focus:ring-1 focus:ring-rose outline-none"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Promo Toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="is_promo"
                value="true"
                id="edit_is_promo"
                checked={isPromo}
                onChange={(e) => setIsPromo(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-rose focus:ring-rose"
              />
              <label htmlFor="edit_is_promo" className="text-sm font-medium text-foreground">
                Mark as promotional product (shows PROMO badge)
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-rose hover:bg-rose-dark text-white rounded-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Image Crop Dialog */}
      {tempImageSrc && (
        <ImageCropDialog
          imageSrc={tempImageSrc}
          isOpen={showCropDialog}
          onClose={() => {
            setShowCropDialog(false);
            setTempImageSrc(null);
          }}
          onCropComplete={handleCropComplete}
          aspectRatio={1}
        />
      )}
    </>
  );
}
