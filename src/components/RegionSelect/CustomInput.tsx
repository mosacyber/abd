import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
}

export function CustomInput({ value, onChange, onBack }: CustomInputProps) {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ادخل اسم المنطقة"
        className="w-full p-2 border border-gray-300 rounded-md text-right pr-4"
        dir="rtl"
      />
      <button
        onClick={onBack}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>العودة للقائمة</span>
      </button>
    </div>
  );
}
