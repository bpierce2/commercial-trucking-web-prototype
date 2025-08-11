import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'large' | 'small';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary',
  size = 'default',
  icon: Icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500 border border-gray-300'
  };
  
  const sizeClasses = {
    small: 'px-3 py-2 text-sm min-h-[36px]',
    default: 'px-4 py-3 text-base min-h-[44px]', // Mobile-friendly 44px minimum
    large: 'px-6 py-4 text-lg min-h-[48px]'
  };
  
  const iconClasses = {
    left: Icon ? 'space-x-2' : '',
    right: Icon ? 'space-x-reverse space-x-2' : ''
  };
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${iconClasses[iconPosition]} ${className}`;
  
  return (
    <button
      className={combinedClasses}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className="w-5 h-5" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="w-5 h-5" />
      )}
    </button>
  );
}