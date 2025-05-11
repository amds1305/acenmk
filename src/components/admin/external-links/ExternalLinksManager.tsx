
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { useExternalLinksManager } from './hooks';
import { ExternalLinksHeader, ExternalLinksList, ExternalLinkDialog } from './components';

const ExternalLinksManager = () => {
  const {
    externalLinks,
    editForm,
    dialogOpen,
    saveStatus,
    availableRoles,
    handleEdit,
    handleUpdateSection,
    handleToggleVisibility,
    handleRoleToggle,
    handleFormChange,
    handleSaveAll,
    setDialogOpen
  } = useExternalLinksManager();

  return (
    <div className="space-y-6">
      <ExternalLinksHeader 
        saveStatus={saveStatus} 
        onSave={handleSaveAll} 
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Liste des liens externes</CardTitle>
          <CardDescription>
            Ces liens peuvent être configurés pour être accessibles uniquement par certains rôles d'utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExternalLinksList 
            externalLinks={externalLinks}
            availableRoles={availableRoles}
            onEdit={handleEdit}
            onToggleVisibility={handleToggleVisibility}
          />
        </CardContent>
      </Card>
      
      <ExternalLinkDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        formData={editForm}
        onFormChange={handleFormChange}
        onRoleToggle={handleRoleToggle}
        onSubmit={handleUpdateSection}
        availableRoles={availableRoles}
      />
    </div>
  );
};

export default ExternalLinksManager;
