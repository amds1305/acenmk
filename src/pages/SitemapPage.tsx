
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SitemapPage = () => {
  const pages = [
    { title: 'Accueil', path: '/' },
    { title: 'Services', path: '/services' },
    { title: 'Équipe', path: '/team' },
    { title: 'Témoignages', path: '/testimonials' },
    { title: 'FAQ', path: '/faq' },
    { title: 'Tarifs', path: '/pricing' },
    { title: 'Contact', path: '/contact' },
    { title: 'Mentions légales', path: '/legal' },
    { title: "Conditions générales d'utilisation", path: '/cgu' },
    { title: 'Politique de confidentialité', path: '/confidentiality' },
    { title: 'Accessibilité', path: '/accessibility' },
    { title: 'Plan du site', path: '/sitemap' },
    { title: 'Recherche', path: '/search' },
    { title: 'Offres d\'emploi', path: '/jobs' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Plan du site</h1>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pages.map((page) => (
              <li key={page.path}>
                <Link 
                  to={page.path} 
                  className="block p-4 rounded-lg border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SitemapPage;
