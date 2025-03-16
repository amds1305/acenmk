
import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const contactInfo = [
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    title: 'Email',
    value: 'contact@visiontech.fr',
    href: 'mailto:contact@visiontech.fr',
  },
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    title: 'Téléphone',
    value: '+33 1 23 45 67 89',
    href: 'tel:+33123456789',
  },
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: 'Adresse',
    value: '123 Avenue de l\'Innovation, 75001 Paris',
    href: 'https://maps.google.com',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would normally send the form data to your backend
    alert('Merci pour votre message ! Nous vous contacterons bientôt.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };
  
  return (
    <section id="contact" className="section">
      <div className="text-center">
        <h2 className="section-title">Contactez-nous</h2>
        <p className="section-subtitle mx-auto">
          Discutons ensemble de votre projet et de la manière dont nous pouvons vous aider
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-16">
        <div className="space-y-6 opacity-0 animate-fade-in-up">
          <h3 className="text-2xl font-semibold mb-6">Laissez-nous un message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition bg-white"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="Projet web">Projet web</option>
                  <option value="Application mobile">Application mobile</option>
                  <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                  <option value="Conseil">Conseil</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                placeholder="Décrivez votre projet ou votre demande..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-primary text-white font-medium transition-colors hover:bg-primary/90 w-full md:w-auto"
            >
              Envoyer le message
            </button>
          </form>
        </div>
        
        <div className="opacity-0 animate-fade-in-up animation-delay-300">
          <div className="glass-panel p-6 md:p-8 h-full">
            <h3 className="text-2xl font-semibold mb-8">Informations de contact</h3>
            
            <div className="space-y-6 mb-10">
              {contactInfo.map((info, index) => (
                <a 
                  key={index}
                  href={info.href}
                  className="flex items-start hover:text-primary transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="p-2 rounded-lg bg-primary/10 mr-4">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">{info.title}</h4>
                    <p className="font-medium mt-1">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Horaires d'ouverture</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lundi - Vendredi</span>
                  <span className="font-medium">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Samedi</span>
                  <span className="font-medium">Fermé</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimanche</span>
                  <span className="font-medium">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
