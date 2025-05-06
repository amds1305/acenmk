
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KinkSectionEditorProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onSave: () => void;
  saveButtonText?: string;
}

const KinkSectionEditor: React.FC<KinkSectionEditorProps> = ({
  title,
  description,
  children,
  onSave,
  saveButtonText = "Enregistrer"
}) => {
  const { toast } = useToast();

  const handleSave = () => {
    onSave();
    toast({
      title: "Section mise à jour",
      description: `La section ${title} a été mise à jour avec succès.`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          {saveButtonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KinkSectionEditor;
