
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  FolderKanban, 
  MessageCircle, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

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
            <AvatarImage src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className={`${isMobile ? 'block' : 'hidden md:block'}`}>
            <p className="text-sm font-medium">AI Student</p>
            <p className="text-xs text-foreground/70">student@careerai.com</p>
          </div>
        </div>
      </div>
      
      {isMobile && (
        <Button 
          variant="outline" 
          className="mt-4 w-full" 
          onClick={() => setOpen(false)}
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
            <SheetContent side="left" className="flex flex-col">
              <NavItems />
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        /* Desktop navbar */
        <div className="hidden md:flex md:h-screen md:flex-col md:p-4 md:border-r md:w-60 md:justify-between">
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
          
          <div className="flex items-center space-x-2 p-2 border rounded-md">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">AI Student</p>
              <p className="text-xs text-foreground/70">student@careerai.com</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
