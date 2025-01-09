import React from 'react';

interface EventNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function EventNameInput({ value, onChange }: EventNameInputProps) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="اكتب اسم الفعالية هنا"
        className="w-full p-2 border border-gray-300 rounded-md text-right"
        dir="rtl"
      />
    </div>
  );
}