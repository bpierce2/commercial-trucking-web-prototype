import { useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface SyncDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SyncDialog({ isOpen, onClose }: SyncDialogProps) {
  useEffect(() => {
    if (isOpen) {
      // Auto-dismiss after 1 second
      const timer = setTimeout(() => {
        onClose();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}} // Prevent manual close
      title="Syncing Data"
      showCloseButton={false}
      size="small"
    >
      <div className="text-center py-4">
        <LoadingSpinner 
          size="large" 
          color="primary" 
          text="Synchronizing with server..."
        />
      </div>
    </Modal>
  );
}