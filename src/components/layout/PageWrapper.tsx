import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  hasHeader?: boolean;
  hasBottomNav?: boolean;
  className?: string;
}

export function PageWrapper({ 
  children, 
  hasHeader = true, 
  hasBottomNav = true,
  className = '' 
}: PageWrapperProps) {
  const topPadding = hasHeader ? 'pt-14' : '';
  const bottomPadding = hasBottomNav ? 'pb-16' : '';
  
  return (
    <main className={`
      flex-1 
      overflow-y-auto
      ${topPadding} 
      ${bottomPadding}
      ${className}
    `}>
      <div className="min-h-full">
        {children}
      </div>
    </main>
  );
}