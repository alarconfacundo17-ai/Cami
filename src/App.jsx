import { SiteContentProvider } from "./siteContent/SiteContentContext";
import PublicSite from "./PublicSite";
import AdminApp from "./admin/AdminApp";

const isAdminRoute = window.location.pathname.startsWith("/admin");

export default function App() {
  return (
    <SiteContentProvider>
      {isAdminRoute ? <AdminApp /> : <PublicSite />}
    </SiteContentProvider>
  );
}
