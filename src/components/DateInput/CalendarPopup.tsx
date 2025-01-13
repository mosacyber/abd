import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CalendarType } from './types';
import { formatDate, getMonthData, getMonthName, getYearsList } from './dateUtils';
import { Listbox } from '@headlessui/react';

interface CalendarPopupProps {
  calendarType: CalendarType;
  onSelect: (date: string) => void;
}

export function CalendarPopup({ calendarType, onSelect }: CalendarPopupProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { days, month, year } = getMonthData(currentDate, calendarType);
  const monthName = getMonthName(month, year, calendarType);
  
  // الحصول على قائمة السنوات (10 سنوات قبل وبعد السنة الحالية)
  const years = getYearsList(calendarType);
  
  const handleMonthChange = (newMonth: number) => {
    const date = new Date(currentDate);
    date.setMonth(newMonth);
    setCurrentDate(date);
  };

  const handleYearChange = (newYear: number) => {
    const date = new Date(currentDate);
    date.setFullYear(newYear);
    setCurrentDate(date);
  };

  return (
    <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4 gap-2">
          <button onClick={() => handleMonthChange(month - 1)} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2 flex-1">
            {/* قائمة الشهور */}
            <Listbox value={month} onChange={handleMonthChange} as="div" className="relative flex-1">
              <Listbox.Button className="w-full bg-white border border-gray-300 rounded-md px-3 py-1 text-right">
                {monthName}
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-30">
                {Array.from({ length: 12 }, (_, i) => (
                  <Listbox.Option
                    key={i}
                    value={i}
                    className="cursor-pointer p-2 hover:bg-gray-100 text-right"
                  >
                    {getMonthName(i, year, calendarType)}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>

            {/* قائمة السنوات */}
            <Listbox value={year} onChange={handleYearChange} as="div" className="relative w-28">
              <Listbox.Button className="w-full bg-white border border-gray-300 rounded-md px-3 py-1 text-right">
                {year}
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-30">
                {years.map((y) => (
                  <Listbox.Option
                    key={y}
                    value={y}
                    className="cursor-pointer p-2 hover:bg-gray-100 text-right"
                  >
                    {y}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

          <button onClick={() => handleMonthChange(month + 1)} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <button
              key={index}
              onClick={() => onSelect(formatDate(date, calendarType))}
              className="p-2 text-center hover:bg-gray-100 rounded-md"
            >
              {date.getDate()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
