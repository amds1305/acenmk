
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, Moon, Palette, Sun } from 'lucide-react';
import { useTheme, ThemeName } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: 'light', label: 'Clair', icon: Sun },
    { name: 'dark', label: 'Sombre', icon: Moon },
    { name: 'purple', label: 'Violet', icon: Palette },
    { name: 'blue', label: 'Bleu', icon: Palette },
    { name: 'green', label: 'Vert', icon: Palette },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors border border-current rounded-full w-9 h-9"
        >
          {theme === 'light' && <Sun size={18} />}
          {theme === 'dark' && <Moon size={18} />}
          {theme !== 'light' && theme !== 'dark' && <Palette size={18} />}
          <span className="sr-only">Changer de thème</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setTheme(t.name as ThemeName)}
          >
            <t.icon size={16} />
            <span>{t.label}</span>
            {theme === t.name && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
