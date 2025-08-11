import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Equipment } from '../../types';

interface ReportSuccessCardProps {
  equipmentNumber: string;
  submittedAt: Date;
  equipmentType: Equipment['type'];
  onReturnClick: () => void;
  className?: string;
}

export function ReportSuccessCard({ 
  equipmentNumber,
  submittedAt,
  equipmentType,
  onReturnClick,
  className = '' 
}: ReportSuccessCardProps) {
  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const returnText = equipmentType === 'pickup' ? 'Return to pickups' : 'Return to deliveries';
  
  return (
    <div className={`
      bg-white 
      rounded-xl 
      shadow-lg 
      p-6 
      text-center 
      max-w-sm 
      mx-auto
      ${className}
    `}>
      {/* Success Icon */}
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-emerald-100 rounded-full">
          <CheckCircle className="w-12 h-12 text-emerald-500" />
        </div>
      </div>
      
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Report Submitted Successfully
      </h2>
      
      {/* Description */}
      <p className="text-gray-600 mb-3">
        Condition report for <span className="font-semibold">{equipmentNumber}</span> has been submitted successfully
      </p>
      
      {/* Timestamp */}
      <p className="text-sm text-gray-500 mb-6">
        Submitted at {formatDateTime(submittedAt)}
      </p>
      
      {/* Return Button */}
      <Button
        onClick={onReturnClick}
        className="w-full"
        size="large"
      >
        {returnText}
      </Button>
    </div>
  );
}