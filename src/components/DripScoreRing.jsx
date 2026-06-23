import { useEffect, useState } from "react";
import { getDripLabel } from "../utils/roastEngine";

export default function DripScoreRing({ score, mascot }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const { label, emoji } = getDripLabel(score);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;
  const strokeDashoffset = circumference - progress;

  useEffect(() => {
    const duration = 1500;
    const steps = 80;
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
  }, [score]);

  function getScoreColor(s) {
    if (s >= 75) return "#10b981";
    if (s >= 55) return "#f59e0b";
    if (s >= 35) return "#f97316";
    return "#ef4444";
  }

  const color = getScoreColor(score);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 128 128"
        >
          {/* Background ring */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="10"
          />
          {/* Progress ring */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-white tabular-nums leading-none">
            {animatedScore}
          </span>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">
            drip
          </span>
        </div>
      </div>

      <div className="text-center">
        <div className="text-2xl mb-1">{emoji}</div>
        <div className="text-white font-bold text-lg">{label}</div>
        <div className="text-gray-500 text-xs uppercase tracking-wider mt-0.5">
          Drip Score
        </div>
      </div>
    </div>
  );
}
