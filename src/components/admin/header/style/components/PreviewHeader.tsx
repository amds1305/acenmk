
import React, { useState } from 'react';
import { useHeaderStyle } from '@/contexts/HeaderStyleContext';
import { Button } from '@/components/ui/button';
import { Home, Search, Moon, Sun, Menu, X } from 'lucide-react';

const PreviewHeader: React.FC = () => {
  const { headerStyle } = useHeaderStyle();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Style dynamique pour le header
  const headerStyles = {
    backgroundColor: isScrolled 
      ? headerStyle.scrolledBgColor || 'rgba(255, 255, 255, 0.8)'
      : headerStyle.backgroundColor,
    color: isScrolled
      ? headerStyle.scrolledTextColor || headerStyle.textColor
      : headerStyle.textColor,
    borderBottom: headerStyle.borderBottom
      ? `1px solid ${isScrolled 
          ? headerStyle.scrolledBorderColor || headerStyle.borderColor
          : headerStyle.borderColor}`
      : 'none',
    boxShadow: headerStyle.dropShadow
      ? isScrolled
        ? headerStyle.scrolledShadow || '0 2px 4px rgba(0, 0, 0, 0.05)'
        : '0 1px 2px rgba(0, 0, 0, 0.05)'
      : 'none',
    backdropFilter: headerStyle.glassmorphism ? 'blur(10px)' : 'none',
    padding: headerStyle.padding,
    transition: `all ${headerStyle.transitionDuration || '0.3s'} ${headerStyle.transitionTiming || 'ease'}`,
    fontFamily: headerStyle.fontFamily,
    fontSize: headerStyle.fontSize,
    fontWeight: headerStyle.fontWeight || '500',
    letterSpacing: headerStyle.letterSpacing || 'normal',
    textTransform: headerStyle.textTransform as any || 'none',
  };

  // Style pour les liens de menu
  const menuItemStyle = {
    color: headerStyle.textColor,
    transition: headerStyle.menuTransition || 'all 0.3s ease',
    borderRadius: headerStyle.menuBorderRadius || '0.375rem',
    padding: '0.5rem 0.75rem',
  };
  
  const menuItemActiveStyle = {
    ...menuItemStyle,
    color: headerStyle.activeColor,
    backgroundColor: headerStyle.menuActiveBgColor,
  };
  
  // Style pour les icônes sociales
  const socialIconStyle = {
    color: headerStyle.socialIconColor,
    backgroundColor: headerStyle.socialIconBgColor,
    borderColor: headerStyle.socialIconBorderColor,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '9999px',
    padding: '0.5rem',
  };

  // Style pour les icônes d'utilité
  const utilityIconStyle = {
    color: headerStyle.utilityIconColor,
    backgroundColor: headerStyle.utilityIconBgColor,
    borderColor: headerStyle.utilityIconBorderColor,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '9999px',
    padding: '0.5rem',
  };

  return (
    <div className="relative h-96 overflow-hidden border-b">
      <div className="absolute w-full h-full bg-gradient-to-b from-gray-900 to-gray-700 flex flex-col">
        <header style={headerStyles} className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center">
            <div className="font-bold text-lg mr-6">LOGO</div>
            
            {/* Menu de navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <a 
                href="#" 
                className="flex items-center justify-center"
                style={menuItemActiveStyle}
              >
                <Home size={18} />
              </a>
              <a
                href="#"
                className="hover:bg-opacity-20"
                style={menuItemStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = headerStyle.hoverColor;
                  e.currentTarget.style.backgroundColor = headerStyle.menuHoverBgColor;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = headerStyle.textColor;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Services
              </a>
              <a
                href="#"
                className="hover:bg-opacity-20"
                style={menuItemStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = headerStyle.hoverColor;
                  e.currentTarget.style.backgroundColor = headerStyle.menuHoverBgColor;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = headerStyle.textColor;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                À propos
              </a>
              <a
                href="#"
                className="hover:bg-opacity-20"
                style={menuItemStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = headerStyle.hoverColor;
                  e.currentTarget.style.backgroundColor = headerStyle.menuHoverBgColor;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = headerStyle.textColor;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Contact
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Icônes sociaux */}
            <div className="hidden md:flex items-center space-x-2">
              <a
                href="#"
                className="flex items-center justify-center rounded-full w-8 h-8"
                style={socialIconStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = headerStyle.socialIconHoverColor;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = headerStyle.socialIconColor;
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center rounded-full w-8 h-8"
                style={socialIconStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = headerStyle.socialIconHoverColor;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = headerStyle.socialIconColor;
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
            
            {/* Icônes d'utilité */}
            {headerStyle.showThemeSelector && (
              <Button
                variant="ghost"
                size="icon"
                className="flex items-center justify-center rounded-full w-8 h-8"
                style={utilityIconStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = headerStyle.utilityIconHoverColor;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = headerStyle.utilityIconColor;
                }}
              >
                <Moon size={16} />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="flex items-center justify-center rounded-full w-8 h-8"
              style={utilityIconStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.color = headerStyle.utilityIconHoverColor;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = headerStyle.utilityIconColor;
              }}
            >
              <Search size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden flex items-center justify-center"
              style={utilityIconStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.color = headerStyle.utilityIconHoverColor;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = headerStyle.utilityIconColor;
              }}
            >
              <Menu size={16} />
            </Button>
          </div>
        </header>
        
        {/* Contrôles de la prévisualisation */}
        <div className="mt-4 flex items-center justify-center space-x-4">
          <Button
            variant={isScrolled ? "default" : "outline"}
            size="sm"
            onClick={() => setIsScrolled(false)}
          >
            En haut de page
          </Button>
          <Button
            variant={isScrolled ? "outline" : "default"}
            size="sm"
            onClick={() => setIsScrolled(true)}
          >
            En défilement
          </Button>
        </div>
        
        {/* Contenu de la page */}
        <div className="flex-1 flex items-center justify-center text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Prévisualisation du header</h2>
            <p className="text-gray-300">
              Cliquez sur les boutons ci-dessus pour visualiser les différents états
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewHeader;
