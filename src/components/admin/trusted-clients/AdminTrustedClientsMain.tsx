
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ClientLogo, TrustedClientsSectionData } from '@/types/sections';
import { v4 as uuidv4 } from 'uuid';
import ClientLogoCard from './ClientLogoCard';
import ClientLogoEditor from './ClientLogoEditor';
import AdminHeader from './AdminHeader';
import SectionSettings from './SectionSettings';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import EmptyState from './EmptyState';
import { useSections } from '@/contexts/sections/SectionsContext';

const AdminTrustedClientsMain = () => {
  const { config, updateExistingSectionData, saveChanges } = useSections();
  const { showSaveSuccess, showSaveError } = useAdminNotification();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<ClientLogo | null>(null);
  
  // Default section data
  const defaultSectionData: TrustedClientsSectionData = {
    title: "Ils nous font confiance",
    showTrustedClients: true,
    clients: []
  };
  
  // Get section data from config or use default
  const trustedClientsData = (config.sectionData && config.sectionData['trusted-clients']) 
    ? config.sectionData['trusted-clients'] as TrustedClientsSectionData 
    : defaultSectionData;
  
  // State for section settings
  const [showTrustedClients, setShowTrustedClients] = useState(trustedClientsData.showTrustedClients ?? true);
  const [trustedClientsTitle, setTrustedClientsTitle] = useState(trustedClientsData.title || "Ils nous font confiance");
  const [featuredLabel, setFeaturedLabel] = useState(trustedClientsData.featuredLabel || "Nos clients");
  
  // State for client logos
  const [clients, setClients] = useState<ClientLogo[]>(trustedClientsData.clients || []);
  
  // Save section data to context
  const saveData = async () => {
    try {
      // Update section data in context
      updateExistingSectionData('trusted-clients', {
        title: trustedClientsTitle,
        showTrustedClients,
        featuredLabel,
        clients
      });
      
      // Save changes
      await saveChanges();
      showSaveSuccess();
      return true;
    } catch (error) {
      console.error('Error saving trusted clients data:', error);
      showSaveError(error);
      return false;
    }
  };
  
  // Add/edit logo handler
  const handleOpenAddLogo = () => {
    setCurrentLogo({
      id: uuidv4(),
      name: '',
      logoUrl: '',
      websiteUrl: '',
      category: ''
    });
    setIsEditorOpen(true);
  };
  
  const handleEditLogo = (logo: ClientLogo) => {
    setCurrentLogo(logo);
    setIsEditorOpen(true);
  };
  
  const handleSaveLogo = () => {
    if (!currentLogo) return;
    
    const isExisting = clients.some(client => client.id === currentLogo.id);
    
    if (isExisting) {
      setClients(prev => prev.map(client => 
        client.id === currentLogo.id ? currentLogo : client
      ));
    } else {
      setClients(prev => [...prev, currentLogo]);
    }
    
    setIsEditorOpen(false);
    setCurrentLogo(null);
  };
  
  const handleDeleteLogo = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <AdminHeader 
        title="Logos clients" 
        description="Gérez les logos des clients à afficher sur votre site" 
        onSave={saveData}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left panel for settings */}
        <div className="md:col-span-1">
          <SectionSettings 
            showTrustedClients={showTrustedClients} 
            setShowTrustedClients={setShowTrustedClients}
            trustedClientsTitle={trustedClientsTitle}
            setTrustedClientsTitle={setTrustedClientsTitle}
            featuredLabel={featuredLabel}
            setFeaturedLabel={setFeaturedLabel}
          />
        </div>
        
        {/* Right panel for client logos */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Logos clients</h2>
            <Button onClick={handleOpenAddLogo}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un logo
            </Button>
          </div>
          
          {clients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clients.map(logo => (
                <ClientLogoCard 
                  key={logo.id} 
                  logo={logo} 
                  onEdit={handleEditLogo} 
                  onDelete={handleDeleteLogo}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      
      <ClientLogoEditor 
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setCurrentLogo(null);
        }}
        currentLogo={currentLogo}
        setCurrentLogo={setCurrentLogo}
        onSave={handleSaveLogo}
      />
    </div>
  );
};

export default AdminTrustedClientsMain;
