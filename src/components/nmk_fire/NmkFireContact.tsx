
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send
} from 'lucide-react';

const NmkFireContact = () => {
  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-900 relative">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-purple-50 dark:bg-purple-900/5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-4 py-1.5 rounded-full mb-4">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-300">
            Discutons de votre projet
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Nous sommes là pour vous accompagner dans votre transformation numérique
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Informations de contact */}
          <div className="lg:col-span-2 bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-8 md:p-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
              Informations de contact
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                  <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Adresse</h4>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    123 Avenue des Champs-Élysées<br/>
                    75008 Paris, France
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                  <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Téléphone</h4>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    +33 (0)1 23 45 67 89
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                  <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    contact@entreprise.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                  <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Horaires d'ouverture</h4>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Lundi - Vendredi: 9h00 - 18h00<br/>
                    Weekend: Fermé
                  </p>
                </div>
              </div>
            </div>
            
            {/* Suivez-nous */}
            <div className="mt-10">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                Suivez-nous
              </h4>
              <div className="flex space-x-3">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="bg-white dark:bg-gray-800 p-2.5 rounded-full shadow-sm hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Formulaire de contact */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
              Envoyez-nous un message
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom complet
                  </label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="w-full border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sujet
                </label>
                <Input 
                  id="subject" 
                  placeholder="Comment pouvons-nous vous aider ?" 
                  className="w-full border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Décrivez votre projet ou votre demande..." 
                  rows={5}
                  className="w-full border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400"
                />
              </div>
              
              <div className="flex items-center">
                <input 
                  id="privacy" 
                  type="checkbox" 
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="privacy" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                  J'accepte la <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">politique de confidentialité</a>
                </label>
              </div>
              
              <div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer le message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkFireContact;
