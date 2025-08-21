import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useData } from '../../hooks/useData';
import type { Language } from '../../types';

interface LanguageDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' }
];

export function LanguageDialog({ isOpen, onClose }: LanguageDialogProps) {
  const { state, updateLanguage } = useData();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(state.settings.language);
  
  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
  };
  
  const handleDone = () => {
    updateLanguage(selectedLanguage);
    onClose();
  };
  
  const handleClose = () => {
    setSelectedLanguage(state.settings.language); // Reset to current language
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Language"
      description="Choose your preferred language"
      size="medium"
    >
      <div className="space-y-4">
        {/* Language Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            App Language
          </label>
          
          <div className="space-y-2">
            {languageOptions.map((option) => (
              <label 
                key={option.code}
                className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <input
                  type="radio"
                  name="language"
                  value={option.code}
                  checked={selectedLanguage === option.code}
                  onChange={() => handleLanguageChange(option.code)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {option.name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    ({option.nativeName})
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <div className="pt-4">
          <Button
            onClick={handleDone}
            className="w-full"
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}