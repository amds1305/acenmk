
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/SectionsContext';
import { ClientLogo } from '@/types/sections';
import { v4 as uuidv4 } from 'uuid';

// Import our components
import ClientLogoCard from './ClientLogoCard';
import ClientLogoEditor from './ClientLogoEditor';
import SectionSettings from './SectionSettings';
import EmptyState from './EmptyState';
import AdminHeader from './AdminHeader';

const AdminTrustedClientsMain = () => {
  const { toast } = useToast();
  const { config, updateExistingSectionData, saveChanges } = useSections();

  // Get the trusted-clients section data if it exists
  const trustedClientsData = config.sectionData['trusted-clients'] || {};
  
  // Sample data for initial state
  const sampleClients = [
    {
      id: uuidv4(),
      name: "ace nümerik",
      logoUrl: "https://placehold.co/200x80/eee/999?text=ace+nümerik",
      websiteUrl: "https://www.acenumerik.com",
      category: "Technologie"
    },
    {
      id: uuidv4(),
      name: "TechVision",
      logoUrl: "https://placehold.co/200x80/eee/999?text=TechVision",
      websiteUrl: "https://www.techvision-example.com",
      category: "Intelligence Artificielle"
    },
    {
      id: uuidv4(),
      name: "DataSphere",
      logoUrl: "https://placehold.co/200x80/eee/999?text=DataSphere",
      websiteUrl: "https://www.datasphere-example.com",
      category: "Big Data"
    },
    {
      id: uuidv4(),
      name: "CloudNova",
      logoUrl: "https://placehold.co/200x80/eee/999?text=CloudNova",
      websiteUrl: "https://www.cloudnova-example.com",
      category: "Cloud Computing"
    },
    {
      id: uuidv4(),
      name: "SecureNet",
      logoUrl: "https://placehold.co/200x80/eee/999?text=SecureNet",
      websiteUrl: "https://www.securenet-example.com",
      category: "Cybersécurité"
    },
    {
      id: uuidv4(),
      name: "DevMatrix",
      logoUrl: "https://placehold.co/200x80/eee/999?text=DevMatrix",
      websiteUrl: "https://www.devmatrix-example.com",
      category: "Développement Logiciel"
    }
  ];
  
  const [showTrustedClients, setShowTrustedClients] = useState<boolean>(
    trustedClientsData.showTrustedClients !== undefined ? trustedClientsData.showTrustedClients : true
  );
  const [trustedClientsTitle, setTrustedClientsTitle] = useState<string>(
    trustedClientsData.title || 'Ils nous font confiance'
  );
  const [featuredLabel, setFeaturedLabel] = useState<string>(
    trustedClientsData.featuredLabel || 'Nos clients'
  );
  const [trustedClients, setTrustedClients] = useState<ClientLogo[]>(
    trustedClientsData.clients || sampleClients
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

export default AdminTrustedClientsMain;
