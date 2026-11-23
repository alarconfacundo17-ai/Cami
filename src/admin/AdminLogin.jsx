import { useState } from "react";
import { Lock } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { ADMIN_EMAIL } from "./adminConfig";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });

    setLoading(false);
    if (error) setError("Contraseña incorrecta.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-md bg-cream p-8 shadow-xl"
      >
        <div className="flex items-center gap-2 text-ink">
          <Lock size={20} strokeWidth={1.5} />
          <h1 className="font-serif-display text-2xl">Panel de Camila</h1>
        </div>

        <p className="mt-2 text-sm font-light text-ink/70">
          Ingresá tu contraseña para editar el sitio.
        </p>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="mt-6 w-full rounded border border-ink/20 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ink/60"
        />

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded bg-ink py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
