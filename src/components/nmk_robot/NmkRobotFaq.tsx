
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getFAQs } from '@/services/supabase/faqService';

const NmkRobotFaq = () => {
  const { data: faqs, isLoading, error } = useQuery({
    queryKey: ['faqs', 'nmk_fire'],
    queryFn: () => getFAQs('nmk_fire'),
    staleTime: 0,
    refetchOnMount: true,
  });

  // Données par défaut si aucune donnée n'est trouvée
  const defaultFaqs = [
    {
      question: "What types of robots do you offer?",
      answer: "We offer a comprehensive range of robotic solutions including collaborative robots (cobots), industrial robots, autonomous mobile robots (AMRs), and custom-designed robotics systems tailored to specific industry requirements."
    },
    {
      question: "How long does implementation typically take?",
      answer: "Implementation timelines vary based on project complexity, but typically range from 2-12 weeks. This includes assessment, design, installation, programming, testing, and staff training. Our project managers provide detailed timelines during the initial consultation."
    },
    {
      question: "Do your robots require specialized maintenance?",
      answer: "Our robots are designed for reliability and ease of maintenance. We provide comprehensive maintenance plans, remote diagnostics capabilities, and predictive maintenance features. Our support team is available 24/7 to address any issues that may arise."
    },
    {
      question: "Can your systems integrate with your existing equipment?",
      answer: "Yes, our robotic systems are designed to seamlessly integrate with existing equipment and infrastructure. We use industry-standard communication protocols and offer custom interface solutions when needed to ensure compatibility with your current systems."
    },
    {
      question: "What safety standards do your robots comply with?",
      answer: "All our robotic systems comply with international safety standards including ISO/TS 15066 for collaborative robots, ISO 10218-1 and ISO 10218-2 for industrial robots, and relevant regional safety regulations. Safety is our highest priority in all implementations."
    },
    {
      question: "Do you offer financing options?",
      answer: "Yes, we offer flexible financing options including leasing, rent-to-own, and performance-based payment structures. Our financial consultants can help determine the best arrangement for your specific situation and ROI requirements."
    }
  ];

  console.log("NmkRobotFaq - Données FAQ reçues:", faqs);

  if (isLoading) {
    return (
      <section id="faq" className="py-24 bg-[#111827]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-[#9b87f5] border-t-transparent rounded-full animate-spin"></div>
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
    <section id="faq" className="py-24 bg-[#111827]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-[#9b87f5] font-mono uppercase tracking-wider">
              Frequently Asked Questions
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-8 text-white">
              Get answers to common questions
            </h2>
            
            <p className="text-gray-300 text-xl mb-8">
              We've compiled answers to the questions we get asked the most about our robotic solutions and services.
            </p>
            
            <p className="text-gray-400 mb-12">
              If you don't see what you're looking for, reach out to our team directly for personalized assistance.
            </p>
            
            <Button className="bg-[#9b87f5] hover:bg-[#8B5CF6] text-white rounded-none px-8 py-6 text-lg group">
              Contact our experts
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {displayFaqs.map((faq, index) => (
                <AccordionItem key={faq.id || index} value={`item-${index}`} className="border-b border-gray-800">
                  <AccordionTrigger className="text-white hover:text-[#9b87f5] text-left py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkRobotFaq;
