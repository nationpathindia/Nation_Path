"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Reusable Astro Status Badge Component
//////////////////////////////////////////////////////////////

interface AstroStatusBadgeProps {
  status:
    | "active"
    | "inactive"
    | "published"
    | "draft"
    | "pending"
    | "archived"
    | string;

  size?: "sm" | "md";
}


export default function AstroStatusBadge({
  status,
  size = "md",
}: AstroStatusBadgeProps) {


  const statusConfig: Record<
    string,
    {
      label: string;
      className: string;
    }
  > = {

    active: {
      label: "Active",
      className:
        "bg-green-500/10 text-green-400 border-green-500/30",
    },

    published: {
      label: "Published",
      className:
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },

    inactive: {
      label: "Inactive",
      className:
        "bg-gray-500/10 text-gray-400 border-gray-500/30",
    },

    draft: {
      label: "Draft",
      className:
        "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    },

    pending: {
      label: "Pending",
      className:
        "bg-orange-500/10 text-orange-400 border-orange-500/30",
    },

    archived: {
      label: "Archived",
      className:
        "bg-red-500/10 text-red-400 border-red-500/30",
    },

  };


  const current =
    statusConfig[status] || {
      label: status,
      className:
        "bg-slate-500/10 text-slate-400 border-slate-500/30",
    };


  return (

    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        font-medium

        ${
          size === "sm"
            ? "px-2 py-0.5 text-xs"
            : "px-3 py-1 text-sm"
        }

        ${current.className}
      `}
    >

      <span
        className="
          mr-2
          h-2
          w-2
          rounded-full
          bg-current
        "
      />

      {current.label}

    </span>

  );
}