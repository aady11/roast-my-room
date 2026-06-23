import { useEffect, useRef } from "react";

export default function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: ["🔥", "⚡", "💀", "🚩", "✨", "💫"][i % 6],
    size: Math.random() * 16 + 10,
    left: Math.random() * 100,
    animDuration: Math.random() * 15 + 10,
    animDelay: Math.random() * 10,
    opacity: Math.random() * 0.12 + 0.04,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float select-none"
          style={{
            left: `${p.left}%`,
            bottom: "-5%",
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.animDuration}s`,
            animationDelay: `${p.animDelay}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
