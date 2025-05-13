
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>À propos | Notre entreprise</title>
        <meta name="description" content="Découvrez notre histoire, notre mission et nos valeurs" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen pt-24 pb-16">
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8">À propos de nous</h1>
          
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            <p className="lead">
              Bienvenue sur la page À propos de notre entreprise. Nous sommes dédiés à l'excellence et à l'innovation.
            </p>
            
            <h2>Notre mission</h2>
            <p>
              Notre mission est de fournir des solutions innovantes et de haute qualité à nos clients. 
              Nous nous efforçons de comprendre les besoins uniques de chaque client et de développer des solutions personnalisées.
            </p>
            
            <h2>Notre équipe</h2>
            <p>
              Notre équipe est composée de professionnels passionnés et expérimentés, dédiés à fournir un service de premier ordre.
              Nous combinons expertise technique et créativité pour répondre aux défis les plus complexes.
            </p>
            
            <h2>Nos valeurs</h2>
            <ul>
              <li><strong>Intégrité</strong> - Nous agissons avec honnêteté et transparence dans toutes nos interactions.</li>
              <li><strong>Excellence</strong> - Nous nous efforçons constamment d'améliorer nos services et nos processus.</li>
              <li><strong>Innovation</strong> - Nous encourageons les idées nouvelles et les approches créatives.</li>
              <li><strong>Collaboration</strong> - Nous travaillons ensemble pour atteindre des objectifs communs.</li>
            </ul>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default AboutPage;
