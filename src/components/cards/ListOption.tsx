import { ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';

interface ListOptionProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
  showChevron?: boolean;
  className?: string;
}

export function ListOption({ 
  title, 
  description, 
  icon,
  onClick,
  showChevron = true,
  className = '' 
}: ListOptionProps) {
  // Dynamically get the icon component from lucide-react
  const IconComponent = (Icons as any)[icon] || Icons.Settings;
  
  return (
    <button
      onClick={onClick}
      className={`
        w-full 
        flex 
        items-center 
        p-4 
        bg-white 
        hover:bg-gray-50 
        transition-colors 
        duration-200 
        text-left
        ${className}
      `}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mr-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <IconComponent className="w-5 h-5 text-gray-600" />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-gray-900 truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>
      </div>
      
      {/* Chevron */}
      {showChevron && (
        <div className="flex-shrink-0 ml-3">
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      )}
    </button>
  );
}