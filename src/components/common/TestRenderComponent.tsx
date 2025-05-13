
import React from 'react';

const TestRenderComponent: React.FC = () => {
  return (
    <div style={{ display: 'none' }}>
      {/* Composant caché qui sert uniquement à vérifier que le rendu React fonctionne */}
      <span data-testid="react-render-test">Le rendu React fonctionne</span>
    </div>
  );
};

export default TestRenderComponent;
