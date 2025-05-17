import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  FolderKanban, 
  MessageCircle, 
  Settings, 
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const navLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  { name: 'Projects', path: '/projects', icon: <FolderKanban size={20} /> },
  { name: 'Mentor', path: '/mentor', icon: <MessageCircle size={20} /> },
  { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
];

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const NavItems = () => (
    <>
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-career-purple to-phase-3 flex items-center justify-center">
          <span className="text-white font-bold">C</span>
        </div>
        <span className="font-display font-bold text-lg">CareerAI</span>
      </div>
      
      <div className={`${isMobile ? 'flex flex-col space-y-4 mt-8' : 'hidden md:flex md:space-x-1'}`}>
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          
          return (
            <NavLink 
              key={link.path} 
              to={link.path}
              onClick={() => setOpen(false)}
              className={`flex items-center px-3 py-2 rounded-md text-sm ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-foreground/70 hover:text-foreground hover:bg-accent'
              }`}
            >
              <span className="mr-2">{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </div>
      
      <div className={`${isMobile ? 'mt-auto pt-4 border-t' : ''}`}>
        <div className="flex items-center space-x-2">
          <Avatar>
            {profile?.avatar_url ? (
              <AvatarImage src={profile.avatar_url} />
            ) : (
              <AvatarFallback>{profile?.full_name?.[0] || 'U'}</AvatarFallback>
            )}
          </Avatar>
          <div className={`${isMobile ? 'block' : 'hidden md:block'}`}>
            <p className="text-sm font-medium">{profile?.full_name || 'User'}</p>
            <p className="text-xs text-foreground/70">{profile?.role || 'user'}</p>
          </div>
        </div>
      </div>
      
      {isMobile && (
        <Button 
          variant="outline" 
          className="mt-4 w-full" 
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </Button>
      )}
    </>
  );

  return (
    <>
      {/* Mobile navbar */}
      {isMobile ? (
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-career-purple to-phase-3 flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-display font-bold text-lg">CareerAI</span>
          </div>
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col justify-between">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-career-purple to-phase-3 flex items-center justify-center">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <span className="font-display font-bold text-lg">CareerAI</span>
                </div>
                
                <div className="flex flex-col space-y-1">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    
                    return (
                      <NavLink 
                        key={link.path} 
                        to={link.path}
                        onClick={() => setOpen(false)}
                        className={`flex items-center px-3 py-2 rounded-md text-sm ${
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        <span className="mr-2">{link.icon}</span>
                        <span>{link.name}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center space-x-2 p-2 mb-4">
                  <Avatar>
                    {profile?.avatar_url ? (
                      <AvatarImage src={profile.avatar_url} />
                    ) : (
                      <AvatarFallback>{profile?.full_name?.[0] || 'U'}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{profile?.full_name || 'Devesh Bhardwaj'}</p>
                    <p className="text-xs text-foreground/70">{profile?.role || 'user'}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        /* Desktop navbar */
        <div className="hidden md:flex md:flex-col md:p-4 md:border-r md:w-60 md:fixed md:left-0 md:top-0 md:bottom-0 md:bg-background">
          <div className="flex flex-col h-full">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-career-purple to-phase-3 flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
                <span className="font-display font-bold text-lg">CareerAI</span>
              </div>
              
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  
                  return (
                    <NavLink 
                      key={link.path} 
                      to={link.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm ${
                        isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      <span className="mr-2">{link.icon}</span>
                      <span>{link.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-auto border-t pt-4">
              <div className="flex items-center space-x-2 p-2 mb-4 border rounded-md">
                <Avatar>
                  {profile?.avatar_url ? (
                    <AvatarImage src={profile.avatar_url} />
                  ) : (
                    <AvatarFallback>{profile?.full_name?.[0] || 'U'}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{profile?.full_name || 'Devesh Bhardwaj'}</p>
                  <p className="text-xs text-foreground/70">{profile?.role || 'user'}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
