import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const email = session.user.email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    if (user.status === "blocked") {
      return null;
    }

    return user;
  } catch (error) {
    console.error("CURRENT USER ERROR:", error);

    return null;
  }
}