import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ar-sa';
import momentHijri from 'moment-hijri';
import { Calendar } from 'lucide-react';
import { Listbox } from '@headlessui/react';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

type CalendarType = 'gregorian' | 'hijri';

export function DateInput({ value, onChange, placeholder }: DateInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [calendarType, setCalendarType] = useState<CalendarType>('hijri');
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const formatDate = (date: moment.Moment) => {
    if (calendarType === 'hijri') {
      return momentHijri(date).format('iYYYY/iM/iD');
    }
    return date.format('YYYY/M/D');
  };

  const handleCalendarSelect = (date: moment.Moment) => {
    setSelectedDate(date);
    onChange(formatDate(date));
    setIsOpen(false);
  };

  const today = moment();
  const currentMonth = calendarType === 'hijri' ? 
    momentHijri(today).iMonth() : 
    today.month();
  const currentYear = calendarType === 'hijri' ? 
    momentHijri(today).iYear() : 
    today.year();

  const generateCalendarDays = () => {
    const days = [];
    const startOfMonth = calendarType === 'hijri' ?
      momentHijri(`${currentYear}/${currentMonth + 1}/1`, 'iYYYY/iM/iD') :
      moment(`${currentYear}-${currentMonth + 1}-1`, 'YYYY-M-D');

    const daysInMonth = calendarType === 'hijri' ?
      momentHijri(startOfMonth).daysInMonth() :
      startOfMonth.daysInMonth();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = calendarType === 'hijri' ?
        momentHijri(`${currentYear}/${currentMonth + 1}/${i}`, 'iYYYY/iM/iD') :
        moment(`${currentYear}-${currentMonth + 1}-${i}`, 'YYYY-M-D');
      days.push(date);
    }

    return days;
  };

  return (
    <div className="relative mb-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={handleDateChange}
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 rounded-md text-right pr-10"
            dir="rtl"
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
          >
            <Calendar className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <Listbox value={calendarType} onChange={setCalendarType}>
          <Listbox.Button className="bg-white border border-gray-300 rounded-md px-3 py-2">
            {calendarType === 'hijri' ? 'هجري' : 'ميلادي'}
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 right-0 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <Listbox.Option value="hijri" className="cursor-pointer p-2 hover:bg-gray-100">
              هجري
            </Listbox.Option>
            <Listbox.Option value="gregorian" className="cursor-pointer p-2 hover:bg-gray-100">
              ميلادي
            </Listbox.Option>
          </Listbox.Options>
        </Listbox>
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20">
          <div className="p-2">
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleCalendarSelect(date)}
                  className="p-2 text-center hover:bg-gray-100 rounded-md"
                >
                  {calendarType === 'hijri' ? 
                    momentHijri(date).iDate() : 
                    date.date()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}