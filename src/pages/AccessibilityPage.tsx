
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AccessibilityPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Accessibilité</h1>
          
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Notre engagement</h2>
            <p className="mb-4">
              Nous nous engageons à rendre notre site web accessible à tous les utilisateurs, 
              quelle que soit leur capacité ou technologie.
            </p>
            <p>
              Nous travaillons continuellement pour améliorer l'accessibilité de notre site et 
              adhérer aux meilleures pratiques et normes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Conformité</h2>
            <p className="mb-4">
              Ce site s'efforce d'être conforme aux Règles pour l'accessibilité des contenus Web (WCAG) 2.1 
              niveau AA.
            </p>
            <p>
              Si vous rencontrez des problèmes d'accessibilité sur notre site, 
              veuillez nous contacter à accessibility@exemple.com.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Fonctionnalités d'accessibilité</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Navigation clavier simple</li>
              <li>Texte alternatif pour les images</li>
              <li>Contraste de couleur suffisant</li>
              <li>Structure de contenu claire avec des titres appropriés</li>
              <li>Redimensionnement du texte sans perte de fonctionnalité</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccessibilityPage;
