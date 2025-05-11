
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getFAQs } from '@/services/supabase/faqService';

// Define proper types for FAQ items
interface FaqItem {
  id?: string;
  question: string;
  answer: string;
}

const TekoFaq: React.FC = () => {
  const { data: faqs, isLoading, error } = useQuery({
    queryKey: ['faqs', 'teko'],
    queryFn: () => getFAQs('teko'),
    staleTime: 0,
    refetchOnMount: true,
  });
  
  // Données par défaut si aucune donnée n'est trouvée
  const defaultFaqs: FaqItem[] = [
    {
      id: "teko-1",
      question: "Quels types de projets réalisez-vous ?",
      answer: "Nous réalisons divers projets numériques : sites web, applications mobiles, solutions e-commerce, intranets, systèmes de gestion, interfaces IoT, solutions cloud, etc."
    },
    {
      id: "teko-2",
      question: "Quelle est votre méthodologie de travail ?",
      answer: "Nous suivons une approche agile centrée sur l'utilisateur. Chaque projet commence par une phase de découverte, suivie par la conception, le développement itératif avec des retours réguliers du client, puis les tests et le déploiement."
    },
    {
      id: "teko-3",
      question: "Comment assurez-vous la sécurité des projets ?",
      answer: "La sécurité est notre priorité absolue. Nous appliquons les meilleures pratiques de l'industrie : audits réguliers, tests de pénétration, chiffrement des données, authentification forte et formation continue de nos équipes."
    },
    {
      id: "teko-4",
      question: "Proposez-vous un support après la mise en ligne ?",
      answer: "Absolument ! Nous proposons plusieurs formules de maintenance et support technique, du simple monitoring à la maintenance évolutive complète. Nos SLA garantissent des interventions rapides en cas de besoin."
    }
  ];
  
  console.log("TekoFaq - Données FAQ reçues:", faqs);
  
  if (isLoading) {
    return (
      <section id="faq" className="bg-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Erreur lors du chargement des FAQs:", error);
  }
  
  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;
  
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0c10]">
            Questions fréquentes
          </h2>
          <p className="text-gray-600 md:text-lg">
            Tout ce que vous devez savoir sur nos services et notre façon de travailler
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {displayFaqs.map((faq, index) => {
            // Generate a stable ID if one doesn't exist
            const faqId = faq.id || `teko-faq-${index}`;
            
            return (
              <div key={faqId} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center">
                <h3 className="text-xl font-bold mb-3 text-[#0a0c10]">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            );
          })}
        </div>
        
        <div className="max-w-2xl mt-12 text-center mx-auto">
          <p className="text-gray-600 mb-6">
            Vous avez d'autres questions? N'hésitez pas à nous contacter.
          </p>
          <Button 
            asChild
            className="bg-[#0a0c10] text-white hover:bg-[#0a0c10]/90 rounded-full"
          >
            <a href="#contact">
              Nous contacter
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TekoFaq;
