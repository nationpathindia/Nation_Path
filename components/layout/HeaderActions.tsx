import Link from "next/link";
import {
  Search,
  Newspaper,
  User,
} from "lucide-react";

export default function HeaderActions() {
  return (

    <div className="flex items-center gap-5 text-sm">

      <Link
        href="/search"
        className="flex items-center gap-1 hover:text-[#0b2a6f] transition"
      >
        <Search size={16} />
        <span className="hidden md:inline">
          Search
        </span>
      </Link>

      <Link
        href="/epaper"
        className="flex items-center gap-1 hover:text-[#0b2a6f] transition"
      >
        <Newspaper size={16} />
        <span className="hidden md:inline">
          E-Magazine
        </span>
      </Link>

      <Link
        href="/login"
        className="flex items-center gap-1 bg-[#0b2a6f] text-white px-3 py-1.5 rounded-md hover:bg-[#143b8a] transition"
      >
        <User size={15} />
        Login
      </Link>

    </div>

  );
}