import { useReducer, type ReactNode } from 'react';
import type { Equipment, ConditionReport, User, Branch, AppSettings, Theme, Language, EquipmentType } from '../types';
import { DataContext, type DataContextType } from '../contexts/DataContext';
import { allEquipment, branches, users, homeCards } from './mockData';

// State interface
interface DataState {
  equipment: Equipment[];
  conditionReports: ConditionReport[];
  currentUser: User | null;
  isAuthenticated: boolean;
  settings: AppSettings;
  branches: Branch[];
  users: User[];
}

// Action types
type DataAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SUBMIT_CONDITION_REPORT'; payload: ConditionReport }
  | { type: 'UPDATE_THEME'; payload: Theme }
  | { type: 'UPDATE_LANGUAGE'; payload: Language }
  | { type: 'RESET_DATA' };

// Initial state
const initialState: DataState = {
  equipment: allEquipment,
  conditionReports: [],
  currentUser: null,
  isAuthenticated: false,
  settings: {
    theme: 'light',
    language: 'en'
  },
  branches,
  users
};

// Reducer function
function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true
      };
    
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false
      };
    
    case 'SUBMIT_CONDITION_REPORT': {
      const updatedEquipment = state.equipment.map(eq =>
        eq.equipmentNumber === action.payload.equipmentNumber
          ? { ...eq, hasConditionReport: true }
          : eq
      );
      
      return {
        ...state,
        equipment: updatedEquipment,
        conditionReports: [...state.conditionReports, action.payload]
      };
    }
    
    case 'UPDATE_THEME':
      return {
        ...state,
        settings: {
          ...state.settings,
          theme: action.payload
        }
      };
    
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        settings: {
          ...state.settings,
          language: action.payload
        }
      };
    
    case 'RESET_DATA':
      return initialState;
    
    default:
      return state;
  }
}

// Provider component
interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Authentication actions
  const login = (username: string, _password: string, branchCode: string): boolean => {
    // Simple authentication - accept any username/password combination
    // with valid branch code
    const branch = branches.find(b => b.code === branchCode);
    if (!branch) return false;
    
    const user: User = {
      id: `user-${Date.now()}`,
      username,
      branchCode
    };
    
    dispatch({ type: 'LOGIN', payload: user });
    return true;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Equipment actions
  const getEquipmentByType = (type: EquipmentType): Equipment[] => {
    if (type === 'all') return state.equipment;
    return state.equipment.filter(eq => eq.type === type);
  };

  const getEquipmentByNumber = (equipmentNumber: string): Equipment | undefined => {
    return state.equipment.find(eq => eq.equipmentNumber === equipmentNumber);
  };

  const searchEquipment = (query: string): Equipment[] => {
    if (!query.trim()) return [];
    
    const normalizedQuery = query.toLowerCase().trim();
    return state.equipment
      .filter(eq => 
        eq.equipmentNumber.toLowerCase().includes(normalizedQuery) ||
        eq.description.toLowerCase().includes(normalizedQuery)
      );
  };

  const submitConditionReport = (report: ConditionReport) => {
    dispatch({ type: 'SUBMIT_CONDITION_REPORT', payload: report });
  };

  const getConditionReportByEquipment = (equipmentNumber: string): ConditionReport | undefined => {
    return state.conditionReports.find(report => report.equipmentNumber === equipmentNumber);
  };

  // Settings actions
  const updateTheme = (theme: Theme) => {
    dispatch({ type: 'UPDATE_THEME', payload: theme });
  };

  const updateLanguage = (language: Language) => {
    dispatch({ type: 'UPDATE_LANGUAGE', payload: language });
  };

  // Utility functions
  const getHomeCardData = () => {
    // Recalculate counts based on current equipment state
    const availablePickups = state.equipment.filter(eq => eq.type === 'pickup' && !eq.hasConditionReport).length;
    const availableDeliveries = state.equipment.filter(eq => eq.type === 'delivery' && !eq.hasConditionReport).length;
    const totalAvailable = availablePickups + availableDeliveries;

    return [
      {
        ...homeCards[0],
        count: availableDeliveries,
        showCount: true
      },
      {
        ...homeCards[1],
        count: availablePickups,
        showCount: true
      },
      {
        ...homeCards[2],
        count: totalAvailable,
        showCount: false
      }
    ];
  };

  const getBranchByCode = (code: string): Branch | undefined => {
    return state.branches.find(b => b.code === code);
  };

  const resetData = () => {
    dispatch({ type: 'RESET_DATA' });
  };

  const contextValue: DataContextType = {
    state,
    login,
    logout,
    getEquipmentByType,
    getEquipmentByNumber,
    searchEquipment,
    submitConditionReport,
    getConditionReportByEquipment,
    updateTheme,
    updateLanguage,
    getHomeCardData,
    getBranchByCode,
    resetData
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

