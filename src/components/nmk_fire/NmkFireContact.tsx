
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

const NmkFireContact = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#888] mb-6">
              Contact Us
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-mono text-[#0d0d0d]">
              Ready to discuss your project?
            </h2>
            
            <p className="text-[#555] mb-12">
              Get in touch with our team to explore how we can help you bring your digital product to the Australian market.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="mr-6">
                  <MapPin className="h-6 w-6 text-[#0d0d0d]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-mono text-[#0d0d0d]">Office</h3>
                  <p className="text-[#555]">Level 5, 111 Elizabeth Street<br />Sydney, NSW 2000</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-6">
                  <Mail className="h-6 w-6 text-[#0d0d0d]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-mono text-[#0d0d0d]">Email</h3>
                  <p className="text-[#555]">info@example.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-6">
                  <Phone className="h-6 w-6 text-[#0d0d0d]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-mono text-[#0d0d0d]">Phone</h3>
                  <p className="text-[#555]">+61 2 1234 5678</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="border-8 border-[#f5f5f5] p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[#555] font-mono">First name</Label>
                    <Input 
                      id="firstName" 
                      className="border-[#0d0d0d] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[#555] font-mono">Last name</Label>
                    <Input 
                      id="lastName" 
                      className="border-[#0d0d0d] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#555] font-mono">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    className="border-[#0d0d0d] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-[#555] font-mono">Company</Label>
                  <Input 
                    id="company" 
                    className="border-[#0d0d0d] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#555] font-mono">Message</Label>
                  <Textarea 
                    id="message" 
                    rows={5} 
                    className="border-[#0d0d0d] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0" 
                  />
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox id="terms" className="rounded-none mt-1" />
                  <Label 
                    htmlFor="terms" 
                    className="text-sm text-[#555] leading-tight"
                  >
                    I agree to the processing of my data as outlined in the Privacy Policy
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-[#0d0d0d] text-white hover:bg-[#333] rounded-none px-8 py-6 h-auto font-mono w-full sm:w-auto"
                >
                  Submit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-[#0d0d0d] -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkFireContact;
