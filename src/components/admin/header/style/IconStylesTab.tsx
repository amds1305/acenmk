
import React from 'react';
import { HeaderStyle } from '@/components/admin/header/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card } from '@/components/ui/card';
import { Search, Moon, Facebook, Instagram, Mail } from 'lucide-react';

interface IconStylesTabProps {
  headerStyle: HeaderStyle;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
}

const IconStylesTab: React.FC<IconStylesTabProps> = ({ headerStyle, updateStyle }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Icônes sociales */}
        <Card className="p-4 space-y-4">
          <h3 className="font-medium">Icônes de réseaux sociaux</h3>
          
          <div className="space-y-2">
            <Label htmlFor="socialIconColor">Couleur des icônes</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="socialIconColor"
                type="text"
                value={headerStyle.socialIconColor}
                onChange={(e) => updateStyle('socialIconColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.socialIconColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.socialIconColor} 
                    onChange={(color) => updateStyle('socialIconColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="socialIconHoverColor">Couleur au survol</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="socialIconHoverColor"
                type="text"
                value={headerStyle.socialIconHoverColor}
                onChange={(e) => updateStyle('socialIconHoverColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.socialIconHoverColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.socialIconHoverColor} 
                    onChange={(color) => updateStyle('socialIconHoverColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="socialIconBgColor">Couleur d'arrière-plan</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="socialIconBgColor"
                type="text"
                value={headerStyle.socialIconBgColor}
                onChange={(e) => updateStyle('socialIconBgColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ 
                      backgroundColor: headerStyle.socialIconBgColor,
                      backgroundImage: headerStyle.socialIconBgColor === 'transparent'
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
                      color={headerStyle.socialIconBgColor !== 'transparent' ? headerStyle.socialIconBgColor : '#ffffff'} 
                      onChange={(color) => updateStyle('socialIconBgColor', color)}
                    />
                    <div className="flex justify-between">
                      <button 
                        className="text-xs underline text-gray-600 dark:text-gray-400"
                        onClick={() => updateStyle('socialIconBgColor', 'transparent')}
                      >
                        Transparent
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="socialIconBorderColor">Couleur de bordure</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="socialIconBorderColor"
                type="text"
                value={headerStyle.socialIconBorderColor}
                onChange={(e) => updateStyle('socialIconBorderColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.socialIconBorderColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.socialIconBorderColor} 
                    onChange={(color) => updateStyle('socialIconBorderColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="socialIconSize">Taille des icônes</Label>
            <Input 
              id="socialIconSize"
              type="text"
              value={headerStyle.socialIconSize || '18px'}
              onChange={(e) => updateStyle('socialIconSize', e.target.value)}
            />
            <p className="text-xs text-gray-500">Format: '18px' ou '1.125rem'</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="socialIconSpacing">Espacement entre les icônes</Label>
            <Input 
              id="socialIconSpacing"
              type="text"
              value={headerStyle.socialIconSpacing || '0.75rem'}
              onChange={(e) => updateStyle('socialIconSpacing', e.target.value)}
            />
            <p className="text-xs text-gray-500">Format: '0.75rem' ou '12px'</p>
          </div>
          
          <div className="mt-4 border rounded p-3 flex justify-center gap-2">
            {[Facebook, Instagram, Mail].map((Icon, index) => (
              <div
                key={index}
                className="flex items-center justify-center border rounded-full p-2 cursor-pointer"
                style={{ 
                  color: headerStyle.socialIconColor,
                  backgroundColor: headerStyle.socialIconBgColor,
                  borderColor: headerStyle.socialIconBorderColor,
                  width: 'fit-content',
                  height: 'fit-content'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = headerStyle.socialIconHoverColor;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = headerStyle.socialIconColor;
                }}
              >
                <Icon size={parseInt(headerStyle.socialIconSize || '18px')} />
              </div>
            ))}
          </div>
        </Card>
        
        {/* Icônes d'utilité */}
        <Card className="p-4 space-y-4">
          <h3 className="font-medium">Icônes d'utilité (recherche, thème, etc.)</h3>
          
          <div className="space-y-2">
            <Label htmlFor="utilityIconColor">Couleur des icônes</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="utilityIconColor"
                type="text"
                value={headerStyle.utilityIconColor}
                onChange={(e) => updateStyle('utilityIconColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.utilityIconColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.utilityIconColor} 
                    onChange={(color) => updateStyle('utilityIconColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="utilityIconHoverColor">Couleur au survol</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="utilityIconHoverColor"
                type="text"
                value={headerStyle.utilityIconHoverColor}
                onChange={(e) => updateStyle('utilityIconHoverColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.utilityIconHoverColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.utilityIconHoverColor} 
                    onChange={(color) => updateStyle('utilityIconHoverColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="utilityIconBgColor">Couleur d'arrière-plan</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="utilityIconBgColor"
                type="text"
                value={headerStyle.utilityIconBgColor}
                onChange={(e) => updateStyle('utilityIconBgColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ 
                      backgroundColor: headerStyle.utilityIconBgColor,
                      backgroundImage: headerStyle.utilityIconBgColor === 'transparent'
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
                      color={headerStyle.utilityIconBgColor !== 'transparent' ? headerStyle.utilityIconBgColor : '#ffffff'} 
                      onChange={(color) => updateStyle('utilityIconBgColor', color)}
                    />
                    <div className="flex justify-between">
                      <button 
                        className="text-xs underline text-gray-600 dark:text-gray-400"
                        onClick={() => updateStyle('utilityIconBgColor', 'transparent')}
                      >
                        Transparent
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="utilityIconBorderColor">Couleur de bordure</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="utilityIconBorderColor"
                type="text"
                value={headerStyle.utilityIconBorderColor}
                onChange={(e) => updateStyle('utilityIconBorderColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.utilityIconBorderColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.utilityIconBorderColor} 
                    onChange={(color) => updateStyle('utilityIconBorderColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="utilityIconSize">Taille des icônes</Label>
            <Input 
              id="utilityIconSize"
              type="text"
              value={headerStyle.utilityIconSize || '18px'}
              onChange={(e) => updateStyle('utilityIconSize', e.target.value)}
            />
            <p className="text-xs text-gray-500">Format: '18px' ou '1.125rem'</p>
          </div>
          
          <div className="mt-4 border rounded p-3 flex justify-center gap-2">
            {[Search, Moon].map((Icon, index) => (
              <div
                key={index}
                className="flex items-center justify-center border rounded-full p-2 cursor-pointer"
                style={{ 
                  color: headerStyle.utilityIconColor,
                  backgroundColor: headerStyle.utilityIconBgColor,
                  borderColor: headerStyle.utilityIconBorderColor,
                  width: 'fit-content',
                  height: 'fit-content'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = headerStyle.utilityIconHoverColor;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = headerStyle.utilityIconColor;
                }}
              >
                <Icon size={parseInt(headerStyle.utilityIconSize || '18px')} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IconStylesTab;
