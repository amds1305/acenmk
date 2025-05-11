
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface LogoUploaderProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({ 
  handleFileChange,
  isUploading
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="logo-upload">Télécharger</Label>
      <div className="flex items-center space-x-2">
        <Button variant="outline" disabled={isUploading} asChild>
          <Label htmlFor="logo-upload" className="cursor-pointer">
            {isUploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Téléchargement...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Télécharger
              </>
            )}
          </Label>
        </Button>
        <Input
          type="file"
          id="logo-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
