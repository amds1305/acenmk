
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Feature {
  id: string;
  feature: string;
  is_included: boolean;
  order_index: number;
}

interface PricingPackage {
  id: string;
  title: string;
  description: string | null;
  starting_price: number | null;
  is_featured: boolean;
  is_visible: boolean;
  order_index: number;
  features: Feature[];
}

const KinkPricingEditor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const { toast } = useToast();

  // Charger les données existantes
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const { data: packagesData, error } = await supabase
          .from('pricing_packages')
          .select('*')
          .order('order_index');

        if (error) throw error;

        const packagesWithFeatures = await Promise.all(
          (packagesData || []).map(async (pkg) => {
            const { data: features, error: featuresError } = await supabase
              .from('package_features')
              .select('*')
              .eq('package_id', pkg.id)
              .order('order_index');
            
            if (featuresError) throw featuresError;
            
            return { ...pkg, features: features || [] } as PricingPackage;
          })
        );

        setPackages(packagesWithFeatures.length > 0 ? packagesWithFeatures : getDefaultPackages());
      } catch (error) {
        console.error("Erreur lors du chargement des forfaits:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les forfaits.",
          variant: "destructive",
        });
        setPackages(getDefaultPackages());
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, [toast]);

  const getDefaultPackages = (): PricingPackage[] => {
    return [
      {
        id: uuidv4(),
        title: "Starter",
        description: "Idéal pour les petites entreprises et les startups",
        starting_price: 990,
        is_featured: false,
        is_visible: true,
        order_index: 0,
        features: [
          { id: uuidv4(), feature: "Site vitrine jusqu'à 5 pages", is_included: true, order_index: 0 },
          { id: uuidv4(), feature: "Design responsive", is_included: true, order_index: 1 },
          { id: uuidv4(), feature: "Formulaire de contact", is_included: true, order_index: 2 },
          { id: uuidv4(), feature: "Optimisation SEO de base", is_included: true, order_index: 3 },
          { id: uuidv4(), feature: "Intégration des réseaux sociaux", is_included: true, order_index: 4 },
          { id: uuidv4(), feature: "Maintenance premium", is_included: false, order_index: 5 }
        ]
      },
      {
        id: uuidv4(),
        title: "Business",
        description: "Solution complète pour les entreprises en croissance",
        starting_price: 2490,
        is_featured: true,
        is_visible: true,
        order_index: 1,
        features: [
          { id: uuidv4(), feature: "Site web jusqu'à 15 pages", is_included: true, order_index: 0 },
          { id: uuidv4(), feature: "Design personnalisé", is_included: true, order_index: 1 },
          { id: uuidv4(), feature: "Système de gestion de contenu", is_included: true, order_index: 2 },
          { id: uuidv4(), feature: "Optimisation SEO avancée", is_included: true, order_index: 3 },
          { id: uuidv4(), feature: "Analyse des performances", is_included: true, order_index: 4 },
          { id: uuidv4(), feature: "Maintenance premium", is_included: true, order_index: 5 }
        ]
      },
      {
        id: uuidv4(),
        title: "Enterprise",
        description: "Solutions sur mesure pour les grands projets",
        starting_price: 4990,
        is_featured: false,
        is_visible: true,
        order_index: 2,
        features: [
          { id: uuidv4(), feature: "Site web illimité", is_included: true, order_index: 0 },
          { id: uuidv4(), feature: "Design premium sur mesure", is_included: true, order_index: 1 },
          { id: uuidv4(), feature: "Fonctionnalités avancées", is_included: true, order_index: 2 },
          { id: uuidv4(), feature: "Intégrations personnalisées", is_included: true, order_index: 3 },
          { id: uuidv4(), feature: "Stratégie digitale complète", is_included: true, order_index: 4 },
          { id: uuidv4(), feature: "Support dédié 24/7", is_included: true, order_index: 5 }
        ]
      }
    ];
  };

  const handlePackageChange = (id: string, field: string, value: any) => {
    setPackages(prev => 
      prev.map(pkg => 
        pkg.id === id ? { ...pkg, [field]: value } : pkg
      )
    );
  };

  const handleFeatureChange = (packageId: string, featureId: string, field: string, value: any) => {
    setPackages(prev => 
      prev.map(pkg => 
        pkg.id === packageId ? {
          ...pkg,
          features: pkg.features.map(feature =>
            feature.id === featureId ? { ...feature, [field]: value } : feature
          )
        } : pkg
      )
    );
  };

  const addFeature = (packageId: string) => {
    const newFeature = {
      id: uuidv4(),
      feature: "Nouvelle fonctionnalité",
      is_included: true,
      order_index: packages.find(p => p.id === packageId)?.features.length || 0
    };

    setPackages(prev => 
      prev.map(pkg => 
        pkg.id === packageId ? {
          ...pkg,
          features: [...pkg.features, newFeature]
        } : pkg
      )
    );
  };

  const removeFeature = (packageId: string, featureId: string) => {
    setPackages(prev => 
      prev.map(pkg => 
        pkg.id === packageId ? {
          ...pkg,
          features: pkg.features.filter(feature => feature.id !== featureId)
        } : pkg
      )
    );
  };

  const addPackage = () => {
    const newPackage: PricingPackage = {
      id: uuidv4(),
      title: "Nouveau forfait",
      description: "Description du nouveau forfait",
      starting_price: 0,
      is_featured: false,
      is_visible: true,
      order_index: packages.length,
      features: [
        { id: uuidv4(), feature: "Fonctionnalité 1", is_included: true, order_index: 0 },
        { id: uuidv4(), feature: "Fonctionnalité 2", is_included: true, order_index: 1 }
      ]
    };
    setPackages(prev => [...prev, newPackage]);
  };

  const removePackage = (id: string) => {
    setPackages(prev => prev.filter(pkg => pkg.id !== id));
  };

  const savePackages = async () => {
    try {
      setIsLoading(true);

      // Supprimer d'abord toutes les fonctionnalités existantes
      const { error: deleteError } = await supabase
        .from('package_features')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (deleteError) throw deleteError;

      // Supprimer ensuite tous les forfaits existants
      const { error: deletePackagesError } = await supabase
        .from('pricing_packages')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (deletePackagesError) throw deletePackagesError;

      // Insérer les nouveaux forfaits
      for (const pkg of packages) {
        const { error: insertPackageError } = await supabase
          .from('pricing_packages')
          .insert({
            id: pkg.id,
            title: pkg.title,
            description: pkg.description,
            starting_price: pkg.starting_price,
            is_featured: pkg.is_featured,
            is_visible: pkg.is_visible,
            order_index: pkg.order_index
          });

        if (insertPackageError) throw insertPackageError;

        // Insérer les fonctionnalités de ce forfait
        for (const feature of pkg.features) {
          const { error: insertFeatureError } = await supabase
            .from('package_features')
            .insert({
              id: feature.id,
              feature: feature.feature,
              is_included: feature.is_included,
              package_id: pkg.id,
              order_index: feature.order_index
            });

          if (insertFeatureError) throw insertFeatureError;
        }
      }

      toast({
        title: "Succès",
        description: "Les forfaits ont été enregistrés avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement des forfaits.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3">Chargement...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration des forfaits</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          {packages.map((pkg, index) => (
            <div key={pkg.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Forfait #{index + 1}</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removePackage(pkg.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Titre
                  </label>
                  <Input 
                    value={pkg.title} 
                    onChange={(e) => handlePackageChange(pkg.id, 'title', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prix de départ (€)
                  </label>
                  <Input 
                    type="number" 
                    value={pkg.starting_price || ''} 
                    onChange={(e) => handlePackageChange(pkg.id, 'starting_price', parseFloat(e.target.value) || null)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea 
                  value={pkg.description || ''} 
                  onChange={(e) => handlePackageChange(pkg.id, 'description', e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`featured-${pkg.id}`}
                    checked={pkg.is_featured}
                    onCheckedChange={(checked) => handlePackageChange(pkg.id, 'is_featured', checked)}
                  />
                  <Label htmlFor={`featured-${pkg.id}`}>Forfait mis en avant</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`visible-${pkg.id}`}
                    checked={pkg.is_visible}
                    onCheckedChange={(checked) => handlePackageChange(pkg.id, 'is_visible', checked)}
                  />
                  <Label htmlFor={`visible-${pkg.id}`}>Visible</Label>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Fonctionnalités</h4>
                <div className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={feature.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`included-${feature.id}`}
                        checked={feature.is_included}
                        onCheckedChange={(checked) => handleFeatureChange(pkg.id, feature.id, 'is_included', checked)}
                      />
                      <Input
                        className="flex-1"
                        value={feature.feature}
                        onChange={(e) => handleFeatureChange(pkg.id, feature.id, 'feature', e.target.value)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(pkg.id, feature.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={() => addFeature(pkg.id)}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter une fonctionnalité
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          <Button
            variant="outline"
            onClick={addPackage}
            className="w-full flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Ajouter un forfait
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={savePackages}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Enregistrer
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KinkPricingEditor;
