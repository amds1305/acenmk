
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TekoServices: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0c10]">
            Services sur mesure pour votre transformation digitale
          </h2>
          <p className="text-gray-600 md:text-lg">
            Des solutions complètes pour répondre à tous vos besoins numériques, conçues par nos experts pour maximiser votre impact
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-teal-500 group-hover:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-[#0a0c10] group-hover:text-teal-500 transition-colors">
              Développement sur mesure
            </h3>
            
            <p className="text-gray-600 mb-6">
              Applications web et mobiles personnalisées selon vos besoins spécifiques et les dernières technologies.
            </p>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-teal-500" />
                <span>Design UI/UX intuitif</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-teal-500" />
                <span>Solutions évolutives</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-teal-500" />
                <span>Support technique 24/7</span>
              </li>
            </ul>
            
            <a href="#contact" className="text-teal-500 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              En savoir plus
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          
          {/* Service Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-500 group-hover:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-[#0a0c10] group-hover:text-indigo-500 transition-colors">
              Infrastructure cloud
            </h3>
            
            <p className="text-gray-600 mb-6">
              Solutions d'hébergement sécurisées, évolutives et performantes pour vos applications critiques.
            </p>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-indigo-500" />
                <span>Haute disponibilité</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-indigo-500" />
                <span>Sécurité renforcée</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-indigo-500" />
                <span>Scalabilité automatique</span>
              </li>
            </ul>
            
            <a href="#contact" className="text-indigo-500 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              En savoir plus
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          
          {/* Service Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-500 group-hover:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-[#0a0c10] group-hover:text-amber-500 transition-colors">
              Intelligence artificielle
            </h3>
            
            <p className="text-gray-600 mb-6">
              Intégration de solutions d'IA et machine learning pour optimiser vos processus et analyses.
            </p>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-amber-500" />
                <span>Analyse prédictive</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-amber-500" />
                <span>Automatisation intelligente</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-amber-500" />
                <span>Personnalisation avancée</span>
              </li>
            </ul>
            
            <a href="#contact" className="text-amber-500 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              En savoir plus
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            asChild
            className="bg-[#0a0c10] text-white hover:bg-[#0a0c10]/90 rounded-full py-6 px-8 text-base font-medium"
          >
            <a href="#contact">
              Discuter de votre projet
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TekoServices;
