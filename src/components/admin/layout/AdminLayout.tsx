
import React from 'react';
import { Menu, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminLayoutProps } from './types';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

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
      
      {/* Sidebar - Always visible on desktop, toggleable on mobile */}
      <Sidebar expanded={expanded} toggleSidebar={toggleSidebar} />
      
      {/* Main content */}
      <div className="flex-1 w-full">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* "Voir le site" button in the header of all admin pages */}
          <div className="flex justify-end mb-6">
            <Link to="/" target="_blank">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>Voir le site</span>
              </Button>
            </Link>
          </div>
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
