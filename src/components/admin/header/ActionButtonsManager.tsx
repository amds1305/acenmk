
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Pen, Trash2, Plus, Move, ArrowRight, Mail, Send } from 'lucide-react';
import { ActionButton } from './types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { v4 as uuidv4 } from 'uuid';
import { iconsMap } from './iconsMap';
import { Checkbox } from '@/components/ui/checkbox';

const ActionButtonsManager = () => {
  const { toast } = useToast();
  
  // État initial des boutons d'action
  const [actionButtons, setActionButtons] = useState<ActionButton[]>([
    { 
      id: '1', 
      label: 'Contactez-nous', 
      href: '/#contact', 
      icon: Mail, 
      variant: 'default', 
      isVisible: true, 
      order: 1 
    },
    { 
      id: '2', 
      label: 'Demander un devis', 
      href: '/estimation', 
      icon: Send, 
      variant: 'outline', 
      isVisible: true, 
      order: 2 
    },
  ]);

  // État pour le bouton en cours d'édition
  const [editingButton, setEditingButton] = useState<ActionButton | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Formulaire pour l'édition/ajout de bouton
  const form = useForm<ActionButton>({
    defaultValues: {
      label: '',
      href: '',
      variant: 'default',
      isVisible: true,
      order: 0,
      id: ''
    }
  });

  // Ouvrir le dialogue d'édition pour un bouton existant
  const handleEditButton = (button: ActionButton) => {
    setEditingButton(button);
    form.reset(button);
    setIsDialogOpen(true);
  };

  // Ouvrir le dialogue pour ajouter un nouveau bouton
  const handleAddButton = () => {
    setEditingButton(null);
    form.reset({
      label: '',
      href: '',
      variant: 'default',
      isVisible: true,
      order: actionButtons.length + 1,
      id: uuidv4()
    });
    setIsDialogOpen(true);
  };

  // Supprimer un bouton
  const handleDeleteButton = (buttonId: string) => {
    setActionButtons(actionButtons.filter(btn => btn.id !== buttonId));
    toast({
      title: "Succès",
      description: "Bouton supprimé"
    });
  };

  // Soumettre le formulaire pour ajouter/éditer un bouton
  const onSubmit = (data: ActionButton) => {
    if (editingButton) {
      // Mise à jour d'un bouton existant
      setActionButtons(actionButtons.map(btn => 
        btn.id === editingButton.id ? data : btn
      ));
      toast({
        title: "Succès",
        description: "Bouton mis à jour"
      });
    } else {
      // Ajout d'un nouveau bouton
      setActionButtons([...actionButtons, data]);
      toast({
        title: "Succès",
        description: "Bouton ajouté"
      });
    }
    
    setIsDialogOpen(false);
  };

  // Changer l'ordre des boutons
  const moveButton = (buttonId: string, direction: 'up' | 'down') => {
    const currentButtons = [...actionButtons];
    const index = currentButtons.findIndex(btn => btn.id === buttonId);
    
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === currentButtons.length - 1)) {
      return; // Ne peut pas déplacer plus haut/bas
    }
    
    const otherIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Échanger les ordres
    const tempOrder = currentButtons[index].order;
    currentButtons[index].order = currentButtons[otherIndex].order;
    currentButtons[otherIndex].order = tempOrder;
    
    // Trier le tableau par ordre
    setActionButtons([...currentButtons].sort((a, b) => a.order - b.order));
  };

  // Fonction pour prévisualiser le bouton
  const renderButtonPreview = (button: ActionButton) => {
    const IconComponent = button.icon || ArrowRight;
    
    return (
      <Button
        variant={button.variant}
        className="pointer-events-none mb-2"
        disabled={!button.isVisible}
      >
        {button.label}
        {button.icon && <IconComponent className="ml-2 h-4 w-4" />}
      </Button>
    );
  };

  return (
    <CardContent>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Boutons d'action</h3>
          <Button onClick={handleAddButton} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouveau bouton
          </Button>
        </div>
        
        <div className="space-y-2">
          {actionButtons
            .sort((a, b) => a.order - b.order)
            .map((button) => (
              <div key={button.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                <div className="flex flex-col">
                  {renderButtonPreview(button)}
                  <p className="text-sm text-gray-500 dark:text-gray-400">{button.href}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" onClick={() => moveButton(button.id, 'up')}>
                    ↑
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => moveButton(button.id, 'down')}>
                    ↓
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleEditButton(button)}>
                    <Pen className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteButton(button.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
        
        {/* Dialogue pour ajouter/éditer un bouton */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingButton ? 'Modifier le bouton' : 'Ajouter un nouveau bouton'}
              </DialogTitle>
              <DialogDescription>
                {editingButton 
                  ? "Modifiez les paramètres de ce bouton d'action." 
                  : "Créez un nouveau bouton d'action pour l'en-tête."}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Libellé du bouton</FormLabel>
                      <FormControl>
                        <Input placeholder="Contactez-nous" {...field} />
                      </FormControl>
                      <FormDescription>
                        Le texte affiché sur le bouton
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="href"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de destination</FormLabel>
                      <FormControl>
                        <Input placeholder="/contact" {...field} />
                      </FormControl>
                      <FormDescription>
                        L'URL vers laquelle le bouton redirige
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="variant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Style du bouton</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="default">Principal</SelectItem>
                          <SelectItem value="secondary">Secondaire</SelectItem>
                          <SelectItem value="outline">Contour</SelectItem>
                          <SelectItem value="ghost">Transparent</SelectItem>
                          <SelectItem value="link">Lien</SelectItem>
                          <SelectItem value="destructive">Destructif</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        L'apparence visuelle du bouton
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icône (optionnelle)</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(value ? iconsMap[value] : undefined)} 
                        value={Object.entries(iconsMap).find(([_, icon]) => icon === field.value)?.[0] || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir une icône" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Aucune icône</SelectItem>
                          <SelectItem value="ArrowRight">Flèche droite</SelectItem>
                          <SelectItem value="Mail">E-mail</SelectItem>
                          <SelectItem value="Phone">Téléphone</SelectItem>
                          <SelectItem value="Send">Envoyer</SelectItem>
                          <SelectItem value="Download">Télécharger</SelectItem>
                          <SelectItem value="ExternalLink">Lien externe</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        L'icône à afficher à côté du texte
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isVisible"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Visible</FormLabel>
                        <FormDescription>
                          Afficher ce bouton dans l'en-tête
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requiresAuth"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Nécessite authentification
                        </FormLabel>
                        <FormDescription>
                          Visible uniquement pour les utilisateurs connectés
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">
                    {editingButton ? 'Mettre à jour' : 'Ajouter'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </CardContent>
  );
};

export default ActionButtonsManager;
