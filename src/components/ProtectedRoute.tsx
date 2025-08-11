import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useData } from '../hooks/useData';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { state } = useData();
  const location = useLocation();
  
  if (!state.isAuthenticated) {
    // Redirect to login page, saving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
}