
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { WysiwygEditor } from '@/components/admin/WysiwygEditor';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getLegalContent, updateLegalContent } from '@/services/legal';
import { Loader2, Save } from 'lucide-react';

export const LegalContentManager = () => {
  const [activeTab, setActiveTab] = useState('legal-notice');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: content, isLoading } = useQuery({
    queryKey: ['legal', activeTab],
    queryFn: () => getLegalContent(activeTab),
  });
  
  const [editorContent, setEditorContent] = useState('');
  
  // Mettre à jour le contenu de l'éditeur lorsque les données sont chargées
  React.useEffect(() => {
    if (content) {
      setEditorContent(content);
    }
  }, [content]);
  
  const { mutate: saveContent, isPending } = useMutation({
    mutationFn: async () => {
      return updateLegalContent(activeTab, editorContent);
    },
    onSuccess: () => {
      toast({
        title: "Contenu enregistré",
        description: "Le contenu a été mis à jour avec succès.",
      });
      queryClient.invalidateQueries({ queryKey: ['legal'] });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du contenu.",
      });
    },
  });
  
  const handleSave = () => {
    saveContent();
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des contenus légaux</CardTitle>
        <CardDescription>
          Modifiez les textes des pages légales de votre site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="legal-notice">Mentions légales</TabsTrigger>
            <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
            <TabsTrigger value="terms">Conditions</TabsTrigger>
            <TabsTrigger value="cookies">Cookies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="legal-notice">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <WysiwygEditor value={editorContent} onChange={setEditorContent} />
            )}
          </TabsContent>
          
          <TabsContent value="privacy">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <WysiwygEditor value={editorContent} onChange={setEditorContent} />
            )}
          </TabsContent>
          
          <TabsContent value="terms">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <WysiwygEditor value={editorContent} onChange={setEditorContent} />
            )}
          </TabsContent>
          
          <TabsContent value="cookies">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <WysiwygEditor value={editorContent} onChange={setEditorContent} />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Enregistrer les modifications
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LegalContentManager;
