import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ListOption } from '../components/cards/ListOption';
import { SyncDialog } from '../components/dialogs/SyncDialog';
import { HelpdeskDialog } from '../components/dialogs/HelpdeskDialog';
import { OptionsDialog } from '../components/dialogs/OptionsDialog';
import { LanguageDialog } from '../components/dialogs/LanguageDialog';
import { AboutDialog } from '../components/dialogs/AboutDialog';
import { useData } from '../hooks/useData';
import type { DialogType } from '../types';

export function Settings() {
  const { logout } = useData();
  const [activeDialog, setActiveDialog] = useState<DialogType | null>(null);
  
  const handleDialogOpen = (dialogType: DialogType) => {
    setActiveDialog(dialogType);
  };
  
  const handleDialogClose = () => {
    setActiveDialog(null);
  };
  
  const handleLogout = () => {
    logout();
    // Navigation will be handled by the auth context redirect
  };
  
  const settingsOptions = [
    {
      icon: 'RefreshCw',
      title: 'Sync',
      description: 'Manually sync data with the server',
      action: () => handleDialogOpen('sync')
    },
    {
      icon: 'Headphones',
      title: 'Helpdesk',
      description: 'App Support',
      action: () => handleDialogOpen('helpdesk')
    },
    {
      icon: 'Settings',
      title: 'Options',
      description: 'Light vs Dark mode',
      action: () => handleDialogOpen('options')
    },
    {
      icon: 'Languages',
      title: 'Language',
      description: 'Switch between languages',
      action: () => handleDialogOpen('language')
    },
    {
      icon: 'Info',
      title: 'About',
      description: 'App Info v2025.8.1',
      action: () => handleDialogOpen('about')
    },
    {
      icon: 'LogOut',
      title: 'Logout',
      description: 'Logs out the user',
      action: handleLogout
    }
  ];
  
  return (
    <>
      <Header title="Settings" />
      
      <PageWrapper>
        <div className="bg-white">
          {settingsOptions.map((option, index) => (
            <div key={option.title}>
              <ListOption
                icon={option.icon}
                title={option.title}
                description={option.description}
                onClick={option.action}
                showChevron={option.title !== 'Logout'}
              />
              {index < settingsOptions.length - 1 && (
                <div className="border-b border-gray-100 ml-16" />
              )}
            </div>
          ))}
        </div>
      </PageWrapper>
      
      <BottomNav />
      
      {/* Dialogs */}
      <SyncDialog 
        isOpen={activeDialog === 'sync'} 
        onClose={handleDialogClose}
      />
      
      <HelpdeskDialog 
        isOpen={activeDialog === 'helpdesk'} 
        onClose={handleDialogClose}
      />
      
      <OptionsDialog 
        isOpen={activeDialog === 'options'} 
        onClose={handleDialogClose}
      />
      
      <LanguageDialog 
        isOpen={activeDialog === 'language'} 
        onClose={handleDialogClose}
      />
      
      <AboutDialog 
        isOpen={activeDialog === 'about'} 
        onClose={handleDialogClose}
      />
    </>
  );
}