import React from 'react';
import { Home, Search, Settings } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, path: '/app/home' },
  { id: 'search', label: 'Search', icon: Search, path: '/app/search' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/app/settings' }
];

interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className = '' }: BottomNavProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className={`
      fixed 
      bottom-0 
      left-0 
      right-0 
      max-w-[428px] 
      mx-auto 
      bg-white 
      border-t 
      border-gray-200 
      z-40
      ${className}
    `}>
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`
                flex 
                flex-col 
                items-center 
                justify-center 
                px-3 
                py-2 
                min-h-[44px]
                rounded-lg 
                transition-colors 
                ${active 
                  ? 'text-blue-500 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}