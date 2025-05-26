
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ExternalLinkSectionData } from '@/types/sections';

interface ExternalLinkSectionProps {
  id: string;
  data: ExternalLinkSectionData;
}

const ExternalLinkSection: React.FC<ExternalLinkSectionProps> = ({ id, data }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    // Vérifier les autorisations d'accès
    const canAccess = !data.requiresAuth || 
      (isAuthenticated && (!data.allowedRoles || 
        data.allowedRoles.length === 0 || 
        (user && data.allowedRoles.includes(user.role))));
    
    if (canAccess) {
      // Si l'utilisateur a accès, rediriger vers l'URL externe
      const openLink = () => {
        if (data.openInNewTab) {
          window.open(data.url, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = data.url;
        }
      };
      
      // Redirection automatique
      openLink();
    } else {
      // Si l'utilisateur n'a pas accès, rediriger vers la page de connexion
      navigate('/login', { state: { redirectTo: window.location.pathname } });
    }
  }, [isAuthenticated, user, data, navigate]);

  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="text-center">
        <p>Redirection en cours vers {data.title}...</p>
        <p className="text-sm text-muted-foreground mt-2">
          Si vous n'êtes pas automatiquement redirigé,{" "}
          <a 
            href={data.url}
            target={data.openInNewTab ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            cliquez ici
          </a>
        </p>
      </div>
    </div>
  );
};

export default ExternalLinkSection;
