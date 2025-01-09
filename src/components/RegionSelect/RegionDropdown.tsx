import React from 'react';
import { ChevronDown, Edit } from 'lucide-react';
import { Listbox } from '@headlessui/react';
import { saudiRegions } from './constants';

interface RegionDropdownProps {
  value: string;
  onChange: (value: string) => void;
  onCustomClick: () => void;
}

export function RegionDropdown({ value, onChange, onCustomClick }: RegionDropdownProps) {
  return (
    <div className="mb-4">
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-right flex justify-between items-center">
            <ChevronDown className="w-4 h-4 text-gray-500" />
            <span>{value || 'اختر المنطقة'}</span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
            {saudiRegions.map((region) => (
              <Listbox.Option
                key={region}
                value={region}
                className={({ active }) =>
                  `cursor-pointer p-2 ${active ? 'bg-gray-100' : ''} text-right`
                }
              >
                {region}
              </Listbox.Option>
            ))}
            <div className="border-t border-gray-200">
              <button
                onClick={onCustomClick}
                className="w-full p-2 text-right text-blue-600 hover:bg-gray-50 flex items-center justify-end gap-2"
              >
                <span>إدخال منطقة أخرى...</span>
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}