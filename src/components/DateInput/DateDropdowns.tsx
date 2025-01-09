import React from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { getDaysList, getMonthName } from './dateUtils';
import { CalendarType } from './types';

interface DateDropdownsProps {
  selectedDay: number | null;
  selectedMonth: number | null;
  selectedYear: number | null;
  onDayChange: (day: number) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  calendarType: CalendarType;
  years: number[];
}

export function DateDropdowns({
  selectedDay,
  selectedMonth,
  selectedYear,
  onDayChange,
  onMonthChange,
  onYearChange,
  calendarType,
  years
}: DateDropdownsProps) {
  const months = Array.from({ length: 12 }, (_, i) => i);
  const days = getDaysList(selectedYear, selectedMonth, calendarType);

  return (
    <div className="flex flex-wrap gap-2">
      {/* Day Dropdown */}
      <Dropdown
        value={selectedDay}
        onChange={onDayChange}
        options={days}
        placeholder="اليوم"
        renderOption={(day) => day}
        className="w-24"
      />

      {/* Month Dropdown */}
      <Dropdown
        value={selectedMonth}
        onChange={onMonthChange}
        options={months}
        placeholder="الشهر"
        renderOption={(month) => getMonthName(month, selectedYear || new Date().getFullYear(), calendarType)}
        className="w-40"
      />

      {/* Year Dropdown */}
      <Dropdown
        value={selectedYear}
        onChange={onYearChange}
        options={years}
        placeholder="السنة"
        renderOption={(year) => year}
        className="w-32"
      />
    </div>
  );
}

interface DropdownProps<T> {
  value: T | null;
  onChange: (value: T) => void;
  options: T[];
  placeholder: string;
  renderOption: (option: T) => React.ReactNode;
  className?: string;
}

function Dropdown<T>({
  value,
  onChange,
  options,
  placeholder,
  renderOption,
  className = ''
}: DropdownProps<T>) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className={`relative ${className}`}>
        <Listbox.Button className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-right flex justify-between items-center">
          <ChevronDown className="w-4 h-4 text-gray-500" />
          <span className="block truncate">
            {value !== null ? renderOption(value) : placeholder}
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
          {options.map((option, index) => (
            <Listbox.Option
              key={index}
              value={option}
              className={({ active }) =>
                `cursor-pointer p-2 ${active ? 'bg-gray-100' : ''} text-right`
              }
            >
              {renderOption(option)}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}