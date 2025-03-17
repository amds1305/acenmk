
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import { ArrowRight } from 'lucide-react';

const Faq = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Questions fréquentes</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez les réponses aux questions les plus posées sur nos services et notre façon de travailler
            </p>
          </div>
          
          <FaqSection />
          
          <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Vous ne trouvez pas la réponse à votre question ?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
                Notre équipe est disponible pour répondre à toutes vos questions. N'hésitez pas à nous contacter directement.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="/#contact" 
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#ca3c66] text-white font-medium transition-colors hover:bg-[#ca3c66]/90 w-full sm:w-auto"
                >
                  Nous contacter
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a 
                  href="tel:+33123456789" 
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 w-full sm:w-auto"
                >
                  +33 1 23 45 67 89
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

export default Faq;
