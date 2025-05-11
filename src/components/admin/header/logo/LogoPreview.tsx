
import React from 'react';
import Image from 'next/image';

interface LogoPreviewProps {
  previewSrc: string;
  alt: string;
}

export const LogoPreview: React.FC<LogoPreviewProps> = ({ previewSrc, alt }) => {
  return (
    <div className="border rounded-md p-4 overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center">
      <img 
        src={previewSrc} 
        alt={alt || 'Aperçu du logo'} 
        className="object-contain max-h-32 max-w-full" 
      />
    </div>
  );
};
