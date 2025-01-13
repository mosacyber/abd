import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormValidationOverlayProps {
  show: boolean;
}

export function FormValidationOverlay({ show }: FormValidationOverlayProps) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="text-center p-6 rounded-lg">
        <AlertCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">يرجى إكمال جميع البيانات</h3>
        <p className="text-gray-600">
          قم بتعبئة جميع الحقول وإضافة صورة واحدة على الأقل للمتابعة
        </p>
      </div>
    </div>
  );
}
