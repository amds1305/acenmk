
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ConfidentialityPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
          
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Collecte des informations personnelles</h2>
            <p className="mb-4">
              Nous recueillons des informations lorsque vous vous inscrivez sur notre site, 
              lorsque vous vous connectez à votre compte, faites un achat, ou lorsque vous nous 
              contactez.
            </p>
            <p>
              Les informations recueillies incluent votre nom, adresse e-mail, numéro de téléphone, 
              et éventuellement des informations supplémentaires.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Utilisation des informations</h2>
            <p>
              Nous utilisons les informations que nous collectons pour : personnaliser votre expérience, 
              améliorer notre site web, améliorer le service client, traiter les transactions, envoyer 
              des emails périodiques.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Protection des informations</h2>
            <p>
              Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité 
              de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie 
              pour protéger les informations sensibles transmises en ligne.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConfidentialityPage;
