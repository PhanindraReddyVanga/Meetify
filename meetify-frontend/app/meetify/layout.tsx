"use client";

import { logout, getUser } from "../../lib/auth";

export default function MeetifyLayout({ children }: { children: React.ReactNode }) {
  const user = getUser();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white p-4 flex justify-between">
        <span className="font-bold">Meetify</span>

        {user && (
          <button
            onClick={logout}
            className="text-sm bg-white text-black px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}


