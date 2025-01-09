import React from 'react';

interface ImageGridProps {
  images: string[];
  containerWidth: number;
  containerHeight: number;
  x: number;
  y: number;
}

export function ImageGrid({ images, containerWidth, containerHeight, x, y }: ImageGridProps) {
  if (images.length === 0) return null;

  const getGridLayout = () => {
    switch (images.length) {
      case 1:
        return "grid-cols-1 grid-rows-1";
      case 2:
        return "grid-cols-2 grid-rows-1";
      case 3:
        return "grid-cols-2 grid-rows-2";
      case 4:
        return "grid-cols-2 grid-rows-2";
      default:
        return "grid-cols-2 grid-rows-2";
    }
  };

  return (
    <div 
      className={`grid ${getGridLayout()} gap-1`}
      style={{ 
        width: containerWidth,
        height: containerHeight,
        position: 'absolute',
        top: y,
        left: x,
      }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Uploaded ${index + 1}`}
          className="w-full h-full object-cover"
        />
      ))}
    </div>
  );
}