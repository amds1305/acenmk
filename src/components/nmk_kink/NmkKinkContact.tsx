
import React from 'react';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const NmkKinkContact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            Contact
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Parlons de votre projet
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Prenez contact avec nous pour discuter de vos besoins et découvrir comment nous pouvons vous aider.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Informations de contact */}
          <div>
            <div className="mb-8">
              <h3 className="mb-4 text-xl font-bold">Nos coordonnées</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-gray-900" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Adresse</p>
                    <address className="not-italic text-gray-600">
                      123 Avenue des Champs-Élysées<br />75008 Paris, France
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-gray-900" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:contact@example.com" className="text-gray-600 hover:underline">
                      contact@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-gray-900" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Téléphone</p>
                    <a href="tel:+33123456789" className="text-gray-600 hover:underline">
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="mb-4 text-xl font-bold">Heures d'ouverture</h3>
              <dl className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <dt>Lundi - Vendredi:</dt>
                  <dd>9h00 - 18h00</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Weekend:</dt>
                  <dd>Fermé</dd>
                </div>
              </dl>
            </div>
          </div>
          
          {/* Formulaire de contact */}
          <div className="rounded-2xl bg-gray-50 p-8">
            <h3 className="mb-6 text-xl font-bold">Envoyez-nous un message</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    placeholder="Votre email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  placeholder="Sujet de votre message"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  placeholder="Votre message"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="group inline-flex items-center rounded-full border-2 border-gray-900 bg-gray-900 px-6 py-2 text-white transition-all duration-300 hover:bg-transparent hover:text-gray-900"
              >
                Envoyer le message
                <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkKinkContact;
