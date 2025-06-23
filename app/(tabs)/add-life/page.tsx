'use client';

export default function AddLifePage() {
  return (
    <div className="space-y-4 max-w-md mx-auto">
      {Array.from({ length: 4 }).map((_, idx) => (
        <input
          key={idx}
          className="w-full p-2 bg-[#2a2a2a] text-white rounded"
          placeholder={`Input ${idx + 1}`}
        />
      ))}

      <button className="w-full mt-4 py-2 bg-blue-600 rounded">Edit</button>
    </div>
  );
}
