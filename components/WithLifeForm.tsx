"use client";

import { ArrowLeft } from "lucide-react";

export default function WithLifeForm({ goBack }: { goBack: () => void }) {
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
            type="text"
            placeholder="Character Name"
            className="w-full p-2 rounded bg-[#3a3a3a] text-white"
          />
          <input
            type="text"
            placeholder="Character Role"
            className="w-full p-2 rounded bg-[#3a3a3a] text-white"
          />
        </div>

        {/* Life Info Column */}
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold mb-2">Life Info</h3>
          <input
            type="text"
            placeholder="Life Span"
            className="w-full p-2 rounded bg-[#3a3a3a] text-white"
          />
          <input
            type="text"
            placeholder="AI Personality"
            className="w-full p-2 rounded bg-[#3a3a3a] text-white"
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white">
          Submit
        </button>
      </div>
    </div>
  );
}
