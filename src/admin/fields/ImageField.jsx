import { useState } from "react";
import { ImageUp } from "lucide-react";
import { uploadToPath } from "../storage";

export default function ImageField({ label, value, path, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const url = await uploadToPath(file, path);
      onChange(url);
    } catch (err) {
      console.error(err);
      setError("No se pudo subir la foto.");
    }
    setUploading(false);
  };

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-label text-ink/50">
        {label}
      </p>
      <div className="mt-2 flex items-center gap-4">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded bg-ink/10">
          {value && (
            <img src={value} alt="" className="h-full w-full object-cover" />
          )}
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded border border-ink/20 bg-white px-3 py-2 text-xs font-medium text-ink hover:border-ink/60">
          <ImageUp size={16} />
          {uploading ? "Subiendo…" : "Cambiar foto"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}
