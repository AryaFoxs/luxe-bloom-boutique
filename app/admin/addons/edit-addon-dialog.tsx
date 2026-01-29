"use client";

import { useEffect, useState } from "react";
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
import { updateAddon, type Addon } from "./actions";
import Image from "next/image";
import { ImageCropDialog } from "@/components/ui/image-crop-dialog";

interface EditAddonDialogProps {
  addon: Addon | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function EditAddonDialog({ addon, isOpen, onClose, onSuccess }: EditAddonDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Crop dialog state
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (addon) {
      setImagePreview(addon.image_url);
      setImageFile(null);
      setError(null);
    }
  }, [addon]);

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
    const croppedFile = new File([croppedBlob], "addon-image.jpg", {
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
    if (!addon) return;
    
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      formData.set("id", addon.id!);
      
      if (imageFile) {
        formData.set("image", imageFile);
      }
      
      const result = await updateAddon(formData);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setLoading(false);
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Error updating addon:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Edit Add-on</DialogTitle>
          </DialogHeader>

          {addon && (
            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  Add-on Image
                  <span className="text-xs text-muted-foreground font-normal">(square aspect ratio recommended)</span>
                </label>
                <div className="relative">
                  {imagePreview ? (
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
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
                        >
                          <Crop className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={clearImage}
                          className="p-1.5 bg-white rounded-full shadow-lg hover:bg-gray-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-rose/50 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Click to upload image</span>
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
                <label className="text-sm font-medium text-foreground">Add-on Name</label>
                <Input
                  name="name"
                  defaultValue={addon.name}
                  placeholder="e.g., Ferrero Rocher Box"
                  required
                  className="rounded-xl"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea
                  name="description"
                  defaultValue={addon.description}
                  placeholder="Describe the add-on..."
                  className="rounded-xl min-h-[80px]"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Price (IDR)</label>
                <Input
                  type="number"
                  name="price"
                  defaultValue={addon.price}
                  placeholder="150000"
                  required
                  min="0"
                  className="rounded-xl"
                />
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
          )}
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
