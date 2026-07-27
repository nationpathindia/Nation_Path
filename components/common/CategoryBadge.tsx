import Link from "next/link";

interface CategoryBadgeProps {
  name: string;
  slug?: string;
}

export default function CategoryBadge({
  name,
  slug,
}: CategoryBadgeProps) {
  if (!name) return null;

  return (
    <Link
      href={slug ? `/${slug}` : "#"}
      className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wider text-[#0b2a6f] hover:underline"
    >
      {name}
    </Link>
  );
}