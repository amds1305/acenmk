
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, ArrowRight, Clock } from 'lucide-react';

const NmkRobotContact = () => {
  return (
    <section id="contact" className="py-24 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-[#9b87f5] font-mono uppercase tracking-wider">
              Contact Us
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-8 text-white">
              Ready to transform your operations?
            </h2>
            
            <p className="text-gray-300 text-xl mb-12">
              Our team of robotics experts is ready to discuss how our solutions can address your specific challenges and opportunities.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-[#9b87f5] mr-4 mt-1" />
                <div>
                  <div className="text-white font-medium mb-1">Call Us</div>
                  <div className="text-gray-300">+1 (555) 123-4567</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-[#9b87f5] mr-4 mt-1" />
                <div>
                  <div className="text-white font-medium mb-1">Email Us</div>
                  <div className="text-gray-300">info@nmkrobotics.com</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-[#9b87f5] mr-4 mt-1" />
                <div>
                  <div className="text-white font-medium mb-1">Visit Us</div>
                  <div className="text-gray-300">123 Innovation Way, Tech Park<br />San Francisco, CA 94105</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-[#9b87f5] mr-4 mt-1" />
                <div>
                  <div className="text-white font-medium mb-1">Business Hours</div>
                  <div className="text-gray-300">Monday - Friday: 9:00 AM - 5:00 PM<br />24/7 Technical Support Available</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#111827] border border-gray-800 p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-[#1A1F2C] border border-gray-700 text-white p-3 focus:border-[#9b87f5] focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-[#1A1F2C] border border-gray-700 text-white p-3 focus:border-[#9b87f5] focus:outline-none"
                    placeholder="Your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-gray-300 mb-2">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  className="w-full bg-[#1A1F2C] border border-gray-700 text-white p-3 focus:border-[#9b87f5] focus:outline-none"
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-[#1A1F2C] border border-gray-700 text-white p-3 focus:border-[#9b87f5] focus:outline-none"
                  placeholder="What is this regarding?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full bg-[#1A1F2C] border border-gray-700 text-white p-3 focus:border-[#9b87f5] focus:outline-none"
                  placeholder="Tell us about your project or question"
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  className="mr-3 h-5 w-5 border-gray-700 rounded bg-[#1A1F2C] text-[#9b87f5] focus:ring-[#9b87f5]"
                />
                <label htmlFor="privacy" className="text-gray-300 text-sm">
                  I agree to the <a href="#" className="text-[#9b87f5]">privacy policy</a> and consent to being contacted regarding my inquiry.
                </label>
              </div>
              
              <Button className="bg-[#9b87f5] hover:bg-[#8B5CF6] text-white rounded-none px-8 py-6 text-lg w-full group">
                Submit Inquiry
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkRobotContact;
