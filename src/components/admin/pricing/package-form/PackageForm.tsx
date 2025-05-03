
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Save } from 'lucide-react';

interface PackageFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isSaving?: boolean;
}

export const PackageForm = ({ initialData, onSubmit, isSaving = false }: PackageFormProps) => {
  const [formData, setFormData] = React.useState({
    id: initialData?.id || null,
    title: initialData?.title || '',
    description: initialData?.description || '',
    starting_price: initialData?.starting_price || '',
    is_featured: initialData?.is_featured || false,
    is_visible: initialData?.is_visible !== undefined ? initialData.is_visible : true,
    features: initialData?.package_features?.length > 0 
      ? initialData.package_features 
      : [{ feature: '', is_included: true }],
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
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description || ''}
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
          <div className="space-y-2 mt-2">
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
                    if (formData.features.length > 1) {
                      const newFeatures = formData.features.filter((_, i) => i !== index);
                      setFormData({ ...formData, features: newFeatures });
                    }
                  }}
                  disabled={formData.features.length <= 1}
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
        <Button type="submit" disabled={isSaving} className="flex items-center gap-2">
          {isSaving && <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>}
          <Save className="h-4 w-4 mr-1" />
          {initialData ? 'Mettre à jour' : 'Créer'}
        </Button>
      </div>
    </form>
  );
};
