
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PortfolioPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 px-4 md:px-8">
        <div className="container mx-auto py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Nos Projets</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Portfolio items would go here - for now showing placeholders */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gray-200 dark:bg-gray-700 h-48 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">Image du projet {item}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">Projet {item}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">Description du projet en quelques mots.</p>
                  <div className="mt-4">
                    <a href="#" className="text-primary hover:text-primary-dark">Voir les détails →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
