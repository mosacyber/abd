import React from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { getMonthName } from './dateUtils';
import { CalendarType } from './types';

interface MonthSelectProps {
  value: number | null;
  onChange: (value: number) => void;
  calendarType: CalendarType;
  year: number | null;
}

export function MonthSelect({ value, onChange, calendarType, year }: MonthSelectProps) {
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="relative min-w-[140px]">
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-right flex justify-between items-center">
            <ChevronDown className="w-4 h-4 text-gray-500" />
            <span>
              {value !== null 
                ? getMonthName(value, year || 2024, calendarType) 
                : 'الشهر'}
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
            {months.map((month) => (
              <Listbox.Option
                key={month}
                value={month}
                className={({ active }) =>
                  `cursor-pointer p-2 ${active ? 'bg-gray-100' : ''} text-right`
                }
              >
                {getMonthName(month, year || 2024, calendarType)}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
