
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Helmet } from 'react-helmet-async';

const LegalPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [pageContent, setPageContent] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('pages')
          .select('title, content, meta_description')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (error) {
          throw new Error(`Erreur lors du chargement de la page: ${error.message}`);
        }

        if (data) {
          setPageContent(data);
        } else {
          setError('Page non trouvée');
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError('Une erreur est survenue lors du chargement de la page');
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, [slug]);

  if (loading) return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center text-red-500 min-h-[300px] flex items-center justify-center">
        <p>{error}</p>
      </div>
    </div>
  );
  
  if (!pageContent) return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center min-h-[300px] flex items-center justify-center">
        <p>Page non trouvée</p>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{pageContent.title} | Votre Entreprise</title>
        {pageContent.meta_description && (
          <meta name="description" content={pageContent.meta_description} />
        )}
      </Helmet>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto py-12 px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center">{pageContent.title}</h1>
          <div 
            className="prose prose-lg mx-auto"
            dangerouslySetInnerHTML={{ __html: pageContent.content }} 
          />
        </div>
      </div>
    </>
  );
};

export default LegalPage;
