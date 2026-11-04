import { Camera } from "lucide-react";

const TONES = {
  warm: "from-[#cdb79a] via-[#b89a79] to-[#8d7257]",
  cool: "from-[#9fa89a] via-[#7d8878] to-[#555f52]",
  sunset: "from-[#d9a06b] via-[#b86f52] to-[#6e4536]",
  stone: "from-[#bdb5a8] via-[#938a7b] to-[#5c5448]",
};

export default function PlaceholderPhoto({
  tone = "warm",
  label,
  className = "",
  children,
}) {
  const gradient = TONES[tone] ?? TONES.warm;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.3), transparent 45%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-white/40">
        <Camera size={32} strokeWidth={1.25} />
      </div>
      {label && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10">
          <span className="font-sans text-xs font-medium uppercase tracking-label text-white">
            {label}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
