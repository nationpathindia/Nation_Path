"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

import {
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";

export default function AdminHeader() {
  const { data: session } = useSession();

  const userName = session?.user?.name || "Admin";

  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header
      className="
        admin-header
        h-20
        px-4
        sm:px-6
        lg:px-8
        flex
        items-center
        justify-between
        gap-4
        sticky
        top-0
        z-30
      "
    >
      {/* SEARCH */}
      <div
        className="
          admin-search
          flex
          items-center
          gap-3
          px-4
          py-2.5
          rounded-xl
          w-full
          max-w-md
          transition-all
        "
      >
        <Search
          size={17}
          className="text-[var(--admin-text-muted)] shrink-0"
        />

        <input
          placeholder="Search articles, users..."
          className="
            bg-transparent
            outline-none
            text-sm
            w-full
            text-[var(--admin-text)]
          "
        />
      </div>

      {/* RIGHT CONTROLS */}
      <div className="flex items-center gap-3 sm:gap-5 relative">
        {/* NOTIFICATIONS */}
        <button
          type="button"
          className="
            w-10
            h-10
            rounded-xl
            flex
            items-center
            justify-center
            text-[var(--admin-text-secondary)]
            hover:bg-[var(--admin-primary-soft)]
            hover:text-[var(--admin-primary-dark)]
            transition
          "
          aria-label="Notifications"
        >
          <Bell size={19} />
        </button>

        {/* PROFILE */}
        <button
          type="button"
          onClick={() => setProfileOpen(!profileOpen)}
          className="
            flex
            items-center
            gap-2
            cursor-pointer
            rounded-xl
            px-2
            py-1.5
            hover:bg-[var(--admin-surface-hover)]
            transition
          "
        >
          <div
            className="
              admin-avatar
              w-9
              h-9
              rounded-full
              flex
              items-center
              justify-center
              font-bold
              text-sm
            "
          >
            {userName.charAt(0).toUpperCase()}
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-[var(--admin-text)] max-w-32 truncate">
              {userName}
            </p>
            <p className="text-[11px] text-[var(--admin-text-muted)]">
              Admin
            </p>
          </div>

          <ChevronDown
            size={16}
            className={`
              text-[var(--admin-text-muted)]
              transition-transform
              ${profileOpen ? "rotate-180" : ""}
            `}
          />
        </button>

        {/* PROFILE DROPDOWN */}
        {profileOpen && (
          <div
            className="
              admin-profile-menu
              absolute
              right-0
              top-14
              rounded-2xl
              p-4
              w-56
              z-50
            "
          >
            <div className="pb-3 mb-3 border-b border-[var(--admin-border)]">
              <p className="text-sm font-semibold truncate">
                {userName}
              </p>

              <p className="text-xs text-[var(--admin-text-muted)] mt-1">
                NationPath Administrator
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
              className="
                w-full
                text-left
                text-sm
                font-medium
                text-[var(--admin-danger)]
                hover:bg-[var(--admin-danger-soft)]
                rounded-lg
                px-3
                py-2
                transition
              "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}