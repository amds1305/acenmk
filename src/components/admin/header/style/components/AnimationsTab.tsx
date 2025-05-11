
import React from 'react';
import { HeaderStyle } from '@/components/admin/header/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnimationsTabProps {
  headerStyle: HeaderStyle;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
}

const AnimationsTab: React.FC<AnimationsTabProps> = ({ headerStyle, updateStyle }) => {
  const timingFunctions = [
    { value: 'ease', label: 'Ease (défaut)' },
    { value: 'linear', label: 'Linear (constant)' },
    { value: 'ease-in', label: 'Ease-in (accélération)' },
    { value: 'ease-out', label: 'Ease-out (décélération)' },
    { value: 'ease-in-out', label: 'Ease-in-out (accélération puis décélération)' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Vitesse des transitions</h3>
        <p className="text-sm text-gray-500">
          Configurez la vitesse et le style des animations lors des interactions et changements d'état.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="transitionDuration">Durée des transitions</Label>
          <Input 
            id="transitionDuration"
            type="text"
            value={headerStyle.transitionDuration || '0.3s'}
            onChange={(e) => updateStyle('transitionDuration', e.target.value)}
          />
          <p className="text-xs text-gray-500">Exemples: '0.2s', '300ms'</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="transitionTiming">Type d'animation</Label>
          <Select 
            value={headerStyle.transitionTiming || 'ease'} 
            onValueChange={(value) => updateStyle('transitionTiming', value)}
          >
            <SelectTrigger id="transitionTiming">
              <SelectValue placeholder="Choisir un type" />
            </SelectTrigger>
            <SelectContent>
              {timingFunctions.map((timing) => (
                <SelectItem key={timing.value} value={timing.value}>
                  {timing.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2 pt-4">
        <h3 className="font-medium">Animation du menu</h3>
        <div className="space-y-2">
          <Label htmlFor="menuTransition">Transition des liens du menu</Label>
          <Input 
            id="menuTransition"
            type="text"
            value={headerStyle.menuTransition || 'all 0.3s ease'}
            onChange={(e) => updateStyle('menuTransition', e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Format CSS standard. Ex: 'all 0.3s ease', 'color 0.2s, background 0.5s'
          </p>
        </div>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2">Aperçu des animations</h4>
        <div className="grid grid-cols-3 gap-2">
          <div
            className="bg-white dark:bg-gray-900 p-3 rounded text-center cursor-pointer transition-all hover:scale-105"
            style={{ 
              transition: `all ${headerStyle.transitionDuration || '0.3s'} ${headerStyle.transitionTiming || 'ease'}`,
              color: headerStyle.textColor,
            }}
          >
            Effet hover
          </div>
          
          <div
            className="bg-white dark:bg-gray-900 p-3 rounded text-center transition-all"
            style={{ 
              transition: headerStyle.menuTransition || 'all 0.3s ease',
              color: headerStyle.textColor,
              backgroundColor: 'white',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = headerStyle.hoverColor;
              e.currentTarget.style.backgroundColor = headerStyle.menuHoverBgColor;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = headerStyle.textColor;
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            Effet menu
          </div>
          
          <div
            className="bg-white dark:bg-gray-900 p-3 rounded text-center transition-colors shadow-sm hover:shadow"
            style={{ 
              transition: `all ${headerStyle.transitionDuration || '0.3s'} ${headerStyle.transitionTiming || 'ease'}`,
              borderColor: headerStyle.borderColor,
              borderWidth: '1px',
            }}
          >
            Effet bordure
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationsTab;
