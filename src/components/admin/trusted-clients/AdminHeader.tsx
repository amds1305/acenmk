
import React from 'react';
import { Button } from '@/components/ui/button';
import { EyeIcon, Save } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  description: string;
  onSave: () => void;
}

const AdminHeader = ({ title, description, onSave }: AdminHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={() => window.open('/#hero', '_blank')}>
          <EyeIcon className="mr-2 h-4 w-4" />
          Voir
        </Button>
        <Button onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
