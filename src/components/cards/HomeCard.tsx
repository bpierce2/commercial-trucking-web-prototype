import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

interface HomeCardProps {
  icon: string;
  count: number;
  title: string;
  description: string;
  navigationPath: string;
  className?: string;
}

export function HomeCard({ 
  icon, 
  count, 
  title, 
  description, 
  navigationPath,
  className = '' 
}: HomeCardProps) {
  // Dynamically get the icon component from lucide-react
  const IconComponent = (Icons as any)[icon] || Icons.Package;
  
  return (
    <Link
      to={navigationPath}
      className={`
        block 
        p-4 
        bg-white 
        dark:bg-gray-800
        rounded-xl 
        shadow-sm 
        border 
        border-gray-100 
        dark:border-gray-700
        hover:shadow-md 
        hover:border-gray-200 
        dark:hover:border-gray-600
        transition-all 
        duration-200
        relative
        ${className}
      `}
    >
      {/* Count Badge (positioned absolutely in top-right) */}
      <div className="absolute top-3 right-3 z-10">
        <div className="px-2 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full min-w-[28px] text-center">
          {count}
        </div>
      </div>

      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <IconComponent className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0 pr-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}