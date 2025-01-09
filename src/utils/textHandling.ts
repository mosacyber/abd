export function wrapArabicText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxHeight: number,
  lineHeight: number,
  initialFontSize: number
): { lines: string[], fontSize: number } {
  let fontSize = initialFontSize;
  let lines: string[] = [];
  
  // تقسيم النص إلى فقرات باستخدام فاصل السطر الجديد
  const paragraphs = text.split('\n');
  
  // البحث عن حجم الخط المناسب
  while (fontSize >= 12) {
    lines = [];
    ctx.font = `${fontSize}px Rubik`;
    
    for (const paragraph of paragraphs) {
      if (!paragraph.trim()) {
        lines.push('');
        continue;
      }

      const words = paragraph.trim().split(' ').reverse();
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine ? `${word} ${currentLine}` : word;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      
      if (currentLine) {
        lines.push(currentLine);
      }
      
      // إضافة سطر فارغ بين الفقرات إذا كانت هناك فقرات متعددة
      if (paragraphs.length > 1) {
        lines.push('');
      }
    }
    
    // حساب الارتفاع الكلي للنص
    const totalHeight = lines.length * (fontSize * lineHeight);
    
    if (totalHeight <= maxHeight) {
      break;
    }
    
    fontSize--;
  }
  
  // إزالة السطور الفارغة المتتالية والسطر الفارغ الأخير
  const cleanedLines = lines.filter((line, index) => {
    if (index === lines.length - 1) return line.trim() !== '';
    return !(line.trim() === '' && lines[index + 1]?.trim() === '');
  });
  
  return { lines: cleanedLines, fontSize };
}