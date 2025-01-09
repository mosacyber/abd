import moment from 'moment';
import momentHijri from 'moment-hijri';
import { CalendarType } from './types';

const hijriMonths = [
  'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
  'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
  'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
];

const gregorianMonths = [
  'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

export function getMonthName(month: number, year: number, calendarType: CalendarType): string {
  if (calendarType === 'hijri') {
    return hijriMonths[month];
  }
  return gregorianMonths[month];
}

export function getYearsList(calendarType: CalendarType): number[] {
  const currentYear = calendarType === 'hijri' ? 
    momentHijri().iYear() : 
    moment().year();
  
  return Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
}

export function getDaysList(year: number | null, month: number | null, calendarType: CalendarType): number[] {
  if (year === null || month === null) {
    return [];
  }

  let daysInMonth: number;
  
  try {
    if (calendarType === 'hijri') {
      const hijriDate = momentHijri(`${year}/${month + 1}/1`, 'iYYYY/iM/iD');
      daysInMonth = hijriDate.daysInMonth();
    } else {
      const gregorianDate = moment(`${year}-${month + 1}-1`, 'YYYY-M-D');
      daysInMonth = gregorianDate.daysInMonth();
    }
  } catch (error) {
    console.error('Error calculating days in month:', error);
    return [];
  }

  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
}