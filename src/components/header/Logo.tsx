
import React from 'react';

interface LogoProps {
  config?: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
}

const Logo: React.FC<LogoProps> = ({ config }) => {
  return (
    <div className="flex items-center">
      {config?.src ? (
        <img
          src={config.src}
          alt={config.alt || 'Logo'}
          width={config.width || 40}
          height={config.height || 40}
          className="w-auto h-10"
        />
      ) : (
        <span className="text-2xl font-bold text-primary">Logo</span>
      )}
    </div>
  );
};

export default Logo;
