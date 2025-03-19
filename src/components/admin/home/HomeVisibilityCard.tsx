
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface SectionVisibility {
  hero: boolean;
  services: boolean;
  about: boolean;
  team: boolean;
  testimonials: boolean;
  faq: boolean;
  contact: boolean;
}

interface HomeVisibilityCardProps {
  visibleSections: SectionVisibility;
  toggleSection: (section: keyof SectionVisibility) => void;
}

const HomeVisibilityCard: React.FC<HomeVisibilityCardProps> = ({ 
  visibleSections, 
  toggleSection 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visibilité des sections</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Activez ou désactivez les sections qui apparaissent sur la page d'accueil.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <Label htmlFor="toggle-hero" className="font-medium">Section Hero</Label>
              <p className="text-sm text-muted-foreground">La bannière principale en haut de la page</p>
            </div>
            <Switch 
              id="toggle-hero" 
              checked={visibleSections.hero} 
              onCheckedChange={() => toggleSection('hero')}
            />
          </div>
          
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <Label htmlFor="toggle-services" className="font-medium">Section Services</Label>
              <p className="text-sm text-muted-foreground">Présentation des services offerts</p>
            </div>
            <Switch 
              id="toggle-services" 
              checked={visibleSections.services} 
              onCheckedChange={() => toggleSection('services')}
            />
          </div>
          
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <Label htmlFor="toggle-about" className="font-medium">Section À propos</Label>
              <p className="text-sm text-muted-foreground">Présentation de l'entreprise</p>
            </div>
            <Switch 
              id="toggle-about" 
              checked={visibleSections.about} 
              onCheckedChange={() => toggleSection('about')}
            />
          </div>
          
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <Label htmlFor="toggle-team" className="font-medium">Section Équipe</Label>
              <p className="text-sm text-muted-foreground">Présentation des membres de l'équipe</p>
            </div>
            <Switch 
              id="toggle-team" 
              checked={visibleSections.team} 
              onCheckedChange={() => toggleSection('team')}
            />
          </div>
          
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <Label htmlFor="toggle-testimonials" className="font-medium">Section Témoignages</Label>
              <p className="text-sm text-muted-foreground">Témoignages clients</p>
            </div>
            <Switch 
              id="toggle-testimonials" 
              checked={visibleSections.testimonials} 
              onCheckedChange={() => toggleSection('testimonials')}
            />
          </div>
          
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <Label htmlFor="toggle-faq" className="font-medium">Section FAQ</Label>
              <p className="text-sm text-muted-foreground">Questions fréquemment posées</p>
            </div>
            <Switch 
              id="toggle-faq" 
              checked={visibleSections.faq} 
              onCheckedChange={() => toggleSection('faq')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="toggle-contact" className="font-medium">Section Contact</Label>
              <p className="text-sm text-muted-foreground">Formulaire de contact</p>
            </div>
            <Switch 
              id="toggle-contact" 
              checked={visibleSections.contact} 
              onCheckedChange={() => toggleSection('contact')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeVisibilityCard;
