"use client";

import { useState } from "react";

export default function RegisterHost() {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    role: "expert",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/host/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      setMessage("Host registered successfully! ID: " + data._id);
    } catch (err) {
      setError("Failed to register host. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-2 text-center">
        Become a Meetify Host
      </h1>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Register to start offering sessions
      </p>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Bio"
        className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
      />

      <select
        className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-black"
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="expert">Expert</option>
        <option value="creator">Creator</option>
        <option value="event">Event Host</option>
      </select>

      {message && <p className="text-green-600 mb-3">{message}</p>}
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-4 py-2 w-full rounded hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
}
