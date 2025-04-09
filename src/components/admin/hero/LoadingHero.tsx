
import React from 'react';

const LoadingHero = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-3">Chargement...</span>
    </div>
  );
};

export default LoadingHero;
