"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SlotsPage() {
  const [hostId, setHostId] = useState("");
  const [slots, setSlots] = useState<any[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchSlots = async () => {
    setError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/slots/host/${hostId}`
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setSlots(data);
    } catch {
      setError("Failed to fetch slots");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Available Slots</h1>

      <input
        placeholder="Enter Host ID"
        className="border p-2 w-full mb-3 rounded focus:ring-2 focus:ring-black"
        onChange={(e) => setHostId(e.target.value)}
      />

      <button
        onClick={fetchSlots}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition mb-4"
      >
        Load Slots
      </button>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      {slots.map((slot) => (
        <div key={slot._id} className="border p-4 mb-3 rounded">
          <h2 className="font-bold">{slot.title}</h2>
          <p>{slot.description}</p>
          <p className="mb-2">₹{slot.price}</p>

          <button
            onClick={() => router.push(`/meetify/book/${slot._id}`)}
            className="text-blue-600 underline"
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}
