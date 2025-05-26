
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminLayoutProps } from './types';
import Sidebar from './Sidebar';
import UserProfileMenu from './UserProfileMenu';

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [expanded, setExpanded] = React.useState(false);
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar - Mobile Toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button 
          variant="default" 
          size="icon" 
          className="rounded-full shadow-lg"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Sidebar */}
      <Sidebar expanded={expanded} toggleSidebar={toggleSidebar} />
      
      {/* User Profile Menu - for mobile */}
      <div className={`${expanded ? 'block' : 'hidden'} md:hidden`}>
        <UserProfileMenu />
      </div>
      
      {/* Main content */}
      <div className="flex-1 w-full">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
      
      {/* Mobile sidebar backdrop */}
      {expanded && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setExpanded(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
