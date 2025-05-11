
export interface FooterStyle {
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

export const defaultFooterStyle: FooterStyle = {
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
