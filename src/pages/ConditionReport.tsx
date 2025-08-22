import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, AlertTriangle } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { PageWrapper } from '../components/layout/PageWrapper';
import { EquipmentDetailHeaderCard } from '../components/cards/EquipmentDetailHeaderCard';
import { PhotoInputCard } from '../components/cards/PhotoInputCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AddDamage } from '../components/AddDamage';
import { useData } from '../hooks/useData';
import type { PhotoUpload, ConditionReport as ConditionReportType, DamageReport } from '../types';

interface PhotoState {
  id: string;
  label: string;
  file: File | null;
  filename: string;
  base64Data: string;
  required: boolean;
}

export function ConditionReport() {
  const { equipmentNumber } = useParams<{ equipmentNumber: string }>();
  const navigate = useNavigate();
  const { getEquipmentByNumber, submitConditionReport } = useData();
  
  const [hourMeterReading, setHourMeterReading] = useState('');
  const [photos, setPhotos] = useState<PhotoState[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAddDamage, setShowAddDamage] = useState(false);
  const [damageReports, setDamageReports] = useState<(DamageReport | null)[]>([]);
  const [currentDamageIndex, setCurrentDamageIndex] = useState<number>(0);
  
  const equipment = equipmentNumber ? getEquipmentByNumber(equipmentNumber) : null;
  
  // Initialize photos based on equipment category and set default hour meter reading
  React.useEffect(() => {
    if (!equipmentNumber || !equipment) {
      navigate(-1);
      return;
    }
    
    // Set default hour meter reading based on equipment type
    if (equipment.type === 'delivery') {
      setHourMeterReading(equipment.meter.toString());
    } else {
      setHourMeterReading('');
    }
    const getPhotoLayoutAndLabels = (category: number) => {
      if (category < 300) {
        // Layout 1: 5 photos with only top-left and bottom-right required
        return [
          { id: 'photo-1', label: 'Front View', required: true },
          { id: 'photo-2', label: 'Rear View', required: false },
          { id: 'photo-3', label: 'Overall View', required: false },
          { id: 'photo-4', label: 'Left Side', required: false },
          { id: 'photo-5', label: 'Right Side', required: true }
        ];
      } else if (category < 700) {
        // Layout 2: 5 photos in grid (2-1-2 layout) - all required
        return [
          { id: 'photo-1', label: 'Front View', required: true },
          { id: 'photo-2', label: 'Rear View', required: true },
          { id: 'photo-3', label: 'Overall View', required: true },
          { id: 'photo-4', label: 'Left Side', required: true },
          { id: 'photo-5', label: 'Right Side', required: true }
        ];
      } else {
        // Layout 3: 20 photos in list - all required
        const truckInspectionLabels = [
          'Front Bumper & Grille',
          'Driver Side Front Tire',
          'Passenger Side Front Tire',
          'Left Headlight Assembly',
          'Right Headlight Assembly',
          'Windshield Condition',
          'Driver Side Mirror',
          'Passenger Side Mirror',
          'Driver Side Door',
          'Passenger Side Door',
          'Engine Compartment',
          'Fuel Tank & Lines',
          'Driver Side Rear Tires',
          'Passenger Side Rear Tires',
          'Trailer Hitch/Fifth Wheel',
          'Rear Bumper & Lights',
          'License Plate & Mounting',
          'Exhaust System',
          'Undercarriage View',
          'Overall Vehicle Condition'
        ];
        
        return truckInspectionLabels.map((label, i) => ({
          id: `photo-${i + 1}`,
          label,
          required: true
        }));
      }
    };
    
    const photoTemplates = getPhotoLayoutAndLabels(equipment.category);
    const initialPhotos = photoTemplates.map(template => ({
      ...template,
      file: null,
      filename: '',
      base64Data: '',
      required: template.required
    }));
    
    setPhotos(initialPhotos);
    
    // Initialize damage reports array based on equipment category
    let damageReportsCount: number;
    if (equipment.category < 300) {
      // 2-photo layout: single damage report
      damageReportsCount = 1;
    } else if (equipment.category < 700) {
      // 5-photo layout: single damage report
      damageReportsCount = 1;
    } else {
      // 20-photo layout: one damage report per photo
      damageReportsCount = 20;
    }
    
    setDamageReports(new Array(damageReportsCount).fill(null));
  }, [equipment, equipmentNumber, navigate]);
  
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };
  
  const handlePhotoSelect = async (photoId: string, file: File | null) => {
    if (file) {
      try {
        const base64Data = await convertFileToBase64(file);
        setPhotos(prev => prev.map(photo =>
          photo.id === photoId
            ? { ...photo, file, filename: file.name, base64Data }
            : photo
        ));
      } catch (error) {
        console.error('Error converting file to base64:', error);
      }
    } else {
      setPhotos(prev => prev.map(photo =>
        photo.id === photoId
          ? { ...photo, file: null, filename: '', base64Data: '' }
          : photo
      ));
    }
    
    // Clear photo-specific errors
    if (errors[photoId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[photoId];
        return newErrors;
      });
    }
  };
  
  const handleHourMeterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHourMeterReading(value);
    
    if (errors.hourMeter) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.hourMeter;
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate hour meter reading
    if (!hourMeterReading.trim()) {
      newErrors.hourMeter = 'Hour meter reading is required';
    } else {
      const reading = parseFloat(hourMeterReading);
      if (isNaN(reading) || reading < 0) {
        newErrors.hourMeter = 'Please enter a valid hour meter reading';
      }
    }
    
    // Validate required photos
    const requiredPhotos = photos.filter(p => p.required);
    const uploadedRequiredPhotos = requiredPhotos.filter(p => p.file !== null);
    if (uploadedRequiredPhotos.length < requiredPhotos.length) {
      const missing = requiredPhotos.length - uploadedRequiredPhotos.length;
      newErrors.photos = `${missing} required photo${missing > 1 ? 's' : ''} missing`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const photoUploads: PhotoUpload[] = photos
        .filter(p => p.file !== null)
        .map((p, index) => ({
          id: `upload-${Date.now()}-${index}`,
          filename: p.filename,
          base64Data: p.base64Data,
          uploaded: true
        }));
      
      const conditionReport: ConditionReportType = {
        id: `report-${Date.now()}`,
        equipmentNumber: equipment!.equipmentNumber,
        hourMeterReading: parseFloat(hourMeterReading),
        photos: photoUploads,
        damageReports: damageReports.length > 0 ? damageReports : undefined,
        submittedAt: new Date()
      };
      
      submitConditionReport(conditionReport);
      
      // Navigate to success page
      navigate(`/app/equipments/condition-report/success/${equipment!.equipmentNumber}`);
    } catch (error) {
      console.error('Error submitting condition report:', error);
      setErrors({ submit: 'Failed to submit condition report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    navigate(-1);
  };

  const handleShowAddDamage = (photoIndex?: number) => {
    setCurrentDamageIndex(photoIndex ?? 0);
    setShowAddDamage(true);
  };

  const handleAddDamageCancel = () => {
    setShowAddDamage(false);
  };

  const handleAddDamageDone = (damage: DamageReport) => {
    setDamageReports(prev => {
      const newReports = [...prev];
      newReports[currentDamageIndex] = damage;
      return newReports;
    });
    setShowAddDamage(false);
  };

  const hasDamageReported = (index?: number) => {
    if (index !== undefined) {
      // Check specific index for 20-photo layout
      const damage = damageReports[index];
      if (!damage) return false;
      return damage.structuralBodyDamage || 
             damage.componentAttachmentDamage || 
             damage.tireTrackDamage || 
             damage.overallConditionNotAcceptable ||
             damage.comment.trim() !== '';
    } else {
      // Check index 0 for 2/5-photo layout
      const damage = damageReports[0];
      if (!damage) return false;
      return damage.structuralBodyDamage || 
             damage.componentAttachmentDamage || 
             damage.tireTrackDamage || 
             damage.overallConditionNotAcceptable ||
             damage.comment.trim() !== '';
    }
  };
  
  if (!equipment) {
    return null;
  }
  
  const renderPhotoInputs = () => {
    // Don't render anything if photos aren't loaded yet
    if (photos.length === 0) {
      return <div className="text-center py-4 text-gray-500 dark:text-gray-400">Loading photo inputs...</div>;
    }
    
    if (equipment.category < 300) {
      // Layout 1: 5-photo grid (same as 1000-2000) with only top-left and bottom-right required
      // Ensure we have at least 5 photos
      if (photos.length < 5) {
        return <div className="text-center py-4 text-gray-500 dark:text-gray-400">Loading photo inputs...</div>;
      }
      
      return (
        <div className="space-y-4">
          {/* First row: 2 photos */}
          <div className="grid grid-cols-2 gap-4">
            {photos.slice(0, 2).map((photo) => (
              <PhotoInputCard
                key={photo.id}
                id={photo.id}
                label={photo.label}
                hasFile={photo.file !== null}
                filename={photo.filename}
                required={photo.required}
                onFileSelect={(file) => handlePhotoSelect(photo.id, file)}
              />
            ))}
          </div>
          
          {/* Second row: 1 photo centered */}
          <div className="flex justify-center">
            <div className="w-1/2">
              <PhotoInputCard
                key={photos[2].id}
                id={photos[2].id}
                label={photos[2].label}
                hasFile={photos[2].file !== null}
                filename={photos[2].filename}
                required={photos[2].required}
                onFileSelect={(file) => handlePhotoSelect(photos[2].id, file)}
              />
            </div>
          </div>
          
          {/* Third row: 2 photos */}
          <div className="grid grid-cols-2 gap-4">
            {photos.slice(3, 5).map((photo) => (
              <PhotoInputCard
                key={photo.id}
                id={photo.id}
                label={photo.label}
                hasFile={photo.file !== null}
                filename={photo.filename}
                required={photo.required}
                onFileSelect={(file) => handlePhotoSelect(photo.id, file)}
              />
            ))}
          </div>
        </div>
      );
    } else if (equipment.category < 700) {
      // Layout 2: 5-photo grid (2-1-2)
      // Ensure we have at least 5 photos
      if (photos.length < 5) {
        return <div className="text-center py-4 text-gray-500 dark:text-gray-400">Loading photo inputs...</div>;
      }
      
      return (
        <div className="space-y-4">
          {/* First row: 2 photos */}
          <div className="grid grid-cols-2 gap-4">
            {photos.slice(0, 2).map((photo) => (
              <PhotoInputCard
                key={photo.id}
                id={photo.id}
                label={photo.label}
                hasFile={photo.file !== null}
                filename={photo.filename}
                required={photo.required}
                onFileSelect={(file) => handlePhotoSelect(photo.id, file)}
              />
            ))}
          </div>
          
          {/* Second row: 1 photo centered */}
          <div className="flex justify-center">
            <div className="w-1/2">
              <PhotoInputCard
                key={photos[2].id}
                id={photos[2].id}
                label={photos[2].label}
                hasFile={photos[2].file !== null}
                filename={photos[2].filename}
                required={photos[2].required}
                onFileSelect={(file) => handlePhotoSelect(photos[2].id, file)}
              />
            </div>
          </div>
          
          {/* Third row: 2 photos */}
          <div className="grid grid-cols-2 gap-4">
            {photos.slice(3, 5).map((photo) => (
              <PhotoInputCard
                key={photo.id}
                id={photo.id}
                label={photo.label}
                hasFile={photo.file !== null}
                filename={photo.filename}
                required={photo.required}
                onFileSelect={(file) => handlePhotoSelect(photo.id, file)}
              />
            ))}
          </div>
        </div>
      );
    } else {
      // Layout 3: 20 photos in list format with index on left, icon on right
      // Ensure we have the expected number of photos
      if (photos.length < 20) {
        return <div className="text-center py-4 text-gray-500 dark:text-gray-400">Loading photo inputs...</div>;
      }
      
      return (
        <div className="space-y-3">
          {photos.map((photo, index) => (
            <div key={photo.id} className="flex items-center justify-between py-2 px-1">
              {/* Left side: Index and label */}
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {index + 1}. {photo.label}
                </span>
              </div>
              
              {/* Right side: Photo input icon and damage button */}
              <div className="ml-4 flex items-center space-x-2">
                <PhotoInputCard
                  id={photo.id}
                  label=""
                  hasFile={photo.file !== null}
                  filename={photo.filename}
                  required={photo.required}
                  onFileSelect={(file) => handlePhotoSelect(photo.id, file)}
                />
                <button
                  type="button"
                  onClick={() => handleShowAddDamage(index)}
                  className={`p-2 rounded-lg transition-colors ${
                    hasDamageReported(index) 
                      ? 'text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/30 bg-orange-100 dark:bg-orange-900/30' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  aria-label={hasDamageReported(index) ? "Damage reported" : "Add damage"}
                >
                  <AlertTriangle className={`w-5 h-5 ${hasDamageReported(index) ? 'stroke-current' : ''}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };
  
  const uploadedCount = photos.filter(p => p.file !== null).length;
  const requiredPhotos = photos.filter(p => p.required);
  const totalRequired = requiredPhotos.length;
  const optionalPhotos = photos.length - totalRequired;
  const progressPercentage = totalRequired > 0 ? (photos.filter(p => p.required && p.file !== null).length / totalRequired) * 100 : 0;
  
  // Render AddDamage overlay if showAddDamage is true
  if (showAddDamage) {
    return (
      <AddDamage
        initialDamage={damageReports[currentDamageIndex] || undefined}
        photoIndex={equipment.category >= 700 ? currentDamageIndex : undefined}
        onCancel={handleAddDamageCancel}
        onDone={handleAddDamageDone}
      />
    );
  }

  return (
    <>
      <Header 
        title="Condition Report" 
        showBackButton={true}
      />
      
      <PageWrapper hasBottomNav={false}>
        <form onSubmit={handleSubmit} className="p-4 pb-24">
          <EquipmentDetailHeaderCard equipment={equipment} className="mb-6" />
          
          {/* Hour Meter Input */}
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
            <Input
              type="number"
              label="Hour Meter Reading"
              placeholder="Enter current hour meter reading"
              value={hourMeterReading}
              onChange={handleHourMeterChange}
              error={errors.hourMeter}
              required
              min={0}
              step={0.1}
            />
          </div>
          
          {/* Photo Section */}
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Equipment Photos
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {totalRequired} required, {optionalPhotos} optional • {uploadedCount} uploaded
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            
            {renderPhotoInputs()}
            
            {/* Existing Damage Button for categories < 700 (2-photo and 5-photo layouts) */}
            {equipment.category < 700 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="button"
                  variant={hasDamageReported() ? "primary" : "secondary"}
                  onClick={() => handleShowAddDamage(0)}
                  icon={Camera}
                  iconPosition="left"
                  className={`w-full ${hasDamageReported() ? 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500' : ''}`}
                >
                  {hasDamageReported() ? 'Damage Reported' : 'Existing Damage'}
                </Button>
              </div>
            )}
            
            {errors.photos && (
              <p className="text-sm text-red-600 mt-2">{errors.photos}</p>
            )}
          </div>
          
          {errors.submit && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
            </div>
          )}
        </form>
      </PageWrapper>
      
      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[428px] mx-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
        <div className="flex space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </div>
      </div>
    </>
  );
}