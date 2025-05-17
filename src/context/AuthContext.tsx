
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
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Since we're not using a database yet, create a mock profile based on auth metadata
          setTimeout(() => {
            if (session.user) {
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
              setIsLoading(false);
            }
          }, 0);
        } else {
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
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
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
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
