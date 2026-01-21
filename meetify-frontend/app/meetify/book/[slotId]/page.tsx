"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "../../../../lib/auth";


export default function BookSlot() {
  const params = useParams();
  const router = useRouter();

  const [slotId, setSlotId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔒 Protection: user must be logged in
  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.push("/auth/login");
    }
  }, [router]);

  // Extract slotId safely
  useEffect(() => {
    if (params?.slotId) {
      const id = Array.isArray(params.slotId)
        ? params.slotId[0]
        : params.slotId;
      setSlotId(id);
    }
  }, [params]);

  const handleBook = async () => {
    if (!slotId) {
      alert("Slot ID missing. Please go back and try again.");
      return;
    }

    try {
      setLoading(true);

      // 1. Create booking
      const bookingRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slotId,
            userId: "frontend-user",
          }),
        }
      );

      if (!bookingRes.ok) {
        throw new Error("Failed to create booking");
      }

      const booking = await bookingRes.json();

      // 2. Create Stripe session
      const paymentRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/create-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId: booking._id }),
        }
      );

      if (!paymentRes.ok) {
        throw new Error("Failed to create payment session");
      }

      const data = await paymentRes.json();

      if (!data.url) {
        throw new Error("Stripe URL missing");
      }

      // 3. Redirect to Stripe
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Confirm Booking</h1>

      {!slotId ? (
        <p className="text-gray-500">Loading slot...</p>
      ) : (
        <>
          <p className="mb-4">Slot ID: {slotId}</p>

          <button
            onClick={handleBook}
            disabled={loading}
            className="bg-black text-white px-4 py-2 w-full rounded hover:bg-gray-800 transition"
          >
            {loading ? "Processing..." : "Pay & Book with Stripe"}
          </button>
        </>
      )}
    </div>
  );
}
