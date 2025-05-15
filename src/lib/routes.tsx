
import { RouteObject } from "react-router-dom";
import AdminPage from "@/pages/Admin";
import AdminHomePage from "@/pages/AdminHome";
import AdminHeroPage from "@/pages/AdminHero";
import AdminAboutPage from "@/pages/AdminAbout";
import AdminFaqPage from "@/pages/AdminFaq";
import AdminServicesPage from "@/pages/AdminServices";
import AdminTeamPage from "@/pages/AdminTeam";
import AdminFooterPage from "@/pages/AdminFooter";
import AdminHeaderPage from "@/pages/AdminHeader";
import AdminUsersPage from "@/pages/AdminUsers";
import AdminTestimonialsPage from "@/pages/AdminTestimonials";
import AdminTrustedClientsPage from "@/pages/AdminTrustedClients";
import AdminContactPage from "@/pages/AdminContact";
import AdminAceJobPage from "@/pages/AdminAceJob";
import AdminRolesPermissions from "@/pages/AdminRolesPermissions";
import AdminExternalLinks from "@/pages/AdminExternalLinks";
import AdminLeadsPage from "@/pages/AdminLeads";
import AdminSupabaseMigration from "@/pages/AdminSupabaseMigration";
import AdminWrapper from "@/pages/AdminWrapper";
import LegalPageRoute from "@/pages/LegalPage";
import AceJobPage from "@/pages/AceJob";
import AboutPage from "@/pages/About";
import ServicesPage from "@/pages/Services";
import PortfolioPage from "@/pages/Portfolio";
import ContactPage from "@/pages/Contact";
import ProfilePage from "@/pages/Profile";
import ProjectsPage from "@/pages/Projects";
import EstimatesPage from "@/pages/Estimates";
import MessagesPage from "@/pages/Messages";
import MyLeadsPage from "@/pages/MyLeads";
import NotFound from "@/pages/NotFound";

export const routes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminWrapper />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: "home",
        element: <AdminHomePage />,
      },
      {
        path: "hero",
        element: <AdminHeroPage />,
      },
      {
        path: "header",
        element: <AdminHeaderPage />,
      },
      {
        path: "about",
        element: <AdminAboutPage />,
      },
      {
        path: "services",
        element: <AdminServicesPage />,
      },
      {
        path: "team",
        element: <AdminTeamPage />,
      },
      {
        path: "testimonials",
        element: <AdminTestimonialsPage />,
      },
      {
        path: "footer",
        element: <AdminFooterPage />,
      },
      {
        path: "users",
        element: <AdminUsersPage />,
      },
      {
        path: "faq",
        element: <AdminFaqPage />,
      },
      {
        path: "trusted-clients",
        element: <AdminTrustedClientsPage />,
      },
      {
        path: "contact",
        element: <AdminContactPage />,
      },
      {
        path: "ace-job",
        element: <AdminAceJobPage />,
      },
      {
        path: "roles",
        element: <AdminRolesPermissions />,
      },
      {
        path: "external-links",
        element: <AdminExternalLinks />,
      },
      {
        path: "leads",
        element: <AdminLeadsPage />,
      },
      {
        path: "migration",
        element: <AdminSupabaseMigration />,
      },
    ],
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/services",
    element: <ServicesPage />,
  },
  {
    path: "/portfolio",
    element: <PortfolioPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/estimates",
    element: <EstimatesPage />,
  },
  {
    path: "/messages",
    element: <MessagesPage />,
  },
  {
    path: "/leads",
    element: <MyLeadsPage />,
  },
  {
    path: "/mentions-legales",
    element: <LegalPageRoute />,
  },
  {
    path: "/politique-de-confidentialite",
    element: <LegalPageRoute />,
  },
  {
    path: "/conditions-utilisation",
    element: <LegalPageRoute />,
  },
  {
    path: "/politique-cookies",
    element: <LegalPageRoute />,
  },
  {
    path: "/ace-job",
    element: <AceJobPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
