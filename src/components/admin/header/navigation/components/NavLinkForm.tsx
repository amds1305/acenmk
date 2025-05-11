
import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { NavLink } from '../../../header/types';
import { iconsMap } from '../../iconsMap';

interface NavLinkFormProps {
  editingLink: NavLink | null;
  navLinks: NavLink[];
  isLoading: boolean;
  onSubmit: (data: NavLink) => void;
}

const NavLinkForm = ({ editingLink, navLinks, isLoading, onSubmit }: NavLinkFormProps) => {
  const form = useForm<NavLink>({
    defaultValues: {
      name: '',
      href: '',
      isVisible: true,
      order: 0,
      id: '',
      parentId: null,
      icon: ''
    }
  });

  // Liste des icônes disponibles pour la sélection
  const availableIcons = Object.keys(iconsMap);

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
        id: crypto.randomUUID(),
        parentId: null,
        icon: ''
      });
    }
  }, [editingLink, form, navLinks.length]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du lien (optionnel si icône)</FormLabel>
              <FormControl>
                <Input placeholder="Accueil" {...field} />
              </FormControl>
              <FormDescription>
                Le texte affiché dans le menu de navigation (peut être vide si vous utilisez une icône)
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icône (optionnel)</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value || ''}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une icône (optionnel)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">Aucune icône</SelectItem>
                  {availableIcons.map(icon => (
                    <SelectItem key={icon} value={icon}>
                      <div className="flex items-center">
                        {React.createElement(iconsMap[icon], { size: 16, className: "mr-2" })}
                        {icon}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Sélectionnez une icône à afficher (si Accueil, utilisez "Home")
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
  );
};

export default NavLinkForm;
