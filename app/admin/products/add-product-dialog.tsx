"use client";

import { useState } from "react";
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
import { Plus, Loader2, Upload, X, Crop } from "lucide-react";
import { addProduct } from "./actions";
import Image from "next/image";
import { ImageCropDialog } from "@/components/ui/image-crop-dialog";

const categories = ["Bouquets", "Artificial", "Premium", "Box", "Arrangement", "Wedding"];

export function AddProductDialog({ onSuccess }: { onSuccess?: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Crop dialog state
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Show crop dialog with the image
        setTempImageSrc(reader.result as string);
        setShowCropDialog(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedBlob: Blob) => {
    // Convert blob to File and set preview
    const croppedFile = new File([croppedBlob], "cropped-image.jpg", {
      type: "image/jpeg",
    });
    setImageFile(croppedFile);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(croppedBlob);
    setImagePreview(previewUrl);
    setTempImageSrc(null);
  };

  const clearImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Manually add the stored image file
      if (imageFile) {
        formData.set("image", imageFile);
      }
      
      console.log("Submitting product:", {
        name: formData.get("name"),
        price: formData.get("price"),
        category: formData.get("category"),
        hasImage: !!imageFile,
      });
      
      const result = await addProduct(formData);
      console.log("Add product result:", result);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setLoading(false);
      setOpen(false);
      clearImage();
      onSuccess?.();
      
      // Force page reload to show new product
      window.location.reload();
    } catch (err) {
      console.error("Error adding product:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please check console for details.");
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-rose hover:bg-rose-dark text-white rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Add New Product</DialogTitle>
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
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        type="button"
                        onClick={() => {
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
                        onClick={clearImage}
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
                  placeholder="1000000"
                  min="0"
                  className="rounded-xl"
                />
                <p className="text-xs text-muted-foreground">If set, will show as strikethrough price</p>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <select
                name="category"
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
                id="is_promo"
                className="w-4 h-4 rounded border-gray-300 text-rose focus:ring-rose"
              />
              <label htmlFor="is_promo" className="text-sm font-medium text-foreground">
                Mark as promotional product (shows PROMO badge)
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
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
                    Adding...
                  </>
                ) : (
                  "Add Product"
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
