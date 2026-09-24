import Image from "next/image";
import Link from "next/link";
import LiveStatusBadge from "./LiveStatusBadge";

interface LiveEvent {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  segment: string;
  status: string;
  coverImage?: string | null;
  coverImageAlt?: string | null;
  updateCount?: number;
  lastUpdateAt?: string | Date | null;
  isFeatured?: boolean;
}

interface Props {
  event: LiveEvent;
}

function formatDate(value?: string | Date | null) {
  if (!value) return "Awaiting updates";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Awaiting updates";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function LiveEventCard({ event }: Props) {
  return (
    <Link
      href={`/live/${event.slug}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      {event.coverImage ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
          <Image
            src={event.coverImage}
            alt={event.coverImageAlt || event.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          <div className="absolute left-3 top-3">
            <LiveStatusBadge status={event.status} />
          </div>
        </div>
      ) : (
        <div className="relative flex aspect-[16/9] items-center justify-center bg-slate-100">
          <LiveStatusBadge status={event.status} />
        </div>
      )}

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EA661B]">
            {event.segment}
          </span>

          <span className="text-xs text-slate-500">
            {event.updateCount ?? 0} updates
          </span>
        </div>

        <h2 className="line-clamp-2 text-xl font-bold leading-tight text-slate-900 group-hover:text-[#163C80]">
          {event.title}
        </h2>

        {event.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {event.description}
          </p>
        )}

        <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
          Last updated: {formatDate(event.lastUpdateAt)}
        </div>
      </div>
    </Link>
  );
}