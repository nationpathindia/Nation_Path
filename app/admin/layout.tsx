import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Manrope } from "next/font/google";

import { authOptions } from "@/lib/auth";

import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

import "./admin-theme.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-admin-manrope",
  display: "swap",
});

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const role = session.user?.role;

  const adminRoles = [
    "superadmin",
    "admin",
    "editor",
    "reporter",
    "advertiser",
  ];

  if (!adminRoles.includes(role)) {
    redirect("/dashboard");
  }

  return (
    <div
      className={`${manrope.variable} admin-theme min-h-screen flex overflow-hidden relative`}
    >
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN APPLICATION */}
      <div className="flex-1 min-w-0 flex flex-col relative z-10">
        {/* HEADER */}
        <AdminHeader />

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

