
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash, Save, EyeIcon, Upload, Quote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const INITIAL_TESTIMONIALS = [
  {
    id: '1',
    name: 'Jean Dupont',
    company: 'Entreprise ABC',
    role: 'Directeur IT',
    quote: 'L\'équipe a su transformer notre vision en une solution digitale performante, dépassant toutes nos attentes.',
    image: 'https://i.pravatar.cc/300?img=11',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marie Laporte',
    company: 'Startup XYZ',
    role: 'Fondatrice',
    quote: 'Leur expertise technique et leur approche centrée sur l\'utilisateur ont été déterminantes dans le succès de notre application.',
    image: 'https://i.pravatar.cc/300?img=12',
    rating: 5,
  },
  {
    id: '3',
    name: 'Paul Martin',
    company: 'Groupe International',
    role: 'Chef de projet',
    quote: 'Un partenaire fiable qui a su nous accompagner dans toutes les phases de notre transformation numérique.',
    image: 'https://i.pravatar.cc/300?img=13',
    rating: 4,
  },
];

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [editingTestimonial, setEditingTestimonial] = useState<null | typeof INITIAL_TESTIMONIALS[0] & { isNew?: boolean }>(null);
  const [testimonialToDelete, setTestimonialToDelete] = useState<null | { id: string, name: string }>(null);
  
  const [sectionSettings, setSectionSettings] = useState({
    title: 'Ce Que Disent Nos Clients',
    subtitle: 'Découvrez les expériences des entreprises qui nous ont fait confiance',
  });

  const handleEdit = (testimonial: typeof editingTestimonial) => {
    setEditingTestimonial(testimonial);
  };

  const handleSaveTestimonial = () => {
    if (!editingTestimonial) return;
    
    const newTestimonials = [...testimonials];
    
    if (editingTestimonial.isNew) {
      newTestimonials.push({
        ...editingTestimonial,
        id: Date.now().toString(),
      });
    } else {
      const index = newTestimonials.findIndex(t => t.id === editingTestimonial.id);
      if (index !== -1) {
        newTestimonials[index] = editingTestimonial;
      }
    }
    
    setTestimonials(newTestimonials);
    setEditingTestimonial(null);
    
    toast({
      title: editingTestimonial.isNew ? "Témoignage ajouté" : "Témoignage mis à jour",
      description: editingTestimonial.isNew 
        ? "Le nouveau témoignage a été ajouté avec succès." 
        : "Le témoignage a été mis à jour avec succès.",
    });
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
    setTestimonialToDelete(null);
    
    toast({
      title: "Témoignage supprimé",
      description: "Le témoignage a été supprimé avec succès.",
    });
  };

  const handleSaveSection = () => {
    // Ici nous sauvegarderions normalement les données vers une API
    console.log('Section settings', sectionSettings);
    console.log('Testimonials', testimonials);
    
    toast({
      title: "Modifications enregistrées",
      description: "La section Témoignages a été mise à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Témoignages</h1>
          <p className="text-muted-foreground">
            Gérez les témoignages de vos clients qui apparaissent sur le site.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => window.open('/#testimonials', '_blank')}>
            <EyeIcon className="mr-2 h-4 w-4" />
            Voir
          </Button>
          <Button onClick={handleSaveSection}>
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres de la section</CardTitle>
          <CardDescription>Personnalisez le titre et le sous-titre de la section Témoignages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="section-title">Titre</Label>
            <Input 
              id="section-title" 
              value={sectionSettings.title} 
              onChange={(e) => setSectionSettings({...sectionSettings, title: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="section-subtitle">Sous-titre</Label>
            <Textarea 
              id="section-subtitle" 
              value={sectionSettings.subtitle} 
              onChange={(e) => setSectionSettings({...sectionSettings, subtitle: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Liste des témoignages</h2>
        <Button 
          onClick={() => handleEdit({ 
            id: '', 
            name: '', 
            company: '', 
            role: '', 
            quote: '', 
            image: '', 
            rating: 5,
            isNew: true 
          })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un témoignage
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                  {testimonial.image ? (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      N/A
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} chez {testimonial.company}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 relative pl-8">
                <Quote className="absolute left-0 top-0 h-6 w-6 text-primary/20" />
                <p className="italic text-gray-600 dark:text-gray-300">{testimonial.quote}</p>
              </div>
              
              <div className="flex justify-end items-center mt-4 pt-4 border-t">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setTestimonialToDelete({ id: testimonial.id, name: testimonial.name })}
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                        <DialogDescription>
                          Êtes-vous sûr de vouloir supprimer le témoignage de {testimonialToDelete?.name} ? Cette action est irréversible.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setTestimonialToDelete(null)}>
                          Annuler
                        </Button>
                        <Button variant="destructive" onClick={() => testimonialToDelete && handleDeleteTestimonial(testimonialToDelete.id)}>
                          Supprimer
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog for editing testimonials */}
      <Dialog
        open={editingTestimonial !== null}
        onOpenChange={(open) => !open && setEditingTestimonial(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial?.isNew ? 'Ajouter un témoignage' : 'Modifier le témoignage'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="testimonial-name">Nom</Label>
                <Input 
                  id="testimonial-name" 
                  value={editingTestimonial?.name || ''} 
                  onChange={(e) => setEditingTestimonial(prev => prev ? {...prev, name: e.target.value} : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="testimonial-rating">Note (sur 5)</Label>
                <Input 
                  id="testimonial-rating" 
                  type="number" 
                  min="1"
                  max="5"
                  value={editingTestimonial?.rating || 5} 
                  onChange={(e) => setEditingTestimonial(prev => prev ? {...prev, rating: parseInt(e.target.value)} : null)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="testimonial-company">Entreprise</Label>
                <Input 
                  id="testimonial-company" 
                  value={editingTestimonial?.company || ''} 
                  onChange={(e) => setEditingTestimonial(prev => prev ? {...prev, company: e.target.value} : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="testimonial-role">Rôle</Label>
                <Input 
                  id="testimonial-role" 
                  value={editingTestimonial?.role || ''} 
                  onChange={(e) => setEditingTestimonial(prev => prev ? {...prev, role: e.target.value} : null)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="testimonial-quote">Témoignage</Label>
              <Textarea 
                id="testimonial-quote" 
                value={editingTestimonial?.quote || ''} 
                onChange={(e) => setEditingTestimonial(prev => prev ? {...prev, quote: e.target.value} : null)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="testimonial-image">Photo</Label>
              <div className="flex items-end gap-4">
                <div className="relative h-16 w-16 rounded-full bg-gray-100 overflow-hidden">
                  {editingTestimonial?.image ? (
                    <img 
                      src={editingTestimonial.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      N/A
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
                <Input 
                  id="testimonial-image" 
                  value={editingTestimonial?.image || ''} 
                  onChange={(e) => setEditingTestimonial(prev => prev ? {...prev, image: e.target.value} : null)}
                  placeholder="URL de l'image ou téléchargez"
                  className="grow"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTestimonial(null)}>
              Annuler
            </Button>
            <Button onClick={handleSaveTestimonial}>
              {editingTestimonial?.isNew ? 'Ajouter' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonials;
