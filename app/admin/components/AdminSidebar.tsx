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

  const [openAstro, setOpenAstro] =
    useState(false);

  const [openAds, setOpenAds] =
    useState(false);

  /*
    AUTO CLOSE MOBILE MENU
  */

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /*
    MAIN ADMIN NAVIGATION
  */

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

    /*
      ANALYTICS
    */

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
      roles: [
        "superadmin",
      ],
    },
  ];

  /*
    ASTRO NAVIGATION
  */

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

      <div
        className="
          lg:hidden
          fixed
          top-4
          left-4
          z-[100]
        "
      >
        <button
          onClick={() => setMobileOpen(true)}
          className="
            w-11
            h-11
            flex
            items-center
            justify-center
            rounded-xl
            bg-black/70
            backdrop-blur-xl
            border
            border-white/10
            shadow-xl
          "
        >
          <Menu size={22} />
        </button>
      </div>

      {/* MOBILE OVERLAY */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="
            fixed
            inset-0
            bg-black/60
            backdrop-blur-sm
            z-40
            lg:hidden
          "
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed
          lg:static

          top-0
          left-0

          h-screen

          z-50

          bg-[#050816]/90

          backdrop-blur-2xl

          border-r
          border-white/10

          flex
          flex-col
          justify-between

          text-white

          transition-all
          duration-300

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
        <div className="flex-1">
          {/* HEADER */}

          <div
            className="
              h-[72px]
              px-5
              flex
              items-center
              justify-between
              border-b
              border-white/10
            "
          >
            {!desktopCollapsed && (
              <h2
                className="
                  font-bold
                  text-xl
                  whitespace-nowrap
                "
              >
                NationPath Admin
              </h2>
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
                hover:bg-white/10
              "
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
                px-5
                py-5
                border-b
                border-white/10
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-gradient-to-br
                  from-orange-400
                  to-red-500
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-black
                "
              >
                {userName.charAt(0)}
              </div>

              <div>
                <p
                  className="
                    font-semibold
                    truncate
                  "
                >
                  {userName}
                </p>

                <p
                  className="
                    text-xs
                    text-orange-400
                    capitalize
                  "
                >
                  {role}
                </p>
              </div>
            </div>
          )}

          <nav
            className="
              p-4
              space-y-2
            "
          >
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

            {/* ASTRO */}

            {canSeeAstro && (
              <div className="pt-4">
                <button
                  onClick={() =>
                    setOpenAstro(!openAstro)
                  }
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3
                    rounded-xl
                    hover:bg-white/10
                  "
                >
                  <span
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <Sparkles size={18} />

                    {!desktopCollapsed &&
                      "Astro Intelligence"}
                  </span>

                  {!desktopCollapsed && (
                    <ChevronDown
                      size={16}
                      className={
                        openAstro
                          ? "rotate-180 transition"
                          : "transition"
                      }
                    />
                  )}
                </button>

                {openAstro &&
                  !desktopCollapsed && (
                    <div
                      className="
                        ml-6
                        mt-2
                        space-y-1
                      "
                    >
                      {astroItems.map(
                        (item) => (
                          <SubItem
                            key={item.href}
                            href={item.href}
                            label={item.name}
                            pathname={pathname}
                          />
                        ),
                      )}
                    </div>
                  )}
              </div>
            )}

            {/* ADS */}

            {canSeeAds && (
              <div className="pt-4">
                <button
                  onClick={() =>
                    setOpenAds(!openAds)
                  }
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3
                    rounded-xl
                    hover:bg-white/10
                  "
                >
                  <span
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <Megaphone size={18} />

                    {!desktopCollapsed &&
                      "Advertisements"}
                  </span>

                  {!desktopCollapsed && (
                    <ChevronDown
                      size={16}
                      className={
                        openAds
                          ? "rotate-180 transition"
                          : "transition"
                      }
                    />
                  )}
                </button>

                {openAds &&
                  !desktopCollapsed && (
                    <div
                      className="
                        ml-6
                        mt-2
                        space-y-1
                      "
                    >
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
            border-t
            border-white/10
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
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              bg-red-600/20
              hover:bg-red-600/40
              transition
            "
          >
            <LogOut size={18} />

            {!desktopCollapsed && (
              <span>
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

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
      className={`
        group
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all
        duration-200

        ${
          active
            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      <Icon
        size={18}
        className={`
          shrink-0

          ${
            active
              ? "text-white"
              : "text-gray-400 group-hover:text-orange-400"
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
        px-4
        py-2
        rounded-lg
        text-sm
        transition-all

        ${
          active
            ? "bg-orange-500 text-white"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      {label}
    </Link>
  );
}

