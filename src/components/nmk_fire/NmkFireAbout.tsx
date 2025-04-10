
import React from 'react';
import { Check } from 'lucide-react';

const NmkFireAbout = () => {
  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-100 dark:bg-purple-900/20 rounded-bl-full opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-100 dark:bg-indigo-900/20 rounded-tr-full opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Partie image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Notre équipe" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Statistiques flottantes */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 14.63 21 12.55 21 10V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" 
                      fill="#9b87f5" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Expérience</p>
                  <p className="text-gray-900 dark:text-white text-xl font-bold">15+ ans</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" 
                      fill="#7E69AB" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Clients</p>
                  <p className="text-gray-900 dark:text-white text-xl font-bold">200+</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Partie texte */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-4 py-1.5 rounded-full mb-4">
                À Propos de Nous
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-300">
                Un Partenaire pour Votre Transformation Digitale
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Depuis plus de 15 ans, nous accompagnons les entreprises de toutes tailles dans leur transformation numérique. Notre équipe d'experts passionnés combine expertise technique et vision stratégique pour créer des solutions sur mesure qui propulsent votre business.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Expertise technique', 'Approche personnalisée', 'Solutions innovantes', 'Support continu'].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/30 p-1 rounded-full">
                    <Check className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300">
              Notre mission est de vous aider à exploiter tout le potentiel des technologies numériques pour améliorer votre efficacité, développer de nouveaux produits et services, et créer une expérience client exceptionnelle.
            </p>
            
            <div className="pt-4">
              <a 
                href="#team" 
                className="text-purple-600 dark:text-purple-400 font-medium inline-flex items-center group"
              >
                <span className="border-b border-transparent group-hover:border-purple-600 dark:group-hover:border-purple-400 transition-all">
                  Découvrir notre équipe
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkFireAbout;
