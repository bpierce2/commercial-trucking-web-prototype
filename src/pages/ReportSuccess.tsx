import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ReportSuccessCard } from '../components/cards/ReportSuccessCard';
import { useData } from '../hooks/useData';

export function ReportSuccess() {
  const { equipmentNumber } = useParams<{ equipmentNumber: string }>();
  const navigate = useNavigate();
  const { getEquipmentByNumber, state } = useData();
  
  if (!equipmentNumber) {
    navigate('/app/home');
    return null;
  }
  
  const equipment = getEquipmentByNumber(equipmentNumber);
  
  if (!equipment) {
    navigate('/app/home');
    return null;
  }
  
  // Find the condition report for this equipment
  const conditionReport = state.conditionReports.find(
    report => report.equipmentNumber === equipmentNumber
  );
  
  if (!conditionReport) {
    navigate('/app/home');
    return null;
  }
  
  const handleReturnClick = () => {
    // Navigate back to the appropriate equipment list based on type
    const type = equipment.type === 'pickup' ? 'pickups' : 'deliveries';
    navigate(`/app/equipments?type=${type}`);
  };
  
  return (
    <div className="min-h-screen max-w-[428px] min-w-[375px] mx-auto bg-gray-50 dark:bg-gray-900">
      <PageWrapper hasHeader={false} hasBottomNav={false}>
        <div className="flex items-center justify-center min-h-screen p-4">
          <ReportSuccessCard
            equipmentNumber={equipmentNumber}
            submittedAt={conditionReport.submittedAt}
            equipmentType={equipment.type}
            onReturnClick={handleReturnClick}
          />
        </div>
      </PageWrapper>
    </div>
  );
}