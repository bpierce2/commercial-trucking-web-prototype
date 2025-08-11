import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useData } from '../../hooks/useData';

interface AboutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SystemInfo {
  label: string;
  value: string;
}

export function AboutDialog({ isOpen, onClose }: AboutDialogProps) {
  const { state } = useData();
  
  const getLanguageName = (code: string) => {
    switch (code) {
      case 'en': return 'English';
      case 'es': return 'Spanish';
      case 'de': return 'German';
      default: return 'English';
    }
  };
  
  const getThemeName = (theme: string) => {
    return theme === 'dark' ? 'Dark' : 'Light';
  };
  
  const getBuildDate = () => {
    return 'August 11, 2025';
  };
  
  const getBranchLocation = () => {
    if (state.currentUser?.branchCode) {
      const branch = state.branches.find(b => b.code === state.currentUser?.branchCode);
      return branch ? `${branch.name} (${branch.code})` : state.currentUser.branchCode;
    }
    return 'Not specified';
  };
  
  const systemInfo: SystemInfo[] = [
    { label: 'Rho Server', value: 'rho-prod-01.equipment.local' },
    { label: 'Branch Location', value: getBranchLocation() },
    { label: 'Theme', value: getThemeName(state.settings.theme) },
    { label: 'App Culture', value: getLanguageName(state.settings.language) },
    { label: 'Device Culture', value: navigator.language || 'en-US' },
    { label: 'Build Date', value: getBuildDate() }
  ];
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="About"
      description="Equipment Reports v2025.8.1"
      size="medium"
    >
      <div className="space-y-4">
        {/* System Information */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            System Information
          </label>
          
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            {systemInfo.map((info) => (
              <div 
                key={info.label}
                className="flex justify-between items-start text-sm"
              >
                <span className="text-gray-600 font-medium">
                  {info.label}:
                </span>
                <span className="text-gray-900 text-right ml-4 break-all">
                  {info.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Version Info */}
        <div className="text-center py-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Commercial Trucking Equipment Reports
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Built with React + TypeScript
          </p>
        </div>
        
        <div className="pt-2">
          <Button
            onClick={onClose}
            className="w-full"
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}