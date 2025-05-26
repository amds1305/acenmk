
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from '@/lib/supabase';
import { getRoleLabel, getRolesByCategory } from '@/utils/roleUtils';
import { Loader2 } from 'lucide-react';

// Schéma de validation pour le formulaire d'ajout d'utilisateur
const formSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  company: z.string().optional(),
  phone: z.string().optional(),
  role: z.string({ required_error: "Veuillez sélectionner un rôle" }),
});

interface AddUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({
  isOpen,
  onClose,
  onUserAdded
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      company: '',
      phone: '',
      role: 'user',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // En environnement de production, normalement on utiliserait les invitations Supabase
      // Pour cette démo, on va créer directement un profil et un rôle
      const id = crypto.randomUUID();
      
      // Insérer le profil utilisateur
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id,
          email: values.email,
          name: values.name,
          company: values.company || null,
          phone: values.phone || null,
        }
      ]);
      
      if (profileError) throw profileError;
      
      // Ajouter le rôle utilisateur
      const { error: roleError } = await supabase.from('user_roles').insert([
        {
          user_id: id,
          role: values.role
        }
      ]);
      
      if (roleError) throw roleError;
      
      toast({
        title: "Utilisateur ajouté",
        description: "L'utilisateur a été ajouté avec succès."
      });
      
      form.reset();
      onUserAdded();
      onClose();
    } catch (error: any) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter l'utilisateur: " + (error.message || "Erreur inconnue")
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Récupérer les rôles par catégorie
  const clientRoles = getRolesByCategory('client');
  const providerRoles = getRolesByCategory('provider');
  const staffRoles = getRolesByCategory('staff');
  const adminRoles = getRolesByCategory('admin');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un utilisateur</DialogTitle>
          <DialogDescription>
            Créez un nouvel utilisateur dans le système
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="utilisateur@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Jean Dupont" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entreprise (optionnel)</FormLabel>
                  <FormControl>
                    <Input placeholder="Société SARL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone (optionnel)</FormLabel>
                  <FormControl>
                    <Input placeholder="+33 6 12 34 56 78" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rôle</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un rôle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <optgroup label="Clients">
                        {clientRoles.map(role => (
                          <SelectItem key={role} value={role}>
                            {getRoleLabel(role)}
                          </SelectItem>
                        ))}
                      </optgroup>
                      <optgroup label="Prestataires">
                        {providerRoles.map(role => (
                          <SelectItem key={role} value={role}>
                            {getRoleLabel(role)}
                          </SelectItem>
                        ))}
                      </optgroup>
                      <optgroup label="Équipe">
                        {staffRoles.map(role => (
                          <SelectItem key={role} value={role}>
                            {getRoleLabel(role)}
                          </SelectItem>
                        ))}
                      </optgroup>
                      <optgroup label="Administrateurs">
                        {adminRoles.map(role => (
                          <SelectItem key={role} value={role}>
                            {getRoleLabel(role)}
                          </SelectItem>
                        ))}
                      </optgroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Ajout en cours...
                  </>
                ) : "Ajouter l'utilisateur"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
