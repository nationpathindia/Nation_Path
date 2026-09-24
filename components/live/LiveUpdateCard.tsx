import Image from "next/image";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Pin,
  ShieldCheck,
} from "lucide-react";

interface Props {
  update: any;
}

function formatTime(value?: string | Date | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function verificationLabel(status?: string) {
  switch (status) {
    case "verified":
      return "Verified";
    case "partially_verified":
      return "Partially Verified";
    case "under_review":
      return "Under Review";
    case "correction_required":
      return "Correction Required";
    default:
      return "Unverified";
  }
}

export default function LiveUpdateCard({ update }: Props) {
  const isBreaking =
    update.isBreaking ||
    update.type === "breaking" ||
    update.type === "alert";

  const isPinned = update.isPinned;

  return (
    <article
      className={`relative rounded-2xl border bg-white p-5 shadow-sm ${
        isBreaking
          ? "border-red-200 ring-1 ring-red-100"
          : isPinned
            ? "border-amber-200"
            : "border-slate-200"
      }`}
    >
      {isBreaking && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
          <AlertTriangle className="h-3.5 w-3.5" />
          Breaking Update
        </div>
      )}

      {isPinned && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
          <Pin className="h-3.5 w-3.5" />
          Pinned Update
        </div>
      )}

      <div className="flex gap-4">
        <div className="hidden w-20 shrink-0 text-right sm:block">
          <div className="text-sm font-bold text-slate-900">
            {update.publishedAt
              ? new Date(update.publishedAt).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
              : "--:--"}
          </div>

          <div className="mt-1 text-xs text-slate-500">
            {update.publishedAt
              ? new Date(update.publishedAt).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                  }
                )
              : ""}
          </div>
        </div>

        <div className="relative min-w-0 flex-1">
          <div className="absolute -left-[29px] top-1 hidden h-3 w-3 rounded-full border-2 border-white bg-[#163C80] shadow sm:block" />

          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
              {update.type || "update"}
            </span>

            {update.verificationStatus && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                {update.verificationStatus === "verified" ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                ) : update.verificationStatus ===
                  "under_review" ? (
                  <Clock3 className="h-3.5 w-3.5 text-amber-600" />
                ) : (
                  <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
                )}

                {verificationLabel(
                  update.verificationStatus
                )}
              </span>
            )}
          </div>

          <div className="mb-3 sm:hidden">
            <span className="text-xs font-semibold text-slate-500">
              {formatTime(update.publishedAt)}
            </span>
          </div>

          {update.headline && (
            <h3 className="text-lg font-bold leading-snug text-slate-950">
              {update.headline}
            </h3>
          )}

          {update.content && (
            <div className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700 sm:text-[15px]">
              {update.content}
            </div>
          )}

          {update.image && (
            <div className="relative mt-4 aspect-video overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={update.image}
                alt={update.headline || "Live update"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
            {update.sourceName && (
              <span className="font-semibold text-slate-700">
                Source: {update.sourceName}
              </span>
            )}

            {update.sourceUrl && (
              <a
                href={update.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#163C80] hover:underline"
              >
                View source
              </a>
            )}

            {update.author?.name && (
              <span>
                By {update.author.name}
              </span>
            )}

            <span>
              {formatTime(update.publishedAt)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}