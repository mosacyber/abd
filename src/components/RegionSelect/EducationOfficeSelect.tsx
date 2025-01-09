import React from 'react';
import { ChevronDown, Edit } from 'lucide-react';
import { Listbox } from '@headlessui/react';

interface EducationOfficeSelectProps {
  value: string;
  onChange: (value: string) => void;
  region: string;
  onCustomClick: () => void;
}

export function EducationOfficeSelect({ value, onChange, region, onCustomClick }: EducationOfficeSelectProps) {
  const getEducationOffices = (region: string) => {
    switch (region) {
      case 'الشرقية':
        return [
          'مكتب تعليم الدمام',
          'مكتب تعليم الخبر',
          'مكتب تعليم الظهران',
          'مكتب تعليم القطيف',
          'مكتب تعليم الجبيل',
          'مكتب تعليم الأحساء',
          'مكتب تعليم حفر الباطن'
        ];
      case 'الرياض':
        return [
          'مكتب تعليم شمال الرياض',
          'مكتب تعليم جنوب الرياض',
          'مكتب تعليم شرق الرياض',
          'مكتب تعليم غرب الرياض',
          'مكتب تعليم البديعة',
          'مكتب تعليم الروضة',
          'مكتب تعليم النهضة'
        ];
      default:
        return [];
    }
  };

  const offices = getEducationOffices(region);

  return (
    <div className="mb-4">
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-right flex justify-between items-center">
            <ChevronDown className="w-4 h-4 text-gray-500" />
            <span>{value || 'اختر مكتب التعليم'}</span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
            {offices.map((office) => (
              <Listbox.Option
                key={office}
                value={office}
                className={({ active }) =>
                  `cursor-pointer p-2 ${active ? 'bg-gray-100' : ''} text-right`
                }
              >
                {office}
              </Listbox.Option>
            ))}
            <div className="border-t border-gray-200">
              <button
                onClick={onCustomClick}
                className="w-full p-2 text-right text-blue-600 hover:bg-gray-50 flex items-center justify-end gap-2"
              >
                <span>إدخال مكتب تعليم آخر...</span>
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}