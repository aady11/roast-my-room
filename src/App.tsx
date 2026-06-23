/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
// @ts-expect-error js module
import LandingPage from "./pages/LandingPage";
// @ts-expect-error js module
import LoadingPage from "./pages/LoadingPage";
// @ts-expect-error js module
import ResultsPage from "./pages/ResultsPage";
// @ts-expect-error js module
import { generateRoast } from "./utils/roastEngine";

type AppState = "landing" | "loading" | "results";

export default function App() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [selectedMascot, setSelectedMascot] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);

  const handleStartRoast = async (imageFile: File, mascot: any) => {
    setSelectedMascot(mascot);
    setImagePreview(URL.createObjectURL(imageFile));
    setAppState("loading");

    try {
      const roastResult = await generateRoast(imageFile, mascot.id);
      setResults(roastResult);
      setAppState("results");
    } catch (err) {
      console.error("Roast generation failed:", err);
      setAppState("landing");
    }
  };

  const handleRoastAnother = () => {
    setAppState("landing");
    setSelectedMascot(null);
    setImagePreview(null);
    setResults(null);
  };

  return (
    <>
      {appState === "landing" && (
        <LandingPage onStartRoast={handleStartRoast} />
      )}
      {appState === "loading" && selectedMascot && (
        <LoadingPage mascot={selectedMascot} />
      )}
      {appState === "results" && results && selectedMascot && imagePreview && (
        <ResultsPage
          results={results}
          mascot={selectedMascot}
          imagePreview={imagePreview}
          onRoastAnother={handleRoastAnother}
        />
      )}
    </>
  );
}
