import { useRef, useState, useCallback } from "react";
import { cn } from "./utils";

export default function ImageUploader({ onImageSelected, preview }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file) => {
      if (!file || !file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      onImageSelected(file, url);
    },
    [onImageSelected]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  if (preview) {
    return (
      <div className="relative group rounded-2xl overflow-hidden border-2 border-white/20 bg-black/40">
        <img
          src={preview}
          alt="Room preview"
          className="w-full max-h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => inputRef.current?.click()}
            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-white/30 transition-all"
          >
            Change Photo
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300",
        "flex flex-col items-center justify-center gap-4 py-14 px-6",
        isDragging
          ? "border-purple-400 bg-purple-500/10 scale-[1.01]"
          : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/8"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      <div
        className={cn(
          "w-20 h-20 rounded-2xl flex items-center justify-center text-4xl transition-all duration-300",
          isDragging ? "bg-purple-500/20 scale-110" : "bg-white/10"
        )}
      >
        {isDragging ? "⬇️" : "📸"}
      </div>

      <div className="text-center">
        <p className="text-white font-semibold text-lg">
          {isDragging ? "Drop it like it's hot" : "Drop your room photo here"}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          or <span className="text-purple-400 underline underline-offset-2">click to browse</span>
        </p>
        <p className="text-gray-600 text-xs mt-3">
          Supports JPG, PNG, WEBP — Max 20MB
        </p>
      </div>
    </div>
  );
}
