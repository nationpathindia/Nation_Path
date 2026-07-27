"use client";

import { useEffect } from "react";

export default function LiveBreakingListener({
  onUpdate,
}: {
  onUpdate: (data: any) => void;
}) {
  useEffect(() => {
    const eventSource = new EventSource("/api/breaking/stream");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onUpdate(data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return null;
}