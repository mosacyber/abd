interface ImageGridConfig {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function drawImages(
  ctx: CanvasRenderingContext2D,
  images: string[],
  config: ImageGridConfig
): Promise<void> {
  const { x, y, width, height } = config;
  const imageCount = images.length;
  
  if (imageCount === 0) return;

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.src = src;
    });
  };

  const loadedImages = await Promise.all(images.map(loadImage));

  // Adjusted dimensions and positions for different image counts
  switch (imageCount) {
    case 1:
      // Single image takes full width and height
      ctx.drawImage(loadedImages[0], x, y, width, height);
      break;
    
    case 2:
      // Two images side by side
      const halfWidth = width / 2 - 1;
      ctx.drawImage(loadedImages[0], x, y, halfWidth, height);
      ctx.drawImage(loadedImages[1], x + halfWidth + 2, y, halfWidth, height);
      break;
    
    case 3:
    case 4:
      // Grid layout 2x2
      const quarterWidth = width / 2 - 1;
      const quarterHeight = height / 2 - 1;
      
      // Top left
      ctx.drawImage(loadedImages[0], x, y, quarterWidth, quarterHeight);
      // Top right
      ctx.drawImage(loadedImages[1], x + quarterWidth + 2, y, quarterWidth, quarterHeight);
      
      if (imageCount >= 3) {
        // Bottom left
        ctx.drawImage(loadedImages[2], x, y + quarterHeight + 2, quarterWidth, quarterHeight);
      }
      
      if (imageCount === 4) {
        // Bottom right
        ctx.drawImage(loadedImages[3], x + quarterWidth + 2, y + quarterHeight + 2, quarterWidth, quarterHeight);
      }
      break;
  }
}

export function downloadCanvasImage(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;
  
  const link = document.createElement('a');
  link.download = 'school-image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}