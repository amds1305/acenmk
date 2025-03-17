
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
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

const FaqSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">Questions fréquentes</h2>
          <p className="section-subtitle mx-auto mt-4">
            Tout ce que vous devez savoir sur nos services et notre façon de travailler
          </p>
        </div>
        
        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left font-semibold py-4 hover:text-[#ca3c66] dark:text-white dark:hover:text-[#ca3c66] transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-2 pb-4">
                  {item.answer}
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
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#ca3c66] text-white font-medium transition-colors hover:bg-[#ca3c66]/90"
          >
            Contactez-nous directement
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
