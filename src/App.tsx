import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { DataProvider } from './data/dataStore';
import { AppShell } from './components/layout/AppShell';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useData } from './hooks/useData';

// Pages
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { EquipmentList } from './pages/EquipmentList';
import { EquipmentDetail } from './pages/EquipmentDetail';
import { Search } from './pages/Search';
import { Settings } from './pages/Settings';
import { ConditionReport } from './pages/ConditionReport';
import { ReportSuccess } from './pages/ReportSuccess';

function AppContent() {
  const { state } = useData();
  
  // Apply theme class to document body to ensure portaled elements (like modals) inherit dark mode
  useEffect(() => {
    const body = document.body;
    if (state.settings.theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
    
    // Cleanup function to remove the class when component unmounts
    return () => {
      body.classList.remove('dark');
    };
  }, [state.settings.theme]);
  
  return (
    <div className={state.settings.theme}>
      <AppShell>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/app/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            
            <Route path="/app/equipments" element={
              <ProtectedRoute>
                <EquipmentList />
              </ProtectedRoute>
            } />
            
            <Route path="/app/equipments/:equipmentNumber" element={
              <ProtectedRoute>
                <EquipmentDetail />
              </ProtectedRoute>
            } />
            
            <Route path="/app/equipments/condition-report/:equipmentNumber" element={
              <ProtectedRoute>
                <ConditionReport />
              </ProtectedRoute>
            } />
            
            <Route path="/app/equipments/condition-report/success/:equipmentNumber" element={
              <ProtectedRoute>
                <ReportSuccess />
              </ProtectedRoute>
            } />
            
            <Route path="/app/search" element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            } />
            
            <Route path="/app/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            
            {/* Default redirects */}
            <Route path="/" element={<Navigate to="/app/home" replace />} />
            <Route path="/app" element={<Navigate to="/app/home" replace />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </div>
  );
}

function App() {
  return (
    <DataProvider>
      <Router>
        <AppContent />
      </Router>
    </DataProvider>
  );
}

export default App;
