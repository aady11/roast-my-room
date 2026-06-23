export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🔥</span>
        <span className="text-white font-black text-lg tracking-tight">
          Roast<span className="text-purple-400">My</span>Room
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        AI Judge Online
      </div>
    </nav>
  );
}
