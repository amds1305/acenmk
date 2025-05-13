
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getNavItems } from './navigation-items';

interface SidebarProps {
  expanded: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded, toggleSidebar }) => {
  const location = useLocation();
  const navItems = getNavItems();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  return (
    <div 
      className={`
        fixed md:sticky top-0 z-30 
        transition-all duration-200 ease-in-out 
        md:translate-x-0 
        ${expanded ? 'translate-x-0' : '-translate-x-full'}
        w-64 h-screen 
        bg-card border-r shadow-sm 
        flex flex-col
      `}
    >
      <div className="p-4 flex items-center justify-between border-b">
        <div className="font-bold text-lg">Back Office</div>
        <Button variant="ghost" size="sm" className="md:hidden" onClick={toggleSidebar}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-grow overflow-y-auto py-2">
        <nav className="space-y-1 px-2">
          {navItems.map((item, i) => 
            item.divider ? (
              <div key={`divider-${i}`} className="my-3 border-t mx-2"></div>
            ) : (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`
                  flex items-center px-3 py-2 rounded-md text-sm font-medium
                  ${isActive(item.path) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }
                `}
                onClick={() => toggleSidebar()}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
