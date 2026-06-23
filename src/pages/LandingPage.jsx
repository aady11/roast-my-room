import { useState } from "react";
import MascotCard from "../components/MascotCard";
import ImageUploader from "../components/ImageUploader";
import Navbar from "../components/Navbar";
import FloatingParticles from "../components/FloatingParticles";
import { MASCOTS } from "../data/mascots";

const SAMPLE_STATS = [
  { value: "47K+", label: "Rooms Roasted" },
  { value: "4", label: "Brutal Judges" },
  { value: "0%", label: "Mercy Given" },
];

export default function LandingPage({ onStartRoast }) {
  const [selectedMascot, setSelectedMascot] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageSelected = (file, url) => {
    setImageFile(file);
    setImagePreview(url);
  };

  const canRoast = selectedMascot && imageFile;

  const handleRoast = () => {
    if (!canRoast) return;
    const mascot = MASCOTS.find((m) => m.id === selectedMascot);
    onStartRoast(imageFile, mascot);
  };

  const selectedMascotData = MASCOTS.find((m) => m.id === selectedMascot);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <FloatingParticles />

      {/* Gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -left-60 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-60 w-[400px] h-[400px] bg-blue-700/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] bg-pink-700/10 rounded-full blur-3xl" />
      </div>

      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-32 pb-16">

        {/* ===== HERO ===== */}
        <header className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-400 mb-8 hover:bg-white/8 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            AI-powered room judgment • No mercy since 2024
          </div>

          {/* Title */}
          <h1 className="text-7xl sm:text-9xl font-black tracking-tighter leading-none mb-6 select-none">
            <span className="bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
              Roast
            </span>
            <span className="bg-gradient-to-br from-purple-400 via-pink-400 to-red-500 bg-clip-text text-transparent">
              My
            </span>
            <span className="bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
              Room
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl text-gray-400 font-semibold mb-10 leading-snug">
            Your room.{" "}
            <span className="text-white font-bold">Brutally judged.</span>{" "}
            <br className="hidden sm:block" />
            No filter. No mercy. Pure carnage.
          </p>

          {/* Stats */}
          <div className="inline-flex items-center gap-8 sm:gap-12 bg-white/4 border border-white/8 rounded-2xl px-8 py-4 mb-6">
            {SAMPLE_STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
            {["Instant results", "4 unique judges", "Zero mercy", "100% free"].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5 text-sm text-gray-500">
                <span className="text-green-400 text-xs">✓</span>
                {item}
              </span>
            ))}
          </div>
        </header>

        {/* ===== STEP 1: PICK MASCOT ===== */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-sm font-black text-purple-400">
                1
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Choose your judge</h2>
                <p className="text-gray-500 text-sm">Pick the mascot who will destroy your soul</p>
              </div>
            </div>
            {selectedMascot && (
              <span className="ml-auto text-xs text-green-400 font-semibold bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20 flex items-center gap-1.5">
                <span>✓</span> {selectedMascotData?.name} selected
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {MASCOTS.map((mascot) => (
              <MascotCard
                key={mascot.id}
                mascot={mascot}
                selected={selectedMascot === mascot.id}
                onSelect={setSelectedMascot}
              />
            ))}
          </div>
        </section>

        {/* ===== STEP 2: UPLOAD ===== */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-sm font-black text-purple-400">
                2
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Upload your room</h2>
                <p className="text-gray-500 text-sm">Show us what you've done. We'll take it from here.</p>
              </div>
            </div>
            {imagePreview && (
              <span className="ml-auto text-xs text-green-400 font-semibold bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20 flex items-center gap-1.5">
                <span>✓</span> Photo ready
              </span>
            )}
          </div>

          <ImageUploader
            onImageSelected={handleImageSelected}
            preview={imagePreview}
          />

          {imagePreview && (
            <p className="text-center text-gray-600 text-xs mt-3">
              Looking good. Well — the photo quality at least.
            </p>
          )}
        </section>

        {/* ===== CTA ===== */}
        <section className="text-center">
          {/* Status checklist */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-white/4 border border-white/8 rounded-2xl px-8 py-4 mb-8">
            <div className={`flex items-center gap-2 text-sm ${selectedMascot ? "text-green-400" : "text-gray-600"}`}>
              <span>{selectedMascot ? "✓" : "○"}</span>
              Judge selected
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className={`flex items-center gap-2 text-sm ${imageFile ? "text-green-400" : "text-gray-600"}`}>
              <span>{imageFile ? "✓" : "○"}</span>
              Room uploaded
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className={`flex items-center gap-2 text-sm ${canRoast ? "text-red-400" : "text-gray-600"}`}>
              <span>{canRoast ? "🔥" : "○"}</span>
              Ready to roast
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleRoast}
              disabled={!canRoast}
              className={`
                relative group inline-flex items-center gap-3 px-12 py-5 rounded-2xl font-black text-xl
                transition-all duration-300 overflow-hidden select-none
                ${
                  canRoast
                    ? "bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 cursor-pointer active:scale-100"
                    : "bg-white/8 text-gray-600 border border-white/10 cursor-not-allowed"
                }
              `}
            >
              {canRoast && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)" }} />
                </>
              )}
              <span className="text-2xl">🔥</span>
              <span>
                {!selectedMascot && !imageFile
                  ? "Select a judge & upload a photo"
                  : !selectedMascot
                  ? "Pick a judge first"
                  : !imageFile
                  ? "Upload your room photo"
                  : `Let ${selectedMascotData?.name} Judge Me`}
              </span>
            </button>

            {canRoast && (
              <p className="text-gray-600 text-sm animate-fade-in-up">
                ⚠️ Warning: {selectedMascotData?.name} will not hold back. Emotional preparation recommended.
              </p>
            )}
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="mt-24">
          <h2 className="text-center text-3xl font-black text-white mb-2">How it works</h2>
          <p className="text-center text-gray-500 mb-10">Three steps to emotional damage</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                emoji: "🧑‍⚖️",
                title: "Choose Your Judge",
                desc: "Pick from 4 unique AI mascots, each with their own devastating personality.",
              },
              {
                step: "02",
                emoji: "📸",
                title: "Upload Your Room",
                desc: "Drag, drop, or click to upload. JPEG, PNG, WEBP — we don't discriminate.",
              },
              {
                step: "03",
                emoji: "💀",
                title: "Receive Judgment",
                desc: "Get your Drip Score, roast lines, and a survival guide. You'll need it.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-white/4 border border-white/8 hover:bg-white/6 transition-colors group"
              >
                <div className="text-gray-800 font-black text-5xl absolute top-4 right-4 select-none">
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SAMPLE SCORES ===== */}
        <section className="mt-16 p-8 rounded-3xl bg-white/3 border border-white/8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-1">Sample Verdict</h2>
            <p className="text-gray-500 text-sm">A recent victim's results</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { label: "Drip Score", value: "34", emoji: "💧", sub: "Send Help" },
              { label: "Cleanliness", value: "22", emoji: "🧹", sub: "Criminal" },
              { label: "Vibe", value: "61", emoji: "✨", sub: "Mediocre" },
              { label: "Red Flags", value: "87", emoji: "🚩", sub: "Run Away" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/4 border border-white/8">
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-3xl font-black text-white">{item.value}</div>
                <div className="text-xs text-gray-400 mt-1">{item.label}</div>
                <div className="text-xs text-red-400 font-semibold mt-1">{item.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-xs mt-6 italic">
            "I've seen landfills with better feng shui. At least they have zones." — Room Goblin
          </p>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="text-center mt-16 pb-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-2xl">🔥</span>
            <span className="text-white font-black text-lg">RoastMyRoom</span>
          </div>
          <p className="text-gray-700 text-sm">Made for rooms that deserve to be called out.</p>
          <p className="text-gray-800 text-xs mt-2">No rooms were permanently damaged in the making of this roast.</p>
        </footer>
      </div>
    </div>
  );
}
