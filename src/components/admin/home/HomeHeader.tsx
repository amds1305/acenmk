
import React from 'react';
import { Button } from '@/components/ui/button';
import { SaveIcon, EyeIcon } from 'lucide-react';

interface HomeHeaderProps {
  onSave: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onSave }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Page d'accueil</h1>
        <p className="text-muted-foreground">
          Personnalisez les différentes sections de votre page d'accueil.
        </p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={() => window.open('/', '_blank')}>
          <EyeIcon className="mr-2 h-4 w-4" />
          Voir le site
        </Button>
        <Button onClick={onSave}>
          <SaveIcon className="mr-2 h-4 w-4" />
          Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default HomeHeader;
