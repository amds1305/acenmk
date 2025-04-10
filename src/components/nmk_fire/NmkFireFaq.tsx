
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quels types de services proposez-vous ?",
    answer: "Nous proposons une gamme complète de services numériques, y compris le développement web et mobile, la conception UX/UI, le conseil en transformation digitale, l'infrastructure cloud, et l'intégration de solutions d'intelligence artificielle."
  },
  {
    question: "Comment se déroule un projet type avec votre équipe ?",
    answer: "Chaque projet commence par une phase de découverte et d'analyse des besoins. Nous établissons ensuite une feuille de route claire, suivie par des cycles de développement itératifs avec des points de validation réguliers. Nous assurons ensuite le déploiement et le support post-lancement."
  },
  {
    question: "Combien coûte le développement d'une application mobile ?",
    answer: "Le coût dépend de la complexité du projet, des fonctionnalités requises et des plateformes ciblées (iOS, Android ou multiplateforme). Nous proposons un devis personnalisé après analyse détaillée de vos besoins spécifiques."
  },
  {
    question: "Combien de temps faut-il pour développer un site web ?",
    answer: "La durée de développement varie en fonction de la complexité du projet. Un site vitrine peut prendre 4 à 6 semaines, tandis qu'une plateforme e-commerce ou une application web plus complexe peut nécessiter 3 à 6 mois ou plus."
  },
  {
    question: "Proposez-vous des services de maintenance après le lancement ?",
    answer: "Oui, nous offrons différentes formules de maintenance et de support pour assurer le bon fonctionnement et la sécurité de votre solution numérique. Ces formules incluent les mises à jour techniques, le monitoring de performance et l'assistance utilisateur."
  }
];

const NmkFireFaq = () => {
  return (
    <section id="faq" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-300">
            Questions fréquentes
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Tout ce que vous devez savoir sur nos services et notre approche
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all"
            >
              Contactez-nous
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkFireFaq;
