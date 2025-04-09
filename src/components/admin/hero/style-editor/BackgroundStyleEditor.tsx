
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { HeroVersion } from '../types';

interface BackgroundStyleEditorProps {
  version: HeroVersion;
  onUpdateVersion: (version: HeroVersion) => void;
}

const BackgroundStyleEditor = ({ version, onUpdateVersion }: BackgroundStyleEditorProps) => {
  // Update background type
  const updateBackgroundType = (type: 'color' | 'image' | 'gradient') => {
    onUpdateVersion({
      ...version,
      backgroundType: type,
    });
  };

  // Update background color
  const updateBackgroundColor = (color: string) => {
    onUpdateVersion({
      ...version,
      backgroundColor: color,
    });
  };

  // Update background image URL
  const updateBackgroundImage = (url: string) => {
    onUpdateVersion({
      ...version,
      backgroundImage: url,
    });
  };

  // Update background gradient
  const updateBackgroundGradient = (gradient: string) => {
    onUpdateVersion({
      ...version,
      backgroundGradient: gradient,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Type d'arrière-plan</Label>
        <div className="grid grid-cols-3 gap-2">
          <div 
            className={`border rounded-md p-3 flex flex-col items-center gap-2 cursor-pointer ${version.backgroundType === 'color' ? 'border-primary bg-primary/10' : 'hover:bg-muted/50'}`}
            onClick={() => updateBackgroundType('color')}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
            <span className="text-sm">Couleur</span>
          </div>
          <div 
            className={`border rounded-md p-3 flex flex-col items-center gap-2 cursor-pointer ${version.backgroundType === 'image' ? 'border-primary bg-primary/10' : 'hover:bg-muted/50'}`}
            onClick={() => updateBackgroundType('image')}
          >
            <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            </div>
            <span className="text-sm">Image</span>
          </div>
          <div 
            className={`border rounded-md p-3 flex flex-col items-center gap-2 cursor-pointer ${version.backgroundType === 'gradient' ? 'border-primary bg-primary/10' : 'hover:bg-muted/50'}`}
            onClick={() => updateBackgroundType('gradient')}
          >
            <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            <span className="text-sm">Dégradé</span>
          </div>
        </div>
      </div>
      
      {version.backgroundType === 'color' && (
        <div className="space-y-2">
          <Label htmlFor="backgroundColor">Couleur d'arrière-plan</Label>
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-full border" 
              style={{ backgroundColor: version.backgroundColor }}
            />
            <Input 
              id="backgroundColor"
              type="color" 
              value={version.backgroundColor} 
              onChange={(e) => updateBackgroundColor(e.target.value)}
              className="w-12 p-0 h-8"
            />
            <Input 
              value={version.backgroundColor} 
              onChange={(e) => updateBackgroundColor(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      )}
      
      {version.backgroundType === 'image' && (
        <div className="space-y-2">
          <Label htmlFor="backgroundImage">URL de l'image d'arrière-plan</Label>
          <Input 
            id="backgroundImage"
            value={version.backgroundImage} 
            onChange={(e) => updateBackgroundImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {version.backgroundImage && (
            <div className="mt-2 rounded-md overflow-hidden border">
              <img 
                src={version.backgroundImage} 
                alt="Aperçu de l'arrière-plan" 
                className="w-full h-32 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x200?text=Image+Error';
                }}
              />
            </div>
          )}
        </div>
      )}
      
      {version.backgroundType === 'gradient' && (
        <div className="space-y-2">
          <Label htmlFor="backgroundGradient">Dégradé</Label>
          <Input 
            id="backgroundGradient"
            value={version.backgroundGradient || 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'}
            onChange={(e) => updateBackgroundGradient(e.target.value)}
            placeholder="linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"
          />
          <div 
            className="mt-2 h-16 rounded-md" 
            style={{ background: version.backgroundGradient || 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
          />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button 
              className="px-3 py-1 text-xs rounded border hover:bg-muted/50"
              onClick={() => updateBackgroundGradient('linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)')}
            >
              Bleu-Violet
            </button>
            <button 
              className="px-3 py-1 text-xs rounded border hover:bg-muted/50"
              onClick={() => updateBackgroundGradient('linear-gradient(135deg, #10b981 0%, #3b82f6 100%)')}
            >
              Vert-Bleu
            </button>
            <button 
              className="px-3 py-1 text-xs rounded border hover:bg-muted/50"
              onClick={() => updateBackgroundGradient('linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)')}
            >
              Jaune-Rouge
            </button>
            <button 
              className="px-3 py-1 text-xs rounded border hover:bg-muted/50"
              onClick={() => updateBackgroundGradient('linear-gradient(135deg, #111827 0%, #374151 100%)')}
            >
              Noir-Gris
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundStyleEditor;
