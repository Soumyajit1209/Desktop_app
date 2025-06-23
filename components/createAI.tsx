"use client";

export default function CreateAI() {
  return (
    <div className="bg-[#2a2a2a] rounded p-3 text-white space-y-4">
      <h2 className="text-lg font-semibold">Choose your AI</h2>

      {/* Scrollable list */}
      <div className="max-h-40 overflow-y-auto space-y-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <button
            key={index}
            className="w-full p-2 bg-[#3a3a3a] rounded hover:bg-[#4a4a4a] text-left"
          >
            Template AI {index + 1}
          </button>
        ))}
      </div>

      {/* Make your custom AI button */}
      <button className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700">
        Make your custom AI
      </button>
    </div>
  );
}
