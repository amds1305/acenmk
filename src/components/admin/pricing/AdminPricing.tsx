
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePackages } from './hooks/usePackages';
import { PackageForm } from './package-form/PackageForm';
import { PackageCard } from './package-card/PackageCard';

const AdminPricing = () => {
  const [isAddingPackage, setIsAddingPackage] = React.useState(false);
  const [editingPackage, setEditingPackage] = React.useState<any>(null);
  const { packages, isLoading, handleSavePackage, handleDeletePackage } = usePackages();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Offres</h1>
        <Button onClick={() => setIsAddingPackage(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter une offre
        </Button>
      </div>

      <div className="grid gap-6">
        {packages?.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onEdit={setEditingPackage}
            onDelete={handleDeletePackage}
          />
        ))}
      </div>

      <Dialog 
        open={isAddingPackage || !!editingPackage} 
        onOpenChange={(open) => {
          if (!open) {
            setIsAddingPackage(false);
            setEditingPackage(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingPackage ? 'Modifier une offre' : 'Ajouter une offre'}
            </DialogTitle>
          </DialogHeader>
          <PackageForm
            initialData={editingPackage}
            onSubmit={(data) => {
              handleSavePackage(data);
              setIsAddingPackage(false);
              setEditingPackage(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPricing;
