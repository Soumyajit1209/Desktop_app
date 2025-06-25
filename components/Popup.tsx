"use client";

import { useRef, useState } from "react";
import WithLifeForm from "./WithLifeForm";
import WithoutLifeForm from "./WithoutLifeForm";

interface PopupProps {
  onClose: () => void;
}

export default function Popup({ onClose }: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<"main" | "withLife" | "withoutLife">("main");

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={popupRef}
        className="relative bg-[#2a2a2a] p-6 rounded space-y-4 w-[600px] text-white"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-3 text-gray-400 hover:text-white text-xl"
        >
          ×
        </button>

        {step === "main" && (
          <>
            <h2 className="text-lg font-bold mb-4 text-center">Create Your AI</h2>

            <div className="space-y-2">
              <button
                className="w-full p-3 bg-green-600 rounded hover:bg-green-700 text-white"
                onClick={() => setStep("withLife")}
              >
                With Life
              </button>
              <button
                className="w-full p-3 bg-red-600 rounded hover:bg-red-700 text-white"
                onClick={() => setStep("withoutLife")}
              >
                Without Life
              </button>
            </div>
          </>
        )}

        {step === "withLife" && <WithLifeForm goBack={() => setStep("main")} />}
        {step === "withoutLife" && <WithoutLifeForm goBack={() => setStep("main")} />}
      </div>
    </div>
  );
}
