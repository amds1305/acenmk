
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Types
interface LegalPageData {
  title: string;
  content: string;
  last_updated: string;
}

interface LegalPagesStore {
  [key: string]: LegalPageData;
}

const LegalPage: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const [pageData, setPageData] = useState<LegalPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Mock legal pages data
        const legalPages: LegalPagesStore = {
          'terms': {
            title: 'Conditions générales d\'utilisation',
            content: '<h2>1. Acceptation des Conditions</h2><p>En accédant ou en utilisant ce site web, vous acceptez d\'être lié par ces conditions d\'utilisation, toutes les lois et réglementations applicables, et vous acceptez que vous êtes responsable du respect de toutes les lois locales applicables.</p><h2>2. Licence d\'Utilisation</h2><p>Une autorisation est accordée pour télécharger temporairement une copie des documents sur le site web pour un affichage transitoire personnel et non commercial uniquement.</p>',
            last_updated: '2023-05-15'
          },
          'privacy': {
            title: 'Politique de confidentialité',
            content: '<h2>1. Collecte d\'Informations</h2><p>Nous recueillons des informations lorsque vous vous inscrivez sur notre site, vous connectez à votre compte, effectuez un achat, participez à un concours et/ou lorsque vous vous déconnectez.</p><h2>2. Utilisation des Informations</h2><p>Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour personnaliser votre expérience et répondre à vos besoins individuels.</p>',
            last_updated: '2023-06-20'
          },
          'cookies': {
            title: 'Politique des cookies',
            content: '<h2>1. Qu\'est-ce qu\'un cookie?</h2><p>Un cookie est un petit fichier de données stocké sur votre ordinateur ou sur votre appareil mobile lorsque vous visitez un site web.</p><h2>2. Comment utilisons-nous les cookies?</h2><p>Nous utilisons des cookies pour vous garantir la meilleure expérience sur notre site web et pour comprendre comment les visiteurs utilisent notre site.</p>',
            last_updated: '2023-07-10'
          }
        };

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (pageId && legalPages[pageId]) {
          setPageData(legalPages[pageId]);
        } else {
          setError('Page non trouvée');
        }
      } catch (err) {
        console.error('Error fetching legal page:', err);
        setError('Une erreur est survenue lors du chargement de la page');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPageData();
  }, [pageId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
        </div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-gray-700">{error || 'Page non trouvée'}</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{pageData.title}</title>
        <meta name="description" content={`${pageData.title} - Information légale`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{pageData.title}</h1>
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: pageData.content }}
          />
          
          <div className="mt-8 text-sm text-gray-500">
            Dernière mise à jour: {new Date(pageData.last_updated).toLocaleDateString()}
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalPage;
