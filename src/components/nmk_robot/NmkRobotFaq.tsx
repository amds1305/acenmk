
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    id: '1',
    question: "What types of robots do you develop?",
    answer: "We specialize in industrial automation robots, collaborative robots (cobots), autonomous mobile robots (AMRs), and custom robotic solutions tailored to specific manufacturing and logistics needs."
  },
  {
    id: '2',
    question: "How long does a typical robot implementation take?",
    answer: "Implementation timelines vary based on project complexity. Simple integrations may take 4-8 weeks, while complex, custom solutions can take 3-6 months from initial assessment to full deployment and operator training."
  },
  {
    id: '3',
    question: "Do you provide maintenance and support after installation?",
    answer: "Yes, we offer comprehensive maintenance packages and 24/7 technical support for all our robotic solutions. Our service agreements include regular maintenance, software updates, and rapid response to any operational issues."
  },
  {
    id: '4',
    question: "Can your robots integrate with our existing systems?",
    answer: "Absolutely. Our robots are designed to integrate seamlessly with most manufacturing execution systems (MES), enterprise resource planning (ERP) platforms, and industrial IoT networks through standard protocols and custom interfaces."
  },
  {
    id: '5',
    question: "What safety certifications do your robotic systems have?",
    answer: "Our robotic systems comply with ISO/TS 15066 for collaborative robots, ISO 10218 for industrial robots, CE marking requirements, and any additional industry-specific safety standards relevant to your application."
  }
];

const NmkRobotFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#151D2E] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#9b87f5] font-mono uppercase tracking-wider">
              FAQ
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Frequently Asked Questions
            </h2>
            
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Find answers to common questions about our robotic solutions, implementation process, and support services.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div 
                key={faq.id}
                className="border border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-xl font-medium">{faq.question}</span>
                  <span className="ml-6 flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="h-6 w-6 text-[#9b87f5]" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-[#9b87f5]" />
                    )}
                  </span>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="h-px bg-gray-700 mb-6"></div>
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-300">
              Can't find what you're looking for?
            </p>
            <a 
              href="#contact" 
              className="inline-block mt-4 px-8 py-3 bg-[#9b87f5] hover:bg-[#8a76e0] text-white font-medium rounded-md transition-colors"
            >
              Contact our support team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkRobotFaq;
