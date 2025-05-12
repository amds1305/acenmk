
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
import AdminWrapper from "@/pages/AdminWrapper";
import LegalPageRoute from "@/pages/LegalPage";

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
    ],
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
];

export default routes;
