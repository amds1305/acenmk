
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const legalPagesPaths = {
  'mentions-legales': 'Mentions légales',
  'politique-de-confidentialite': 'Politique de confidentialité',
  'conditions-utilisation': 'Conditions d\'utilisation',
  'politique-cookies': 'Politique des cookies'
};

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
          .select('title, content')
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

  if (loading) return <div className="container mx-auto py-12 px-4">Chargement...</div>;
  if (error) return <div className="container mx-auto py-12 px-4">Erreur: {error}</div>;
  if (!pageContent) return <div className="container mx-auto py-12 px-4">Page non trouvée</div>;

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="prose prose-lg mx-auto" dangerouslySetInnerHTML={{ __html: pageContent.content }} />
    </div>
  );
};

export default LegalPage;
