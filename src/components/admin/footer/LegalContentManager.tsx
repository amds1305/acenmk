
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WysiwygEditor } from '@/components/admin/WysiwygEditor';

// Structure pour les contenus légaux
interface LegalContent {
  title: string;
  content: string;
  metaDescription?: string;
  isPublished: boolean;
}

export interface LegalContents {
  legalNotice: LegalContent;
  privacyPolicy: LegalContent;
  termsOfUse: LegalContent;
  cookiesPolicy: LegalContent;
}

const defaultLegalContents: LegalContents = {
  legalNotice: {
    title: "Mentions légales",
    content: "<h1>Mentions légales</h1><p>Ajoutez ici vos mentions légales...</p>",
    metaDescription: "Mentions légales de notre entreprise",
    isPublished: true
  },
  privacyPolicy: {
    title: "Politique de confidentialité",
    content: "<h1>Politique de confidentialité</h1><p>Ajoutez ici votre politique de confidentialité...</p>",
    metaDescription: "Notre politique de confidentialité concernant vos données personnelles",
    isPublished: true
  },
  termsOfUse: {
    title: "Conditions d'utilisation",
    content: "<h1>Conditions d'utilisation</h1><p>Ajoutez ici vos conditions d'utilisation...</p>",
    metaDescription: "Conditions d'utilisation de nos services",
    isPublished: true
  },
  cookiesPolicy: {
    title: "Politique des cookies",
    content: "<h1>Politique des cookies</h1><p>Ajoutez ici votre politique des cookies...</p>",
    metaDescription: "Notre politique concernant l'utilisation des cookies",
    isPublished: true
  }
};

const LegalContentManager: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<LegalContents>(defaultLegalContents);
  const [activeContent, setActiveContent] = useState<keyof LegalContents>('legalNotice');

  // Charger les contenus depuis la base de données
  useEffect(() => {
    const loadLegalContents = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('section_data')
          .select('data')
          .eq('section_id', 'legal-contents')
          .single();

        if (error) {
          if (error.code !== 'PGRST116') { // PGRST116 signifie qu'aucune ligne n'a été trouvée
            console.error("Erreur lors du chargement des contenus légaux:", error);
          }
          // Utiliser les contenus par défaut si aucun contenu n'est trouvé
        } else if (data) {
          setContents(data.data as LegalContents);
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLegalContents();
  }, []);

  // Mettre à jour un contenu
  const updateContent = (section: keyof LegalContents, field: keyof LegalContent, value: string | boolean) => {
    setContents(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Sauvegarder les contenus
  const saveContents = async () => {
    try {
      const { error } = await supabase
        .from('section_data')
        .upsert({
          section_id: 'legal-contents',
          data: contents,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_id' });

      if (error) throw error;

      toast({
        title: "Contenus sauvegardés",
        description: "Les contenus légaux ont été mis à jour avec succès"
      });

      // Créer ou mettre à jour les pages pour chaque contenu légal
      await createOrUpdateLegalPages();
      
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde des contenus",
        variant: "destructive"
      });
    }
  };

  // Créer ou mettre à jour les pages pour chaque contenu légal
  const createOrUpdateLegalPages = async () => {
    try {
      // Mapper les clés des contenus aux slugs des pages
      const contentSlugs = {
        legalNotice: 'mentions-legales',
        privacyPolicy: 'politique-de-confidentialite',
        termsOfUse: 'conditions-utilisation',
        cookiesPolicy: 'politique-cookies'
      };

      // Pour chaque contenu légal
      for (const [key, slug] of Object.entries(contentSlugs) as [keyof LegalContents, string][]) {
        const content = contents[key];
        
        // Vérifier si la page existe déjà
        const { data: existingPage } = await supabase
          .from('pages')
          .select('id')
          .eq('slug', slug)
          .single();

        if (existingPage) {
          // Mettre à jour la page existante
          await supabase
            .from('pages')
            .update({
              title: content.title,
              content: content.content,
              meta_description: content.metaDescription || '',
              is_published: content.isPublished,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingPage.id);
        } else {
          // Créer une nouvelle page
          await supabase
            .from('pages')
            .insert({
              slug,
              title: content.title,
              content: content.content,
              meta_description: content.metaDescription || '',
              is_published: content.isPublished,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
        }
      }

      toast({
        title: "Pages mises à jour",
        description: "Les pages légales ont été créées ou mises à jour"
      });
    } catch (error) {
      console.error("Erreur lors de la création/mise à jour des pages:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des pages légales",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="p-4">Chargement des contenus légaux...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des contenus légaux</CardTitle>
        <CardDescription>
          Créez et modifiez les contenus des pages légales du site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="legalNotice"
          value={activeContent}
          onValueChange={(value) => setActiveContent(value as keyof LegalContents)}
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="legalNotice">Mentions légales</TabsTrigger>
            <TabsTrigger value="privacyPolicy">Confidentialité</TabsTrigger>
            <TabsTrigger value="termsOfUse">Conditions</TabsTrigger>
            <TabsTrigger value="cookiesPolicy">Cookies</TabsTrigger>
          </TabsList>

          {Object.keys(contents).map((contentKey) => {
            const key = contentKey as keyof LegalContents;
            const content = contents[key];
            
            return (
              <TabsContent key={contentKey} value={contentKey} className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${contentKey}-title`}>Titre de la page</Label>
                    <Input
                      id={`${contentKey}-title`}
                      value={content.title}
                      onChange={(e) => updateContent(key, 'title', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`${contentKey}-metaDescription`}>Description Meta (SEO)</Label>
                    <Input
                      id={`${contentKey}-metaDescription`}
                      value={content.metaDescription || ''}
                      onChange={(e) => updateContent(key, 'metaDescription', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`${contentKey}-content`}>Contenu</Label>
                    <div className="min-h-[400px] border rounded-md">
                      <WysiwygEditor
                        value={content.content}
                        onChange={(value) => updateContent(key, 'content', value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`${contentKey}-published`}
                      checked={content.isPublished}
                      onChange={(e) => updateContent(key, 'isPublished', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={`${contentKey}-published`}>Publier cette page</Label>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={saveContents}>Enregistrer les contenus</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LegalContentManager;
