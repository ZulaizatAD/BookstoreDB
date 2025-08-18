import React, { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const Toast = ({ type = 'info', message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon,
  };

  const styles = {
    success: 'bg-green-50 border-green-400 text-green-800',
    error: 'bg-red-50 border-red-400 text-red-800',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800',
  };

  const Icon = icons[type];

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full animate-slide-up">
      <div className={`alert ${styles[type]} shadow-cadet-lg`}>
        <div className="flex items-center">
          <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
          <p className="flex-1 font-medium">{message}</p>
          <button
            onClick={onClose}
            className="ml-3 text-current hover:opacity-70 transition-opacity"
          >
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;