import { cn } from "./utils";

export default function RoastCard({ text, index, mascot }) {
  const delays = ["delay-0", "delay-75", "delay-150"];

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-xl bg-white/5 border border-white/10",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: "both" }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mt-0.5"
        style={{ backgroundColor: `${mascot.accentColor}20` }}
      >
        <span style={{ color: mascot.accentColor }}>🔥</span>
      </div>
      <p className="text-gray-200 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
