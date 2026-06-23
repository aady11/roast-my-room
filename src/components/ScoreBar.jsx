import { useEffect, useState } from "react";
import { cn } from "./utils";

function getBarColor(score) {
  if (score >= 75) return "from-emerald-500 to-green-400";
  if (score >= 55) return "from-yellow-500 to-amber-400";
  if (score >= 35) return "from-orange-500 to-amber-500";
  return "from-red-600 to-red-400";
}

export default function ScoreBar({ label, score, emoji, delay = 0 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1200;
      const steps = 60;
      const increment = score / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(interval);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-300 font-medium flex items-center gap-1.5">
          <span>{emoji}</span>
          {label}
        </span>
        <span className="text-white font-bold tabular-nums">{animatedScore}</span>
      </div>
      <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all ease-out",
            getBarColor(score)
          )}
          style={{
            width: `${animatedScore}%`,
            transitionDuration: "1.2s",
          }}
        />
      </div>
    </div>
  );
}
