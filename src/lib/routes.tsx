
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
import { Suspense, lazy } from "react";

// Ajoutons un composant de chargement pour la Suspense
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
    element: <Suspense fallback={<Loading />}><AboutPage /></Suspense>,
  },
  {
    path: "/services",
    element: <Suspense fallback={<Loading />}><ServicesPage /></Suspense>,
  },
  {
    path: "/portfolio",
    element: <Suspense fallback={<Loading />}><PortfolioPage /></Suspense>,
  },
  {
    path: "/contact",
    element: <Suspense fallback={<Loading />}><ContactPage /></Suspense>,
  },
  {
    path: "/profile",
    element: <Suspense fallback={<Loading />}><ProfilePage /></Suspense>,
  },
  {
    path: "/projects",
    element: <Suspense fallback={<Loading />}><ProjectsPage /></Suspense>,
  },
  {
    path: "/estimates",
    element: <Suspense fallback={<Loading />}><EstimatesPage /></Suspense>,
  },
  {
    path: "/messages",
    element: <Suspense fallback={<Loading />}><MessagesPage /></Suspense>,
  },
  {
    path: "/leads",
    element: <Suspense fallback={<Loading />}><MyLeadsPage /></Suspense>,
  },
  {
    path: "/mentions-legales",
    element: <Suspense fallback={<Loading />}><LegalPageRoute /></Suspense>,
  },
  {
    path: "/politique-de-confidentialite",
    element: <Suspense fallback={<Loading />}><LegalPageRoute /></Suspense>,
  },
  {
    path: "/conditions-utilisation",
    element: <Suspense fallback={<Loading />}><LegalPageRoute /></Suspense>,
  },
  {
    path: "/politique-cookies",
    element: <Suspense fallback={<Loading />}><LegalPageRoute /></Suspense>,
  },
  {
    path: "/ace-job",
    element: <Suspense fallback={<Loading />}><AceJobPage /></Suspense>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
