import Link from "next/link";

interface Props {
  active?: string;
}

const segments = [
  { label: "All Live", slug: "live" },
  { label: "Sports", slug: "sports" },
  { label: "India", slug: "india" },
  { label: "World", slug: "world" },
  { label: "Business", slug: "business" },
  { label: "Breaking / Special", slug: "breaking" },
];

export default function LiveSegmentTabs({
  active = "live",
}: Props) {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-2 border-b border-slate-200 pb-3">
        {segments.map((segment) => {
          const selected = active === segment.slug;

          return (
            <Link
              key={segment.slug}
              href={`/live/${segment.slug === "live" ? "" : segment.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selected
                  ? "bg-[#163C80] text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {segment.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}