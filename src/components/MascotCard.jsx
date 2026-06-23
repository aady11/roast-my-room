import { cn } from "./utils";

export default function MascotCard({ mascot, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(mascot.id)}
      className={cn(
        "relative group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-left w-full",
        "bg-white/5 hover:bg-white/10",
        selected
          ? `border-opacity-100 ${mascot.borderColor} shadow-lg ${mascot.glowColor}`
          : "border-white/10 hover:border-white/30"
      )}
      style={
        selected
          ? {
              borderColor: mascot.accentColor,
              boxShadow: `0 0 20px ${mascot.accentColor}40`,
            }
          : {}
      }
    >
      {selected && (
        <div
          className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-black"
          style={{ backgroundColor: mascot.accentColor }}
        >
          ✓
        </div>
      )}

      <div
        className={cn(
          "text-5xl w-20 h-20 flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
          mascot.bgColor
        )}
      >
        {mascot.emoji}
      </div>

      <div className="text-center">
        <h3 className="text-white font-bold text-lg leading-tight">
          {mascot.name}
        </h3>
        <p
          className={cn("text-xs font-semibold uppercase tracking-wider mt-0.5", mascot.textColor)}
        >
          {mascot.tagline}
        </p>
      </div>

      <p className="text-gray-400 text-sm text-center leading-relaxed">
        {mascot.description}
      </p>
    </button>
  );
}
