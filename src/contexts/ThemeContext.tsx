
import React, { createContext, useContext, useState, useEffect } from "react";

// Définir les types de thèmes disponibles
export type ThemeName = "light" | "dark" | "purple" | "blue" | "green";

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>(() => {
    // Vérifier les préférences sauvegardées ou utiliser la préférence système
    const savedTheme = localStorage.getItem("theme") as ThemeName;
    if (savedTheme && ["light", "dark", "purple", "blue", "green"].includes(savedTheme)) {
      return savedTheme;
    }
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Mettre à jour le localStorage et la classe du document lorsque le thème change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    
    // Supprimer toutes les classes de thème précédentes
    document.documentElement.classList.remove("light", "dark", "theme-purple", "theme-blue", "theme-green");
    
    // Ajouter la classe appropriée en fonction du thème
    if (theme === "light" || theme === "dark") {
      document.documentElement.classList.add(theme);
    } else {
      // Pour les thèmes personnalisés, on garde le mode clair et on ajoute la classe du thème
      document.documentElement.classList.add("light");
      document.documentElement.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  // Fonction pour basculer entre les modes sombre et clair uniquement
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light" || prevTheme === "dark") {
        return prevTheme === "light" ? "dark" : "light";
      } else {
        // Si on est sur un thème personnalisé, on alterne entre light et dark
        return "dark";
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
