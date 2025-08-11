import { MapPin } from 'lucide-react';
import type { Equipment } from '../../types';
import { useData } from '../../hooks/useData';

interface EquipmentDetailHeaderCardProps {
  equipment: Equipment;
  className?: string;
}

export function EquipmentDetailHeaderCard({ 
  equipment,
  className = '' 
}: EquipmentDetailHeaderCardProps) {
  const { getBranchByCode } = useData();
  const branch = getBranchByCode(equipment.branchCode);
  
  const handleGPSClick = () => {
    // GPS functionality - placeholder for now
    console.log('GPS functionality would open maps for equipment location');
  };
  
  return (
    <div className={`
      bg-white 
      rounded-xl 
      shadow-sm 
      border 
      border-gray-100 
      relative
      ${className}
    `}>
      {/* GPS Button (positioned absolutely in top-left) */}
      <button
        onClick={handleGPSClick}
        className="
          absolute 
          top-3 
          left-3 
          z-10 
          flex 
          items-center 
          space-x-1 
          px-2 
          py-1 
          bg-blue-500 
          hover:bg-blue-600 
          text-white 
          text-xs 
          font-semibold 
          rounded-full 
          transition-colors
        "
      >
        <MapPin className="w-3 h-3" />
        <span>Find</span>
      </button>
      
      <div className="flex p-4 space-x-4">
        {/* Equipment Image */}
        <div className="flex-shrink-0">
          <img
            src={equipment.imageUrl}
            alt={equipment.description}
            className="w-20 h-20 object-cover rounded-lg bg-gray-100"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNCAzNEg0NlY0NkgzNFYzNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
            }}
          />
        </div>
        
        {/* Equipment Information */}
        <div className="flex-1 min-w-0 pt-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {equipment.equipmentNumber}
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            {equipment.description}
          </p>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-700">
              Branch {equipment.branchCode}
              {branch && <span className="font-normal"> - {branch.name}</span>}
            </p>
            <p className="text-sm text-gray-400">
              Need by: {equipment.needByTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}