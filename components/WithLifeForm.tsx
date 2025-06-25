"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function WithLifeForm({ goBack }: { goBack: () => void }) {
  const [formData, setFormData] = useState({
    characterName: "",
    characterRole: "",
    lifeSpan: "",
    aiPersonality: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAutoAssign = async () => {
    try {
      const res = await fetch("/api/auto-assign");
      const data = await res.json();

      setFormData((prev) => ({
        characterName: prev.characterName || data.characterName || "Dummy Value",
        characterRole: prev.characterRole || data.characterRole || "Dummy Value",
        lifeSpan: prev.lifeSpan || data.lifeSpan || "Dummy Value",
        aiPersonality: prev.aiPersonality || data.aiPersonality || "Dummy Value",
      }));
    } catch (error) {
      console.error("Error fetching auto-assign data:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={goBack} className="text-gray-400 hover:text-white">
          <ArrowLeft />
        </button>
        <h2 className="text-lg font-bold">Create AI With Life</h2>
      </div>

      <div className="flex gap-4">
        {/* Character Column */}
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold mb-2">Character</h3>
          <input
            name="characterName"
            type="text"
            placeholder="Character Name"
            value={formData.characterName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#3a3a3a] text-white"
          />
          <input
            name="characterRole"
            type="text"
            placeholder="Character Role"
            value={formData.characterRole}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#3a3a3a] text-white"
          />
        </div>

        {/* Life Info Column */}
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold mb-2">Life Info</h3>
          <input
            name="lifeSpan"
            type="text"
            placeholder="Life Span"
            value={formData.lifeSpan}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#3a3a3a] text-white"
          />
          <input
            name="aiPersonality"
            type="text"
            placeholder="AI Personality"
            value={formData.aiPersonality}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#3a3a3a] text-white"
          />
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={handleAutoAssign}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 text-white"
        >
          Auto Assign Values
        </button>
        <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white">
          Submit
        </button>
      </div>
    </div>
  );
}
