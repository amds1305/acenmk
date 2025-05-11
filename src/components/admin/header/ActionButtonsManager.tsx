import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Save, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { Badge } from '@/components/ui/badge';

// Define valid button variant types
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

interface ActionButton {
  id: string;
  label: string;
  href: string;
  variant: ButtonVariant;
  icon?: string;
  requiresAuth: boolean;
  order: number;
}

export const ActionButtonsManager = () => {
  const { toast } = useToast();
  const { showProcessing, showSaveSuccess, showSaveError } = useAdminNotification();
  const [buttons, setButtons] = useState<ActionButton[]>([]);
  const [editingButton, setEditingButton] = useState<ActionButton | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadButtons();
  }, []);

  const loadButtons = async () => {
    setIsLoading(true);
    try {
      // Here you would fetch from your API
      // For now, we'll use mock data
      const mockButtons: ActionButton[] = [
        {
          id: '1',
          label: 'Se connecter',
          href: '/login',
          variant: 'outline',
          requiresAuth: false,
          order: 0
        },
        {
          id: '2',
          label: 'Démarrer',
          href: '/register',
          variant: 'default',
          requiresAuth: false,
          order: 1
        }
      ];
      
      setButtons(mockButtons);
    } catch (error) {
      console.error('Error loading buttons:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les boutons d'action",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddButton = () => {
    const newButton: ActionButton = {
      id: `new-${Date.now()}`,
      label: 'Nouveau bouton',
      href: '/',
      variant: 'default',
      requiresAuth: false,
      order: buttons.length
    };
    
    setEditingButton(newButton);
  };

  const handleEditButton = (button: ActionButton) => {
    setEditingButton({...button});
  };

  const handleSaveButton = () => {
    if (!editingButton) return;
    
    const isNew = editingButton.id.startsWith('new-');
    const updatedButtons = isNew 
      ? [...buttons, editingButton]
      : buttons.map(b => b.id === editingButton.id ? editingButton : b);
    
    setButtons(updatedButtons);
    setEditingButton(null);
    
    toast({
      title: isNew ? "Bouton ajouté" : "Bouton modifié",
      description: isNew 
        ? "Le nouveau bouton a été ajouté avec succès" 
        : "Le bouton a été modifié avec succès",
    });
  };

  const handleDeleteButton = (id: string) => {
    setButtons(buttons.filter(b => b.id !== id));
    
    toast({
      title: "Bouton supprimé",
      description: "Le bouton a été supprimé avec succès",
    });
  };

  const handleMoveButton = (id: string, direction: 'up' | 'down') => {
    const index = buttons.findIndex(b => b.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === buttons.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newButtons = [...buttons];
    
    // Swap the buttons
    [newButtons[index], newButtons[newIndex]] = [newButtons[newIndex], newButtons[index]];
    
    // Update order
    newButtons.forEach((button, idx) => {
      button.order = idx;
    });
    
    setButtons(newButtons);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    showProcessing();
    
    try {
      // Here you would save to your API
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showSaveSuccess();
      toast({
        title: "Modifications enregistrées",
        description: "Les boutons d'action ont été mis à jour avec succès",
      });
    } catch (error) {
      console.error('Error saving buttons:', error);
      showSaveError();
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderButtonPreview = (variant: string, label: string) => {
    // Ensure variant is a valid ButtonVariant
    const safeVariant: ButtonVariant = 
      ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'].includes(variant) 
        ? variant as ButtonVariant 
        : 'default';
    
    return (
      <Button
        variant={safeVariant}
        className="pointer-events-none"
      >
        {label || 'Button'}
      </Button>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Boutons d'action</CardTitle>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddButton}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
          <Button 
            size="sm" 
            onClick={handleSaveAll}
            disabled={isSaving}
          >
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4">Chargement des boutons...</div>
        ) : buttons.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            Aucun bouton d'action configuré. Cliquez sur "Ajouter" pour créer un bouton.
          </div>
        ) : (
          <div className="space-y-2">
            {buttons.map((button) => (
              <div 
                key={button.id} 
                className="flex items-center justify-between border p-3 rounded-md"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    {renderButtonPreview(button.variant, button.label)}
                  </div>
                  <div>
                    <h3 className="font-medium">{button.label}</h3>
                    <p className="text-sm text-muted-foreground">{button.href}</p>
                    {button.requiresAuth && (
                      <Badge variant="outline" className="mt-1">Authentification requise</Badge>
                    )}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleMoveButton(button.id, 'up')}
                    disabled={button.order === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleMoveButton(button.id, 'down')}
                    disabled={button.order === buttons.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditButton(button)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteButton(button.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {editingButton && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {editingButton.id.startsWith('new-') ? 'Ajouter un bouton' : 'Modifier le bouton'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="button-label">Texte du bouton</Label>
                  <Input 
                    id="button-label" 
                    value={editingButton.label} 
                    onChange={(e) => setEditingButton({...editingButton, label: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="button-href">Lien (URL)</Label>
                  <Input 
                    id="button-href" 
                    value={editingButton.href} 
                    onChange={(e) => setEditingButton({...editingButton, href: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="button-variant">Style du bouton</Label>
                  <Select 
                    value={editingButton.variant} 
                    onValueChange={(value: ButtonVariant) => 
                      setEditingButton({...editingButton, variant: value})
                    }
                  >
                    <SelectTrigger id="button-variant">
                      <SelectValue placeholder="Sélectionner un style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Par défaut</SelectItem>
                      <SelectItem value="secondary">Secondaire</SelectItem>
                      <SelectItem value="outline">Contour</SelectItem>
                      <SelectItem value="ghost">Fantôme</SelectItem>
                      <SelectItem value="link">Lien</SelectItem>
                      <SelectItem value="destructive">Destructif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="requires-auth" 
                    checked={editingButton.requiresAuth}
                    onCheckedChange={(checked) => 
                      setEditingButton({...editingButton, requiresAuth: checked})
                    }
                  />
                  <Label htmlFor="requires-auth">Nécessite une authentification</Label>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingButton(null)}
                  >
                    Annuler
                  </Button>
                  <Button onClick={handleSaveButton}>
                    Enregistrer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActionButtonsManager;
