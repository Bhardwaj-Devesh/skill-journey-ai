
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: ('student' | 'mentor' | 'admin')[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ['student', 'mentor', 'admin']
}) => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect based on role if user is authenticated
    if (!isLoading && user && profile) {
      if (!allowedRoles.includes(profile.role)) {
        // Redirect to the appropriate dashboard based on role
        switch (profile.role) {
          case 'student':
            navigate('/dashboard');
            break;
          case 'mentor':
            navigate('/mentor');
            break;
          case 'admin':
            navigate('/admin');
            break;
          default:
            navigate('/dashboard');
        }
      }
    }
  }, [user, profile, isLoading, allowedRoles, navigate]);

  // Show loading or redirect if no user
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If we have a user but their role isn't allowed, the useEffect will handle redirection
  if (profile && !allowedRoles.includes(profile.role)) {
    return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
  }
  
  // If everything is fine, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
