export function calculateFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxHeight: number,
  initialFontSize: number = 20
): number {
  let fontSize = initialFontSize;
  
  do {
    ctx.font = `${fontSize}px Arial`;
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    
    if (textWidth <= maxWidth && fontSize <= maxHeight) {
      break;
    }
    
    fontSize--;
  } while (fontSize > 8); // Minimum font size
  
  return fontSize;
}
