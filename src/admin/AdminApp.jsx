import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function AdminApp() {
  const [session, setSession] = useState(undefined); // undefined = cargando

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setSession(null);
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-center text-white">
        <p className="max-w-md font-light">
          El panel de edición todavía no está conectado a Supabase. Avisale a
          quien te armó el sitio para terminar esa configuración.
        </p>
      </div>
    );
  }

  if (session === undefined) {
    return <div className="min-h-screen bg-ink" />;
  }

  if (!session) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
