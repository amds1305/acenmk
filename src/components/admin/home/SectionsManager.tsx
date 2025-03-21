
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, GripVertical, Edit, Eye, EyeOff, Trash2, Save } from 'lucide-react';
import { useSections } from '@/contexts/SectionsContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionType } from '@/types/sections';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

type NewSectionForm = {
  type: SectionType;
  title: string;
};

const SectionsManager: React.FC = () => {
  const { 
    config, 
    addNewSection, 
    removeExistingSection, 
    reorderExistingSections, 
    updateSectionVisibility,
    saveChanges
  } = useSections();

  const [newSection, setNewSection] = useState<NewSectionForm>({
    type: 'custom',
    title: '',
  });
  
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === index) return;

    const newOrder = [...config.sections].sort((a, b) => a.order - b.order);
    const draggedSection = newOrder[draggingIndex];
    
    // Réorganiser les sections
    newOrder.splice(draggingIndex, 1);
    newOrder.splice(index, 0, draggedSection);
    
    // Mettre à jour les ordres
    const orderedIds = newOrder.map(section => section.id);
    reorderExistingSections(orderedIds);
    
    // Mettre à jour l'index de l'élément en cours de glissement
    setDraggingIndex(index);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  const handleAddSection = () => {
    if (!newSection.title.trim()) return;
    
    addNewSection(newSection.type, newSection.title);
    setNewSection({ type: 'custom', title: '' });
    setDialogOpen(false);
  };

  const handleToggleVisibility = (id: string, currentVisibility: boolean) => {
    updateSectionVisibility(id, !currentVisibility);
  };

  const handleRemoveSection = (id: string) => {
    removeExistingSection(id);
  };

  const standardSectionTypes: SectionType[] = [
    'hero', 'services', 'about', 'team', 'testimonials', 'faq', 'contact'
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Gestion des sections</CardTitle>
          <CardDescription>
            Ajoutez, réorganisez et gérez les sections de la page d'accueil
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle section</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="section-type">Type de section</Label>
                  <Select 
                    value={newSection.type} 
                    onValueChange={(value) => setNewSection({...newSection, type: value as SectionType})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {standardSectionTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">Section personnalisée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section-title">Titre de la section</Label>
                  <Input 
                    id="section-title" 
                    value={newSection.title} 
                    onChange={(e) => setNewSection({...newSection, title: e.target.value})}
                    placeholder="Ex: Nos partenaires"
                  />
                </div>
                <Button onClick={handleAddSection} className="w-full">
                  Ajouter la section
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button onClick={saveChanges} variant="default" size="sm" className="gap-1">
            <Save className="h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="border rounded-md divide-y">
          {config.sections.sort((a, b) => a.order - b.order).map((section, index) => (
            <div 
              key={section.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center justify-between p-3 ${draggingIndex === index ? 'bg-muted' : ''} ${!section.visible ? 'opacity-60' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="cursor-move p-1 text-muted-foreground hover:text-foreground">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">{section.title}</div>
                  <div className="text-xs text-muted-foreground">Type: {section.type}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleToggleVisibility(section.id, section.visible)}
                >
                  {section.visible ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action supprimera la section "{section.title}" de la page d'accueil.
                        {section.type !== 'custom' && " Cette section standard peut être ré-ajoutée plus tard."}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleRemoveSection(section.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
          
          {config.sections.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <p>Aucune section configurée. Ajoutez des sections pour personnaliser votre page d'accueil.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionsManager;
