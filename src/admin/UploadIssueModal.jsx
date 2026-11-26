import { AlertTriangle, X } from "lucide-react";

export default function UploadIssueModal({ failures, onClose }) {
  if (!failures || failures.length === 0) return null;
  const isSizeIssue = failures.some((f) => f.isSizeLimit);

  return (
    <div
      className="animate-overlay-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-panel-in w-full max-w-md rounded-md bg-cream p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle size={20} className="shrink-0" />
            <h3 className="font-serif-display text-xl text-ink">
              {failures.length === 1
                ? "No se pudo subir este archivo"
                : `No se pudieron subir ${failures.length} archivos`}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 text-ink/50 hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="mt-4 flex flex-col gap-2 text-sm text-ink/80">
          {failures.map((f, i) => (
            <li key={i} className="rounded bg-white/60 px-3 py-2">
              {f.name && <span className="font-medium text-ink">{f.name}</span>}
              {f.name && " — "}
              {f.reason}
            </li>
          ))}
        </ul>

        {isSizeIssue && (
          <div className="mt-4 rounded border border-gold/40 bg-gold/10 p-3 text-sm text-ink/80">
            <p className="font-medium text-ink">¿Qué hacer?</p>
            <ol className="mt-1.5 list-decimal flex flex-col gap-1 pl-4">
              <li>Compartilo por WhatsApp a vos misma y subí esa versión (WhatsApp lo comprime solo).</li>
              <li>O usá una app gratis de compresión de video en el celular.</li>
              <li>O recortalo para que sea más corto.</li>
            </ol>
            <p className="mt-2 text-xs text-ink/50">El límite actual es 50MB por archivo.</p>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded bg-ink py-2 text-sm font-medium text-white hover:bg-ink-light"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
