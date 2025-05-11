import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

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
  sectionTitles: {
    services: string;
    contact: string;
    legal: string;
  };
}

interface FooterStyle {
  companyName: {
    color: string;
    fontSize: string;
    fontWeight: string;
    isVisible: boolean;
  };
  sectionTitles: {
    color: string;
    fontSize: string;
    fontWeight: string;
    isVisible: boolean;
  };
  links: {
    isVisible: boolean;
    color: string;
    hoverColor: string;
  };
  services: {
    isVisible: boolean;
  };
  legalLinks: {
    isVisible: boolean;
  };
  social: {
    isVisible: boolean;
    iconColor: string;
    iconHoverColor: string;
    iconBgColor: string;
    iconBgHoverColor: string;
  };
  backToTopButton: {
    isVisible: boolean;
    textColor: string;
    bgColor: string;
    borderColor: string;
    hoverBgColor: string;
    hoverTextColor: string;
  }
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
  sectionTitles: {
    services: "Services",
    contact: "Contact",
    legal: "Légal"
  },
  legalLinks: [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    { name: "Conditions d'utilisation", href: "/conditions-utilisation" },
    { name: "Cookies", href: "/politique-cookies" }
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

const defaultFooterStyle: FooterStyle = {
  companyName: {
    color: "#FFFFFF",
    fontSize: "1.5rem",
    fontWeight: "700",
    isVisible: true,
  },
  sectionTitles: {
    color: "#FFFFFF",
    fontSize: "1.25rem",
    fontWeight: "600",
    isVisible: true,
  },
  links: {
    isVisible: true,
    color: "#9CA3AF",
    hoverColor: "#FFFFFF",
  },
  services: {
    isVisible: true,
  },
  legalLinks: {
    isVisible: true,
  },
  social: {
    isVisible: true,
    iconColor: "#9CA3AF",
    iconHoverColor: "#FFFFFF",
    iconBgColor: "rgba(255, 255, 255, 0.1)",
    iconBgHoverColor: "rgba(255, 255, 255, 0.2)",
  },
  backToTopButton: {
    isVisible: true,
    textColor: "#FFFFFF",
    bgColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "transparent",
    hoverBgColor: "rgba(255, 255, 255, 0.2)",
    hoverTextColor: "#FFFFFF",
  }
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
const fetchFooterData = async () => {
  try {
    // Try to get from Supabase
    try {
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

// Function to fetch footer styles
const fetchFooterStyles = async () => {
  try {
    // Try to get from Supabase
    try {
      const { data, error } = await supabase
        .from('section_data')
        .select('data')
        .eq('section_id', 'footer-style')
        .single();
        
      if (!error && data && data.data) {
        return data.data as FooterStyle;
      }
    } catch (supabaseError) {
      console.error("Supabase error fetching styles:", supabaseError);
    }
  } catch (error) {
    console.error("Error fetching footer styles:", error);
  }
  
  // Return default styles if all else fails
  return defaultFooterStyle;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerData, setFooterData] = useState(defaultFooterData);
  const [footerStyle, setFooterStyle] = useState(defaultFooterStyle);
  
  const { data: dataFromQuery } = useQuery({
    queryKey: ['footerData'],
    queryFn: fetchFooterData,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  
  const { data: styleFromQuery } = useQuery({
    queryKey: ['footerStyle'],
    queryFn: fetchFooterStyles,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  
  useEffect(() => {
    if (dataFromQuery) {
      setFooterData({
        ...defaultFooterData,
        ...dataFromQuery
      });
    }
    
    if (styleFromQuery) {
      setFooterStyle(styleFromQuery);
    }
    
    // Listen for admin changes
    const handleAdminChanges = () => {
      console.log("Admin changes detected, refetching footer data...");
      fetchFooterData().then(data => setFooterData({...defaultFooterData, ...data}));
      fetchFooterStyles().then(style => setFooterStyle(style));
    };
    
    // Listen for footer style updates
    const handleStyleUpdates = (e: CustomEvent) => {
      console.log("Footer style updated:", e.detail);
      if (e.detail.style) {
        setFooterStyle(e.detail.style);
      }
      if (e.detail.data) {
        setFooterData({...defaultFooterData, ...e.detail.data});
      }
    };
    
    window.addEventListener('admin-changes-saved', handleAdminChanges);
    window.addEventListener('footer-style-updated', handleStyleUpdates as EventListener);
    
    return () => {
      window.removeEventListener('admin-changes-saved', handleAdminChanges);
      window.removeEventListener('footer-style-updated', handleStyleUpdates as EventListener);
    };
  }, [dataFromQuery, styleFromQuery]);

  // Extract the data for easy usage
  const { 
    companyInfo, 
    serviceLinks, 
    legalLinks, 
    contactInfo, 
    socialLinks, 
    sectionTitles = { services: "Services", contact: "Contact", legal: "Légal" }
  } = footerData;
  
  // Générer les styles CSS basés sur footerStyle
  const companyNameStyle = {
    color: footerStyle.companyName.color,
    fontSize: footerStyle.companyName.fontSize,
    fontWeight: footerStyle.companyName.fontWeight,
    display: footerStyle.companyName.isVisible ? 'block' : 'none'
  };
  
  const sectionTitleStyle = {
    color: footerStyle.sectionTitles.color,
    fontSize: footerStyle.sectionTitles.fontSize,
    fontWeight: footerStyle.sectionTitles.fontWeight,
    display: footerStyle.sectionTitles.isVisible ? 'block' : 'none'
  };
  
  const linkStyle = {
    color: footerStyle.links.color,
    transition: 'color 0.2s ease'
  };
  
  // Créer des classes CSS personnalisées pour le hover
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .footer-link:hover {
        color: ${footerStyle.links.hoverColor} !important;
      }
      .footer-social:hover {
        color: ${footerStyle.social.iconHoverColor} !important;
        background-color: ${footerStyle.social.iconBgHoverColor} !important;
      }
      .footer-back-to-top:hover {
        color: ${footerStyle.backToTopButton.hoverTextColor} !important;
        background-color: ${footerStyle.backToTopButton.hoverBgColor} !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [footerStyle]);

  // Styles pour les icônes sociales
  const socialIconStyle = {
    color: footerStyle.social.iconColor,
    backgroundColor: footerStyle.social.iconBgColor,
    transition: 'color 0.2s ease, background-color 0.2s ease'
  };
  
  // Style pour le bouton "Retour en haut"
  const backToTopButtonStyle = {
    color: footerStyle.backToTopButton.textColor,
    backgroundColor: footerStyle.backToTopButton.bgColor,
    borderColor: footerStyle.backToTopButton.borderColor,
    display: footerStyle.backToTopButton.isVisible ? 'inline-flex' : 'none',
    transition: 'color 0.2s ease, background-color 0.2s ease'
  };
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            {footerStyle.companyName.isVisible && (
              <a href="#hero" className="text-xl font-bold tracking-tight" style={companyNameStyle}>
                <span className="text-primary">{companyInfo.name.split(' ')[0] || 'VISION'}</span> 
                <span className="text-white">{companyInfo.name.split(' ')[1] || 'TECH'}</span>
              </a>
            )}
            <p className="text-gray-400 mt-4 mb-6 max-w-xs">
              {companyInfo.description}
            </p>
            {footerStyle.social.isVisible && (
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className="p-2 bg-white/10 rounded-full hover:bg-primary/90 transition-colors footer-social"
                    target="_blank"
                    rel="noreferrer"
                    style={socialIconStyle}
                  >
                    {getSocialIcon(social.name)}
                  </a>
                ))}
              </div>
            )}
          </div>
          
          {/* Services */}
          {footerStyle.services.isVisible && (
            <div>
              <h4 className="text-lg font-semibold mb-6" style={sectionTitleStyle}>
                {sectionTitles.services || "Services"}
              </h4>
              <ul className="space-y-4">
                {serviceLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="footer-link transition-colors"
                      style={linkStyle}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6" style={sectionTitleStyle}>
              {sectionTitles.contact || "Contact"}
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a 
                    href={info.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 footer-link"
                    target="_blank"
                    rel="noreferrer"
                    style={linkStyle}
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
          {footerStyle.legalLinks.isVisible && (
            <div>
              <h4 className="text-lg font-semibold mb-6" style={sectionTitleStyle}>
                {sectionTitles.legal || "Légal"}
              </h4>
              <ul className="space-y-4">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="footer-link transition-colors"
                      style={linkStyle}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} {companyInfo.name}. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0">
            <a 
              href="#hero" 
              className="footer-back-to-top inline-flex items-center justify-center h-10 px-4 rounded-full text-white text-sm font-medium"
              style={backToTopButtonStyle}
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
