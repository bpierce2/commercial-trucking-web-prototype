import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { PageWrapper } from '../components/layout/PageWrapper';
import { EquipmentDetailHeaderCard } from '../components/cards/EquipmentDetailHeaderCard';
import { PhotoInputCard } from '../components/cards/PhotoInputCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useData } from '../hooks/useData';
import type { PhotoUpload, ConditionReport as ConditionReportType } from '../types';

interface PhotoState {
  id: string;
  label: string;
  file: File | null;
  filename: string;
  base64Data: string;
}

export function ConditionReport() {
  const { equipmentNumber } = useParams<{ equipmentNumber: string }>();
  const navigate = useNavigate();
  const { getEquipmentByNumber, submitConditionReport } = useData();
  
  const [hourMeterReading, setHourMeterReading] = useState('');
  const [photos, setPhotos] = useState<PhotoState[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const equipment = equipmentNumber ? getEquipmentByNumber(equipmentNumber) : null;
  
  // Initialize photos based on equipment category
  React.useEffect(() => {
    if (!equipmentNumber || !equipment) {
      navigate(-1);
      return;
    }
    const getPhotoLayoutAndLabels = (category: number) => {
      if (category < 1000) {
        // Layout 1: 2 vertically stacked photos
        return [
          { id: 'photo-1', label: 'Overall View' },
          { id: 'photo-2', label: 'Detail View' }
        ];
      } else if (category < 2000) {
        // Layout 2: 5 photos in grid (2-1-2 layout)
        return [
          { id: 'photo-1', label: 'Front View' },
          { id: 'photo-2', label: 'Rear View' },
          { id: 'photo-3', label: 'Overall View' },
          { id: 'photo-4', label: 'Left Side' },
          { id: 'photo-5', label: 'Right Side' }
        ];
      } else {
        // Layout 3: 20 photos in list
        return Array.from({ length: 20 }, (_, i) => ({
          id: `photo-${i + 1}`,
          label: `Photo ${i + 1}`
        }));
      }
    };
    
    const photoTemplates = getPhotoLayoutAndLabels(equipment.category);
    const initialPhotos = photoTemplates.map(template => ({
      ...template,
      file: null,
      filename: '',
      base64Data: ''
    }));
    
    setPhotos(initialPhotos);
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
    
    // Validate photos
    const uploadedPhotos = photos.filter(p => p.file !== null);
    if (uploadedPhotos.length === 0) {
      newErrors.photos = 'At least one photo is required';
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
  
  if (!equipment) {
    return null;
  }
  
  const renderPhotoInputs = () => {
    // Don't render anything if photos aren't loaded yet
    if (photos.length === 0) {
      return <div className="text-center py-4 text-gray-500">Loading photo inputs...</div>;
    }
    
    if (equipment.category < 1000) {
      // Layout 1: 2 vertical photos
      return (
        <div className="space-y-4">
          {photos.map((photo) => (
            <PhotoInputCard
              key={photo.id}
              id={photo.id}
              label={photo.label}
              hasFile={photo.file !== null}
              filename={photo.filename}
              onFileSelect={(file) => handlePhotoSelect(photo.id, file)}
            />
          ))}
        </div>
      );
    } else if (equipment.category < 2000) {
      // Layout 2: 5-photo grid (2-1-2)
      // Ensure we have at least 5 photos
      if (photos.length < 5) {
        return <div className="text-center py-4 text-gray-500">Loading photo inputs...</div>;
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
                onFileSelect={(file) => handlePhotoSelect(photo.id, file)}
              />
            ))}
          </div>
        </div>
      );
    } else {
      // Layout 3: 20 photos in list
      // Ensure we have the expected number of photos
      if (photos.length < 20) {
        return <div className="text-center py-4 text-gray-500">Loading photo inputs...</div>;
      }
      
      return (
        <div className="space-y-4">
          {photos.map((photo) => (
            <PhotoInputCard
              key={photo.id}
              id={photo.id}
              label={photo.label}
              hasFile={photo.file !== null}
              filename={photo.filename}
              onFileSelect={(file) => handlePhotoSelect(photo.id, file)}
            />
          ))}
        </div>
      );
    }
  };
  
  const uploadedCount = photos.filter(p => p.file !== null).length;
  const totalRequired = photos.length;
  const progressPercentage = totalRequired > 0 ? (uploadedCount / totalRequired) * 100 : 0;
  
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
          <div className="mb-6 p-4 bg-white rounded-xl border border-gray-100">
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
          <div className="mb-6 p-4 bg-white rounded-xl border border-gray-100">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Equipment Photos
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {totalRequired} photos required • {uploadedCount} uploaded
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            
            {renderPhotoInputs()}
            
            {errors.photos && (
              <p className="text-sm text-red-600 mt-2">{errors.photos}</p>
            )}
          </div>
          
          {errors.submit && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}
        </form>
      </PageWrapper>
      
      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[428px] mx-auto bg-white border-t border-gray-200 p-4 space-y-3">
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