import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";

export const ADMIN_ROLES = [
  "superadmin",
  "admin",
  "editor",
  "reporter",
  "advertiser",
] as const;

export async function requireAdminApi() {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    return {
      authorized: false as const,
      response: NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      ),
    };
  }

  const role = session.user?.role;

  if (!ADMIN_ROLES.includes(role)) {
    return {
      authorized: false as const,
      response: NextResponse.json(
        {
          success: false,
          error: "Forbidden",
        },
        { status: 403 }
      ),
    };
  }

  return {
    authorized: true as const,
    session,
    userId: session.user?.id ?? null,
    role,
  };
}