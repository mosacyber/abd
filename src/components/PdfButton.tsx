import React from 'react';
import { FileDown } from 'lucide-react';

interface PdfButtonProps {
  onDownloadPdf: () => void;
  disabled?: boolean;
}

export function PdfButton({ onDownloadPdf, disabled }: PdfButtonProps) {
  return (
    <button
      onClick={onDownloadPdf}
      disabled={disabled}
      className={`mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors w-full ${
        disabled 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-red-600 hover:bg-red-700 text-white'
      }`}
    >
      <FileDown size={20} />
      تحميل PDF
    </button>
  );
}