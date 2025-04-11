
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Pen, Trash2, Plus, ChevronDown, ChevronUp, ChevronRight, ExternalLink, Eye, EyeOff, Move } from 'lucide-react';
import { NavLink } from './types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { v4 as uuidv4 } from 'uuid';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const NavLinkManager = () => {
  const { toast } = useToast();
  
  // État initial des liens de navigation (simulé - devrait être de vraies données)
  const [navLinks, setNavLinks] = useState<NavLink[]>([
    { id: '1', name: 'Accueil', href: '/', order: 1, isVisible: true, parentId: null },
    { id: '2', name: 'Services', href: '/#services', order: 2, isVisible: true, parentId: null },
    { id: '3', name: 'Portfolio', href: '/portfolio', order: 3, isVisible: true, parentId: null },
    { id: '4', name: 'Services Web', href: '/services/web', order: 1, isVisible: true, parentId: '2' },
    { id: '5', name: 'Services Design', href: '/services/design', order: 2, isVisible: true, parentId: '2' },
    { id: '6', name: 'Estimation', href: '/estimation', order: 4, isVisible: true, parentId: null },
    { id: '7', name: 'Contact', href: '/#contact', order: 5, isVisible: true, parentId: null },
    { id: '8', name: 'ACE JOB', href: '/ace-job', order: 6, isVisible: true, parentId: null },
  ]);

  // État pour le lien en cours d'édition
  const [editingLink, setEditingLink] = useState<NavLink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Formulaire pour l'édition/ajout de lien
  const form = useForm<NavLink>({
    defaultValues: {
      name: '',
      href: '',
      isVisible: true,
      order: 0,
      id: '',
      parentId: null
    }
  });

  // Liens de premier niveau (sans parent)
  const parentLinks = navLinks.filter(link => link.parentId === null);

  // Ouvrir le dialogue d'édition pour un lien existant
  const handleEditLink = (link: NavLink) => {
    setEditingLink(link);
    form.reset(link);
    setIsDialogOpen(true);
  };

  // Ouvrir le dialogue pour ajouter un nouveau lien
  const handleAddLink = () => {
    setEditingLink(null);
    form.reset({
      name: '',
      href: '',
      isVisible: true,
      order: navLinks.length + 1,
      id: uuidv4(),
      parentId: null
    });
    setIsDialogOpen(true);
  };

  // Supprimer un lien
  const handleDeleteLink = (linkId: string) => {
    // Vérifier si le lien a des enfants
    const hasChildren = navLinks.some(link => link.parentId === linkId);
    
    if (hasChildren) {
      toast({
        title: "Action impossible",
        description: "Ce lien possède des sous-menus. Veuillez d'abord supprimer ou déplacer ses sous-menus.",
        variant: "destructive"
      });
      return;
    }
    
    setNavLinks(navLinks.filter(link => link.id !== linkId));
    toast({
      title: "Succès",
      description: "Lien supprimé"
    });
  };

  // Soumettre le formulaire pour ajouter/éditer un lien
  const onSubmit = (data: NavLink) => {
    if (editingLink) {
      // Mise à jour d'un lien existant
      setNavLinks(navLinks.map(link => 
        link.id === editingLink.id ? data : link
      ));
      toast({
        title: "Succès",
        description: "Lien mis à jour"
      });
    } else {
      // Ajout d'un nouveau lien
      setNavLinks([...navLinks, data]);
      toast({
        title: "Succès",
        description: "Lien ajouté"
      });
    }
    
    setIsDialogOpen(false);
  };

  // Basculer la visibilité d'un lien
  const toggleLinkVisibility = (linkId: string) => {
    setNavLinks(navLinks.map(link => 
      link.id === linkId ? { ...link, isVisible: !link.isVisible } : link
    ));
  };

  // Déplacer un lien vers le haut ou le bas dans l'ordre
  const moveLink = (linkId: string, direction: 'up' | 'down') => {
    const linkIndex = navLinks.findIndex(link => link.id === linkId);
    const link = navLinks[linkIndex];
    
    // Trouver tous les liens au même niveau (même parent ou null)
    const sameLevelLinks = navLinks.filter(l => l.parentId === link.parentId);
    const linkLevelIndex = sameLevelLinks.findIndex(l => l.id === linkId);
    
    if ((direction === 'up' && linkLevelIndex === 0) || 
        (direction === 'down' && linkLevelIndex === sameLevelLinks.length - 1)) {
      return; // Ne peut pas déplacer plus haut/bas
    }
    
    // Mettre à jour l'ordre de tous les liens au même niveau
    const newSameLevelLinks = [...sameLevelLinks];
    const swapIndex = direction === 'up' ? linkLevelIndex - 1 : linkLevelIndex + 1;
    
    // Échanger l'ordre des deux liens
    const tempOrder = newSameLevelLinks[linkLevelIndex].order;
    newSameLevelLinks[linkLevelIndex].order = newSameLevelLinks[swapIndex].order;
    newSameLevelLinks[swapIndex].order = tempOrder;
    
    // Mettre à jour l'état global
    const updatedLinks = navLinks.map(l => {
      const updatedLink = newSameLevelLinks.find(nl => nl.id === l.id);
      return updatedLink || l;
    });
    
    setNavLinks(updatedLinks);
  };

  // Fonction récursive pour afficher les liens et leurs sous-liens
  const renderNavLinks = (links: NavLink[], level = 0) => {
    // Trier les liens par ordre avant affichage
    const sortedLinks = [...links].sort((a, b) => a.order - b.order);
    
    return sortedLinks.map((link) => {
      // Trouver les enfants de ce lien
      const children = navLinks.filter(l => l.parentId === link.id);
      
      return (
        <div key={link.id} className="space-y-2">
          <div className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md ${level > 0 ? 'ml-6 border-l-2 border-gray-200 dark:border-gray-700' : ''}`}>
            <div className="flex items-center space-x-2">
              {level > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
              <div>
                <div className="flex items-center">
                  <p className={`font-medium ${!link.isVisible ? 'text-gray-400 dark:text-gray-500' : ''}`}>{link.name}</p>
                  {link.isExternal && <ExternalLink className="ml-1 h-3 w-3 text-gray-400" />}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{link.href}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button size="sm" variant="ghost" onClick={() => moveLink(link.id, 'up')}>
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => moveLink(link.id, 'down')}>
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => toggleLinkVisibility(link.id)}
              >
                {link.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-gray-400" />}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleEditLink(link)}>
                <Pen className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleDeleteLink(link.id)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
          
          {/* Afficher récursivement les enfants */}
          {children.length > 0 && (
            <div className="ml-4">
              {renderNavLinks(children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <CardContent>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Structure du menu de navigation</h3>
          <Button onClick={handleAddLink} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouveau lien
          </Button>
        </div>
        
        <div className="space-y-2">
          {renderNavLinks(parentLinks)}
        </div>
        
        {/* Dialogue pour ajouter/éditer un lien */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingLink ? 'Modifier le lien' : 'Ajouter un nouveau lien'}
              </DialogTitle>
              <DialogDescription>
                {editingLink 
                  ? 'Modifiez les détails de ce lien de navigation.' 
                  : 'Créez un nouveau lien dans le menu de navigation.'}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du lien</FormLabel>
                      <FormControl>
                        <Input placeholder="Accueil" {...field} />
                      </FormControl>
                      <FormDescription>
                        Le texte affiché dans le menu de navigation
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="href"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL du lien</FormLabel>
                      <FormControl>
                        <Input placeholder="/accueil" {...field} />
                      </FormControl>
                      <FormDescription>
                        L'URL vers laquelle le lien redirige
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent (optionnel)</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value || "null"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Menu principal (sans parent)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="null">Menu principal (sans parent)</SelectItem>
                          {navLinks
                            .filter(link => link.parentId === null && (!editingLink || link.id !== editingLink.id))
                            .map(link => (
                              <SelectItem key={link.id} value={link.id}>
                                {link.name}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Sélectionnez si ce lien est un sous-menu d'un autre lien
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
                          Afficher ce lien dans le menu de navigation
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
                  name="isExternal"
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
                          Lien externe
                        </FormLabel>
                        <FormDescription>
                          Cochez si ce lien pointe vers un site externe
                        </FormDescription>
                      </div>
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
                    {editingLink ? 'Mettre à jour' : 'Ajouter'}
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

export default NavLinkManager;
