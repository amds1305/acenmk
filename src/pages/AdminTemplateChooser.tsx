
import React from 'react';
import TemplateSelector from '@/components/admin/home/TemplateSelector';

const AdminTemplateChooser = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Choix du template</h1>
      <p className="text-muted-foreground">
        Sélectionnez le template à utiliser pour votre site web.
      </p>
      <div className="mt-4">
        <TemplateSelector />
      </div>
    </div>
  );
};

export default AdminTemplateChooser;
