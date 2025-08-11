import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

export function AppShell({ children, className = '' }: AppShellProps) {
  return (
    <div className={`
      min-h-screen 
      max-w-[428px] 
      min-w-[375px] 
      mx-auto 
      bg-gray-50 
      relative
      ${className}
    `}>
      {children}
    </div>
  );
}