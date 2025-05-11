
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getLegalContent } from '@/services/legal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LegalPage = () => {
  const { page } = useParams<{ page: string }>();
  const [title, setTitle] = useState<string>('');
  
  const { data: content, isLoading } = useQuery({
    queryKey: ['legal', page],
    queryFn: () => getLegalContent(page || ''),
    enabled: !!page,
  });
  
  useEffect(() => {
    if (page) {
      switch (page) {
        case 'terms':
          setTitle('Conditions d\'utilisation');
          break;
        case 'privacy':
          setTitle('Politique de confidentialité');
          break;
        case 'legal-notice':
          setTitle('Mentions légales');
          break;
        case 'cookies':
          setTitle('Politique des cookies');
          break;
        default:
          setTitle('Document légal');
      }
    }
  }, [page]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-10 px-4 sm:px-6 md:py-16 md:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{title}</h1>
          
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
            </div>
          ) : (
            <div 
              className="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content || '<p>Ce contenu n\'est pas disponible.</p>' }}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
