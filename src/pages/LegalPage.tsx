
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LegalPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>
          
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Informations légales</h2>
            <p className="mb-2">Raison sociale : Société Exemple</p>
            <p className="mb-2">Forme juridique : SARL au capital de 10 000€</p>
            <p className="mb-2">SIRET : 123 456 789 00010</p>
            <p className="mb-2">Adresse : 123 rue Exemple, 75000 Paris</p>
            <p className="mb-2">Email : contact@exemple.com</p>
            <p className="mb-2">Téléphone : 01 23 45 67 89</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Hébergement</h2>
            <p>
              Ce site est hébergé par Exemple Hébergement, SAS au capital de 100 000€, 
              dont le siège social est situé 456 avenue Hébergement, 69000 Lyon.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Propriété intellectuelle</h2>
            <p>
              L'ensemble des éléments constituant ce site (textes, graphismes, logiciels, etc.) 
              est la propriété exclusive de Société Exemple. Toute reproduction ou représentation, 
              totale ou partielle, de ce site par quelque procédé que ce soit, sans l'autorisation 
              expresse de Société Exemple est interdite et constituerait une contrefaçon.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LegalPage;
