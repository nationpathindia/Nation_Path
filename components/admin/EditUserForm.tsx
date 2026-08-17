"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Save,
  Shield,
  UserCog,
  Lock,
  User,
  KeyRound,
} from "lucide-react";



type UserRole =
  | "superadmin"
  | "admin"
  | "editor"
  | "reporter"
  | "advertiser"
  | "user";



type PermissionKey =
  | "news"
  | "astro"
  | "ads"
  | "revenue"
  | "userManagement";



type Props = {
  user: any;
  currentUser: any;
};



export default function EditUserForm({
  user,
  currentUser,
}: Props) {


  const router = useRouter();


  const [loading, setLoading] =
    useState(false);


  const [resetLoading, setResetLoading] =
    useState(false);


  const [showResetPassword, setShowResetPassword] =
    useState(false);


  const [newPassword, setNewPassword] =
    useState("");



  /*
  =====================================================
  CURRENT USER ROLE
  =====================================================
  */

  const currentRole =
    currentUser?.role as UserRole;



  const targetRole =
    user?.role as UserRole;



  const isSelf =
    String(currentUser?._id) ===
    String(user?._id);



  const isSuperAdmin =
    currentRole === "superadmin";


  const isAdmin =
    currentRole === "admin";


  const isEditor =
    currentRole === "editor";



  /*
  =====================================================
  PROTECTED TARGET
  =====================================================
  */

  const targetIsSuperAdmin =
    targetRole === "superadmin";


  const targetIsAdmin =
    targetRole === "admin";



  /*
  =====================================================
  ROLE MANAGEMENT
  =====================================================
  */

  const canManageRole =
    isSuperAdmin ||
    (
      isAdmin &&
      !targetIsSuperAdmin &&
      !(targetIsAdmin && !isSelf)
    );



  /*
  Admin cannot assign admin.
  Superadmin can assign every role.
  */

  const availableRoles: UserRole[] =
    isSuperAdmin
      ? [
          "superadmin",
          "admin",
          "editor",
          "reporter",
          "advertiser",
          "user",
        ]
      : isAdmin
        ? [
            "editor",
            "reporter",
            "advertiser",
            "user",
          ]
        : [
            "reporter",
          ];



  /*
  =====================================================
  TARGET ACCESS
  =====================================================
  */

  const canEditTarget =
    isSuperAdmin ||
    (
      isAdmin &&
      !targetIsSuperAdmin &&
      (!targetIsAdmin || isSelf)
    ) ||
    (
      isEditor &&
      (targetRole === "reporter" || isSelf)
    ) ||
    isSelf;



  /*
  =====================================================
  PASSWORD RESET PERMISSION
  =====================================================
  */

  const canResetPassword =
    isSuperAdmin ||
    (
      isAdmin &&
      [
        "editor",
        "reporter",
        "advertiser",
        "user",
      ].includes(targetRole)
    ) ||
    (
      isEditor &&
      targetRole === "reporter"
    );



  /*
  =====================================================
  INITIAL FORM
  =====================================================
  */

  const [form, setForm] =
    useState({

      avatar:
        user?.avatar || "",

      name:
        user?.name || "",

      role:
        user?.role || "user",

      status:
        user?.status || "active",

      profile: {

        phone:
          user?.profile?.phone || "",

        department:
          user?.profile?.department || "",

        bio:
          user?.profile?.bio || "",

      },

      permissions: {

        news:
          user?.permissions?.news || false,

        astro:
          user?.permissions?.astro || false,

        ads:
          user?.permissions?.ads || false,

        revenue:
          user?.permissions?.revenue || false,

        userManagement:
          user?.permissions?.userManagement || false,

      },

    });



  /*
  =====================================================
  PROFILE UPDATE
  =====================================================
  */

  function updateProfile(
    key: string,
    value: string
  ) {

    setForm({

      ...form,

      profile: {

        ...form.profile,

        [key]: value,

      },

    });

  }



  /*
  =====================================================
  PERMISSION UPDATE
  =====================================================
  */

  function updatePermission(
    key: PermissionKey
  ) {

    if (!isSuperAdmin) {
      return;
    }


    setForm({

      ...form,

      permissions: {

        ...form.permissions,

        [key]:
          !form.permissions[key],

      },

    });

  }



  /*
  =====================================================
  SUBMIT
  =====================================================
  */

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();


    if (!canEditTarget) {

      alert(
        "You do not have permission to update this user."
      );

      return;

    }



    try {

      setLoading(true);



      /*
      Do not allow unauthorized
      role changes from frontend.
      */

      const payload: any = {

        avatar:
          form.avatar,

        name:
          form.name,

        status:
          form.status,

        profile:
          form.profile,

        permissions:
          form.permissions,

      };



      if (canManageRole) {

        payload.role =
          form.role;

      }



      const res =
        await fetch(
          `/api/users/${user._id}`,
          {

            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(payload),

          }
        );



      const data =
        await res.json();



      if (!res.ok) {

        alert(
          data.error ||
          data.message ||
          "Update failed"
        );

        return;

      }



      alert(
        data.message ||
        "User updated successfully"
      );



      router.push(
        "/admin/users"
      );

      router.refresh();



    } catch (error) {

      console.error(
        "UPDATE USER FORM ERROR:",
        error
      );

      alert(
        "Server error"
      );

    } finally {

      setLoading(false);

    }

  }



  /*
  =====================================================
  PASSWORD RESET
  =====================================================
  */

  async function handlePasswordReset() {


    if (!canResetPassword) {

      alert(
        "You do not have permission to reset this user's password."
      );

      return;

    }



    if (!newPassword) {

      alert(
        "Please enter a new password."
      );

      return;

    }



    if (newPassword.length < 8) {

      alert(
        "Password must contain minimum 8 characters."
      );

      return;

    }



    try {

      setResetLoading(true);



      const res =
        await fetch(
          "/api/users/reset",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({

                userId:
                  user._id,

                newPassword,

              }),

          }
        );



      const data =
        await res.json();



      if (!res.ok) {

        alert(
          data.message ||
          data.error ||
          "Password reset failed"
        );

        return;

      }



      alert(
        data.message ||
        "Password reset successfully"
      );



      setNewPassword("");

      setShowResetPassword(false);



    } catch (error) {

      console.error(
        "PASSWORD RESET ERROR:",
        error
      );

      alert(
        "Server error"
      );

    } finally {

      setResetLoading(false);

    }

  }



  /*
  =====================================================
  IF TARGET CANNOT BE EDITED
  =====================================================
  */

  if (!canEditTarget) {

    return (

      <div
        className="
        bg-red-950/30
        border
        border-red-900/50
        rounded-xl
        p-6
        "
      >

        <div
          className="
          flex
          items-center
          gap-3
          text-red-400
          font-semibold
          "
        >

          <Lock size={20} />

          Protected Account

        </div>


        <p
          className="
          text-sm
          text-gray-400
          mt-3
          "
        >

          You do not have permission
          to modify this account.

        </p>

      </div>

    );

  }



  /*
  =====================================================
  FORM
  =====================================================
  */

  return (

    <form
      onSubmit={handleSubmit}
      className="
      space-y-8
      max-w-4xl
      "
    >



      {/* =================================================
          PROFILE
      ================================================= */}

      <section
        className="
        bg-[#0e1726]
        border
        border-white/10
        rounded-xl
        p-6
        space-y-4
        "
      >

        <h2
          className="
          text-xl
          font-bold
          flex
          items-center
          gap-2
          "
        >

          <User size={20} />

          Profile Information

        </h2>



        <input
          value={form.avatar}
          onChange={(e) =>
            setForm({
              ...form,
              avatar:
                e.target.value,
            })
          }
          placeholder="Avatar URL"
          className="input"
        />



        <input
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value,
            })
          }
          placeholder="Full Name"
          className="input"
          required
        />



        <input
          value={user.email || ""}
          disabled
          className="
          input
          opacity-50
          "
        />



        <input
          value={form.profile.phone}
          onChange={(e) =>
            updateProfile(
              "phone",
              e.target.value
            )
          }
          placeholder="Phone"
          className="input"
        />



        <p
          className="
          text-xs
          text-gray-500
          "
        >

          Profile phone is legacy profile data.
          OTP authentication will use the dedicated
          verified phone system.

        </p>



        <input
          value={form.profile.department}
          onChange={(e) =>
            updateProfile(
              "department",
              e.target.value
            )
          }
          placeholder="Department"
          className="input"
        />



        <textarea
          value={form.profile.bio}
          onChange={(e) =>
            updateProfile(
              "bio",
              e.target.value
            )
          }
          placeholder="Bio"
          className="
          input
          h-32
          "
        />

      </section>



      {/* =================================================
          ACCOUNT SETTINGS
      ================================================= */}

      <section
        className="
        bg-[#0e1726]
        border
        border-white/10
        rounded-xl
        p-6
        space-y-4
        "
      >

        <h2
          className="
          text-xl
          font-bold
          flex
          items-center
          gap-2
          "
        >

          <UserCog size={20} />

          Account Settings

        </h2>



        <select
          disabled={!canManageRole}
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role:
                e.target.value,
            })
          }
          className="
          input
          disabled:opacity-50
          "
        >

          {!availableRoles.includes(
            form.role as UserRole
          ) && (

            <option value={form.role}>
              {form.role}
            </option>

          )}



          {availableRoles.map(
            (role) => (

              <option
                key={role}
                value={role}
              >

                {role}

              </option>

            )
          )}

        </select>



        {!canManageRole && (

          <p
            className="
            text-xs
            text-gray-500
            "
          >

            Your role does not allow
            changing this user's role.

          </p>

        )}



        <select
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status:
                e.target.value,
            })
          }
          className="input"
        >

          <option value="active">
            Active
          </option>

          <option value="blocked">
            Blocked
          </option>

        </select>

      </section>



      {/* =================================================
          PERMISSIONS
      ================================================= */}

      <section
        className="
        bg-[#0e1726]
        border
        border-white/10
        rounded-xl
        p-6
        "
      >

        <h2
          className="
          text-xl
          font-bold
          mb-4
          flex
          items-center
          gap-2
          "
        >

          <Shield size={20} />

          Permissions

        </h2>



        {Object.keys(
          form.permissions
        ).map((permission) => (

          <label
            key={permission}
            className="
            flex
            justify-between
            items-center
            py-3
            border-b
            border-white/10
            "
          >

            <span className="capitalize">

              {permission}

            </span>



            <input
              type="checkbox"
              disabled={!isSuperAdmin}
              checked={
                form.permissions[
                  permission as PermissionKey
                ]
              }
              onChange={() =>
                updatePermission(
                  permission as PermissionKey
                )
              }
            />

          </label>

        ))}



        {!isSuperAdmin && (

          <p
            className="
            text-xs
            text-gray-500
            mt-4
            "
          >

            Only Superadmin can modify
            user permissions.

          </p>

        )}

      </section>



      {/* =================================================
          SECURITY
      ================================================= */}

      <section
        className="
        bg-red-950/30
        border
        border-red-900/50
        rounded-xl
        p-6
        space-y-4
        "
      >

        <h2
          className="
          text-red-400
          font-bold
          flex
          gap-2
          items-center
          "
        >

          <Lock size={18} />

          Security

        </h2>



        <p
          className="
          text-sm
          text-gray-400
          "
        >

          Password reset is available
          according to your account permissions.

        </p>



        {canResetPassword && (

          <button
            type="button"
            onClick={() =>
              setShowResetPassword(
                !showResetPassword
              )
            }
            className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-lg
            border
            border-red-500/30
            text-red-400
            hover:bg-red-500/10
            transition
            "
          >

            <KeyRound size={17} />

            Reset Password

          </button>

        )}



        {showResetPassword &&
          canResetPassword && (

          <div
            className="
            border
            border-white/10
            rounded-xl
            p-4
            space-y-3
            "
          >

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              placeholder="New password — minimum 8 characters"
              className="input"
            />



            <button
              type="button"
              disabled={
                resetLoading
              }
              onClick={
                handlePasswordReset
              }
              className="
              flex
              items-center
              gap-2
              bg-red-600
              hover:bg-red-700
              disabled:opacity-50
              px-4
              py-2
              rounded-lg
              font-semibold
              "
            >

              <KeyRound size={17} />

              {resetLoading
                ? "Resetting..."
                : "Confirm Password Reset"}

            </button>

          </div>

        )}

      </section>



      {/* =================================================
          SAVE
      ================================================= */}

      <button
        type="submit"
        disabled={loading}
        className="
        flex
        items-center
        gap-2
        bg-orange-500
        hover:bg-orange-600
        disabled:opacity-50
        px-6
        py-3
        rounded-xl
        font-semibold
        "
      >

        <Save size={18} />

        {loading
          ? "Updating..."
          : "Update User"}

      </button>



    </form>

  );

}