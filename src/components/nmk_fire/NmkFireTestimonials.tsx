
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    content: "Teko helped us navigate the Australian market and adapt our product to local requirements. Their technical expertise was invaluable in scaling our platform.",
    author: "Sarah Johnson",
    position: "CTO, FinTech Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    content: "Working with Teko has been transformative for our business. They understood our vision and delivered a product that exceeded our expectations and resonated with our users.",
    author: "Michael Chen",
    position: "CEO, HealthTech Innovations",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    content: "The team at Teko provided strategic guidance and technical expertise that helped us successfully launch in Australia. Their local knowledge was a crucial factor in our success.",
    author: "Emma Wilson",
    position: "Product Director, EdTech Global",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const NmkFireTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-[#0d0d0d] text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '16px 16px'
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#888] mb-6">
            Testimonials
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 font-mono text-white">
            What our clients say
          </h2>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div className="transition-all duration-500">
                <div className="mb-12">
                  <Quote className="text-[#888] mb-6" size={48} />
                  
                  <p className="text-xl md:text-2xl font-light mb-8 text-[#ccc]">
                    {testimonials[currentIndex].content}
                  </p>
                  
                  <div className="flex items-center">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].author} 
                      className="w-12 h-12 rounded-full object-cover mr-4" 
                    />
                    <div>
                      <div className="font-bold">{testimonials[currentIndex].author}</div>
                      <div className="text-[#888] text-sm">{testimonials[currentIndex].position}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-12">
              <div className="flex space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex ? 'bg-white w-6' : 'bg-white/30'
                    }`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  onClick={goToPrevious} 
                  variant="outline" 
                  size="icon" 
                  className="rounded-none border-white/30 hover:border-white hover:bg-transparent"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                <Button 
                  onClick={goToNext} 
                  variant="outline" 
                  size="icon" 
                  className="rounded-none border-white/30 hover:border-white hover:bg-transparent"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkFireTestimonials;
