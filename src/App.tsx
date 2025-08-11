import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './data/dataStore';
import { AppShell } from './components/layout/AppShell';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { EquipmentList } from './pages/EquipmentList';
import { EquipmentDetail } from './pages/EquipmentDetail';
import { Search } from './pages/Search';
import { Settings } from './pages/Settings';
import { ConditionReport } from './pages/ConditionReport';
import { ReportSuccess } from './pages/ReportSuccess';

function App() {
  return (
    <DataProvider>
      <Router>
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
            <Route path="*" element={<Navigate to="/app/home" replace />} />
          </Routes>
        </AppShell>
      </Router>
    </DataProvider>
  );
}

export default App;
