"use client";

import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useState } from "react";

type DashboardUser = {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
};

type DashboardHeaderProps = {
  user?: DashboardUser | null;
};

export default function DashboardHeader({
  user,
}: DashboardHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  /*
   * Future-proof user display:
   * - name → preferred display
   * - email → fallback
   * - "User" → final fallback
   */
  const displayName =
    user?.name?.trim() ||
    user?.email?.split("@")[0]?.trim() ||
    "User";

  const initials = getInitials(displayName);

  return (
    <header className="sticky top-0 z-50 border-b border-[#163C80]/[0.08] bg-[#F8F5EE]/[0.82] backdrop-blur-2xl">
      <div className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            BRAND
        ===================================================== */}
        <div className="flex items-center gap-3">
          <div
            className="
              relative flex h-10 w-10 items-center justify-center
              overflow-hidden rounded-2xl
              border border-[#C6A15B]/30
              bg-white/[0.42]
              shadow-[0_8px_25px_rgba(22,60,128,0.07)]
              backdrop-blur-xl
            "
          >
            <img
              src="/idlogo.png"
              alt="NationPath"
              className="h-7 w-auto"
            />
          </div>

          <div className="hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B6A25]">
              NationPath
            </p>

            <p className="text-sm font-semibold text-[#163C80]">
              Intelligence Hub
            </p>
          </div>
        </div>

        {/* =====================================================
            CENTER NAV
        ===================================================== */}
        <nav className="hidden items-center gap-1 md:flex">
          <HeaderNavItem label="Overview" active />
          <HeaderNavItem label="News" />
          <HeaderNavItem label="Astro" />
          <HeaderNavItem label="Kids" />
        </nav>

        {/* =====================================================
            RIGHT ACTIONS
        ===================================================== */}
        <div className="flex items-center gap-2">
          {/* SEARCH */}
          <button
            type="button"
            className="
              hidden h-10 items-center gap-2
              rounded-xl
              border border-[#163C80]/[0.08]
              bg-white/[0.38]
              px-3
              text-[#64748B]
              backdrop-blur-xl
              transition-all duration-200
              hover:border-[#163C80]/[0.16]
              hover:bg-white/[0.58]
              hover:text-[#163C80]
              sm:flex
            "
          >
            <Search className="h-4 w-4" />

            <span className="text-xs">
              Search
            </span>

            <kbd
              className="
                ml-3 rounded-md
                border border-black/[0.07]
                bg-black/[0.025]
                px-1.5 py-0.5
                text-[10px] text-gray-400
              "
            >
              ⌘K
            </kbd>
          </button>

          {/* AI */}
          <button
            type="button"
            className="
              hidden h-10 w-10 items-center justify-center
              rounded-xl
              border border-[#EA661B]/[0.12]
              bg-[#EA661B]/[0.035]
              text-[#EA661B]
              backdrop-blur-xl
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-[#EA661B]/[0.07]
              sm:flex
            "
            title="NationPath AI"
            aria-label="NationPath AI"
          >
            <Sparkles className="h-[17px] w-[17px]" />
          </button>

          {/* NOTIFICATIONS */}
          <button
            type="button"
            className="
              relative flex h-10 w-10
              items-center justify-center
              rounded-xl
              border border-[#163C80]/[0.08]
              bg-white/[0.36]
              text-[#64748B]
              backdrop-blur-xl
              transition-all duration-200
              hover:bg-white/[0.58]
              hover:text-[#163C80]
            "
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="h-[17px] w-[17px]" />

            <span
              className="
                absolute right-2 top-2
                h-1.5 w-1.5
                rounded-full
                bg-[#EA661B]
                ring-2 ring-[#F8F5EE]
              "
            />
          </button>

          {/* =================================================
              USER PROFILE
          ================================================= */}
          <button
            type="button"
            className="
              group
              hidden items-center gap-2
              rounded-xl
              border border-[#163C80]/[0.08]
              bg-white/[0.36]
              py-1.5 pl-1.5 pr-2
              backdrop-blur-xl
              transition-all duration-200
              hover:border-[#163C80]/[0.14]
              hover:bg-white/[0.58]
              sm:flex
            "
            title={`Open ${displayName}'s profile`}
          >
            {/* Avatar */}
            <div
              className="
                relative flex h-7 w-7 shrink-0
                items-center justify-center
                overflow-hidden rounded-lg
                border border-white/[0.45]
                bg-gradient-to-br
                from-[#163C80]
                via-[#6B4C91]
                to-[#EA661B]
                text-[10px]
                font-bold
                text-white
                shadow-[0_4px_12px_rgba(22,60,128,0.12)]
              "
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            {/* User name */}
            <div className="hidden max-w-[130px] text-left lg:block">
              <p className="truncate text-[11px] font-semibold text-[#33120A]">
                {displayName}
              </p>

              {user?.email && (
                <p className="truncate text-[9px] text-[#8B8F97]">
                  {user.email}
                </p>
              )}
            </div>

            <ChevronDown
              className="
                h-3.5 w-3.5
                text-gray-400
                transition-transform duration-200
                group-hover:translate-y-0.5
              "
            />
          </button>

          {/* MOBILE MENU */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl
              border border-[#163C80]/[0.08]
              bg-white/[0.38]
              text-[#163C80]
              backdrop-blur-xl
              transition
              hover:bg-white/[0.58]
              md:hidden
            "
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE NAV
      ===================================================== */}
      {mobileOpen && (
        <div
          className="
            border-t border-[#163C80]/[0.08]
            bg-[#F8F5EE]/[0.88]
            px-4 py-3
            backdrop-blur-2xl
            md:hidden
          "
        >
          <nav className="grid grid-cols-2 gap-2">
            <MobileNavItem label="Overview" active />
            <MobileNavItem label="News" />
            <MobileNavItem label="Astro" />
            <MobileNavItem label="Kids" />
          </nav>

          {/* Mobile user identity */}
          <div
            className="
              mt-3 flex items-center gap-3
              rounded-xl
              border border-[#163C80]/[0.07]
              bg-white/[0.30]
              px-3 py-2.5
            "
          >
            <div
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                overflow-hidden rounded-xl
                bg-gradient-to-br
                from-[#163C80]
                via-[#6B4C91]
                to-[#EA661B]
                text-xs font-bold text-white
              "
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-[#33120A]">
                {displayName}
              </p>

              {user?.email && (
                <p className="truncate text-[10px] text-[#8B8F97]">
                  {user.email}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* =========================================================
   DESKTOP NAV ITEM
========================================================= */

function HeaderNavItem({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`
        relative rounded-xl px-4 py-2.5
        text-xs font-semibold
        transition-all duration-200
        ${
          active
            ? "bg-white/[0.55] text-[#163C80] shadow-[0_5px_20px_rgba(22,60,128,0.045)]"
            : "text-[#64748B] hover:bg-white/[0.38] hover:text-[#163C80]"
        }
      `}
    >
      {label}

      {active && (
        <span
          className="
            absolute bottom-0.5 left-1/2
            h-0.5 w-5
            -translate-x-1/2
            rounded-full
            bg-[#EA661B]
          "
        />
      )}
    </button>
  );
}

/* =========================================================
   MOBILE NAV ITEM
========================================================= */

function MobileNavItem({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`
        rounded-xl border px-4 py-3
        text-left text-sm font-semibold
        transition-all duration-200
        ${
          active
            ? "border-[#163C80]/[0.08] bg-white/[0.55] text-[#163C80]"
            : "border-transparent text-[#64748B] hover:bg-white/[0.40]"
        }
      `}
    >
      {label}
    </button>
  );
}

/* =========================================================
   USER INITIALS
========================================================= */

function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "U";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}