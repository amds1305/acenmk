
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePackages } from './hooks/usePackages';
import { PackageForm } from './package-form/PackageForm';
import { PackageCard } from './package-card/PackageCard';
import { toast } from '@/components/ui/use-toast';

const AdminPricing = () => {
  const [isAddingPackage, setIsAddingPackage] = React.useState(false);
  const [editingPackage, setEditingPackage] = React.useState<any>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const { packages, isLoading, handleSavePackage, handleDeletePackage } = usePackages();

  const handleSubmit = async (data: any) => {
    try {
      setIsSaving(true);
      const result = await handleSavePackage(data);
      if (result) {
        setIsAddingPackage(false);
        setEditingPackage(null);
      }
    } catch (error) {
      console.error("Error saving package:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Offres</h1>
        <Button onClick={() => setIsAddingPackage(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter une offre
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-6">
          {packages && packages.length > 0 ? (
            packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onEdit={setEditingPackage}
                onDelete={handleDeletePackage}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-muted-foreground">Aucune offre trouvée. Cliquez sur "Ajouter une offre" pour créer votre première offre.</p>
            </div>
          )}
        </div>
      )}

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
            onSubmit={handleSubmit}
            isSaving={isSaving}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPricing;
