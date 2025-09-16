import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Header } from './layout/Header';
import { PageWrapper } from './layout/PageWrapper';
import { Button } from './ui/Button';
import type { DamageReport, SimpleDamageReport, PhotoUpload } from '../types';

interface AddDamageProps {
  initialDamage?: DamageReport | SimpleDamageReport;
  photoIndex?: number;
  isSimplified?: boolean;
  onCancel: () => void;
  onDone: (damage: DamageReport | SimpleDamageReport) => void;
}

const DAMAGE_TYPES = [
  { 
    key: 'structuralBodyDamage' as keyof DamageReport, 
    label: 'Structural/Body Damage',
    commentKey: 'structuralBodyDamageComment' as keyof DamageReport,
    photoKey: 'structuralBodyDamagePhoto' as keyof DamageReport
  },
  { 
    key: 'componentAttachmentDamage' as keyof DamageReport, 
    label: 'Component/Attachment Damage',
    commentKey: 'componentAttachmentDamageComment' as keyof DamageReport,
    photoKey: 'componentAttachmentDamagePhoto' as keyof DamageReport
  },
  { 
    key: 'tireTrackDamage' as keyof DamageReport, 
    label: 'Tire or Track Damage',
    commentKey: 'tireTrackDamageComment' as keyof DamageReport,
    photoKey: 'tireTrackDamagePhoto' as keyof DamageReport
  },
  { 
    key: 'overallConditionNotAcceptable' as keyof DamageReport, 
    label: 'Overall condition not acceptable',
    commentKey: 'overallConditionNotAcceptableComment' as keyof DamageReport,
    photoKey: 'overallConditionNotAcceptablePhoto' as keyof DamageReport
  },
];

export function AddDamage({ initialDamage, photoIndex, isSimplified = false, onCancel, onDone }: AddDamageProps) {
  const [damage, setDamage] = useState<DamageReport | SimpleDamageReport>(
    initialDamage || 
    (isSimplified 
      ? { comment: '' }
      : {
          structuralBodyDamage: false,
          componentAttachmentDamage: false,
          tireTrackDamage: false,
          overallConditionNotAcceptable: false,
          comment: '',
          structuralBodyDamageComment: '',
          componentAttachmentDamageComment: '',
          tireTrackDamageComment: '',
          overallConditionNotAcceptableComment: ''
        })
  );

  const handleCheckboxChange = (key: keyof DamageReport) => {
    if (key === 'comment' || isSimplified) return; // Skip comment field and skip for simplified mode
    
    setDamage(prev => ({
      ...prev,
      [key]: !(prev as DamageReport)[key]
    }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDamage(prev => ({
      ...prev,
      comment: e.target.value
    }));
  };

  const handleDamageCommentChange = (key: keyof DamageReport, value: string) => {
    if (isSimplified) return;
    setDamage(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFileUpload = (key: keyof DamageReport | 'photo', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target?.result as string;
      const photoUpload: PhotoUpload = {
        id: Date.now().toString(),
        filename: file.name,
        base64Data,
        uploaded: true
      };
      
      setDamage(prev => ({
        ...prev,
        [key]: photoUpload
      }));
    };
    reader.readAsDataURL(file);
    
    // Reset the input value to allow re-uploading the same file
    event.target.value = '';
  };

  const handleRemovePhoto = (key: keyof DamageReport | 'photo') => {
    setDamage(prev => ({
      ...prev,
      [key]: undefined
    }));
    
    if (isSimplified) {
      const inputElement = document.getElementById('simplified-photo') as HTMLInputElement;
      if (inputElement) {
        inputElement.value = '';
      }
    } else {
      // Find the corresponding checkbox key to match the input ID
      const damageType = DAMAGE_TYPES.find(type => type.photoKey === key);
      if (damageType) {
        const inputElement = document.getElementById(`photo-${damageType.key}`) as HTMLInputElement;
        if (inputElement) {
          inputElement.value = '';
        }
      }
    }
  };

  const handleDone = () => {
    onDone(damage);
  };

  const handleCameraAction = () => {
    // Camera functionality not implemented yet
    console.log('Camera action clicked');
  };

  return (
    <>
      <Header 
        title={photoIndex !== undefined ? `Add Damage - Photo ${photoIndex + 1}` : "Add Damage"} 
        showBackButton={false}
        rightContent={
          <button
            onClick={handleCameraAction}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Take photo"
          >
            <Camera className="w-5 h-5" />
          </button>
        }
      />
      
      <PageWrapper hasBottomNav={false}>
        <div className="p-4 pb-24">
          {isSimplified ? (
            <>
              {/* Simplified Photo Section for 20-photo layout */}
              <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Damage Photo
                </h3>
                
                <div className="flex items-center justify-center space-x-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('photo', e)}
                      className="hidden"
                      id="simplified-photo"
                    />
                    <label
                      htmlFor="simplified-photo"
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg ${
                        (damage as SimpleDamageReport).photo 
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <Camera className={`w-8 h-8 mb-2 ${
                        (damage as SimpleDamageReport).photo ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'
                      }`} />
                      <span className={`text-sm ${
                        (damage as SimpleDamageReport).photo ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {(damage as SimpleDamageReport).photo ? 'Photo Added' : 'Add Photo'}
                      </span>
                    </label>
                    
                    {/* Show remove option when photo is uploaded */}
                    {(damage as SimpleDamageReport).photo && (
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto('photo')}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Select Damage Section for 5-photo layout */}
              <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Select Damage
                </h3>
                
                <div className="space-y-4">
                  {DAMAGE_TYPES.map(({ key, label, commentKey, photoKey }) => (
                    <div key={key} className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(damage as DamageReport)[key] as boolean}
                          onChange={() => handleCheckboxChange(key)}
                          className="w-5 h-5 text-blue-500 border-2 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-base text-gray-900 dark:text-white">{label}</span>
                      </label>
                      
                      {/* Show additional fields when checkbox is checked */}
                      {(damage as DamageReport)[key] && (
                        <div className="ml-8">
                          {/* Additional comment input with photo icon */}
                          <div className="flex items-center space-x-3">
                            <input
                              type="text"
                              placeholder="Additional details (optional)"
                              value={((damage as DamageReport)[commentKey] as string) || ''}
                              onChange={(e) => handleDamageCommentChange(commentKey, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                            
                            {/* Photo upload icon */}
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(photoKey, e)}
                                className="hidden"
                                id={`photo-${key}`}
                              />
                              <label
                                htmlFor={`photo-${key}`}
                                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                                  (damage as DamageReport)[photoKey] ? 'text-green-500 hover:text-green-600' : 'text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400'
                                }`}
                              >
                                <Camera className="w-8 h-8" />
                              </label>
                              
                              {/* Show remove option when photo is uploaded */}
                              {(damage as DamageReport)[photoKey] && (
                                <button
                                  type="button"
                                  onClick={() => handleRemovePhoto(photoKey)}
                                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 flex items-center justify-center"
                                  style={{ fontSize: '10px' }}
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Add Comment Section */}
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Comment
            </h3>
            
            <textarea
              value={damage.comment}
              onChange={handleCommentChange}
              placeholder="Enter additional comments about the damage..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-base"
            />
          </div>
        </div>
      </PageWrapper>
      
      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[428px] mx-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
        <div className="flex space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDone}
            className="flex-1"
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
}