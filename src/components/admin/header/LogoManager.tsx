
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useLogo } from './logo/useLogo';
import { LogoForm } from './logo/LogoForm';
import { LogoUploader } from './logo/LogoUploader';
import { LogoPreview } from './logo/LogoPreview';

const LogoManager: React.FC = () => {
  const { 
    logo, 
    isLoading, 
    handleFileChange, 
    updateLogoProperty, 
    saveLogoChanges 
  } = useLogo();
  
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = async () => {
    await saveLogoChanges();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Logo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Logo Form */}
        <LogoForm 
          logo={logo} 
          onLogoChange={updateLogoProperty} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Logo Uploader */}
          <LogoUploader 
            handleFileChange={handleFileChange}
            isUploading={isUploading}
          />
        </div>

        {/* Logo Preview */}
        {logo.src && (
          <LogoPreview 
            previewSrc={logo.src} 
            alt={logo.alt}
          />
        )}

        {/* Save Button */}
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <Save className="mr-2 h-4 w-4 animate-spin" />
              Sauvegarde...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LogoManager;
