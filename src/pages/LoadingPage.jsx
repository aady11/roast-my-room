import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { cn } from "../components/utils";

const loadingMessages = {
  "room-goblin": [
    "Room Goblin is crawling through your walls...",
    "He found something behind the dresser. He's not sharing.",
    "Scribbling roast lines in crayon on your drywall...",
    "Almost done. He knocked something over. Classic.",
  ],
  "dumpster-dan": [
    "Dumpster Dan is preparing emotional damage...",
    "He has seen worse. Barely. He's crying a little.",
    "Consulting his trauma journal for reference...",
    "Wiping a single tear. Almost ready.",
  ],
  "judge-cat": [
    "Judge Cat is silently disappointed...",
    "Adjusting his monocle and sighing deeply...",
    "Drafting a formal 14-page complaint...",
    "He needs a moment. Your room shook him.",
  ],
  "chaos-crow": [
    "Chaos Crow is having a full breakdown about your room...",
    "He's SCREAMING. It's fine. He does this.",
    "Vibrating at a dangerous frequency right now...",
    "Found 7 new things to panic about. Almost done!!",
  ],
};

export default function LoadingPage({ mascot }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  const messages = loadingMessages[mascot.id] || [mascot.loadingLine];

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setMessageIndex((i) => (i + 1) % messages.length);
        setFading(false);
      }, 300);
    }, 2200);
    return () => clearInterval(msgInterval);
  }, [messages.length]);

  useEffect(() => {
    let p = 0;
    const progressInterval = setInterval(() => {
      p += Math.random() * 4 + 1;
      if (p > 92) p = 92;
      setProgress(Math.min(p, 92));
    }, 200);
    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
          style={{ backgroundColor: mascot.accentColor, opacity: 0.12 }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse-slow"
          style={{ backgroundColor: mascot.accentColor, opacity: 0.08, animationDelay: "1.5s" }}
        />
      </div>

      <Navbar />

      <div className="relative z-10 flex flex-col items-center gap-10 px-4 text-center max-w-sm w-full">

        {/* Mascot with spinning ring */}
        <div className="relative w-44 h-44">
          {/* Outer spinning ring */}
          <div
            className="absolute inset-0 rounded-3xl border-2 border-dashed animate-spin-slow"
            style={{ borderColor: `${mascot.accentColor}40`, animationDuration: "6s" }}
          />
          {/* Inner pulsing glow */}
          <div
            className="absolute inset-2 rounded-2xl animate-pulse-slow"
            style={{ backgroundColor: `${mascot.accentColor}10` }}
          />
          {/* Emoji */}
          <div
            className="absolute inset-2 rounded-2xl flex items-center justify-center text-7xl animate-bounce-gentle"
            style={{
              backgroundColor: `${mascot.accentColor}12`,
              border: `2px solid ${mascot.accentColor}20`,
            }}
          >
            {mascot.emoji}
          </div>

          {/* Three orbiting dots */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: mascot.accentColor,
                boxShadow: `0 0 8px ${mascot.accentColor}`,
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
                animation: `orbit-${i} 3s linear infinite`,
                animationDelay: `${i * -1}s`,
              }}
            />
          ))}
        </div>

        {/* Name + status */}
        <div>
          <h2 className="text-3xl font-black mb-1.5" style={{ color: mascot.accentColor }}>
            {mascot.name}
          </h2>
          <p className="text-gray-500 text-sm uppercase tracking-widest">
            is analyzing your life choices
          </p>
        </div>

        {/* Rotating message */}
        <div className="min-h-16 flex items-center justify-center w-full">
          <p
            className={cn(
              "text-gray-200 text-lg font-medium leading-relaxed transition-all duration-300",
              fading ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
            )}
          >
            {messages[messageIndex]}
          </p>
        </div>

        {/* Progress */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Analyzing...</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${mascot.accentColor}, ${mascot.accentColor}80)`,
                boxShadow: `0 0 8px ${mascot.accentColor}40`,
              }}
            />
          </div>
          <p className="text-gray-700 text-xs mt-2 text-center">
            This might sting a little...
          </p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-3">
          {["📸", "🔍", "✍️", "🔥"].map((emoji, i) => {
            const stepProgress = (i + 1) * 25;
            const isActive = progress >= stepProgress - 15;
            const isDone = progress >= stepProgress;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-500",
                    isDone
                      ? "scale-100"
                      : isActive
                      ? "scale-110 animate-bounce-gentle"
                      : "opacity-30"
                  )}
                  style={{
                    backgroundColor: isDone
                      ? `${mascot.accentColor}25`
                      : isActive
                      ? `${mascot.accentColor}15`
                      : "rgba(255,255,255,0.05)",
                    border: `1px solid ${isDone ? mascot.accentColor + "40" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  {isDone ? "✓" : emoji}
                </div>
                <div
                  className="text-xs font-medium"
                  style={{ color: isDone ? mascot.accentColor : "rgba(255,255,255,0.2)" }}
                >
                  {["Scan", "Analyze", "Write", "Roast"][i]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes orbit-0 {
          0% { transform: rotate(0deg) translateX(88px) translateY(-6px); }
          100% { transform: rotate(360deg) translateX(88px) translateY(-6px); }
        }
        @keyframes orbit-1 {
          0% { transform: rotate(120deg) translateX(88px) translateY(-6px); }
          100% { transform: rotate(480deg) translateX(88px) translateY(-6px); }
        }
        @keyframes orbit-2 {
          0% { transform: rotate(240deg) translateX(88px) translateY(-6px); }
          100% { transform: rotate(600deg) translateX(88px) translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
