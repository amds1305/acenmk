
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Image, 
  Type, 
  Recycle, 
  Grab, 
  PlusCircle, 
  ChartBar, 
  Trash2, 
  Copy,
  Square as ButtonIcon
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { HeroVersion, HeroBlock } from './types';

interface BlockEditorProps {
  version: HeroVersion;
  onUpdateVersion: (version: HeroVersion) => void;
}

const BlockEditor = ({ version, onUpdateVersion }: BlockEditorProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newBlockType, setNewBlockType] = useState<'text' | 'image' | 'button' | 'stat'>('text');
  const [selectedBlock, setSelectedBlock] = useState<HeroBlock | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  // Ajouter un nouveau bloc
  const addBlock = (type: 'text' | 'image' | 'button' | 'stat') => {
    const newBlock: HeroBlock = {
      id: uuidv4(),
      type,
      content: type === 'text' ? 'Nouveau texte' : 
               type === 'button' ? 'Bouton' : 
               type === 'stat' ? '100%' : '',
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: type === 'image' ? '300px' : '200px',
        height: type === 'image' ? '200px' : 'auto',
      },
      style: {
        color: '#ffffff',
        fontSize: '1rem',
        fontWeight: 'normal',
        textAlign: 'left',
        backgroundColor: type === 'button' ? '#3b82f6' : undefined,
        borderRadius: type === 'button' ? '0.375rem' : undefined,
        padding: type === 'button' ? '0.5rem 1rem' : '0',
      },
    };
    
    onUpdateVersion({
      ...version,
      blocks: [...version.blocks, newBlock],
    });
  };

  // Supprimer un bloc
  const deleteBlock = (id: string) => {
    onUpdateVersion({
      ...version,
      blocks: version.blocks.filter(block => block.id !== id),
    });
  };

  // Dupliquer un bloc
  const duplicateBlock = (block: HeroBlock) => {
    const newBlock: HeroBlock = {
      ...block,
      id: uuidv4(),
      position: {
        x: block.position.x + 20,
        y: block.position.y + 20,
      },
    };
    
    onUpdateVersion({
      ...version,
      blocks: [...version.blocks, newBlock],
    });
  };

  // Mettre à jour un bloc
  const updateBlock = (updatedBlock: HeroBlock) => {
    onUpdateVersion({
      ...version,
      blocks: version.blocks.map(block => 
        block.id === updatedBlock.id ? updatedBlock : block
      ),
    });
  };

  // Gérer l'édition d'un bloc
  const handleEditBlock = (block: HeroBlock) => {
    setSelectedBlock(block);
    setSelectedBlockId(block.id);
    setDialogOpen(true);
  };

  // Mettre à jour le contenu d'un bloc
  const updateBlockContent = (id: string, content: string) => {
    const block = version.blocks.find(b => b.id === id);
    if (block) {
      updateBlock({
        ...block,
        content,
      });
    }
  };

  // Mettre à jour une propriété de style d'un bloc
  const updateBlockStyle = (id: string, property: keyof HeroBlock['style'], value: string) => {
    const block = version.blocks.find(b => b.id === id);
    if (block) {
      updateBlock({
        ...block,
        style: {
          ...block.style,
          [property]: value,
        },
      });
    }
  };

  // Mettre à jour la position d'un bloc
  const updateBlockPosition = (id: string, position: { x: number; y: number }) => {
    const block = version.blocks.find(b => b.id === id);
    if (block) {
      updateBlock({
        ...block,
        position,
      });
    }
  };

  // Mettre à jour la taille d'un bloc
  const updateBlockSize = (id: string, property: 'width' | 'height', value: string) => {
    const block = version.blocks.find(b => b.id === id);
    if (block) {
      updateBlock({
        ...block,
        size: {
          ...block.size,
          [property]: value,
        },
      });
    }
  };

  // Obtenir l'icône correspondant au type de bloc
  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <Type className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'button':
        return <ButtonIcon className="h-4 w-4" />;
      case 'stat':
        return <ChartBar className="h-4 w-4" />;
      default:
        return <Recycle className="h-4 w-4" />;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Blocs ({version.blocks.length})</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => { setNewBlockType('text'); addBlock('text'); }}>
                <Type className="h-4 w-4 mr-2" />
                Texte
              </Button>
              <Button variant="outline" size="sm" onClick={() => { setNewBlockType('image'); addBlock('image'); }}>
                <Image className="h-4 w-4 mr-2" />
                Image
              </Button>
              <Button variant="outline" size="sm" onClick={() => { setNewBlockType('button'); addBlock('button'); }}>
                <ButtonIcon className="h-4 w-4 mr-2" />
                Bouton
              </Button>
              <Button variant="outline" size="sm" onClick={() => { setNewBlockType('stat'); addBlock('stat'); }}>
                <ChartBar className="h-4 w-4 mr-2" />
                Statistique
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {version.blocks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center border rounded-lg bg-muted/20">
              <PlusCircle className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium text-lg mb-1">Aucun bloc ajouté</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                Ajoutez des blocs pour enrichir votre Hero avec du texte, des images, des boutons ou des statistiques.
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => { setNewBlockType('text'); addBlock('text'); }}>
                  <Type className="h-4 w-4 mr-2" />
                  Ajouter un texte
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {version.blocks.map((block) => (
                <div 
                  key={block.id}
                  className="p-3 border rounded-md bg-card flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                      {getBlockIcon(block.type)}
                    </div>
                    <div>
                      <div className="font-medium">
                        {block.type === 'text' ? 'Bloc texte' : 
                         block.type === 'image' ? 'Bloc image' : 
                         block.type === 'button' ? 'Bouton' : 'Statistique'}
                      </div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {block.content || (block.type === 'image' ? 'URL de l\'image' : '(Contenu vide)')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8" 
                      onClick={() => handleEditBlock(block)}
                    >
                      <Grab className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8" 
                      onClick={() => duplicateBlock(block)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" 
                      onClick={() => deleteBlock(block.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog d'édition de bloc */}
      {selectedBlock && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>
                {selectedBlock.type === 'text' ? 'Éditer le texte' : 
                 selectedBlock.type === 'image' ? 'Éditer l\'image' : 
                 selectedBlock.type === 'button' ? 'Éditer le bouton' : 'Éditer la statistique'}
              </DialogTitle>
              <DialogDescription>
                Personnalisez les propriétés de ce bloc pour l'adapter à votre design.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="content">
                  {selectedBlock.type === 'text' ? 'Contenu du texte' : 
                   selectedBlock.type === 'image' ? 'URL de l\'image' : 
                   selectedBlock.type === 'button' ? 'Texte du bouton' : 'Valeur statistique'}
                </Label>
                <Input
                  id="content"
                  value={selectedBlock.content}
                  onChange={(e) => updateBlockContent(selectedBlock.id, e.target.value)}
                  placeholder={selectedBlock.type === 'image' ? 'https://example.com/image.jpg' : 'Contenu'}
                />
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="style">
                  <AccordionTrigger>Style</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    {(selectedBlock.type === 'text' || selectedBlock.type === 'button' || selectedBlock.type === 'stat') && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="color">Couleur du texte</Label>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-8 h-8 rounded-full border" 
                              style={{ backgroundColor: selectedBlock.style.color }}
                            />
                            <Input 
                              id="color"
                              type="color" 
                              value={selectedBlock.style.color} 
                              onChange={(e) => updateBlockStyle(selectedBlock.id, 'color', e.target.value)}
                              className="w-12 p-0 h-8"
                            />
                            <Input 
                              value={selectedBlock.style.color} 
                              onChange={(e) => updateBlockStyle(selectedBlock.id, 'color', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="fontSize">Taille de police</Label>
                          <Select 
                            value={selectedBlock.style.fontSize} 
                            onValueChange={(value) => updateBlockStyle(selectedBlock.id, 'fontSize', value)}
                          >
                            <SelectTrigger id="fontSize">
                              <SelectValue placeholder="Taille de police" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="0.75rem">Très petit</SelectItem>
                                <SelectItem value="0.875rem">Petit</SelectItem>
                                <SelectItem value="1rem">Normal</SelectItem>
                                <SelectItem value="1.125rem">Moyen</SelectItem>
                                <SelectItem value="1.25rem">Grand</SelectItem>
                                <SelectItem value="1.5rem">Très grand</SelectItem>
                                <SelectItem value="2rem">Énorme</SelectItem>
                                <SelectItem value="3rem">Géant</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="fontWeight">Graisse de police</Label>
                          <Select 
                            value={selectedBlock.style.fontWeight} 
                            onValueChange={(value) => updateBlockStyle(selectedBlock.id, 'fontWeight', value)}
                          >
                            <SelectTrigger id="fontWeight">
                              <SelectValue placeholder="Graisse de police" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="bold">Gras</SelectItem>
                                <SelectItem value="lighter">Léger</SelectItem>
                                <SelectItem value="bolder">Plus gras</SelectItem>
                                <SelectItem value="300">300</SelectItem>
                                <SelectItem value="400">400</SelectItem>
                                <SelectItem value="500">500</SelectItem>
                                <SelectItem value="600">600</SelectItem>
                                <SelectItem value="700">700</SelectItem>
                                <SelectItem value="800">800</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="textAlign">Alignement</Label>
                          <Select 
                            value={selectedBlock.style.textAlign} 
                            onValueChange={(value) => updateBlockStyle(selectedBlock.id, 'textAlign', value as 'left' | 'center' | 'right')}
                          >
                            <SelectTrigger id="textAlign">
                              <SelectValue placeholder="Alignement" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="left">Gauche</SelectItem>
                                <SelectItem value="center">Centre</SelectItem>
                                <SelectItem value="right">Droite</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {selectedBlock.type === 'button' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="backgroundColor">Couleur de fond</Label>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-8 h-8 rounded-full border" 
                              style={{ backgroundColor: selectedBlock.style.backgroundColor }}
                            />
                            <Input 
                              id="backgroundColor"
                              type="color" 
                              value={selectedBlock.style.backgroundColor} 
                              onChange={(e) => updateBlockStyle(selectedBlock.id, 'backgroundColor', e.target.value)}
                              className="w-12 p-0 h-8"
                            />
                            <Input 
                              value={selectedBlock.style.backgroundColor} 
                              onChange={(e) => updateBlockStyle(selectedBlock.id, 'backgroundColor', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="borderRadius">Rayon des bordures</Label>
                          <Input 
                            id="borderRadius"
                            value={selectedBlock.style.borderRadius} 
                            onChange={(e) => updateBlockStyle(selectedBlock.id, 'borderRadius', e.target.value)}
                            placeholder="0.375rem"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="padding">Padding</Label>
                          <Input 
                            id="padding"
                            value={selectedBlock.style.padding} 
                            onChange={(e) => updateBlockStyle(selectedBlock.id, 'padding', e.target.value)}
                            placeholder="0.5rem 1rem"
                          />
                        </div>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="position">
                  <AccordionTrigger>Position et taille</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="positionX">Position X</Label>
                        <Input 
                          id="positionX"
                          type="number"
                          value={selectedBlock.position.x} 
                          onChange={(e) => updateBlockPosition(selectedBlock.id, { 
                            ...selectedBlock.position, 
                            x: Number(e.target.value) 
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="positionY">Position Y</Label>
                        <Input 
                          id="positionY"
                          type="number"
                          value={selectedBlock.position.y} 
                          onChange={(e) => updateBlockPosition(selectedBlock.id, { 
                            ...selectedBlock.position, 
                            y: Number(e.target.value) 
                          })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Largeur</Label>
                        <Input 
                          id="width"
                          value={selectedBlock.size.width} 
                          onChange={(e) => updateBlockSize(selectedBlock.id, 'width', e.target.value)}
                          placeholder="200px ou 100%"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="height">Hauteur</Label>
                        <Input 
                          id="height"
                          value={selectedBlock.size.height} 
                          onChange={(e) => updateBlockSize(selectedBlock.id, 'height', e.target.value)}
                          placeholder="auto ou 200px"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Fermer</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default BlockEditor;
