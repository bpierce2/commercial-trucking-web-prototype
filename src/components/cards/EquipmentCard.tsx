import { Link } from 'react-router-dom';
import type { Equipment } from '../../types';

interface EquipmentCardProps {
  equipment: Equipment;
  showTypeBadge?: boolean;
  showCompletionBadge?: boolean;
  className?: string;
}

export function EquipmentCard({ 
  equipment, 
  showTypeBadge = false,
  showCompletionBadge = false,
  className = '' 
}: EquipmentCardProps) {
  const badgeStyles = {
    pickup: 'bg-emerald-100 text-emerald-700',
    delivery: 'bg-blue-100 text-blue-700'
  };
  
  return (
    <Link
      to={`/app/equipments/${equipment.equipmentNumber}`}
      className={`
        block 
        bg-white 
        rounded-xl 
        shadow-sm 
        border 
        border-gray-100 
        hover:shadow-md 
        hover:border-gray-200 
        transition-all 
        duration-200 
        relative
        ${className}
      `}
    >
      {/* Type Badge (positioned absolutely in top-left) */}
      {showTypeBadge && (
        <div className="absolute top-3 left-3 z-10">
          <span className={`
            px-2 
            py-1 
            text-xs 
            font-semibold 
            rounded-full 
            ${badgeStyles[equipment.type]}
          `}>
            {equipment.type === 'pickup' ? 'Pickup' : 'Delivery'}
          </span>
        </div>
      )}
      
      {/* Completion Badge (positioned absolutely in top-right) */}
      {showCompletionBadge && (
        <div className="absolute top-3 right-3 z-10">
          <span className={`
            px-2 
            py-1 
            text-xs 
            font-semibold 
            rounded-full 
            ${equipment.hasConditionReport 
              ? 'bg-emerald-100 text-emerald-700' 
              : 'bg-amber-100 text-amber-700'
            }
          `}>
            {equipment.hasConditionReport ? 'Complete' : 'Pending'}
          </span>
        </div>
      )}
      
      <div className="flex p-4 space-x-3">
        {/* Equipment Image */}
        <div className="flex-shrink-0">
          <img
            src={equipment.imageUrl}
            alt={equipment.description}
            className="w-16 h-16 object-cover rounded-lg bg-gray-100"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yOCAyOEgzNlYzNkgyOFYyOFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
            }}
          />
        </div>
        
        {/* Equipment Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 mb-1">
            {equipment.needByTime}
          </p>
          <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">
            {equipment.equipmentNumber} <span className="text-xs text-gray-400 font-normal">• {equipment.category} - {equipment.class}</span>
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {equipment.description}
          </p>
        </div>
      </div>
    </Link>
  );
}