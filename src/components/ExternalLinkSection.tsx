
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ExternalLinkSectionData } from '@/types/sections';

interface ExternalLinkSectionProps {
  sectionData?: ExternalLinkSectionData;
}

const ExternalLinkSection: React.FC<ExternalLinkSectionProps> = ({ sectionData }) => {
  const { user } = useAuth();
  
  if (!sectionData) {
    return null;
  }
  
  // Check if the user is authorized to access this link
  if (sectionData.requiresAuth && !user) {
    return (
      <div className="py-12 text-center">
        <p>You must be logged in to access this section.</p>
        <Link to="/login" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded">
          Log in
        </Link>
      </div>
    );
  }
  
  // Check if user has the required role
  if (sectionData.allowedRoles?.length && user) {
    const userRole = user.role || 'guest';
    if (!sectionData.allowedRoles.includes(userRole)) {
      return <div className="py-12 text-center">You do not have permission to access this section.</div>;
    }
  }
  
  // Check if we should open in new tab
  if (sectionData.openInNewTab) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">{sectionData.title}</h2>
        <a 
          href={sectionData.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Access External Link
        </a>
      </div>
    );
  }
  
  // For internal links (that don't open in a new tab)
  return (
    <div className="py-12 text-center">
      <h2 className="text-2xl font-bold mb-4">{sectionData.title}</h2>
      <Link 
        to={sectionData.url} 
        className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Access Link
      </Link>
    </div>
  );
};

export default ExternalLinkSection;
