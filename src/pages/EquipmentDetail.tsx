import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { PageWrapper } from '../components/layout/PageWrapper';
import { EquipmentDetailHeaderCard } from '../components/cards/EquipmentDetailHeaderCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useData } from '../hooks/useData';
import type { PhotoUpload } from '../types';

export function EquipmentDetail() {
  const { equipmentNumber } = useParams<{ equipmentNumber: string }>();
  const navigate = useNavigate();
  const { getEquipmentByNumber, getConditionReportByEquipment } = useData();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoUpload | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  
  if (!equipmentNumber) {
    navigate(-1);
    return null;
  }
  
  const equipment = getEquipmentByNumber(equipmentNumber);
  const conditionReport = equipment ? getConditionReportByEquipment(equipment.equipmentNumber) : undefined;
  
  if (!equipment) {
    return (
      <>
        <Header title="Equipment Not Found" showBackButton={true} />
        <PageWrapper>
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L5.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Equipment Not Found
            </h3>
            <p className="text-gray-500 mb-6">
              The equipment with number "{equipmentNumber}" could not be found.
            </p>
            <Button onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </PageWrapper>
        <BottomNav />
      </>
    );
  }
  
  const handleAddConditionReport = () => {
    navigate(`/app/equipments/condition-report/${equipmentNumber}`);
  };

  const handlePhotoClick = (photo: PhotoUpload) => {
    setSelectedPhoto(photo);
    setIsPhotoModalOpen(true);
  };

  const handleClosePhotoModal = () => {
    setIsPhotoModalOpen(false);
    setSelectedPhoto(null);
  };
  
  return (
    <>
      <Header 
        title="Equipment Detail" 
        showBackButton={true}
      />
      
      <PageWrapper>
        <div className="p-4">
          <EquipmentDetailHeaderCard equipment={equipment} />
          
          {/* Equipment Status */}
          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Condition Report Status</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {equipment.hasConditionReport 
                    ? 'Condition report completed' 
                    : 'Condition report required'
                  }
                </p>
              </div>
              <div className={`
                px-3 py-1 rounded-full text-xs font-semibold
                ${equipment.hasConditionReport 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-amber-100 text-amber-700'
                }
              `}>
                {equipment.hasConditionReport ? 'Complete' : 'Pending'}
              </div>
            </div>
          </div>
          
          {/* Additional Equipment Info */}
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-100">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Equipment Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Category:</span>
                <span className="font-medium text-gray-900">{equipment.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Type:</span>
                <span className="font-medium text-gray-900 capitalize">{equipment.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Photo Requirements:</span>
                <span className="font-medium text-gray-900">
                  {equipment.category < 200 
                    ? '2 photos' 
                    : equipment.category < 500 
                    ? '5 photos' 
                    : '20 photos'
                  }
                </span>
              </div>
            </div>
          </div>
          
          {/* Photo Gallery Section - Only show if condition report exists */}
          {equipment.hasConditionReport && conditionReport && conditionReport.photos.length > 0 && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-100">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Submitted Photos</h3>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {conditionReport.photos.map((photo) => (
                  <div key={photo.id} className="flex-shrink-0">
                    <div 
                      className="w-20 h-20 relative cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handlePhotoClick(photo)}
                    >
                      <img
                        src={photo.base64Data}
                        alt={photo.filename}
                        className="w-full h-full object-cover rounded-lg border border-gray-200"
                      />
                      {/* Green checkmark badge in top-right corner */}
                      <div className="absolute -top-1 -right-1">
                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center truncate w-20">
                      {photo.filename}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Fixed bottom padding for the floating button */}
        <div className="h-20"></div>
      </PageWrapper>
      
      {/* Floating Action Button */}
      {!equipment.hasConditionReport && (
        <div className="fixed bottom-20 left-0 right-0 max-w-[428px] mx-auto px-4 z-30">
          <Button
            onClick={handleAddConditionReport}
            className="w-full shadow-lg"
            size="large"
            icon={Plus}
          >
            Add Condition Report
          </Button>
        </div>
      )}

      {/* Photo Preview Modal */}
      <Modal
        isOpen={isPhotoModalOpen}
        onClose={handleClosePhotoModal}
        title={selectedPhoto?.filename}
        size="large"
      >
        {selectedPhoto && (
          <div className="flex items-center justify-center">
            <img
              src={selectedPhoto.base64Data}
              alt={selectedPhoto.filename}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        )}
      </Modal>
      
      <BottomNav />
    </>
  );
}