
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, GripVertical, Star } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const AdminPricing = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddingPackage, setIsAddingPackage] = React.useState(false);
  const [editingPackage, setEditingPackage] = React.useState<any>(null);

  const { data: packages, isLoading } = useQuery({
    queryKey: ['admin-pricing-packages'],
    queryFn: async () => {
      const { data: packagesData, error } = await supabase
        .from('pricing_packages')
        .select('*, package_features(*)');

      if (error) throw error;
      return packagesData;
    }
  });

  const handleSavePackage = async (packageData: any) => {
    try {
      if (packageData.id) {
        // Update existing package
        const { error: packageError } = await supabase
          .from('pricing_packages')
          .update({
            title: packageData.title,
            description: packageData.description,
            starting_price: packageData.starting_price,
            is_featured: packageData.is_featured,
            is_visible: packageData.is_visible,
          })
          .eq('id', packageData.id);

        if (packageError) throw packageError;

        // Update features
        const { error: featuresError } = await supabase
          .from('package_features')
          .delete()
          .eq('package_id', packageData.id);

        if (featuresError) throw featuresError;
      } else {
        // Create new package
        const { data: newPackage, error: packageError } = await supabase
          .from('pricing_packages')
          .insert({
            title: packageData.title,
            description: packageData.description,
            starting_price: packageData.starting_price,
            is_featured: packageData.is_featured,
            is_visible: packageData.is_visible,
          })
          .select()
          .single();

        if (packageError) throw packageError;
        packageData.id = newPackage.id;
      }

      // Insert new features
      if (packageData.features?.length > 0) {
        const { error: featuresError } = await supabase
          .from('package_features')
          .insert(
            packageData.features.map((feature: any, index: number) => ({
              package_id: packageData.id,
              feature: feature.feature,
              is_included: feature.is_included,
              order_index: index,
            }))
          );

        if (featuresError) throw featuresError;
      }

      queryClient.invalidateQueries({ queryKey: ['admin-pricing-packages'] });
      toast({
        title: "Succès",
        description: "Le package a été enregistré avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePackage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pricing_packages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['admin-pricing-packages'] });
      toast({
        title: "Succès",
        description: "Le package a été supprimé avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression.",
        variant: "destructive",
      });
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

      <div className="grid gap-6">
        {packages?.map((pkg) => (
          <Card key={pkg.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">{pkg.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingPackage(pkg)}
                >
                  <Star className={`h-4 w-4 ${pkg.is_featured ? 'fill-yellow-400' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeletePackage(pkg.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{pkg.description}</p>
              <p className="mt-2 font-medium">
                Prix de départ : {pkg.starting_price}€
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isAddingPackage || !!editingPackage} onOpenChange={(open) => {
        if (!open) {
          setIsAddingPackage(false);
          setEditingPackage(null);
        }
      }}>
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

const PackageForm = ({ initialData, onSubmit }: any) => {
  const [formData, setFormData] = React.useState({
    id: initialData?.id || null,
    title: initialData?.title || '',
    description: initialData?.description || '',
    starting_price: initialData?.starting_price || '',
    is_featured: initialData?.is_featured || false,
    is_visible: initialData?.is_visible || true,
    features: initialData?.package_features || [{ feature: '', is_included: true }],
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="starting_price">Prix de départ</Label>
          <Input
            id="starting_price"
            type="number"
            value={formData.starting_price}
            onChange={(e) => setFormData({ ...formData, starting_price: e.target.value })}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_featured"
            checked={formData.is_featured}
            onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
          />
          <Label htmlFor="is_featured">Offre mise en avant</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_visible"
            checked={formData.is_visible}
            onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
          />
          <Label htmlFor="is_visible">Visible</Label>
        </div>

        <div>
          <Label>Caractéristiques</Label>
          <div className="space-y-2">
            {formData.features.map((feature: any, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature.feature}
                  onChange={(e) => {
                    const newFeatures = [...formData.features];
                    newFeatures[index].feature = e.target.value;
                    setFormData({ ...formData, features: newFeatures });
                  }}
                  placeholder="Caractéristique"
                />
                <Switch
                  checked={feature.is_included}
                  onCheckedChange={(checked) => {
                    const newFeatures = [...formData.features];
                    newFeatures[index].is_included = checked;
                    setFormData({ ...formData, features: newFeatures });
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newFeatures = formData.features.filter((_, i) => i !== index);
                    setFormData({ ...formData, features: newFeatures });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  ...formData,
                  features: [...formData.features, { feature: '', is_included: true }]
                });
              }}
            >
              Ajouter une caractéristique
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">
          {initialData ? 'Mettre à jour' : 'Créer'}
        </Button>
      </div>
    </form>
  );
};

export default AdminPricing;
