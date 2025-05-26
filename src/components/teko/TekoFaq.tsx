
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const TekoFaq: React.FC = () => {
  const faqs = [
    {
      question: "Quels types de projets réalisez-vous ?",
      answer: "Nous réalisons divers projets numériques : sites web, applications mobiles, solutions e-commerce, intranets, systèmes de gestion, interfaces IoT, solutions cloud, etc."
    },
    {
      question: "Quelle est votre méthodologie de travail ?",
      answer: "Nous suivons une approche agile centrée sur l'utilisateur. Chaque projet commence par une phase de découverte, suivie par la conception, le développement itératif avec des retours réguliers du client, puis les tests et le déploiement."
    },
    {
      question: "Comment assurez-vous la sécurité des projets ?",
      answer: "La sécurité est notre priorité absolue. Nous appliquons les meilleures pratiques de l'industrie : audits réguliers, tests de pénétration, chiffrement des données, authentification forte et formation continue de nos équipes."
    },
    {
      question: "Proposez-vous un support après la mise en ligne ?",
      answer: "Absolument ! Nous proposons plusieurs formules de maintenance et support technique, du simple monitoring à la maintenance évolutive complète. Nos SLA garantissent des interventions rapides en cas de besoin."
    }
  ];
  
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
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center">
              <h3 className="text-xl font-bold mb-3 text-[#0a0c10]">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
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
