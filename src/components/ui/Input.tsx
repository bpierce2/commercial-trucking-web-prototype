import React, { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';

interface BaseInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  required?: boolean;
}

interface TextInputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type: 'text' | 'password' | 'email';
}

interface NumberInputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

interface FileInputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type: 'file';
  accept?: string;
  multiple?: boolean;
  onFileChange?: (files: FileList | null) => void;
}

type InputProps = TextInputProps | NumberInputProps | FileInputProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon: Icon, iconPosition = 'left', required, className = '', ...props }, ref) => {
    const baseInputClasses = 'w-full px-4 py-3 min-h-[44px] text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200';
    
    const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';
    const iconPaddingClasses = Icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';
    
    const inputClasses = `${baseInputClasses} ${errorClasses} ${iconPaddingClasses} ${className}`;
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.type === 'file' && 'onFileChange' in props && props.onFileChange) {
        props.onFileChange(e.target.files);
      }
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {Icon && (
            <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0' : 'right-0'} pl-3 flex items-center pointer-events-none`}>
              <Icon className="w-5 h-5 text-gray-400" />
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClasses}
            required={required}
            {...props}
            onChange={handleFileChange}
          />
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';