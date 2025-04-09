
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/SectionsContext';
import { ClientLogo } from '@/types/sections';
import { v4 as uuidv4 } from 'uuid';

// Import our new components
import ClientLogoCard from './ClientLogoCard';
import ClientLogoEditor from './ClientLogoEditor';
import SectionSettings from './SectionSettings';
import EmptyState from './EmptyState';
import AdminHeader from './AdminHeader';

const AdminTrustedClients = () => {
  const { toast } = useToast();
  const { config, updateExistingSectionData, saveChanges } = useSections();

  // Get the trusted-clients section data if it exists
  const trustedClientsData = config.sectionData['trusted-clients'] || {};
  
  const [showTrustedClients, setShowTrustedClients] = useState<boolean>(
    trustedClientsData.showTrustedClients !== undefined ? trustedClientsData.showTrustedClients : true
  );
  const [trustedClientsTitle, setTrustedClientsTitle] = useState<string>(
    trustedClientsData.title || 'Brands we\'ve worked with'
  );
  const [featuredLabel, setFeaturedLabel] = useState<string>(
    trustedClientsData.featuredLabel || 'Featured Clients'
  );
  const [trustedClients, setTrustedClients] = useState<ClientLogo[]>(
    trustedClientsData.clients || []
  );

  // States for managing logo editing
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentLogo, setCurrentLogo] = useState<ClientLogo | null>(null);

  // Function to open the logo add/edit dialog
  const handleEditLogo = (logo?: ClientLogo) => {
    if (logo) {
      setCurrentLogo(logo);
    } else {
      setCurrentLogo({
        id: uuidv4(),
        name: '',
        logoUrl: '',
        websiteUrl: '',
        category: ''
      });
    }
    setIsEditing(true);
  };

  // Function to save a logo
  const handleSaveLogo = () => {
    if (!currentLogo) return;

    let updatedLogos = [...trustedClients];
    const existingIndex = updatedLogos.findIndex(logo => logo.id === currentLogo.id);

    if (existingIndex >= 0) {
      updatedLogos[existingIndex] = currentLogo;
    } else {
      updatedLogos.push(currentLogo);
    }

    setTrustedClients(updatedLogos);
    setIsEditing(false);
    setCurrentLogo(null);

    toast({
      title: "Logo client sauvegardé",
      description: "Le logo client a été mis à jour avec succès."
    });
  };

  // Function to delete a logo
  const handleDeleteLogo = (id: string) => {
    const updatedLogos = trustedClients.filter(logo => logo.id !== id);
    setTrustedClients(updatedLogos);

    toast({
      title: "Logo supprimé",
      description: "Le logo client a été supprimé avec succès."
    });
  };

  // Function to save changes
  const handleSaveChanges = () => {
    const updatedData = {
      showTrustedClients,
      title: trustedClientsTitle,
      featuredLabel,
      clients: trustedClients
    };

    updateExistingSectionData('trusted-clients', updatedData);
    saveChanges();

    toast({
      title: "Modifications enregistrées",
      description: "Les paramètres de la section 'Clients de confiance' ont été mis à jour."
    });
  };

  return (
    <div className="space-y-6">
      <AdminHeader 
        title="Clients de confiance"
        description="Gérez la section 'Ils nous font confiance' qui apparaît sur la page d'accueil."
        onSave={handleSaveChanges}
      />

      <SectionSettings 
        showTrustedClients={showTrustedClients}
        setShowTrustedClients={setShowTrustedClients}
        trustedClientsTitle={trustedClientsTitle}
        setTrustedClientsTitle={setTrustedClientsTitle}
        featuredLabel={featuredLabel}
        setFeaturedLabel={setFeaturedLabel}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Logos clients</h2>
        <Button onClick={() => handleEditLogo()}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un logo
        </Button>
      </div>

      {trustedClients.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trustedClients.map((logo) => (
            <ClientLogoCard
              key={logo.id}
              logo={logo}
              onEdit={handleEditLogo}
              onDelete={handleDeleteLogo}
            />
          ))}
        </div>
      )}

      <ClientLogoEditor
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        currentLogo={currentLogo}
        setCurrentLogo={setCurrentLogo}
        onSave={handleSaveLogo}
      />
    </div>
  );
};

export default AdminTrustedClients;
