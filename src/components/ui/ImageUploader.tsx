"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";

interface ImageFile {
  file?: File;
  url: string;
  id: string;
}

interface ImageUploaderProps {
  images: ImageFile[];
  onChange: (images: ImageFile[]) => void;
  maxImages?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onChange,
  maxImages = 10,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );

    addFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      addFiles(files);
    }
  };

  const addFiles = (files: File[]) => {
    const newImages: ImageFile[] = files
      .slice(0, maxImages - images.length)
      .map((file) => ({
        file,
        url: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9),
      }));

    onChange([...images, ...newImages]);
  };

  const removeImage = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id);
    onChange(updatedImages);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-purple-500 bg-purple-900/10"
            : "border-zinc-700 hover:border-purple-600 hover:bg-zinc-800/30"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-white mb-1">
              {isDragging
                ? "Drop images here"
                : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-zinc-500">
              PNG, JPG or WEBP (Max {maxImages} images)
            </p>
          </div>
        </div>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={image.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700">
                <Image
                  src={image.url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Primary Badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 text-xs font-medium bg-purple-600 text-white rounded">
                    Primary
                  </span>
                </div>
              )}

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeImage(image.id)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Helper Text */}
      <p className="text-xs text-zinc-500">
        First image will be used as the primary image. You can upload up to{" "}
        {maxImages} images.
      </p>
    </div>
  );
};
