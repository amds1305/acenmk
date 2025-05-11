
import React from 'react';
import { HeaderStyle } from '@/components/admin/header/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card } from '@/components/ui/card';

interface MenuStylesTabProps {
  headerStyle: HeaderStyle;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
}

const MenuStylesTab: React.FC<MenuStylesTabProps> = ({ headerStyle, updateStyle }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Couleurs du texte dans le menu */}
        <Card className="p-4 space-y-4">
          <h3 className="font-medium">Couleurs du texte</h3>
          
          <div className="space-y-2">
            <Label htmlFor="textColor">Couleur du texte</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="textColor"
                type="text"
                value={headerStyle.textColor}
                onChange={(e) => updateStyle('textColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.textColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.textColor} 
                    onChange={(color) => updateStyle('textColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hoverColor">Couleur au survol</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="hoverColor"
                type="text"
                value={headerStyle.hoverColor}
                onChange={(e) => updateStyle('hoverColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.hoverColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.hoverColor} 
                    onChange={(color) => updateStyle('hoverColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activeColor">Couleur active</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="activeColor"
                type="text"
                value={headerStyle.activeColor}
                onChange={(e) => updateStyle('activeColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.activeColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.activeColor} 
                    onChange={(color) => updateStyle('activeColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </Card>
        
        {/* Couleurs de fond dans le menu */}
        <Card className="p-4 space-y-4">
          <h3 className="font-medium">Effets de fond</h3>
          
          <div className="space-y-2">
            <Label htmlFor="menuHoverBgColor">Couleur de fond au survol</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="menuHoverBgColor"
                type="text"
                value={headerStyle.menuHoverBgColor}
                onChange={(e) => updateStyle('menuHoverBgColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ 
                      backgroundColor: headerStyle.menuHoverBgColor,
                      backgroundImage: headerStyle.menuHoverBgColor === 'transparent'
                        ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                        : 'none',
                      backgroundSize: '10px 10px',
                      backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <div className="flex flex-col gap-3">
                    <HexColorPicker 
                      color={headerStyle.menuHoverBgColor.startsWith('#') ? headerStyle.menuHoverBgColor : '#ffffff'} 
                      onChange={(color) => updateStyle('menuHoverBgColor', color)}
                    />
                    <div className="flex justify-between">
                      <button 
                        className="text-xs underline text-gray-600 dark:text-gray-400"
                        onClick={() => updateStyle('menuHoverBgColor', 'transparent')}
                      >
                        Transparent
                      </button>
                      <button 
                        className="text-xs underline text-gray-600 dark:text-gray-400"
                        onClick={() => updateStyle('menuHoverBgColor', 'rgba(239, 246, 255, 0.15)')}
                      >
                        Semi-transparent
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-xs text-gray-500">Formats acceptés: #HEX, rgba(), etc.</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="menuActiveBgColor">Couleur de fond active</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="menuActiveBgColor"
                type="text"
                value={headerStyle.menuActiveBgColor}
                onChange={(e) => updateStyle('menuActiveBgColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ 
                      backgroundColor: headerStyle.menuActiveBgColor,
                      backgroundImage: headerStyle.menuActiveBgColor === 'transparent'
                        ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                        : 'none',
                      backgroundSize: '10px 10px',
                      backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <div className="flex flex-col gap-3">
                    <HexColorPicker 
                      color={headerStyle.menuActiveBgColor.startsWith('#') ? headerStyle.menuActiveBgColor : '#ffffff'} 
                      onChange={(color) => updateStyle('menuActiveBgColor', color)}
                    />
                    <div className="flex justify-between">
                      <button 
                        className="text-xs underline text-gray-600 dark:text-gray-400"
                        onClick={() => updateStyle('menuActiveBgColor', 'transparent')}
                      >
                        Transparent
                      </button>
                      <button 
                        className="text-xs underline text-gray-600 dark:text-gray-400"
                        onClick={() => updateStyle('menuActiveBgColor', 'rgba(239, 246, 255, 0.1)')}
                      >
                        Semi-transparent
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-xs text-gray-500">Formats acceptés: #HEX, rgba(), etc.</p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Forme et apparence des éléments de menu */}
        <Card className="p-4 space-y-4">
          <h3 className="font-medium">Forme et apparence</h3>
          
          <div className="space-y-2">
            <Label htmlFor="menuBorderRadius">Arrondi des coins</Label>
            <Input 
              id="menuBorderRadius"
              type="text"
              value={headerStyle.menuBorderRadius || '0.375rem'}
              onChange={(e) => updateStyle('menuBorderRadius', e.target.value)}
            />
            <p className="text-xs text-gray-500">Format: '0.375rem' ou '6px'</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="menuTransition">Animation de transition</Label>
            <Input 
              id="menuTransition"
              type="text"
              value={headerStyle.menuTransition || 'all 0.3s ease'}
              onChange={(e) => updateStyle('menuTransition', e.target.value)}
            />
            <p className="text-xs text-gray-500">Format CSS: 'all 0.3s ease'</p>
          </div>
        </Card>
        
        {/* Prévisualisation */}
        <Card className="p-4 space-y-4">
          <h3 className="font-medium">Aperçu du menu</h3>
          
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 justify-center p-2 border rounded">
              <div 
                className="px-3 py-2 rounded cursor-pointer"
                style={{ 
                  color: headerStyle.textColor,
                  fontFamily: headerStyle.fontFamily,
                  fontSize: headerStyle.fontSize,
                  transition: headerStyle.menuTransition || 'all 0.3s ease',
                  borderRadius: headerStyle.menuBorderRadius || '0.375rem',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = headerStyle.hoverColor;
                  e.currentTarget.style.backgroundColor = headerStyle.menuHoverBgColor;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = headerStyle.textColor;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Élément normal
              </div>
              
              <div 
                className="px-3 py-2 rounded cursor-pointer"
                style={{ 
                  color: headerStyle.hoverColor,
                  backgroundColor: headerStyle.menuHoverBgColor,
                  fontFamily: headerStyle.fontFamily,
                  fontSize: headerStyle.fontSize,
                  transition: headerStyle.menuTransition || 'all 0.3s ease',
                  borderRadius: headerStyle.menuBorderRadius || '0.375rem',
                }}
              >
                Élément survolé
              </div>
              
              <div 
                className="px-3 py-2 rounded cursor-pointer"
                style={{ 
                  color: headerStyle.activeColor,
                  backgroundColor: headerStyle.menuActiveBgColor,
                  fontFamily: headerStyle.fontFamily,
                  fontSize: headerStyle.fontSize,
                  transition: headerStyle.menuTransition || 'all 0.3s ease',
                  borderRadius: headerStyle.menuBorderRadius || '0.375rem',
                }}
              >
                Élément actif
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MenuStylesTab;
