"use client";

import { useEffect, useState } from "react";

export default function LiveBreakingListener({
  onUpdate,
}: {
  onUpdate: (data: any) => void;
}) {
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    const eventSource = new EventSource("/api/breaking/stream");

    eventSource.onopen = () => {
      setStatus("live");
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data?.id) {
          onUpdate(data);
        }
      } catch {}
    };

    eventSource.onerror = () => {
      setStatus("reconnecting");
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return null;
}