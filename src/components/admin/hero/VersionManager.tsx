
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, Trash2, Copy, FileEdit, ChevronRight } from 'lucide-react';
import { HeroVersion } from './types';

interface VersionManagerProps {
  versions: HeroVersion[];
  activeVersionId: string;
  onAddVersion: () => void;
  onDeleteVersion: (id: string) => void;
  onSetActiveVersion: (id: string) => void;
  onUpdateVersion: (version: HeroVersion) => void;
}

const VersionManager = ({
  versions,
  activeVersionId,
  onAddVersion,
  onDeleteVersion,
  onSetActiveVersion,
  onUpdateVersion,
}: VersionManagerProps) => {
  // Fonction de mise à jour du nom de la version
  const updateVersionName = (id: string, name: string) => {
    const version = versions.find(v => v.id === id);
    if (version) {
      onUpdateVersion({
        ...version,
        name
      });
    }
  };

  // Fonction de mise à jour du titre du hero
  const updateVersionTitle = (id: string, title: string) => {
    const version = versions.find(v => v.id === id);
    if (version) {
      onUpdateVersion({
        ...version,
        title
      });
    }
  };

  // Fonction de mise à jour du sous-titre du hero
  const updateVersionSubtitle = (id: string, subtitle: string) => {
    const version = versions.find(v => v.id === id);
    if (version) {
      onUpdateVersion({
        ...version,
        subtitle
      });
    }
  };

  // Fonction de mise à jour du texte du CTA principal
  const updateVersionCtaText = (id: string, ctaText: string) => {
    const version = versions.find(v => v.id === id);
    if (version) {
      onUpdateVersion({
        ...version,
        ctaText
      });
    }
  };

  // Fonction de mise à jour du texte du CTA secondaire
  const updateVersionCtaSecondaryText = (id: string, ctaSecondaryText: string) => {
    const version = versions.find(v => v.id === id);
    if (version) {
      onUpdateVersion({
        ...version,
        ctaSecondaryText
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Gestion des versions ({versions.length})</span>
          <Button onClick={onAddVersion}>Ajouter une version</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {versions.map((version) => (
          <Card 
            key={version.id}
            className={`border ${version.id === activeVersionId ? 'border-primary' : 'border-border'}`}
          >
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {version.id === activeVersionId && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </span>
                  )}
                  <Input 
                    value={version.name} 
                    onChange={(e) => updateVersionName(version.id, e.target.value)}
                    className="max-w-[200px] font-medium"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {version.id !== activeVersionId && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onSetActiveVersion(version.id)}
                    >
                      Activer
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDeleteVersion(version.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="content">
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center gap-2">
                      <FileEdit className="h-4 w-4" />
                      <span>Contenu</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${version.id}`}>Titre</Label>
                      <Input 
                        id={`title-${version.id}`}
                        value={version.title} 
                        onChange={(e) => updateVersionTitle(version.id, e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`subtitle-${version.id}`}>Sous-titre</Label>
                      <Textarea 
                        id={`subtitle-${version.id}`}
                        value={version.subtitle} 
                        onChange={(e) => updateVersionSubtitle(version.id, e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`cta-${version.id}`}>Texte du bouton principal</Label>
                        <Input 
                          id={`cta-${version.id}`}
                          value={version.ctaText} 
                          onChange={(e) => updateVersionCtaText(version.id, e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`cta-secondary-${version.id}`}>Texte du bouton secondaire</Label>
                        <Input 
                          id={`cta-secondary-${version.id}`}
                          value={version.ctaSecondaryText} 
                          onChange={(e) => updateVersionCtaSecondaryText(version.id, e.target.value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="py-3 border-t bg-muted/30">
              <div className="w-full flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" />
                  <span>ID: {version.id.substring(0, 8)}...</span>
                </div>
                <span>{version.blocks.length} blocs</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default VersionManager;
