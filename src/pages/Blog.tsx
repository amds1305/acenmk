
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
          <p className="text-center text-lg text-muted-foreground mb-12">
            Découvrez nos derniers articles, conseils et actualités
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gray-200 h-48" />
              <div className="p-4">
                <p className="text-sm text-muted-foreground">15 mai 2023</p>
                <h3 className="text-xl font-semibold mt-1">Comment optimiser votre présence en ligne</h3>
                <p className="mt-2 text-muted-foreground">Découvrez les meilleures pratiques pour améliorer votre visibilité sur le web.</p>
                <a href="#" className="text-primary font-medium inline-flex items-center mt-4">
                  Lire plus
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gray-200 h-48" />
              <div className="p-4">
                <p className="text-sm text-muted-foreground">10 avril 2023</p>
                <h3 className="text-xl font-semibold mt-1">Les tendances web design de 2023</h3>
                <p className="mt-2 text-muted-foreground">Un aperçu des tendances qui domineront le web design cette année.</p>
                <a href="#" className="text-primary font-medium inline-flex items-center mt-4">
                  Lire plus
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gray-200 h-48" />
              <div className="p-4">
                <p className="text-sm text-muted-foreground">5 mars 2023</p>
                <h3 className="text-xl font-semibold mt-1">L'importance de l'expérience utilisateur</h3>
                <p className="mt-2 text-muted-foreground">Pourquoi l'UX est devenu un critère essentiel pour les sites web modernes.</p>
                <a href="#" className="text-primary font-medium inline-flex items-center mt-4">
                  Lire plus
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
