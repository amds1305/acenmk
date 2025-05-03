
import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface FooterLink {
  name: string;
  href: string;
}

interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  href: string;
}

interface SocialLink {
  name: string;
  href: string;
}

interface FooterData {
  companyInfo: {
    name: string;
    description: string;
  };
  serviceLinks: FooterLink[];
  legalLinks: FooterLink[];
  contactInfo: ContactInfo[];
  socialLinks: SocialLink[];
}

const defaultFooterData: FooterData = {
  companyInfo: {
    name: "VISIONTECH",
    description: "Solutions numériques innovantes pour transformer votre entreprise et accélérer votre croissance."
  },
  serviceLinks: [
    { name: "Développement sur mesure", href: "#services" },
    { name: "Infrastructure cloud", href: "#services" },
    { name: "UX/UI Design", href: "#services" },
    { name: "Applications mobiles", href: "#services" },
    { name: "Transformation digitale", href: "#services" }
  ],
  legalLinks: [
    { name: "Mentions légales", href: "#" },
    { name: "Politique de confidentialité", href: "#" },
    { name: "Conditions d'utilisation", href: "#" },
    { name: "Cookies", href: "#" }
  ],
  contactInfo: [
    {
      icon: "Mail",
      title: "Email",
      value: "contact@visiontech.fr",
      href: "mailto:contact@visiontech.fr",
    },
    {
      icon: "Phone",
      title: "Téléphone",
      value: "+33 1 23 45 67 89",
      href: "tel:+33123456789",
    },
    {
      icon: "MapPin",
      title: "Adresse",
      value: "123 Avenue de l'Innovation, 75001 Paris",
      href: "https://maps.google.com",
    }
  ],
  socialLinks: [
    { name: "Facebook", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "LinkedIn", href: "#" }
  ]
};

const getFooterIcon = (iconName: string) => {
  switch (iconName) {
    case 'Mail': return <Mail className="h-5 w-5" />;
    case 'Phone': return <Phone className="h-5 w-5" />;
    case 'MapPin': return <MapPin className="h-5 w-5" />;
    case 'Facebook': return <Facebook className="h-5 w-5" />;
    case 'Twitter': return <Twitter className="h-5 w-5" />;
    case 'Instagram': return <Instagram className="h-5 w-5" />;
    case 'LinkedIn': return <Linkedin className="h-5 w-5" />;
    default: return <Mail className="h-5 w-5" />;
  }
};

const getSocialIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'facebook': return <Facebook className="h-5 w-5" />;
    case 'twitter': return <Twitter className="h-5 w-5" />;
    case 'instagram': return <Instagram className="h-5 w-5" />;
    case 'linkedin': return <Linkedin className="h-5 w-5" />;
    default: return <Linkedin className="h-5 w-5" />;
  }
};

// Function to fetch footer data
const fetchFooterData = async (): Promise<FooterData> => {
  try {
    // Try to get from Supabase
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('section_data')
        .select('data')
        .eq('section_id', 'footer')
        .single();
        
      if (!error && data && data.data) {
        return data.data as FooterData;
      }
    } catch (supabaseError) {
      console.error("Supabase error:", supabaseError);
      // Continue to localStorage if Supabase fails
    }
    
    // Try to get from localStorage
    const savedData = localStorage.getItem('footerData');
    if (savedData) {
      return JSON.parse(savedData) as FooterData;
    }
  } catch (error) {
    console.error("Error fetching footer data:", error);
  }
  
  // Return default data if all else fails
  return defaultFooterData;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerData, setFooterData] = useState<FooterData>(defaultFooterData);
  
  const { data } = useQuery({
    queryKey: ['footerData'],
    queryFn: fetchFooterData,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  
  useEffect(() => {
    if (data) {
      setFooterData(data);
    }
    
    // Listen for admin changes
    const handleAdminChanges = () => {
      console.log("Admin changes detected, refetching footer data...");
      fetchFooterData().then(data => setFooterData(data));
    };
    
    window.addEventListener('admin-changes-saved', handleAdminChanges);
    
    return () => {
      window.removeEventListener('admin-changes-saved', handleAdminChanges);
    };
  }, [data]);

  // Extract the data for easy usage
  const { companyInfo, serviceLinks, legalLinks, contactInfo, socialLinks } = footerData;
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <a href="#hero" className="text-xl font-bold tracking-tight">
              <span className="text-primary">{companyInfo.name.split(' ')[0] || 'VISION'}</span> 
              <span className="text-white">{companyInfo.name.split(' ')[1] || 'TECH'}</span>
            </a>
            <p className="text-gray-400 mt-4 mb-6 max-w-xs">
              {companyInfo.description}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="p-2 bg-white/10 rounded-full hover:bg-primary/90 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  {getSocialIcon(social.name)}
                </a>
              ))}
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a 
                    href={info.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="bg-white/10 p-1.5 rounded-full">
                      {getFooterIcon(info.icon)}
                    </span>
                    <span>{info.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Légal</h4>
            <ul className="space-y-4">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} {companyInfo.name}. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0">
            <a 
              href="#hero" 
              className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-white/10 text-white text-sm font-medium transition-colors hover:bg-primary/90"
            >
              Retour en haut
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
