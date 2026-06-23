import { useEffect, useState } from "react";
import ScoreBar from "../components/ScoreBar";
import DripScoreRing from "../components/DripScoreRing";
import RoastCard from "../components/RoastCard";
import Navbar from "../components/Navbar";
import { cn } from "../components/utils";

export default function ResultsPage({ results, mascot, imagePreview, onRoastAnother }) {
  const [visible, setVisible] = useState(false);
  const [shareMsg, setShareMsg] = useState("Share My Roast");

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => clearTimeout(timer);
  }, []);

  const { dripScore, style, cleanliness, vibe, hustleEnergy, redFlags, roasts, compliment, fix } = results;

  function getVerdictData(score) {
    if (score >= 80) return { text: "Actually impressive.", sub: "Did not expect this.", emoji: "🏆", color: "#10b981" };
    if (score >= 65) return { text: "Not bad, honestly.", sub: "Room has some drip.", emoji: "✨", color: "#f59e0b" };
    if (score >= 50) return { text: "Middling at best.", sub: "Could be worse. Barely.", emoji: "😐", color: "#f97316" };
    if (score >= 35) return { text: "This room is a cry for help.", sub: "We've contacted the authorities.", emoji: "🚨", color: "#ef4444" };
    return { text: "We need to talk.", sub: "Like, right now.", emoji: "💀", color: "#dc2626" };
  }

  const verdict = getVerdictData(dripScore);

  const handleShare = () => {
    const text = `My room just got absolutely destroyed\n\nDrip Score: ${dripScore}/100\nStyle: "${style}"\nJudge: ${mascot.name} ${mascot.emoji}\n\n"${roasts[0]}"\n\nRoast yours at RoastMyRoom`;
    if (navigator.share) {
      navigator.share({ title: "RoastMyRoom Results", text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text)
        .then(() => {
          setShareMsg("Copied to clipboard!");
          setTimeout(() => setShareMsg("Share My Roast"), 2000);
        })
        .catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-60 right-0 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: mascot.accentColor }}
        />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-700/10 rounded-full blur-3xl" />
      </div>

      <Navbar />

      <div
        className={cn(
          "relative z-10 max-w-3xl mx-auto px-4 pt-28 transition-all duration-700",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-400 mb-5">
            <span>🔥</span>
            The verdict is in
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-3">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Roast</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Complete</span>
          </h1>
          <p className="text-gray-500">
            Judged without mercy by{" "}
            <span className="font-bold" style={{ color: mascot.accentColor }}>
              {mascot.emoji} {mascot.name}
            </span>
          </p>
        </div>

        {/* Verdict Banner */}
        <div
          className="rounded-3xl p-6 mb-8 text-center border"
          style={{
            background: `linear-gradient(135deg, ${verdict.color}12, ${verdict.color}06)`,
            borderColor: `${verdict.color}25`,
          }}
        >
          <div className="text-5xl mb-3">{verdict.emoji}</div>
          <div className="text-white font-black text-2xl sm:text-3xl mb-1">{verdict.text}</div>
          <div className="text-gray-400 text-sm">{verdict.sub}</div>
        </div>

        {/* Image + Drip Score */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-8">
          <div className="sm:col-span-3 rounded-2xl overflow-hidden border border-white/10 bg-black/40">
            <div className="relative">
              <img src={imagePreview} alt="Your room" className="w-full h-64 sm:h-72 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span
                  className="text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wide"
                  style={{ backgroundColor: `${mascot.accentColor}20`, color: mascot.accentColor, border: `1px solid ${mascot.accentColor}30` }}
                >
                  {style}
                </span>
              </div>
            </div>
          </div>
          <div
            className="sm:col-span-2 rounded-2xl border bg-white/4 flex flex-col items-center justify-center p-6 gap-4"
            style={{ borderColor: `${mascot.accentColor}25` }}
          >
            <DripScoreRing score={dripScore} mascot={mascot} />
            <div className="text-center">
              <div className="text-xs text-gray-600 uppercase tracking-widest mb-1">Style Class</div>
              <div
                className="text-xs font-bold px-3 py-1 rounded-full border"
                style={{ color: mascot.accentColor, borderColor: `${mascot.accentColor}30`, backgroundColor: `${mascot.accentColor}10` }}
              >
                {style}
              </div>
            </div>
          </div>
        </div>

        {/* Mascot Banner */}
        <div
          className="rounded-2xl border p-5 mb-8 flex items-center gap-4"
          style={{ background: `linear-gradient(135deg, ${mascot.accentColor}08, transparent)`, borderColor: `${mascot.accentColor}25` }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 animate-bounce-gentle"
            style={{ backgroundColor: `${mascot.accentColor}15` }}
          >
            {mascot.emoji}
          </div>
          <div className="flex-1">
            <div className="font-black text-lg text-white flex items-center gap-2 flex-wrap">
              {mascot.name}
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide"
                style={{ color: mascot.accentColor, backgroundColor: `${mascot.accentColor}15` }}
              >
                {mascot.tagline}
              </span>
            </div>
            <div className="text-gray-500 text-sm mt-0.5">{mascot.description}</div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white/4 border border-white/8 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-black text-xl mb-6 flex items-center gap-2">
            <span>📊</span> Room Breakdown
          </h2>
          <div className="flex flex-col gap-5">
            <ScoreBar label="Cleanliness" score={cleanliness} emoji="🧹" delay={200} />
            <ScoreBar label="Vibe" score={vibe} emoji="✨" delay={350} />
            <ScoreBar label="Hustle Energy" score={hustleEnergy} emoji="💪" delay={500} />
            <ScoreBar label="Red Flags" score={redFlags} emoji="🚩" delay={650} />
          </div>
          <div className="mt-6 pt-5 border-t border-white/8 grid grid-cols-4 gap-3">
            {[
              { label: "Clean", value: cleanliness },
              { label: "Vibe", value: vibe },
              { label: "Hustle", value: hustleEnergy },
              { label: "Red Flags", value: redFlags },
            ].map((item, i) => {
              const color = item.value >= 70 ? "#10b981" : item.value >= 50 ? "#f59e0b" : item.value >= 30 ? "#f97316" : "#ef4444";
              return (
                <div key={i} className="text-center p-3 rounded-xl bg-white/4">
                  <div className="text-2xl font-black" style={{ color }}>{item.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Roast Lines */}
        <div className="mb-8">
          <h2 className="text-white font-black text-xl mb-5 flex items-center gap-2">
            <span>🔥</span> The Roast
          </h2>
          <div className="flex flex-col gap-3">
            {roasts.map((roast, i) => (
              <RoastCard key={i} text={roast} index={i} mascot={mascot} />
            ))}
          </div>
        </div>

        {/* Compliment + Fix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div
            className="rounded-2xl p-6 border animate-fade-in-up"
            style={{ animationDelay: "600ms", animationFillMode: "both", backgroundColor: "#10b98110", borderColor: "#10b98120" }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-xl">💚</div>
              <div>
                <div className="text-emerald-400 font-bold">One Good Thing</div>
                <div className="text-gray-600 text-xs">Yes, we found one</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{compliment}</p>
          </div>
          <div
            className="rounded-2xl p-6 border animate-fade-in-up"
            style={{ animationDelay: "750ms", animationFillMode: "both", backgroundColor: "#f59e0b10", borderColor: "#f59e0b20" }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl">🛠️</div>
              <div>
                <div className="text-amber-400 font-bold">The Fix</div>
                <div className="text-gray-600 text-xs">Start here, immediately</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{fix}</p>
          </div>
        </div>

        {/* Summary Card */}
        <div
          className="rounded-3xl p-8 mb-10 border text-center"
          style={{
            background: `linear-gradient(135deg, ${mascot.accentColor}10, ${mascot.accentColor}04)`,
            borderColor: `${mascot.accentColor}20`,
          }}
        >
          <div className="text-6xl mb-4">{verdict.emoji}</div>
          <div className="text-3xl font-black text-white mb-2">{verdict.text}</div>
          <div className="text-gray-400 mb-6">{verdict.sub}</div>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="text-4xl font-black text-white">{dripScore}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Drip Score</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="font-bold text-lg" style={{ color: mascot.accentColor }}>{style}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Style Class</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-lg font-bold text-white">{mascot.emoji} {mascot.name}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Your Judge</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onRoastAnother}
            className="flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
          >
            <span>🔄</span>
            Roast Another Room
          </button>
          <button
            onClick={handleShare}
            className="flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-lg bg-white/8 border border-white/15 text-white hover:bg-white/12 transition-all duration-300"
          >
            <span>📤</span>
            {shareMsg}
          </button>
        </div>

        <div className="mt-8 p-5 rounded-2xl bg-white/3 border border-white/6 text-center">
          <p className="text-gray-500 text-sm">
            Think your friend's room is worse?{" "}
            <button
              onClick={onRoastAnother}
              className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-2 transition-colors"
            >
              Submit theirs.
            </button>{" "}
            🫡
          </p>
        </div>

        <p className="text-center text-gray-800 text-xs mt-10">
          RoastMyRoom — No rooms were permanently damaged. Emotionally? Different story.
        </p>
      </div>
    </div>
  );
}
