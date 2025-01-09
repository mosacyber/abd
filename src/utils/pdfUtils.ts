import jsPDF from 'jspdf';

export function downloadCanvasAsPdf(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;
  
  // Create new PDF in A4 format with portrait orientation
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height]
  });
  
  // Get the canvas data URL
  const imageData = canvas.toDataURL('image/png');
  
  // Add the image to the PDF, rotating as needed
  pdf.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);
  
  // Download the PDF
  pdf.save('school-image.pdf');
}