
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CguPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Conditions Générales d'Utilisation</h1>
          
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Article 1 - Objet</h2>
            <p className="mb-4">
              Les présentes conditions générales d'utilisation ont pour objet de définir les 
              modalités de mise à disposition des services du site et les conditions d'utilisation 
              par l'Utilisateur.
            </p>
            <p>
              L'Utilisateur s'engage à respecter les conditions et termes lors de chaque utilisation du site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Article 2 - Accès aux services</h2>
            <p className="mb-4">
              Le site permet à l'Utilisateur un accès gratuit aux services suivants : consultation 
              d'informations, demande de contact, etc.
            </p>
            <p>
              Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Article 3 - Responsabilités</h2>
            <p>
              La responsabilité de l'éditeur ne peut être engagée en cas de défaillance, panne, 
              difficulté ou interruption de fonctionnement, empêchant l'accès au site ou à une de ses fonctionnalités.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CguPage;
