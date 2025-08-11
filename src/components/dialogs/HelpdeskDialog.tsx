import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface HelpdeskDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpdeskDialog({ isOpen, onClose }: HelpdeskDialogProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setError('');
    
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (password === 'helpdesk') {
      // Success - close dialog
      handleClose();
      console.log('Helpdesk access granted');
    } else {
      setError('Invalid password. Please try again.');
    }
    
    setIsValidating(false);
  };
  
  const handleClose = () => {
    setPassword('');
    setError('');
    setIsValidating(false);
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Support user only"
      description="This password and login is for exclusive use by or under the direction of, authorized support personnel"
      size="medium"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          label="Support Password"
          placeholder="Enter support password"
          value={password}
          onChange={handlePasswordChange}
          error={error}
          required
        />
        
        <div className="flex space-x-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
            disabled={isValidating}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={!password.trim() || isValidating}
          >
            {isValidating ? 'Validating...' : 'Accept and login'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}