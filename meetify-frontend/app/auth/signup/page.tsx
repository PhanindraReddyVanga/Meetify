"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      router.push("/auth/login");
    } catch {
      setError("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-3 rounded"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        className="border p-2 w-full mb-3 rounded"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        className="border p-2 w-full mb-3 rounded"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        className="border p-2 w-full mb-4 rounded"
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="user">User</option>
        <option value="host">Host</option>
      </select>


      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button
        onClick={handleSignup}
        disabled={loading}
        className="bg-black text-white px-4 py-2 w-full rounded"
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>
    </div>
  );
}
