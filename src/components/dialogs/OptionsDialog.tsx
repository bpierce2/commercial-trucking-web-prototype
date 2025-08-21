import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useData } from '../../hooks/useData';
import type { Theme } from '../../types';

interface OptionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OptionsDialog({ isOpen, onClose }: OptionsDialogProps) {
  const { state, updateTheme } = useData();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(state.settings.theme);
  
  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
  };
  
  const handleDone = () => {
    updateTheme(selectedTheme);
    onClose();
  };
  
  const handleClose = () => {
    setSelectedTheme(state.settings.theme); // Reset to current theme
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Options"
      description="Choose your preferred theme"
      size="medium"
    >
      <div className="space-y-4">
        {/* Theme Toggle */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Theme
          </label>
          
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={selectedTheme === 'light'}
                onChange={() => handleThemeChange('light')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Light mode</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={selectedTheme === 'dark'}
                onChange={() => handleThemeChange('dark')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Dark mode</span>
            </label>
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