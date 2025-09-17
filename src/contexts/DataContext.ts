import { createContext } from 'react';
import type { Equipment, ConditionReport, User, Branch, AppSettings, Theme, Language, EquipmentType } from '../types';

// Context interface
export interface DataContextType {
  state: {
    equipment: Equipment[];
    conditionReports: ConditionReport[];
    currentUser: User | null;
    isAuthenticated: boolean;
    settings: AppSettings;
    branches: Branch[];
    users: User[];
  };
  // Authentication actions
  login: (username: string, password: string, branchCode: string) => boolean;
  logout: () => void;
  
  // Equipment actions
  getEquipmentByType: (type: EquipmentType) => Equipment[];
  getEquipmentByNumber: (equipmentNumber: string) => Equipment | undefined;
  searchEquipment: (query: string) => Equipment[];
  submitConditionReport: (report: ConditionReport) => void;
  getConditionReportByEquipment: (equipmentNumber: string) => ConditionReport | undefined;
  
  // Settings actions
  updateTheme: (theme: Theme) => void;
  updateLanguage: (language: Language) => void;
  
  // Utility functions
  getHomeCardData: () => Array<{
    id: string;
    icon: string;
    count: number;
    title: string;
    description: string;
    navigationPath: string;
    showCount?: boolean;
  }>;
  getBranchByCode: (code: string) => Branch | undefined;
  resetData: () => void;
}

// Create context
export const DataContext = createContext<DataContextType | undefined>(undefined);