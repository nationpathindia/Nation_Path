import { Radio } from "lucide-react";

interface Props {
  status: string;
}

export default function LiveStatusBadge({ status }: Props) {
  const isLive = status === "live";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
        isLive
          ? "bg-red-600 text-white"
          : "bg-slate-100 text-slate-700"
      }`}
    >
      <Radio className="h-3.5 w-3.5" />
      {isLive ? "LIVE" : status}
    </span>
  );
}