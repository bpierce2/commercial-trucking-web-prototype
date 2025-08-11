import React, { useRef } from 'react';
import { Camera, Upload } from 'lucide-react';

interface PhotoInputCardProps {
  id: string;
  label: string;
  hasFile: boolean;
  filename?: string;
  onFileSelect: (file: File | null) => void;
  className?: string;
}

export function PhotoInputCard({ 
  id, 
  label, 
  hasFile, 
  filename,
  onFileSelect,
  className = '' 
}: PhotoInputCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  
  const stateStyles = hasFile 
    ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
    : 'bg-red-50 border-red-200 text-red-600';
  
  const hoverStyles = hasFile
    ? 'hover:bg-emerald-100 hover:border-emerald-300'
    : 'hover:bg-red-100 hover:border-red-300';
  
  const dragStyles = isDragging
    ? 'border-blue-400 bg-blue-50'
    : '';
  
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
    <div className={className}>
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
          w-full 
          p-4 
          min-h-[120px]
          border-2 
          border-dashed 
          rounded-lg 
          transition-all 
          duration-200 
          cursor-pointer
          flex 
          flex-col 
          items-center 
          justify-center 
          space-y-2
          ${stateStyles} 
          ${hoverStyles}
          ${dragStyles}
        `}
      >
        {/* Icon */}
        <div className="flex items-center justify-center">
          {hasFile ? (
            <Camera className="w-6 h-6" />
          ) : (
            <Upload className="w-6 h-6" />
          )}
        </div>
        
        {/* Label */}
        <p className="text-sm font-medium text-center">
          {label}
        </p>
        
        {/* Status Text */}
        {hasFile ? (
          <p className="text-xs text-center truncate max-w-full px-2">
            {filename}
          </p>
        ) : (
          <p className="text-xs text-center">
            Tap to add photo
          </p>
        )}
      </button>
    </div>
  );
}