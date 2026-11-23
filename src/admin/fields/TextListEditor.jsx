import { Plus, X } from "lucide-react";

export default function TextListEditor({ label, items, onChange, multiline = false }) {
  const update = (i, value) => {
    const next = [...items];
    next[i] = value;
    onChange(next);
  };

  const add = () => onChange([...items, ""]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const Field = multiline ? "textarea" : "input";

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-label text-ink/50">
        {label}
      </p>
      <div className="mt-2 flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <Field
              value={item}
              onChange={(e) => update(i, e.target.value)}
              rows={multiline ? 2 : undefined}
              className="w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink/60"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="mt-2 shrink-0 text-ink/40 hover:text-red-700"
              aria-label="Sacar"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 flex items-center gap-1 text-xs font-medium text-ink/70 hover:text-ink"
      >
        <Plus size={14} /> Agregar
      </button>
    </div>
  );
}
