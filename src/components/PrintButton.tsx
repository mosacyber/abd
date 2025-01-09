import React from 'react';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  onPrint: () => void;
  disabled?: boolean;
}

export function PrintButton({ onPrint, disabled }: PrintButtonProps) {
  return (
    <button
      onClick={onPrint}
      disabled={disabled}
      className={`mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors w-full ${
        disabled 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-green-600 hover:bg-green-700 text-white'
      }`}
    >
      <Printer size={20} />
      طباعة الصورة
    </button>
  );
}