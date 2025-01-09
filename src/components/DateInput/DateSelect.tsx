import React from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

interface DateSelectProps {
  value: number | null;
  onChange: (value: number) => void;
  options: number[];
  placeholder: string;
  label?: string;
  className?: string;
}

export function DateSelect({ value, onChange, options, placeholder, className = '' }: DateSelectProps) {
  return (
    <div className={`relative ${className}`}>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-right flex justify-between items-center">
            <ChevronDown className="w-4 h-4 text-gray-500" />
            <span>{value ?? placeholder}</span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className={({ active }) =>
                  `cursor-pointer p-2 ${active ? 'bg-gray-100' : ''} text-right`
                }
              >
                {option}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}