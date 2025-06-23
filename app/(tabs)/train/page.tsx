'use client';

import { useState } from 'react';

export default function TrainPage() {
  const [messages, setMessages] = useState<{ text: string; type: 'user' | 'bot' }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { text: userMessage, type: 'user' }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      const botReply = data?.reply || 'dummy response';

      setMessages((prev) => [...prev, { text: botReply, type: 'bot' }]);
    } catch (error) {
      console.error('API error:', error);
      setMessages((prev) => [...prev, { text: 'dummy response', type: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-[#1a1a1a] rounded">
        {messages.length === 0 ? (
          <div className="text-gray-500 text-center mt-10">No messages yet</div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-3 rounded max-w-xs ${
                  msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-[#2a2a2a] text-white'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#2a2a2a] text-white p-3 rounded max-w-xs animate-pulse">
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="mt-4 flex space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 p-3 bg-[#2a2a2a] text-white rounded"
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="px-4 bg-blue-600 rounded text-white"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
