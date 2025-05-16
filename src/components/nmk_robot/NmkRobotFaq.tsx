
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Demo FAQ items
const demoFaqs = [
  {
    id: '1',
    question: 'Comment planifier un rendez-vous avec votre équipe?',
    answer: 'Pour planifier un rendez-vous, veuillez nous contacter via notre formulaire en ligne ou par téléphone. Notre équipe vous répondra dans les 24 heures pour organiser une consultation.'
  },
  {
    id: '2', 
    question: 'Quels services de robotique proposez-vous?',
    answer: 'Nous proposons une gamme complète de services de robotique incluant la conception de prototypes, la programmation de robots industriels, l\'automatisation des processus, la maintenance et le support technique continu.'
  },
  {
    id: '3',
    question: 'Quelle est votre expertise en intelligence artificielle?',
    answer: 'Notre équipe possède une expérience approfondie en intelligence artificielle appliquée à la robotique, notamment dans les domaines de la vision par ordinateur, du traitement du langage naturel et de l\'apprentissage automatique pour robots autonomes.'
  },
  {
    id: '4',
    question: 'Proposez-vous des solutions personnalisées?',
    answer: 'Absolument. Chaque projet est unique et nous développons des solutions sur mesure adaptées à vos besoins spécifiques et à votre secteur d\'activité.'
  },
  {
    id: '5',
    question: 'Dans quels secteurs d\'activité intervenez-vous?',
    answer: 'Nous intervenons principalement dans l\'industrie manufacturière, la logistique, la santé, l\'agriculture, et la recherche académique, mais notre expertise peut s\'adapter à tout secteur nécessitant des solutions robotiques.'
  }
];

const NmkRobotFaq = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  const titleVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="faq" className="py-20 bg-[#010015] relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={titleVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-indigo-300 text-lg max-w-2xl mx-auto">
              Découvrez les réponses aux questions les plus courantes sur nos services et technologies robotiques
            </p>
          </motion.div>
          
          <div className="space-y-6">
            <Accordion
              type="single"
              collapsible
              value={activeItem}
              onValueChange={setActiveItem}
            >
              {demoFaqs.map((faq, index) => (
                <motion.div key={faq.id} variants={itemVariants}>
                  <AccordionItem 
                    value={faq.id} 
                    className="bg-[#07061a] border border-indigo-900/40 rounded-xl mb-4 overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 text-white hover:text-indigo-300 font-medium text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-indigo-200">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <p className="text-indigo-300">
              Vous avez d'autres questions? <a href="#contact" className="text-indigo-400 hover:text-indigo-300 underline">Contactez-nous</a>
            </p>
          </motion.div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-40 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default NmkRobotFaq;
