
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, PlusCircle, MinusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getFAQs } from '@/services/supabase/faqService';

const FaqSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const { data: faqs, isLoading, error } = useQuery({
    queryKey: ['faqs', 'default'],
    queryFn: () => getFAQs('default'),
    staleTime: 0,
    refetchOnMount: true,
  });

  console.log("FaqSection - Données FAQ reçues:", faqs);

  // Données par défaut si aucune donnée n'est trouvée
  const defaultFaqItems = [
    {
      question: "Quels services proposez-vous exactement ?",
      answer: "Nous offrons une gamme complète de services numériques incluant le développement d'applications web et mobiles sur mesure, la conception UX/UI, l'infrastructure cloud, la transformation digitale et l'intégration de solutions d'intelligence artificielle. Chaque solution est personnalisée selon les besoins spécifiques de votre entreprise."
    },
    {
      question: "Combien coûte un projet typique ?",
      answer: "Les coûts varient considérablement en fonction de la complexité, de l'envergure et des fonctionnalités requises. Nous proposons une tarification transparente avec des devis détaillés après une analyse approfondie de vos besoins. Contactez-nous pour une consultation gratuite et un devis personnalisé."
    },
    {
      question: "Quelle est la durée moyenne d'un projet ?",
      answer: "La durée d'un projet dépend de sa complexité et de son envergure. Un site web simple peut prendre 2-4 semaines, tandis qu'une application complexe peut nécessiter 3-6 mois ou plus. Nous établissons toujours un calendrier détaillé au début du projet et vous tenons informé de l'avancement à chaque étape."
    },
    {
      question: "Proposez-vous un support après le lancement du projet ?",
      answer: "Absolument. Nous offrons divers plans de maintenance et de support continu pour assurer le bon fonctionnement de votre solution. Ces plans incluent les mises à jour de sécurité, l'optimisation des performances, le support technique et l'évolution fonctionnelle selon vos besoins."
    },
    {
      question: "Comment assurez-vous la qualité de vos développements ?",
      answer: "Notre processus de développement comprend plusieurs phases de tests rigoureux : tests unitaires, tests d'intégration, tests de performance et tests d'acceptation utilisateur. Nous utilisons également des méthodes de développement agiles qui permettent des ajustements continus basés sur vos retours."
    },
    {
      question: "Avez-vous de l'expérience dans notre secteur d'activité ?",
      answer: "Notre équipe a travaillé avec des clients de nombreux secteurs, notamment la finance, la santé, l'éducation, le commerce de détail et l'industrie. Nous adaptons notre approche à chaque secteur et ses défis spécifiques. N'hésitez pas à nous demander des références ou études de cas pertinentes pour votre domaine."
    }
  ];

  // Catégories de FAQ
  const categories = [
    { id: "all", name: "Toutes les questions" },
    { id: "services", name: "Services" },
    { id: "pricing", name: "Tarification" },
    { id: "process", name: "Processus" },
    { id: "support", name: "Support" }
  ];

  // Mapping des questions par catégorie
  const categoryMapping = {
    "services": [0, 5],
    "pricing": [1],
    "process": [2, 4],
    "support": [3]
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Erreur lors du chargement des FAQs:", error);
  }
  
  const faqItems = faqs && faqs.length > 0 ? faqs : defaultFaqItems;

  // Filtrer les questions selon la catégorie
  const filteredFaqItems = activeCategory === "all" 
    ? faqItems 
    : faqItems.filter((_, index) => {
        const originalIndex = faqs && faqs.length > 0 
          ? index 
          : categoryMapping[activeCategory as keyof typeof categoryMapping]?.includes(index) ? index : -1;
        return originalIndex >= 0;
      });

  const toggleItem = (value: string) => {
    setExpandedItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 px-4 py-1.5 rounded-full mb-4">FAQ</span>
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-6">Questions fréquentes</h2>
          <p className="section-subtitle mx-auto mt-4 text-gray-600 dark:text-gray-300">
            Tout ce que vous devez savoir sur nos services et notre façon de travailler
          </p>
        </div>
        
        {/* Catégories */}
        <div className="flex flex-wrap justify-center mt-10 mb-8 gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === category.id 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 shadow-sm">
          <Accordion 
            type="multiple" 
            value={expandedItems}
            className="w-full space-y-4"
          >
            {filteredFaqItems.map((item, index) => (
              <AccordionItem 
                key={item.id || `item-${index}`} 
                value={item.id || `item-${index}`}
                className={cn(
                  "border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all",
                  expandedItems.includes(item.id || `item-${index}`) 
                    ? "bg-white dark:bg-gray-800 shadow-md" 
                    : "bg-gray-50 dark:bg-gray-800/50"
                )}
              >
                <AccordionTrigger 
                  onClick={() => toggleItem(item.id || `item-${index}`)}
                  className="text-left font-semibold py-4 px-6 hover:text-primary dark:text-white dark:hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>{item.question}</span>
                  {expandedItems.includes(item.id || `item-${index}`) ? (
                    <MinusCircle className="h-5 w-5 text-primary shrink-0" />
                  ) : (
                    <PlusCircle className="h-5 w-5 text-gray-400 shrink-0" />
                  )}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 px-6 pt-0 pb-4">
                  <div className="pt-2 pb-1">{item.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#ca3c66] text-white font-medium transition-colors hover:bg-[#ca3c66]/90 group"
          >
            Contactez-nous directement
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
