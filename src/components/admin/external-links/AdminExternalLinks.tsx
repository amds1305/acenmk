
import React from 'react';
import { Card } from '@/components/ui/card';
import { ExternalLinksHeader, ExternalLinksList, ExternalLinkDialog } from './components';
import { useExternalLinksManager } from './hooks';

const AdminExternalLinks = () => {
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
        <ExternalLinksList 
          externalLinks={externalLinks} 
          availableRoles={availableRoles}
          onEdit={handleEdit}
          onToggleVisibility={handleToggleVisibility}
        />
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

export default AdminExternalLinks;
