
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/mysql';

const NmkKinkFaq: React.FC = () => {
  const { data: config } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig
  });

  const defaultFaqs = [
    {
      id: '1',
      question: "Quels services proposez-vous exactement ?",
      answer: "Nous offrons une gamme complète de services numériques, incluant le développement web, le design UI/UX, le e-commerce, le marketing digital, la maintenance et le développement d'applications mobiles. Chaque service est personnalisé pour répondre aux besoins spécifiques de votre entreprise."
    },
    {
      id: '2',
      question: "Combien coûte un projet de site web ?",
      answer: "Le coût d'un projet web varie en fonction de sa complexité, des fonctionnalités requises et de l'échéancier. Nous travaillons avec vous pour établir un devis transparent qui correspond à votre budget. Contactez-nous pour une estimation personnalisée."
    },
    {
      id: '3',
      question: "Combien de temps faut-il pour créer un site web ?",
      answer: "La durée d'un projet dépend de sa complexité. Un site vitrine peut être réalisé en 2-4 semaines, tandis qu'une plateforme e-commerce ou une application web complexe peut nécessiter 2-6 mois. Nous établissons un calendrier précis dès le début du projet."
    },
    {
      id: '4',
      question: "Proposez-vous des services de maintenance après le lancement ?",
      answer: "Absolument. Nous offrons des contrats de maintenance pour assurer la sécurité, les mises à jour et le bon fonctionnement de votre site. Ces services incluent la surveillance des performances, les mises à jour techniques et le support en cas de problème."
    },
    {
      id: '5',
      question: "Comment se déroule un projet avec votre agence ?",
      answer: "Notre processus comprend la découverte (analyse des besoins), la conception (wireframes et maquettes), le développement, les tests, le lancement et le support post-lancement. Nous maintenons une communication transparente tout au long du projet."
    }
  ];

  const faqData = {
    title: "Questions fréquentes",
    subtitle: "Nous avons rassemblé les réponses aux questions que nous recevons le plus souvent.",
    contactText: "Contactez-nous pour toute autre question",
    items: defaultFaqs,
    ...(config?.sectionData.faq || {})
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-gray-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            FAQ
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            {faqData.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            {faqData.subtitle}
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {faqData.items.map((item, index) => (
            <div 
              key={item.id || index} 
              className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-lg font-medium">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-gray-700">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Vous ne trouvez pas ce que vous cherchez ?
          </p>
          <a href="#contact" className="mt-2 inline-block font-medium text-gray-900 hover:underline">
            {faqData.contactText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default NmkKinkFaq;
