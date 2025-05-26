
import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    content: "The integration of NMK's collaborative robots has significantly improved our production efficiency while maintaining the highest safety standards. Their team's expertise was invaluable throughout the implementation process.",
    author: "Jennifer Chen",
    position: "Head of Manufacturing, TechPro Industries",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5
  },
  {
    content: "Working with NMK Robotics has been transformative for our facility. Their custom automation solutions addressed challenges specific to our industry that off-the-shelf products simply couldn't solve.",
    author: "Robert Keller",
    position: "Operations Director, Advanced Electronics",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5
  },
  {
    content: "The data analytics capabilities built into NMK's robotic systems have given us unprecedented visibility into our operations. We're now able to identify optimization opportunities we never knew existed.",
    author: "Sophia Williams",
    position: "Innovation Lead, Global Manufacturing",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4
  }
];

const NmkRobotTestimonials = () => {
  return (
    <section className="py-24 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <span className="text-[#9b87f5] font-mono uppercase tracking-wider">
            Client Feedback
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-8 text-white">
            What our clients say about us
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-[#111827] border border-gray-800 p-8 relative hover:border-[#9b87f5] transition-all duration-300"
            >
              <Quote className="h-10 w-10 text-[#9b87f5]/20 absolute top-6 right-6" />
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[#9b87f5] fill-[#9b87f5]" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gray-600" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-8 relative z-10">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="text-white font-bold">{testimonial.author}</div>
                  <div className="text-gray-400 text-sm">{testimonial.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NmkRobotTestimonials;
