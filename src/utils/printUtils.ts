export function printCanvasImage(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;
  
  const dataUrl = canvas.toDataURL('image/png');
  const printWindow = window.open('', '_blank');
  
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>طباعة الصورة</title>
          <style>
            body {
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" onload="window.print();window.close()">
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
