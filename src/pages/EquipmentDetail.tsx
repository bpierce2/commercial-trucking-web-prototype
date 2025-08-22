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
import type { PhotoUpload, DamageReport } from '../types';

const DAMAGE_TYPES = [
  { key: 'structuralBodyDamage' as keyof DamageReport, label: 'Structural/Body Damage', commentKey: 'structuralBodyDamageComment' as keyof DamageReport, photoKey: 'structuralBodyDamagePhoto' as keyof DamageReport },
  { key: 'componentAttachmentDamage' as keyof DamageReport, label: 'Component/Attachment Damage', commentKey: 'componentAttachmentDamageComment' as keyof DamageReport, photoKey: 'componentAttachmentDamagePhoto' as keyof DamageReport },
  { key: 'tireTrackDamage' as keyof DamageReport, label: 'Tire or Track Damage', commentKey: 'tireTrackDamageComment' as keyof DamageReport, photoKey: 'tireTrackDamagePhoto' as keyof DamageReport },
  { key: 'overallConditionNotAcceptable' as keyof DamageReport, label: 'Overall condition not acceptable', commentKey: 'overallConditionNotAcceptableComment' as keyof DamageReport, photoKey: 'overallConditionNotAcceptablePhoto' as keyof DamageReport },
];

export function EquipmentDetail() {
  const { equipmentNumber } = useParams<{ equipmentNumber: string }>();
  const navigate = useNavigate();
  const { getEquipmentByNumber, getConditionReportByEquipment } = useData();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoUpload | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Helper function to check if damage report has any damage items
  const hasDamageItems = (damageReport: DamageReport) => {
    return DAMAGE_TYPES.some(type => damageReport[type.key] as boolean) || 
           (damageReport.comment && damageReport.comment.trim() !== '');
  };
  
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
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L5.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Equipment Not Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
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
          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Condition Report Status</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {equipment.hasConditionReport 
                    ? 'Condition report completed' 
                    : 'Condition report required'
                  }
                </p>
              </div>
              <div className={`
                px-3 py-1 rounded-full text-xs font-semibold
                ${equipment.hasConditionReport 
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                  : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                }
              `}>
                {equipment.hasConditionReport ? 'Complete' : 'Pending'}
              </div>
            </div>
          </div>
          
          {/* Additional Equipment Info */}
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Equipment Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Category:</span>
                <span className="font-medium text-gray-900 dark:text-white">{equipment.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Type:</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">{equipment.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Photo Requirements:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {equipment.category < 300 
                    ? '2 photos' 
                    : equipment.category < 700 
                    ? '5 photos' 
                    : '20 photos'
                  }
                </span>
              </div>
            </div>
          </div>
          
          {/* Photo Gallery Section - Only show if condition report exists */}
          {equipment.hasConditionReport && conditionReport && conditionReport.photos.length > 0 && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Submitted Photos</h3>
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
                        className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-600"
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
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center truncate w-20">
                      {photo.filename}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Damage Report Section - Only show if condition report exists and has damage */}
          {equipment.hasConditionReport && conditionReport && conditionReport.damageReports && conditionReport.damageReports.some(report => report && hasDamageItems(report)) && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Submitted Damage</h3>
              
              {/* Display all damage reports */}
              <div className="space-y-6">
                {conditionReport.damageReports.map((damageReport, reportIndex) => {
                  if (!damageReport || !hasDamageItems(damageReport)) return null;
                  
                  return (
                    <div key={reportIndex} className="space-y-4">
                      {/* Show photo index for 20-photo layout */}
                      {conditionReport.damageReports!.length > 1 && (
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
                          Photo {reportIndex + 1} Damage
                        </h4>
                      )}
                      
                      {/* Checked damage types for this report */}
                      {DAMAGE_TYPES.filter(type => damageReport[type.key] as boolean).map((type) => (
                        <div key={`${reportIndex}-${type.key}`} className="border-l-4 border-red-300 pl-4 py-2">
                          <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{type.label}</h5>
                          
                          {/* Additional comment for this damage type */}
                          {damageReport[type.commentKey] && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              {damageReport[type.commentKey] as string}
                            </p>
                          )}
                          
                          {/* Photo for this damage type */}
                          {damageReport[type.photoKey] && (
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <div 
                                  className="w-16 h-16 relative cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={() => handlePhotoClick(damageReport[type.photoKey] as PhotoUpload)}
                                >
                                  <img
                                    src={(damageReport[type.photoKey] as PhotoUpload).base64Data}
                                    alt={(damageReport[type.photoKey] as PhotoUpload).filename}
                                    className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                                  />
                                  {/* Orange warning badge for damage photos */}
                                  <div className="absolute -top-1 -right-1">
                                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* General damage comment for this report */}
                      {damageReport.comment && damageReport.comment.trim() !== '' && (
                        <div className="border-l-4 border-gray-300 pl-4 py-2">
                          <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Additional Comments</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {damageReport.comment}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
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