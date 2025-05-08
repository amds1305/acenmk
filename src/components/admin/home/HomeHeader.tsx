
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, EyeIcon } from 'lucide-react';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { useAdminNotification } from '@/hooks/use-admin-notification';

interface HomeHeaderProps {
  onSave: () => Promise<void>;
}

const HomeHeader = ({ onSave }: HomeHeaderProps) => {
  const { showProcessing, isProcessing } = useAdminNotification();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    try {
      setSaveStatus('saving');
      showProcessing();
      await onSave();
      setSaveStatus('success');
      
      // Réinitialiser l'indicateur après un délai
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error saving changes:', error);
      setSaveStatus('error');
      
      // Réinitialiser l'indicateur après un délai même en cas d'erreur
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Page d'accueil</h1>
        <p className="text-muted-foreground">
          Personnalisez les sections et le contenu de votre page d'accueil
        </p>
      </div>
      <div className="flex items-center gap-4">
        <SaveIndicator status={saveStatus} />
        <Button variant="outline" onClick={() => window.open('/', '_blank')}>
          <EyeIcon className="mr-2 h-4 w-4" />
          Voir le site
        </Button>
        <Button onClick={handleSave} disabled={isProcessing || saveStatus === 'saving'}>
          <Save className="mr-2 h-4 w-4" />
          Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default HomeHeader;
