
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus } from 'lucide-react';

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of digital product development services including strategy, UX/UI design, software development, QA testing, and ongoing support and maintenance."
  },
  {
    question: "How do you approach new projects?",
    answer: "We start with an in-depth discovery phase to understand your business goals, target users, and technical requirements. From there, we develop a detailed project roadmap that outlines our approach, timeline, and deliverables."
  },
  {
    question: "Do you work with startups?",
    answer: "Absolutely! We have extensive experience working with startups at various stages, from early-stage ventures to scale-ups. We tailor our approach to meet the unique needs and constraints of startup businesses."
  },
  {
    question: "What is your pricing model?",
    answer: "We offer flexible pricing models including fixed-price quotes for well-defined projects, time and materials for more complex or evolving requirements, and retainer arrangements for ongoing support and development."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary greatly depending on complexity and scope. A simple MVP might take 6-8 weeks, while a more comprehensive enterprise solution could take several months. We'll provide you with a detailed timeline during our initial consultation."
  }
];

const NmkFireFaq = () => {
  return (
    <section id="faq" className="py-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#888] mb-6">
            FAQ
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 font-mono text-[#0d0d0d]">
            Frequently asked questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-t border-[#0d0d0d] pt-6 pb-0 px-0"
              >
                <AccordionTrigger className="font-mono text-lg font-bold text-[#0d0d0d] hover:no-underline [&[data-state=open]>div]:rotate-45">
                  {faq.question}
                  <div className="ml-auto flex h-6 w-6 items-center justify-center border border-[#0d0d0d] shrink-0 transition-transform duration-200">
                    <Plus className="h-3 w-3" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#555] pt-4 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-16 text-center">
            <p className="text-[#555] mb-8">
              Have more questions? We're here to help.
            </p>
            <Button 
              asChild
              className="bg-[#0d0d0d] text-white hover:bg-[#333] rounded-none px-8 py-6 h-auto font-mono"
            >
              <a href="#contact">
                Get in touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkFireFaq;
