
import React from 'react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/mysql';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const NmkKinkContact = () => {
  const { data: config } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig
  });

  // Get contact data from config or use defaults
  const defaultContactData = {
    title: "Contactez-nous",
    subtitle: "Nous sommes là pour répondre à vos questions et discuter de vos projets",
    email: "contact@exemple.com",
    phone: "+33 1 23 45 67 89",
    address: "123 Rue Exemple, 75000 Paris, France",
  };

  const contactData = config?.sectionData?.contact 
    ? { ...defaultContactData, ...config.sectionData.contact } 
    : defaultContactData;

  return (
    <section id="contact" className="py-24 bg-[#121212] text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {contactData.title}
          </h2>
          <p className="text-lg text-gray-300">
            {contactData.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-white/10 p-3 rounded-full">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <a href={`mailto:${contactData.email}`} className="text-gray-300 hover:text-white transition-colors">
                  {contactData.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white/10 p-3 rounded-full">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
                <a href={`tel:${contactData.phone}`} className="text-gray-300 hover:text-white transition-colors">
                  {contactData.phone}
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white/10 p-3 rounded-full">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Adresse</h3>
                <p className="text-gray-300">
                  {contactData.address}
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Envoyez-nous un message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="sr-only">Nom</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Votre email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="sr-only">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Sujet"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Votre message"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-gray-400 resize-none"
                ></textarea>
              </div>
              <Button className="w-full bg-white text-black hover:bg-gray-200 flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                Envoyer le message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkKinkContact;
