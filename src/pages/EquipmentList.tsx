import { useSearchParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { PageWrapper } from '../components/layout/PageWrapper';
import { EquipmentCard } from '../components/cards/EquipmentCard';
import { useData } from '../hooks/useData';
import type { EquipmentType } from '../types';

export function EquipmentList() {
  const [searchParams] = useSearchParams();
  const { getEquipmentByType } = useData();
  
  const typeParam = searchParams.get('type');
  const equipmentType: EquipmentType = typeParam === 'pickups' ? 'pickup' : typeParam === 'deliveries' ? 'delivery' : 'all';
  
  const equipment = getEquipmentByType(equipmentType).filter(eq => !eq.hasConditionReport);
  
  const getTitle = () => {
    switch (equipmentType) {
      case 'pickup': return 'Equipment Pickups';
      case 'delivery': return 'Equipment Deliveries';
      default: return 'All Equipment';
    }
  };
  
  const getEmptyMessage = () => {
    switch (equipmentType) {
      case 'pickup': return 'No pickup equipment requiring condition reports.';
      case 'delivery': return 'No delivery equipment requiring condition reports.';
      default: return 'No equipment requiring condition reports.';
    }
  };
  
  return (
    <>
      <Header 
        title={getTitle()} 
        showBackButton={true}
      />
      
      <PageWrapper>
        <div className="p-4">
          {equipment.length > 0 ? (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {equipment.length} item{equipment.length !== 1 ? 's' : ''} requiring condition reports
              </p>
              
              {equipment.map((item) => (
                <EquipmentCard
                  key={item.id}
                  equipment={item}
                  showTypeBadge={false}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                All caught up!
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                {getEmptyMessage()}
              </p>
            </div>
          )}
        </div>
      </PageWrapper>
      
      <BottomNav />
    </>
  );
}