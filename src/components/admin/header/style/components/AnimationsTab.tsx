
import React from 'react';
import { HeaderStyle } from '@/components/admin/header/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnimationsTabProps {
  headerStyle: HeaderStyle;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
}

const AnimationsTab = ({ headerStyle, updateStyle }: AnimationsTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="transitionDuration">Durée des transitions</Label>
        <Input 
          id="transitionDuration"
          type="text"
          value={headerStyle.transitionDuration}
          onChange={(e) => updateStyle('transitionDuration', e.target.value)}
          placeholder="ex: 0.3s, 300ms"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="transitionTiming">Fonction de timing</Label>
        <Select 
          value={headerStyle.transitionTiming} 
          onValueChange={(value) => updateStyle('transitionTiming', value)}
        >
          <SelectTrigger id="transitionTiming">
            <SelectValue placeholder="Choisir une fonction de timing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ease">Ease (défaut)</SelectItem>
            <SelectItem value="linear">Linear</SelectItem>
            <SelectItem value="ease-in">Ease In</SelectItem>
            <SelectItem value="ease-out">Ease Out</SelectItem>
            <SelectItem value="ease-in-out">Ease In Out</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="menuTransition">Transition des éléments de menu</Label>
        <Input 
          id="menuTransition"
          type="text"
          value={headerStyle.menuTransition}
          onChange={(e) => updateStyle('menuTransition', e.target.value)}
          placeholder="ex: all 0.3s ease"
        />
      </div>
    </div>
  );
};

export default AnimationsTab;
