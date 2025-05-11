
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ContentForm } from './ContentForm';
import { useLegalContent } from './useLegalContent';

const LegalContentManager: React.FC = () => {
  const {
    loading,
    contents,
    activeContent,
    setActiveContent,
    updateContent,
    saveContents
  } = useLegalContent();

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
            
            return (
              <TabsContent key={contentKey} value={contentKey} className="space-y-4 mt-4">
                <ContentForm
                  contentKey={key}
                  content={contents[key]}
                  updateContent={updateContent}
                />
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
