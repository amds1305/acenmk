
import React from 'react';

export const PageLoader: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
    <p className="text-gray-600 dark:text-gray-300 text-lg">Chargement de votre site...</p>
  </div>
);

export default PageLoader;
