
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const ConfigFallback: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-red-500 mb-4">⚠️ Problème de configuration</h1>
        <p className="mb-4">La configuration de la page d'accueil n'a pas pu être chargée correctement.</p>
        
        <div className="p-4 mb-6 border border-dashed border-gray-300 dark:border-gray-600 rounded text-left">
          <h2 className="text-lg font-semibold mb-2">Étapes de dépannage :</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Vérifiez la connexion Internet</li>
            <li>Vérifiez que la base de données Supabase est accessible</li>
            <li>Vérifiez les clés API dans les variables d'environnement</li>
            <li>Consultez la console du navigateur pour les erreurs</li>
          </ol>
        </div>
        
        <h2 className="text-xl mb-2">Test de rendu</h2>
        <div className="p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded">
          <p>Si vous voyez ce message, le rendu React fonctionne correctement.</p>
        </div>
        
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          aria-label="Recharger la page"
        >
          Recharger la page
        </button>
      </div>
    </main>
    <Footer />
  </div>
);

export default ConfigFallback;
