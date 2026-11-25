import { Suspense, lazy } from "react";
import { SiteContentProvider } from "./siteContent/SiteContentContext";
import PublicSite from "./PublicSite";

// El panel de admin (y todo lo que usa: lucide extra, canvas de video, etc.)
// queda en su propio archivo que solo se descarga si alguien entra a /admin
// — los visitantes del sitio público no pagan ese peso.
const AdminApp = lazy(() => import("./admin/AdminApp"));

const isAdminRoute = window.location.pathname.startsWith("/admin");

export default function App() {
  return (
    <SiteContentProvider>
      {isAdminRoute ? (
        <Suspense fallback={<div className="min-h-screen bg-ink" />}>
          <AdminApp />
        </Suspense>
      ) : (
        <PublicSite />
      )}
    </SiteContentProvider>
  );
}
