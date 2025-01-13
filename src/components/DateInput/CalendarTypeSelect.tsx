import React from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { CalendarType } from './types';

interface CalendarTypeSelectProps {
  value: CalendarType;
  onChange: (type: CalendarType) => void;
}

export function CalendarTypeSelect({ value, onChange }: CalendarTypeSelectProps) {
  return (
    <div className="relative min-w-[120px]">
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-right flex justify-between items-center">
            <ChevronDown className="w-4 h-4 text-gray-500" />
            <span>{value === 'hijri' ? 'هجري' : 'ميلادي'}</span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50">
            <Listbox.Option value="hijri" className="cursor-pointer p-2 hover:bg-gray-100 text-right">
              هجري
            </Listbox.Option>
            <Listbox.Option value="gregorian" className="cursor-pointer p-2 hover:bg-gray-100 text-right">
              ميلادي
            </Listbox.Option>
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
