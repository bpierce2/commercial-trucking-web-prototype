import React, { useRef } from 'react';
import { Camera } from 'lucide-react';

interface PhotoInputCardProps {
  id: string;
  label: string;
  hasFile: boolean;
  filename?: string;
  onFileSelect: (file: File | null) => void;
  className?: string;
  required?: boolean;
}

export function PhotoInputCard({ 
  id, 
  label, 
  hasFile, 
  onFileSelect,
  className = '',
  required = true
}: PhotoInputCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  
  const getIconColor = () => {
    if (hasFile) return 'text-green-500';
    if (required) return 'text-red-500';
    return 'text-gray-400';
  };
  
  const getHoverColor = () => {
    if (hasFile) return 'hover:text-green-600';
    if (required) return 'hover:text-red-600';
    return 'hover:text-gray-500';
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0] || null;
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };
  
  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <button
        type="button"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          transition-all mb-0
          duration-200 
          cursor-pointer
          ${getIconColor()}
          ${getHoverColor()}
          ${isDragging ? 'scale-110' : 'hover:scale-105'}
        `}
      >
        <Camera className="w-8 h-8" />
      </button>
      
      {/* Optional Label */}
      <p className="text-xs text-gray-600 text-center">
        {label}
      </p>
    </div>
  );
}