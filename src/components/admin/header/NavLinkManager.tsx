
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pen, Trash2, Plus, ChevronDown, ChevronUp, ChevronRight, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { NavLink } from './types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { v4 as uuidv4 } from 'uuid';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { useNavLinks } from './navigation/useNavLinks';

const NavLinkManager = () => {
  // Utilisation du nouveau hook personnalisé
  const {
    navLinks,
    editingLink,
    isDialogOpen,
    isLoading,
    setEditingLink,
    setIsDialogOpen,
    handleAddLink,
    handleEditLink,
    handleDeleteLink,
    handleSaveLink,
    toggleLinkVisibility,
    moveLink
  } = useNavLinks();

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

  // Reset le formulaire quand le lien d'édition change
  React.useEffect(() => {
    if (editingLink) {
      form.reset(editingLink);
    } else {
      form.reset({
        name: '',
        href: '',
        isVisible: true,
        order: navLinks.length + 1,
        id: uuidv4(),
        parentId: null
      });
    }
  }, [editingLink, form, navLinks.length]);

  // Soumettre le formulaire
  const onSubmit = (data: NavLink) => {
    handleSaveLink(data);
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
          <div className="flex items-center gap-4">
            <SaveIndicator status={isLoading ? 'saving' : 'idle'} />
            <Button onClick={handleAddLink} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouveau lien
            </Button>
          </div>
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
                        onValueChange={(value) => field.onChange(value === "null" ? null : value)} 
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
                  <Button type="submit" disabled={isLoading}>
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
