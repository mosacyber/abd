import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: 'text' | 'number';
  multiline?: boolean;
}

export function TextInput({ value, onChange, placeholder, type = 'text', multiline = false }: TextInputProps) {
  if (multiline) {
    return (
      <div className="mb-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded-md text-right resize-y"
          dir="rtl"
          rows={4}
        />
      </div>
    );
  }

  return (
    <div className="mb-4">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md text-right"
        dir="rtl"
      />
    </div>
  );
}
