
import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface CVStyleEditorProps {
  onColorChange: (color: string) => void;
  onFontChange: (font: string) => void;
}

const CVStyleEditor = ({ onColorChange, onFontChange }: CVStyleEditorProps) => {
  const colorOptions = [
    { name: "blue", value: "#3b82f6" },
    { name: "green", value: "#22c55e" },
    { name: "red", value: "#ef4444" },
    { name: "purple", value: "#a855f7" },
    { name: "gray", value: "#4b5563" }
  ];
  
  const fontOptions = [
    "Roboto", "Open Sans", "Lato", "Montserrat", "Raleway"
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Couleurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {colorOptions.map(color => (
              <Button 
                key={color.name}
                className="w-8 h-8 p-0 rounded-full" 
                style={{ backgroundColor: color.value }}
                onClick={() => onColorChange(color.value)}
              />
            ))}
            <Button variant="outline" className="w-8 h-8 p-0 rounded-full">
              <Palette className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Choisissez une couleur principale pour votre CV
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Typographie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Police principale</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {fontOptions.map(font => (
                  <Button 
                    key={font}
                    variant="outline" 
                    className="justify-start"
                    style={{ fontFamily: font }}
                    onClick={() => onFontChange(font)}
                  >
                    {font}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Styles</Label>
              <div className="grid grid-cols-3 gap-1 mt-2">
                <Button variant="outline" size="sm" className="text-xs">Normal</Button>
                <Button variant="outline" size="sm" className="text-xs font-bold">Gras</Button>
                <Button variant="outline" size="sm" className="text-xs italic">Italique</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Mise en page</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto py-8 flex flex-col gap-2">
              <div className="w-full flex items-center justify-center">
                <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
              </div>
              <div className="w-full flex gap-2">
                <div className="w-1/3 space-y-2">
                  <div className="w-full h-3 bg-gray-200 rounded"></div>
                  <div className="w-full h-12 bg-gray-200 rounded"></div>
                </div>
                <div className="w-2/3 space-y-2">
                  <div className="w-full h-3 bg-gray-200 rounded"></div>
                  <div className="w-full h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
              <span className="mt-2 text-xs">Une colonne</span>
            </Button>

            <Button variant="outline" className="h-auto py-8 flex flex-col gap-2">
              <div className="w-full flex items-center justify-center">
                <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
              </div>
              <div className="w-full flex gap-2">
                <div className="w-1/3 space-y-2">
                  <div className="w-full h-3 bg-gray-200 rounded"></div>
                  <div className="w-full h-24 bg-gray-200 rounded"></div>
                </div>
                <div className="w-2/3 space-y-2">
                  <div className="w-full h-3 bg-gray-200 rounded"></div>
                  <div className="w-full h-24 bg-gray-200 rounded"></div>
                </div>
              </div>
              <span className="mt-2 text-xs">Deux colonnes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVStyleEditor;
