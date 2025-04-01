
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "Comment démarrer avec la plateforme ?",
    answer: "Créez votre compte gratuitement en quelques minutes. Vous pourrez ensuite configurer votre espace selon vos besoins et commencer à importer vos premiers actifs numériques. Notre guide de démarrage vous guidera pas à pas."
  },
  {
    question: "Quelles sont les options d'intégration disponibles ?",
    answer: "Notre plateforme s'intègre avec les principaux outils d'entreprise via des API RESTful et des webhooks. Nous proposons des connecteurs pour Slack, Microsoft Teams, Google Workspace, et bien d'autres services."
  },
  {
    question: "La plateforme est-elle conforme au RGPD ?",
    answer: "Absolument. La conformité au RGPD est au cœur de notre conception. Vos données sont stockées en Europe, avec chiffrement de bout en bout, et vous disposez de tous les outils nécessaires pour exercer vos droits relatifs aux données."
  },
  {
    question: "Comment fonctionne la tarification ?",
    answer: "Nous proposons plusieurs formules adaptées à différentes tailles d'entreprise. Un plan gratuit est disponible pour les petites équipes, et des options premium pour les fonctionnalités avancées. Tous les plans incluent le support et les mises à jour."
  },
  {
    question: "Puis-je migrer mes données existantes ?",
    answer: "Oui, nous offrons des outils d'importation pour faciliter la migration depuis d'autres plateformes. Notre équipe peut également vous accompagner dans ce processus pour assurer une transition en douceur."
  },
  {
    question: "Quel niveau de support est inclus ?",
    answer: "Tous nos clients bénéficient d'un support par email. Les forfaits Business et Enterprise incluent également un support téléphonique et un gestionnaire de compte dédié pour un accompagnement personnalisé."
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions fréquentes</h2>
          <p className="text-xl text-muted-foreground">
            Tout ce que vous devez savoir pour démarrer rapidement
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-background border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-lg font-medium py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            Contactez notre équipe support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
