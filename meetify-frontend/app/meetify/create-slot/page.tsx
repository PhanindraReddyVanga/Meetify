"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../../../lib/auth";


export default function CreateSlot() {
  const router = useRouter();

  // 🔒 Protection logic
  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.push("/auth/login");
    } else if (user.role !== "host") {
      alert("Only hosts can create slots");
      router.push("/meetify/slots");
    }
  }, [router]);

  const [form, setForm] = useState({
    hostId: "",
    title: "",
    description: "",
    price: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/slots`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hostId: form.hostId,
            title: form.title,
            description: form.description,
            price: Number(form.price),
            duration: 30,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setMessage("Slot created successfully! ID: " + data._id);
    } catch {
      setError("Failed to create slot");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-2 text-center">Create Slot</h1>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Create a new session for users to book
      </p>

      <input
        placeholder="Host ID"
        className="border p-2 w-full mb-3 rounded focus:ring-2 focus:ring-black"
        onChange={(e) => setForm({ ...form, hostId: e.target.value })}
      />

      <input
        placeholder="Title"
        className="border p-2 w-full mb-3 rounded focus:ring-2 focus:ring-black"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Description"
        className="border p-2 w-full mb-3 rounded focus:ring-2 focus:ring-black"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        placeholder="Price"
        type="number"
        className="border p-2 w-full mb-4 rounded focus:ring-2 focus:ring-black"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      {message && <p className="text-green-600 mb-3">{message}</p>}
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <button
        onClick={handleCreate}
        disabled={loading}
        className="bg-black text-white px-4 py-2 w-full rounded hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Slot"}
      </button>
    </div>
  );
}
