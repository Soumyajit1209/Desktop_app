"use client";

export default function WithLifeForm({ goBack }: { goBack: () => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold mb-4 text-center">Create AI With Life</h2>

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

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 text-white"
          onClick={goBack}
        >
          Back
        </button>
        <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white">
          Submit
        </button>
      </div>
    </div>
  );
}
