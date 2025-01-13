import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export function Notification({ message, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform animate-bounce-in">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="rounded-full bg-yellow-100 p-3">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-gray-700 font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}
