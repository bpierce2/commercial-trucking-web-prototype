import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  rightContent?: React.ReactNode;
  className?: string;
}

export function Header({ 
  title, 
  showBackButton = false, 
  onBack,
  rightContent,
  className = '' 
}: HeaderProps) {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  
  return (
    <header className={`
      fixed 
      top-0 
      left-0 
      right-0 
      max-w-[428px] 
      mx-auto 
      bg-white 
      dark:bg-gray-800
      border-b 
      border-gray-200 
      dark:border-gray-700
      z-40
      ${className}
    `}>
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {title}
          </h1>
        </div>
        
        {rightContent && (
          <div className="flex items-center space-x-2">
            {rightContent}
          </div>
        )}
      </div>
    </header>
  );
}