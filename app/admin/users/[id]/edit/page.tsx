import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

import EditUserForm from "@/components/admin/EditUserForm";

export const dynamic = "force-dynamic";

type Params = {
  params: {
    id: string;
  };
};

export default async function EditUserPage({
  params,
}: Params) {
  try {
    /*
    ========================================
    CURRENT LOGGED USER
    ========================================
    */

    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      redirect("/login");
    }

    /*
    ========================================
    ROLE ACCESS PROTECTION
    ========================================
    */

    if (
      currentUser.role === "user"
    ) {
      redirect("/admin/users");
    }

    /*
    ========================================
    TARGET USER
    ========================================
    */

    const user =
      await prisma.user.findUnique({
        where: {
          id: params.id,
        },
      });

    if (!user) {
      redirect("/admin/users");
    }

    /*
    ========================================
    PAGE
    ========================================
    */

    return (
      <div
        className="
        p-8
        text-white
        space-y-8
        "
      >
        <div>
          <h1
            className="
            text-3xl
            font-bold
            "
          >
            Edit User
          </h1>

          <p
            className="
            text-gray-400
            mt-2
            "
          >
            Update account details, role and permissions.
          </p>
        </div>

        <div
          className="
          bg-[#0b1220]
          border
          border-white/10
          rounded-2xl
          p-6
          "
        >
          <EditUserForm
            currentUser={
              JSON.parse(
                JSON.stringify(currentUser)
              )
            }

            user={
              JSON.parse(
                JSON.stringify(user)
              )
            }
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error(
      "EDIT USER PAGE ERROR:",
      error
    );

    redirect("/admin/users");
  }
}