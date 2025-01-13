import React from 'react';

interface ManagerInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ManagerInput({ value, onChange }: ManagerInputProps) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="اكتب اسم المدير هنا"
        className="w-full p-2 border border-gray-300 rounded-md text-right"
        dir="rtl"
      />
    </div>
  );
}
