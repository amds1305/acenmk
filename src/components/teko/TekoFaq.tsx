
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFAQs } from '@/services/supabase/faqService';

const TekoFaq: React.FC = () => {
  // Récupérer les FAQ depuis Supabase
  const { data: faqs, isLoading } = useQuery({
    queryKey: ['faqs', 'default'],
    queryFn: () => getFAQs('default'),
    staleTime: 0, // Considérer les données comme périmées immédiatement
    refetchOnMount: true, // Recharger à chaque montage
    refetchOnWindowFocus: true, // Recharger à chaque focus de fenêtre
  });

  console.log("TekoFaq - Données FAQ reçues:", faqs);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Si aucune FAQ n'est disponible
  if (!faqs || faqs.length === 0) {
    return (
      <section id="faq" className="py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-center mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0c10]">
              Foire aux Questions
            </h2>
            <p className="text-gray-600">
              Aucune question n'a été ajoutée pour le moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0c10]">
            Foire aux Questions
          </h2>
          <p className="text-gray-600 md:text-lg">
            Tout ce que vous devez savoir sur nos services et notre façon de travailler
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq) => (
            <div key={faq.id} className="py-6">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold text-[#0a0c10]">{faq.question}</h3>
                {faq.category && (
                  <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                    {faq.category}
                  </span>
                )}
              </div>
              <div className="mt-3 text-gray-600">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TekoFaq;
