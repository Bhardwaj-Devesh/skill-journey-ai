
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type UserProfile = {
  id: string;
  full_name: string | null;
  role: 'student' | 'mentor' | 'admin';
  phase: number;
  mentor_approved?: boolean;
  avatar_url?: string;
  expertise?: string[];
  available?: boolean;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state change listener - must be set up before getSession
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setProfile(null);
          setIsLoading(false);
          return;
        }
        
        if (session) {
          setSession(session);
          setUser(session.user);
          
          // Add slight delay before additional Supabase calls to avoid deadlocks
          setTimeout(() => {
            if (session.user && !isLoading) {
              // Create a mock profile based on user metadata
              const mockProfile: UserProfile = {
                id: session.user.id,
                full_name: session.user.user_metadata.full_name || 'User',
                role: (session.user.user_metadata.role as 'student' | 'mentor' | 'admin') || 'student',
                phase: 1,
                mentor_approved: session.user.user_metadata.role === 'mentor' ? true : undefined,
                avatar_url: session.user.user_metadata.avatar_url,
                expertise: session.user.user_metadata.role === 'mentor' ? ['Career Guidance', 'Technical Mentoring'] : undefined,
                available: session.user.user_metadata.role === 'mentor' ? true : undefined
              };
              setProfile(mockProfile);
            }
            setIsLoading(false);
          }, 0);
        } else {
          setIsLoading(false);
        }
      }
    );

    // Initial session check
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setSession(session);
          setUser(session.user);
          
          // Create mock profile for initial session
          const mockProfile: UserProfile = {
            id: session.user.id,
            full_name: session.user.user_metadata.full_name || 'User',
            role: (session.user.user_metadata.role as 'student' | 'mentor' | 'admin') || 'student',
            phase: 1,
            mentor_approved: session.user.user_metadata.role === 'mentor' ? true : undefined,
            avatar_url: session.user.user_metadata.avatar_url,
            expertise: session.user.user_metadata.role === 'mentor' ? ['Career Guidance', 'Technical Mentoring'] : undefined,
            available: session.user.user_metadata.role === 'mentor' ? true : undefined
          };
          setProfile(mockProfile);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoading(false);
      }
    };
    
    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      // Clean up existing auth state
      const cleanupAuthState = () => {
        // Remove standard auth tokens
        localStorage.removeItem('supabase.auth.token');
        // Remove all Supabase auth keys from localStorage
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
            localStorage.removeItem(key);
          }
        });
        // Remove from sessionStorage if in use
        Object.keys(sessionStorage || {}).forEach((key) => {
          if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
            sessionStorage.removeItem(key);
          }
        });
      };
      
      cleanupAuthState();
      
      // Sign out with global scope to ensure complete signout across all tabs/windows
      await supabase.auth.signOut({ scope: 'global' });
      
      // Clear state
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
