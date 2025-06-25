"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface WithoutLifeFormProps {
  goBack: () => void;
}

export default function WithoutLifeForm({ goBack }: WithoutLifeFormProps) {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const autoAssign = async () => {
    try {
      const res = await fetch("/api/auto-assign");
      const data = await res.json();

      setFormData((prev) => ({
        field1: prev.field1 || data.characterName || "dummy value",
        field2: prev.field2 || data.characterRole || "dummy value",
        field3: prev.field3 || data.lifeSpan || "dummy value",
        field4: prev.field4 || data.aiPersonality || "dummy value",
      }));
    } catch {
      setFormData((prev) => ({
        field1: prev.field1 || "dummy value",
        field2: prev.field2 || "dummy value",
        field3: prev.field3 || "dummy value",
        field4: prev.field4 || "dummy value",
      }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={goBack} className="text-gray-400 hover:text-white">
          <ArrowLeft />
        </button>
        <h2 className="text-lg font-bold">Create AI Without Life</h2>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <input
            name="field1"
            value={formData.field1}
            onChange={handleChange}
            type="text"
            placeholder="Field 1"
            className="w-full p-2 rounded bg-[#3a3a3a] text-white"
          />
          <input
            name="field2"
            value={formData.field2}
            onChange={handleChange}
            type="text"
            placeholder="Field 2"
            className="w-full p-2 rounded bg-[#3a3a3a] text-white"
          />
        </div>

        <div className="flex-1 space-y-2">
          <input
            name="field3"
            value={formData.field3}
            onChange={handleChange}
            type="text"
            placeholder="Field 3"
            className="w-full p-2 rounded bg-[#3a3a3a] text-white"
          />
          <input
            name="field4"
            value={formData.field4}
            onChange={handleChange}
            type="text"
            placeholder="Field 4"
            className="w-full p-2 rounded bg-[#3a3a3a] text-white"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={autoAssign}
          className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700 text-white"
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
