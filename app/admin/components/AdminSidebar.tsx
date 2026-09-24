"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

import {
  LayoutDashboard,
  FileText,
  Folder,
  Users,
  Bell,
  DollarSign,
  Settings,
  Megaphone,
  ChevronDown,
  Menu,
  X,
  LogOut,
  Sparkles,
  Telescope,
  Star,
  CalendarDays,
  Orbit,
  Moon,
  Home,
  Heart,
  Briefcase,
  GraduationCap,
  Wallet,
  Activity,
  Globe2,
  FileSearch,
  Vote,
  Radio,
  PlusCircle,
  Trophy,
  Flag,
  Globe,
  Building2,
  Zap,
  Bot,
  Rss,
  ClipboardCheck,
  Archive,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const { data: session } = useSession();

  const role = session?.user?.role || "user";
  const userName = session?.user?.name || "Admin";

  const [desktopCollapsed, setDesktopCollapsed] =
    useState(false);
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [openAstro, setOpenAstro] = useState(
    pathname.startsWith("/admin/astro"),
  );

  const [openAds, setOpenAds] = useState(
    pathname.startsWith("/admin/ads"),
  );

  const [openLive, setOpenLive] = useState(
    pathname.startsWith("/admin/live"),
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      roles: [
        "superadmin",
        "admin",
        "editor",
        "reporter",
        "advertiser",
      ],
    },
    {
      name: "News Control",
      href: "/admin/posts",
      icon: FileText,
      roles: [
        "superadmin",
        "admin",
        "editor",
        "reporter",
      ],
    },
    {
      name: "AI Newsroom",
      href: "/admin/ai-news",
      icon: Sparkles,
      roles: [
        "superadmin",
        "admin",
        "editor",
        "reporter",
      ],
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: Folder,
      roles: [
        "superadmin",
        "admin",
        "editor",
      ],
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      roles: [
        "superadmin",
        "admin",
      ],
    },
    {
      name: "Newsletter",
      href: "/admin/newsletter",
      icon: Bell,
      roles: [
        "superadmin",
        "admin",
      ],
    },
    {
      name: "Revenue",
      href: "/admin/revenue",
      icon: DollarSign,
      roles: [
        "superadmin",
        "admin",
      ],
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: Activity,
      roles: [
        "superadmin",
        "admin",
      ],
    },
    {
      name: "Poll Management",
      href: "/admin/polls",
      icon: Vote,
      roles: [
        "superadmin",
        "admin",
        "editor",
      ],
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      roles: ["superadmin"],
    },
  ];

  const liveItems = [
    {
      name: "Live Now",
      href: "/admin/live",
      icon: Radio,
    },
    {
      name: "Create Live Event",
      href: "/admin/live/create",
      icon: PlusCircle,
    },
    {
      name: "Sports",
      href: "/admin/live/sports",
      icon: Trophy,
    },
    {
      name: "India",
      href: "/admin/live/india",
      icon: Flag,
    },
    {
      name: "World",
      href: "/admin/live/world",
      icon: Globe,
    },
    {
      name: "Business",
      href: "/admin/live/business",
      icon: Building2,
    },
    {
      name: "Breaking / Special",
      href: "/admin/live/breaking",
      icon: Zap,
    },
    {
      name: "Automation",
      href: "/admin/live/automation",
      icon: Bot,
    },
    {
      name: "Sources",
      href: "/admin/live/sources",
      icon: Rss,
    },
    {
      name: "Review Queue",
      href: "/admin/live/review",
      icon: ClipboardCheck,
    },
    {
      name: "Archive",
      href: "/admin/live/archive",
      icon: Archive,
    },
  ];

  const astroItems = [
    {
      name: "Astro Dashboard",
      href: "/admin/astro",
      icon: Telescope,
    },
    {
      name: "Horoscope",
      href: "/admin/astro/horoscope",
      icon: Star,
    },
    {
      name: "Zodiac",
      href: "/admin/astro/zodiac",
      icon: Star,
    },
    {
      name: "Panchang",
      href: "/admin/astro/panchang",
      icon: CalendarDays,
    },
    {
      name: "Planet Intelligence",
      href: "/admin/astro/planet-intelligence",
      icon: Orbit,
    },
    {
      name: "Nakshatra",
      href: "/admin/astro/nakshatra-intelligence",
      icon: Moon,
    },
    {
      name: "House Intelligence",
      href: "/admin/astro/house-intelligence",
      icon: Home,
    },
    {
      name: "Lagna Intelligence",
      href: "/admin/astro/lagna-intelligence",
      icon: Sparkles,
    },
    {
      name: "Dasha Intelligence",
      href: "/admin/astro/dasha-intelligence",
      icon: Activity,
    },
    {
      name: "Remedy Intelligence",
      href: "/admin/astro/remedy-intelligence",
      icon: Heart,
    },
    {
      name: "Career Intelligence",
      href: "/admin/astro/career-intelligence",
      icon: Briefcase,
    },
    {
      name: "Education Intelligence",
      href: "/admin/astro/education-intelligence",
      icon: GraduationCap,
    },
    {
      name: "Finance Intelligence",
      href: "/admin/astro/finance-intelligence",
      icon: Wallet,
    },
    {
      name: "Health Intelligence",
      href: "/admin/astro/health-intelligence",
      icon: Activity,
    },
    {
      name: "Business Intelligence",
      href: "/admin/astro/business-intelligence",
      icon: Briefcase,
    },
    {
      name: "Foreign Settlement",
      href: "/admin/astro/foreign-settlement-intelligence",
      icon: Globe2,
    },
    {
      name: "Birth Chart",
      href: "/admin/astro/birth-chart-interpretation",
      icon: FileSearch,
    },
  ];

  const canSeeLive = [
    "superadmin",
    "admin",
    "editor",
    "reporter",
  ].includes(role);

  const canSeeAstro = [
    "superadmin",
    "admin",
  ].includes(role);

  const canSeeAds = [
    "superadmin",
    "admin",
    "advertiser",
  ].includes(role);

  return (
    <>
      {/* MOBILE MENU BUTTON */}

      <div className="lg:hidden fixed top-4 left-4 z-[100]">
        <button
          onClick={() => setMobileOpen(true)}
          className="
            admin-mobile-menu
            w-11 h-11
            flex items-center justify-center
            rounded-xl
          "
          aria-label="Open admin navigation"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* MOBILE OVERLAY */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="
            fixed inset-0
            bg-black/55
            backdrop-blur-sm
            z-40
            lg:hidden
          "
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
          admin-sidebar
          fixed lg:static
          top-0 left-0
          h-screen
          z-50
          flex flex-col justify-between
          border-r border-white/10
          transition-all duration-300

          ${
            mobileOpen
              ? "translate-x-0 w-72"
              : "-translate-x-full lg:translate-x-0"
          }

          ${
            desktopCollapsed
              ? "lg:w-20"
              : "lg:w-72"
          }
        `}
      >
        {/* SCROLLABLE AREA */}

        <div
          className="
            flex-1
            min-h-0
            overflow-y-auto
            admin-sidebar-scroll
          "
        >
          {/* HEADER */}

          <div
            className="
              h-[72px]
              px-5
              flex items-center justify-between
              border-b border-white/10
            "
          >
            {!desktopCollapsed && (
              <Link
                href="/admin"
                className="flex items-center min-w-0"
                aria-label="NationPath Admin"
              >
                <img
                  src="/logo.png"
                  alt="NationPath"
                  width={170}
                  height={48}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="
                    w-auto
                    h-10
                    max-w-[170px]
                    object-contain
                    object-left
                  "
                />
              </Link>
            )}

            {desktopCollapsed && (
              <Link
                href="/admin"
                className="mx-auto"
                aria-label="NationPath Admin"
              >
                <img
                  src="/logo.png"
                  alt="NationPath"
                  width={42}
                  height={42}
                  loading="eager"
                  decoding="async"
                  className="
                    w-9
                    h-9
                    object-contain
                  "
                />
              </Link>
            )}

            <button
              onClick={() => {
                if (mobileOpen) {
                  setMobileOpen(false);
                } else {
                  setDesktopCollapsed(
                    !desktopCollapsed,
                  );
                }
              }}
              className="
                p-2
                rounded-lg
                text-white/70
                hover:text-white
                hover:bg-white/10
                transition
                shrink-0
              "
              aria-label="Toggle sidebar"
            >
              {mobileOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>

          {/* PROFILE */}

          {!desktopCollapsed && (
            <div
              className="
                px-5 py-5
                border-b border-white/10
                flex items-center gap-3
              "
            >
              <div
                className="
                  w-11 h-11
                  rounded-full
                  bg-gradient-to-br
                  from-cyan-300
                  via-cyan-500
                  to-teal-700
                  flex items-center justify-center
                  font-bold text-white
                  shadow-lg shadow-cyan-950/30
                  shrink-0
                "
              >
                {userName.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="font-semibold truncate">
                  {userName}
                </p>

                <p className="text-xs text-cyan-300 capitalize">
                  {role}
                </p>
              </div>
            </div>
          )}

          {/* NAVIGATION */}

          <nav className="p-4 space-y-1.5">
            {navItems
              .filter((item) =>
                item.roles.includes(role),
              )
              .map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  collapsed={desktopCollapsed}
                />
              ))}

            {/* LIVE CENTER */}

            {canSeeLive && (
              <div className="pt-4">
                {!desktopCollapsed && (
                  <p
                    className="
                      px-4 mb-2
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-red-300/60
                    "
                  >
                    Live Operations
                  </p>
                )}

                <button
                  onClick={() =>
                    setOpenLive(!openLive)
                  }
                  className="
                    admin-nav-item
                    w-full
                    flex items-center justify-between
                    px-4 py-3
                    rounded-xl
                    text-white/75
                    transition
                  "
                  title={
                    desktopCollapsed
                      ? "Live Center"
                      : undefined
                  }
                >
                  <span className="flex items-center gap-3">
                    <span className="relative flex items-center justify-center">
                      <Radio
                        size={18}
                        className="text-red-300"
                      />

                      <span
                        className="
                          absolute
                          -top-0.5
                          -right-0.5
                          w-1.5
                          h-1.5
                          rounded-full
                          bg-red-400
                          animate-pulse
                        "
                      />
                    </span>

                    {!desktopCollapsed &&
                      "Live Center"}
                  </span>

                  {!desktopCollapsed && (
                    <ChevronDown
                      size={16}
                      className={`
                        transition
                        ${openLive ? "rotate-180" : ""}
                      `}
                    />
                  )}
                </button>

                {openLive &&
                  !desktopCollapsed && (
                    <div
                      className="
                        ml-4 mt-2
                        pl-3
                        border-l border-white/10
                        space-y-1
                      "
                    >
                      {liveItems.map((item) => (
                        <LiveSubItem
                          key={item.href}
                          href={item.href}
                          label={item.name}
                          pathname={pathname}
                          icon={item.icon}
                        />
                      ))}
                    </div>
                  )}
              </div>
            )}

            {/* ASTRO */}

            {canSeeAstro && (
              <div className="pt-4">
                {!desktopCollapsed && (
                  <p
                    className="
                      px-4 mb-2
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-cyan-300/50
                    "
                  >
                    Intelligence
                  </p>
                )}

                <button
                  onClick={() =>
                    setOpenAstro(!openAstro)
                  }
                  className="
                    admin-nav-item
                    w-full
                    flex items-center justify-between
                    px-4 py-3
                    rounded-xl
                    text-white/75
                    transition
                  "
                  title={
                    desktopCollapsed
                      ? "Astro Intelligence"
                      : undefined
                  }
                >
                  <span className="flex items-center gap-3">
                    <Sparkles
                      size={18}
                      className="text-violet-300"
                    />

                    {!desktopCollapsed &&
                      "Astro Intelligence"}
                  </span>

                  {!desktopCollapsed && (
                    <ChevronDown
                      size={16}
                      className={`
                        transition
                        ${openAstro ? "rotate-180" : ""}
                      `}
                    />
                  )}
                </button>

                {openAstro &&
                  !desktopCollapsed && (
                    <div className="ml-4 mt-2 pl-3 border-l border-white/10 space-y-1">
                      {astroItems.map((item) => (
                        <SubItem
                          key={item.href}
                          href={item.href}
                          label={item.name}
                          pathname={pathname}
                        />
                      ))}
                    </div>
                  )}
              </div>
            )}

            {/* ADS */}

            {canSeeAds && (
              <div className="pt-4">
                {!desktopCollapsed && (
                  <p
                    className="
                      px-4 mb-2
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-cyan-300/50
                    "
                  >
                    Monetization
                  </p>
                )}

                <button
                  onClick={() =>
                    setOpenAds(!openAds)
                  }
                  className="
                    admin-nav-item
                    w-full
                    flex items-center justify-between
                    px-4 py-3
                    rounded-xl
                    text-white/75
                    transition
                  "
                  title={
                    desktopCollapsed
                      ? "Advertisements"
                      : undefined
                  }
                >
                  <span className="flex items-center gap-3">
                    <Megaphone
                      size={18}
                      className="text-amber-300"
                    />

                    {!desktopCollapsed &&
                      "Advertisements"}
                  </span>

                  {!desktopCollapsed && (
                    <ChevronDown
                      size={16}
                      className={`
                        transition
                        ${openAds ? "rotate-180" : ""}
                      `}
                    />
                  )}
                </button>

                {openAds &&
                  !desktopCollapsed && (
                    <div className="ml-4 mt-2 pl-3 border-l border-white/10 space-y-1">
                      <SubItem
                        href="/admin/ads"
                        label="All Ads"
                        pathname={pathname}
                      />

                      <SubItem
                        href="/admin/ads/create"
                        label="Create Ad"
                        pathname={pathname}
                      />

                      <SubItem
                        href="/admin/ads/performance"
                        label="Performance"
                        pathname={pathname}
                      />
                    </div>
                  )}
              </div>
            )}
          </nav>
        </div>

        {/* LOGOUT */}

        <div
          className="
            p-4
            border-t border-white/10
            shrink-0
          "
        >
          <button
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
            className="
              w-full
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              bg-red-500/10
              text-red-200
              hover:bg-red-500/20
              hover:text-red-100
              transition
            "
            title={
              desktopCollapsed
                ? "Logout"
                : undefined
            }
          >
            <LogOut size={18} />

            {!desktopCollapsed && (
              <span className="text-sm font-medium">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* HIDDEN SCROLLBAR */}

      <style jsx global>{`
        .admin-sidebar-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .admin-sidebar-scroll::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }

        .admin-sidebar-scroll {
          overscroll-behavior: contain;
        }
      `}</style>
    </>
  );
}

/* =========================================================
   MAIN NAV ITEM
========================================================= */

function NavItem({
  item,
  pathname,
  collapsed,
}: any) {
  const Icon = item.icon;

  const active =
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      title={collapsed ? item.name : undefined}
      className={`
        relative
        group
        flex items-center gap-3
        px-4 py-3
        rounded-xl
        transition-all duration-200

        ${
          active
            ? "admin-nav-active"
            : "admin-nav-item text-white/70"
        }
      `}
    >
      <Icon
        size={18}
        className={`
          shrink-0
          transition-colors

          ${
            active
              ? "text-white"
              : "text-white/50 group-hover:text-cyan-300"
          }
        `}
      />

      {!collapsed && (
        <span
          className="
            text-sm
            font-medium
            whitespace-nowrap
          "
        >
          {item.name}
        </span>
      )}
    </Link>
  );
}

/* =========================================================
   LIVE SUB ITEM
========================================================= */

function LiveSubItem({
  href,
  label,
  pathname,
  icon: Icon,
}: any) {
  const active =
    pathname === href ||
    pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`
        flex items-center gap-2.5
        px-3 py-2
        rounded-lg
        text-sm
        transition-all

        ${
          active
            ? "bg-red-400/15 text-red-200 border-l-2 border-red-300"
            : "text-white/55 hover:bg-white/5 hover:text-white/90"
        }
      `}
    >
      <Icon
        size={15}
        className={
          active
            ? "text-red-300"
            : "text-white/40"
        }
      />

      <span>{label}</span>
    </Link>
  );
}

/* =========================================================
   GENERIC SUB ITEM
========================================================= */

function SubItem({
  href,
  label,
  pathname,
}: any) {
  const active =
    pathname === href ||
    pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`
        block
        px-4 py-2
        rounded-lg
        text-sm
        transition-all

        ${
          active
            ? "bg-cyan-400/15 text-cyan-200 border-l-2 border-cyan-300"
            : "text-white/55 hover:bg-white/5 hover:text-white/90"
        }
      `}
    >
      {label}
    </Link>
  );
}

