
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import Contact from '@/components/Contact';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Nous contacter</title>
        <meta name="description" content="Contactez-nous pour toute question ou demande" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8">Contactez-nous</h1>
          <Contact />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ContactPage;
