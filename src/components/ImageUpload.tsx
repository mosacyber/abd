import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImagesChange: (images: string[]) => void;
  onLimitExceeded: () => void;
  maxImages?: number;
}

export function ImageUpload({ onImagesChange, onLimitExceeded, maxImages = 4 }: ImageUploadProps) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > maxImages) {
      onLimitExceeded();
      return;
    }

    Promise.all(
      files.map(file => new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      }))
    ).then(images => onImagesChange(images));
  };

  return (
    <div className="mb-4">
      <label className="flex items-center justify-center w-full p-2 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 cursor-pointer">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          max={maxImages}
        />
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-6 h-6 text-gray-500" />
          <span className="text-sm text-gray-600">اختر حتى {maxImages} صور</span>
        </div>
      </label>
    </div>
  );
}
