"use client";

import { useRouter } from "next/navigation";

export default function AdActions({ adId }: { adId: string }) {
  const router = useRouter();

  const handlePause = async () => {
    await fetch("/api/admin/ads/pause", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adId }),
    });

    router.refresh();
  };

  const handleDelete = async () => {
    await fetch("/api/admin/ads/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adId }),
    });

    router.refresh();
  };

  return (
    <div className="space-x-3">
      <a
        href={`/admin/ads/${adId}/edit`}
        className="text-blue-400 hover:underline"
      >
        Edit
      </a>

      <button
        onClick={handlePause}
        className="text-yellow-400 hover:underline"
      >
        Pause
      </button>

      <button
        onClick={handleDelete}
        className="text-red-400 hover:underline"
      >
        Delete
      </button>
    </div>
  );
}