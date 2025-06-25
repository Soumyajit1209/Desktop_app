"use client";

import { useState } from "react";
import Popup from "@/components/Popup";

export default function CreateAI() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="space-y-4">
      <div className="bg-[#2a2a2a] rounded p-4 space-y-4">
        <h2 className="text-lg font-bold text-white">Choose your AI</h2>

        {/* Scrollable Template AI List */}
        <div className="max-h-40 overflow-y-auto space-y-2 hide-scrollbar">
          {Array.from({ length: 8 }).map((_, index) => (
            <button
              key={index}
              className="w-full p-2 bg-[#3a3a3a] rounded hover:bg-[#4a4a4a] text-left text-white"
            >
              Template AI {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Make Your Custom AI Button */}
      <button
        className="w-full p-4 bg-blue-600 rounded hover:bg-blue-700 text-white text-lg"
        onClick={() => setShowPopup(true)}
      >
        Make your custom AI
      </button>

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
