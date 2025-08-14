import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Header } from './layout/Header';
import { PageWrapper } from './layout/PageWrapper';
import { Button } from './ui/Button';
import type { DamageReport } from '../types';

interface AddDamageProps {
  initialDamage?: DamageReport;
  onCancel: () => void;
  onDone: (damage: DamageReport) => void;
}

const DAMAGE_TYPES = [
  { key: 'structuralBodyDamage' as keyof DamageReport, label: 'Structural/Body Damage' },
  { key: 'componentAttachmentDamage' as keyof DamageReport, label: 'Component/Attachment Damage' },
  { key: 'tireTrackDamage' as keyof DamageReport, label: 'Tire or Track Damage' },
  { key: 'overallConditionNotAcceptable' as keyof DamageReport, label: 'Overall condition not acceptable' },
];

export function AddDamage({ initialDamage, onCancel, onDone }: AddDamageProps) {
  const [damage, setDamage] = useState<DamageReport>(initialDamage || {
    structuralBodyDamage: false,
    componentAttachmentDamage: false,
    tireTrackDamage: false,
    overallConditionNotAcceptable: false,
    comment: ''
  });

  const handleCheckboxChange = (key: keyof DamageReport) => {
    if (key === 'comment') return; // Skip comment field
    
    setDamage(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDamage(prev => ({
      ...prev,
      comment: e.target.value
    }));
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
        title="Add Damage" 
        showBackButton={false}
        rightContent={
          <button
            onClick={handleCameraAction}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Take photo"
          >
            <Camera className="w-5 h-5" />
          </button>
        }
      />
      
      <PageWrapper hasBottomNav={false}>
        <div className="p-4 pb-24">
          {/* Select Damage Section */}
          <div className="mb-6 p-4 bg-white rounded-xl border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Select Damage
            </h3>
            
            <div className="space-y-3">
              {DAMAGE_TYPES.map(({ key, label }) => (
                <label key={key} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={damage[key] as boolean}
                    onChange={() => handleCheckboxChange(key)}
                    className="w-5 h-5 text-blue-500 border-2 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-base text-gray-900">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Add Comment Section */}
          <div className="mb-6 p-4 bg-white rounded-xl border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add Comment
            </h3>
            
            <textarea
              value={damage.comment}
              onChange={handleCommentChange}
              placeholder="Enter additional comments about the damage..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-base"
            />
          </div>
        </div>
      </PageWrapper>
      
      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[428px] mx-auto bg-white border-t border-gray-200 p-4 space-y-3">
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