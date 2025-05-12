
import React from 'react';

export const TestRenderComponent: React.FC = () => (
  <div className="p-4 my-8 bg-yellow-100 dark:bg-yellow-900 border border-yellow-500 rounded text-center">
    <h1 className="text-xl font-bold">Test de rendu</h1>
    <p>Cette section est affichée pour vérifier que le rendu fonctionne.</p>
  </div>
);

export default TestRenderComponent;
