import React, { useState, useCallback, useEffect } from 'react';
import { CalendarType } from './types';
import { getYearsList, getMonthName } from './dateUtils';
import { CalendarTypeSelect } from './CalendarTypeSelect';
import { DateDropdowns } from './DateDropdowns';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DateInput({ value, onChange, placeholder = "اختر التاريخ" }: DateInputProps) {
  const [calendarType, setCalendarType] = useState<CalendarType>('hijri');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const years = getYearsList(calendarType);

  const updateDate = useCallback(() => {
    if (selectedDay && selectedMonth !== null && selectedYear) {
      const monthName = getMonthName(selectedMonth, selectedYear, calendarType);
      onChange(`${selectedDay} ${monthName} ${selectedYear}`);
    } else {
      onChange('');
    }
  }, [selectedDay, selectedMonth, selectedYear, calendarType, onChange]);

  useEffect(() => {
    updateDate();
  }, [selectedDay, selectedMonth, selectedYear, calendarType, updateDate]);

  const handleCalendarTypeChange = (type: CalendarType) => {
    setCalendarType(type);
    setSelectedDay(null);
    setSelectedMonth(null);
    setSelectedYear(null);
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        <CalendarTypeSelect 
          value={calendarType} 
          onChange={handleCalendarTypeChange} 
        />
        
        <DateDropdowns
          selectedDay={selectedDay}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onDayChange={setSelectedDay}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
          calendarType={calendarType}
          years={years}
        />
      </div>
    </div>
  );
}