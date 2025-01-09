import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Listbox } from '@headlessui/react';

const saudiRegions = [
  'الرياض',
  'مكة المكرمة',
  'المدينة المنورة',
  'القصيم',
  'الشرقية',
  'عسير',
  'تبوك',
  'حائل',
  'الحدود الشمالية',
  'جازان',
  'نجران',
  'الباحة',
  'الجوف'
].sort();

interface RegionSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function RegionSelect({ value, onChange }: RegionSelectProps) {
  const [isCustom, setIsCustom] = useState(false);

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  if (isCustom) {
    return (
      <div className="relative mb-4">
        <input
          type="text"
          value={value}
          onChange={handleCustomInputChange}
          placeholder="ادخل اسم المنطقة"
          className="w-full p-2 border border-gray-300 rounded-md text-right pr-4"
          dir="rtl"
        />
        <button
          onClick={() => setIsCustom(false)}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-700"
        >
          العودة للقائمة
        </button>
      </div>
    );
  }

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
                onClick={() => setIsCustom(true)}
                className="w-full p-2 text-right text-blue-600 hover:bg-gray-50"
              >
                إدخال منطقة أخرى...
              </button>
            </div>
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}