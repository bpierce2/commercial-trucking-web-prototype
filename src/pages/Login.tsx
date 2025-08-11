import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useData } from '../hooks/useData';

export function Login() {
  const { state, login } = useData();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    branchCode: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if already authenticated
  if (state.isAuthenticated) {
    return <Navigate to="/app/home" replace />;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const success = login(formData.username, formData.password, formData.branchCode);
    
    if (!success) {
      setError('Invalid branch code. Please check and try again.');
    }
    
    setIsSubmitting(false);
  };
  
  const isFormValid = formData.username && formData.password && formData.branchCode;
  
  return (
    <div className="min-h-screen max-w-[428px] min-w-[375px] mx-auto bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Equipment Reports
          </h1>
          <p className="text-gray-600">
            Sign in to manage condition reports
          </p>
        </div>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="username"
            label="Username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <Input
            type="text"
            name="branchCode"
            label="Branch"
            placeholder="Enter branch code (e.g., A01, D23, P45, S67)"
            value={formData.branchCode}
            onChange={handleChange}
            required
            helperText="Valid branch codes: A01, D23, P45, S67"
          />
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full mt-6"
            disabled={!isFormValid || isSubmitting}
            size="large"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        
        {/* Help Link */}
        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-blue-500 hover:text-blue-600 text-sm underline"
            onClick={() => console.log('Help functionality would be implemented here')}
          >
            Need assistance?
          </button>
        </div>
      </div>
    </div>
  );
}