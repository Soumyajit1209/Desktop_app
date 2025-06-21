// app/chat/page.tsx
'use client';

export default function ChatPage() {
  return (
    <>
      <div className="space-y-6">
        <button className="w-full py-4 bg-[#2a2a2a] text-2xl rounded">Add Life To Your Clone</button>
        <button className="w-full py-4 bg-[#2a2a2a] text-2xl rounded">Synthetic AI</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {[1, 2, 3].map(preset => (
          <div key={preset} className="bg-[#2a2a2a] p-4 rounded text-center space-y-3">
            <h2 className="text-lg">Preset {preset}</h2>
            <button className="w-full py-2 bg-black border border-white rounded">Start Chat</button>
            {(preset !== 2 || true) && (
              <button className="w-full py-2 bg-black border border-white rounded">Add Life</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
