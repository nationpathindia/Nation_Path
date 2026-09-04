"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  KeyRound,
} from "lucide-react";

type LoginMode = "password" | "otp";
type ResetChannel = "email" | "phone";

export default function LoginPage() {
  const router = useRouter();

  const [loginMode, setLoginMode] =
    useState<LoginMode>("password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  ////////////////////////////////////////////////////////////
  // FORGOT PASSWORD
  ////////////////////////////////////////////////////////////

  const [showReset, setShowReset] = useState(false);

  const [resetChannel, setResetChannel] =
    useState<ResetChannel>("email");

  const [resetEmail, setResetEmail] = useState("");
  const [resetPhone, setResetPhone] = useState("");

  const [resetOtp, setResetOtp] = useState("");
  const [resetOtpSent, setResetOtpSent] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [resetLoading, setResetLoading] = useState(false);

  ////////////////////////////////////////////////////////////
  // REDIRECT BY ROLE
  ////////////////////////////////////////////////////////////

  async function redirectByRole() {
    const session: any = await getSession();

    const role = session?.user?.role;

    if (
      role === "superadmin" ||
      role === "admin" ||
      role === "editor" ||
      role === "reporter" ||
      role === "advertiser"
    ) {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  }

  ////////////////////////////////////////////////////////////
  // EMAIL + PASSWORD LOGIN
  ////////////////////////////////////////////////////////////

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      await redirectByRole();
    } catch {
      setError("Unable to login. Please try again.");
      setLoading(false);
    }
  }

  ////////////////////////////////////////////////////////////
  // SEND PHONE LOGIN OTP
  ////////////////////////////////////////////////////////////

  async function handleSendOtp(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanPhone = phone.trim();

    if (!cleanPhone) {
      setError(
        "Enter your phone number with country code"
      );
      return;
    }

    setOtpLoading(true);

    try {
      const response = await fetch(
        "/api/auth/otp/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: cleanPhone,
            purpose: "login",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.success) {
        setError(
          data?.error ||
            "Unable to send OTP"
        );

        setOtpLoading(false);
        return;
      }

      setOtpSent(true);

      setSuccess(
        "OTP sent successfully."
      );
    } catch {
      setError(
        "Unable to send OTP. Please try again."
      );
    }

    setOtpLoading(false);
  }

  ////////////////////////////////////////////////////////////
  // PHONE OTP LOGIN
  ////////////////////////////////////////////////////////////

  async function handleOtpLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanPhone = phone.trim();
    const cleanOtp = otp.trim();

    if (!cleanPhone) {
      setError(
        "Enter your phone number with country code"
      );
      return;
    }

    if (!/^\d{6}$/.test(cleanOtp)) {
      setError("Enter the 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn(
        "credentials",
        {
          loginType: "otp",
          phone: cleanPhone,
          otp: cleanOtp,
          redirect: false,
        }
      );

      if (result?.error) {
        setError(
          result.error ===
            "CredentialsSignin"
            ? "Invalid or expired OTP"
            : result.error
        );

        setLoading(false);
        return;
      }

      await redirectByRole();
    } catch {
      setError(
        "Unable to verify OTP. Please try again."
      );

      setLoading(false);
    }
  }

  ////////////////////////////////////////////////////////////
  // SWITCH LOGIN MODE
  ////////////////////////////////////////////////////////////

  function switchLoginMode(
    mode: LoginMode
  ) {
    setLoginMode(mode);

    setError("");
    setSuccess("");

    setOtpSent(false);
    setOtp("");
  }

  ////////////////////////////////////////////////////////////
  // OPEN RESET PASSWORD
  ////////////////////////////////////////////////////////////

  function openResetPassword() {
    setShowReset(true);

    setError("");
    setSuccess("");

    setResetOtpSent(false);
    setResetOtp("");

    setNewPassword("");
    setConfirmPassword("");
  }

  ////////////////////////////////////////////////////////////
  // CLOSE RESET PASSWORD
  ////////////////////////////////////////////////////////////

  function closeResetPassword() {
    setShowReset(false);

    setError("");
    setSuccess("");

    setResetOtpSent(false);
    setResetOtp("");

    setNewPassword("");
    setConfirmPassword("");
  }

  ////////////////////////////////////////////////////////////
  // SWITCH RESET CHANNEL
  ////////////////////////////////////////////////////////////

  function switchResetChannel(
    channel: ResetChannel
  ) {
    setResetChannel(channel);

    setError("");
    setSuccess("");

    setResetOtpSent(false);
    setResetOtp("");
  }

  ////////////////////////////////////////////////////////////
  // SEND RESET OTP
  // EMAIL OR PHONE
  ////////////////////////////////////////////////////////////

  async function handleSendResetOtp(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail =
      resetEmail.trim().toLowerCase();

    const cleanPhone =
      resetPhone.trim();

    if (
      resetChannel === "email" &&
      !cleanEmail
    ) {
      setError(
        "Enter your email address"
      );
      return;
    }

    if (
      resetChannel === "phone" &&
      !cleanPhone
    ) {
      setError(
        "Enter your phone number with country code"
      );
      return;
    }

    setResetLoading(true);

    try {
      const body =
        resetChannel === "email"
          ? {
              channel: "email",
              email: cleanEmail,
              purpose: "reset_password",
            }
          : {
              channel: "phone",
              phone: cleanPhone,
              purpose: "reset_password",
            };

      const response = await fetch(
        "/api/auth/otp/send",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data?.success
      ) {
        setError(
          data?.error ||
            "Unable to send reset OTP"
        );

        setResetLoading(false);
        return;
      }

      setResetOtpSent(true);

      setSuccess(
        `Reset OTP sent successfully to your ${
          resetChannel === "email"
            ? "email"
            : "phone"
        }.`
      );
    } catch {
      setError(
        "Unable to send reset OTP. Please try again."
      );
    }

    setResetLoading(false);
  }

  ////////////////////////////////////////////////////////////
  // RESET PASSWORD
  ////////////////////////////////////////////////////////////

  async function handleResetPassword(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanOtp =
      resetOtp.trim();

    if (!/^\d{6}$/.test(cleanOtp)) {
      setError(
        "Enter the 6-digit OTP"
      );
      return;
    }

    if (
      newPassword.length < 8
    ) {
      setError(
        "Password must be at least 8 characters"
      );
      return;
    }

    if (
      newPassword.length > 128
    ) {
      setError(
        "Password must not exceed 128 characters"
      );
      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    setResetLoading(true);

    try {
      const body =
        resetChannel === "email"
          ? {
              channel: "email",
              email:
                resetEmail
                  .trim()
                  .toLowerCase(),
              otp: cleanOtp,
              purpose:
                "reset_password",
              newPassword,
            }
          : {
              channel: "phone",
              phone:
                resetPhone.trim(),
              otp: cleanOtp,
              purpose:
                "reset_password",
              newPassword,
            };

      const response = await fetch(
        "/api/auth/otp/verify",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data?.success
      ) {
        setError(
          data?.error ||
            "Unable to reset password"
        );

        setResetLoading(false);
        return;
      }

      setSuccess(
        "Password reset successfully. You can now login with your new password."
      );

      setResetOtpSent(false);
      setResetOtp("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setShowReset(false);
        setSuccess("");
        setLoginMode("password");
      }, 1800);
    } catch {
      setError(
        "Unable to reset password. Please try again."
      );
    }

    setResetLoading(false);
  }

  ////////////////////////////////////////////////////////////
  // UI
  ////////////////////////////////////////////////////////////

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#070B1A]
        flex
        items-center
        justify-center
        px-4
      "
    >
      <div
        className="
          absolute
          top-0
          left-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-[#C6A15B]/10
          blur-[120px]
        "
      />

      <div className="relative z-10 w-full max-w-md">
        <div
          className="
            rounded-3xl
            border
            border-[#C6A15B]/20
            bg-[#10152F]/90
            p-8
            shadow-2xl
          "
        >
          {/* HEADER */}

          <div className="text-center mb-8">
            <div
              className="
                mx-auto
                mb-5
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                border
                border-[#C6A15B]/30
                bg-[#C6A15B]/10
              "
            >
              <img
                src="/idlogo.png"
                alt="NationPath"
                className="h-14"
              />
            </div>

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                text-xs
                uppercase
                tracking-[0.35em]
                text-[#C6A15B]
              "
            >
              <Sparkles size={14} />

              NationPath-Complete Media Platfrom
            </div>

            <h1
              className="
                mt-4
                text-3xl
                font-bold
                text-white
              "
            >
              {showReset
                ? "Reset Password"
                : "Welcome Back"}
            </h1>

            <p
              className="
                mt-2
                text-gray-400
              "
            >
              {showReset
                ? "Securely recover your NationPath account"
                : "Continue your journey with NationPath"}
            </p>
          </div>

          {/* RESET PASSWORD */}

          {showReset ? (
            <>
              <div
                className="
                  mb-6
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-[#C6A15B]/20
                  bg-[#C6A15B]/5
                  p-4
                "
              >
                <KeyRound
                  size={22}
                  className="text-[#C6A15B]"
                />

                <p className="text-sm text-gray-300">
                  Reset using either your
                  email address or phone
                  number.
                </p>
              </div>

              {/* RESET CHANNEL */}

              <div
                className="
                  mb-6
                  grid
                  grid-cols-2
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  p-1
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    switchResetChannel(
                      "email"
                    )
                  }
                  className={`
                    rounded-lg
                    py-2.5
                    text-sm
                    font-medium
                    transition
                    ${
                      resetChannel ===
                      "email"
                        ? "bg-[#C6A15B] text-[#070B1A]"
                        : "text-gray-400 hover:text-white"
                    }
                  `}
                >
                  Email
                </button>

                <button
                  type="button"
                  onClick={() =>
                    switchResetChannel(
                      "phone"
                    )
                  }
                  className={`
                    rounded-lg
                    py-2.5
                    text-sm
                    font-medium
                    transition
                    ${
                      resetChannel ===
                      "phone"
                        ? "bg-[#C6A15B] text-[#070B1A]"
                        : "text-gray-400 hover:text-white"
                    }
                  `}
                >
                  Phone
                </button>
              </div>

              {!resetOtpSent ? (
                <form
                  onSubmit={
                    handleSendResetOtp
                  }
                  className="space-y-4"
                >
                  {resetChannel ===
                  "email" ? (
                    <div className="relative">
                      <Mail
                        size={20}
                        className="
                          absolute
                          left-3
                          top-3
                          text-[#C6A15B]
                        "
                      />

                      <input
                        required
                        type="email"
                        placeholder="Email Address"
                        value={resetEmail}
                        onChange={(e) =>
                          setResetEmail(
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          rounded-xl
                          border
                          border-white/10
                          bg-black/20
                          p-3
                          pl-10
                          text-white
                          outline-none
                          focus:border-[#C6A15B]
                        "
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <Phone
                        size={20}
                        className="
                          absolute
                          left-3
                          top-3
                          text-[#C6A15B]
                        "
                      />

                      <input
                        required
                        type="tel"
                        placeholder="+91 9876543210"
                        value={resetPhone}
                        onChange={(e) =>
                          setResetPhone(
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          rounded-xl
                          border
                          border-white/10
                          bg-black/20
                          p-3
                          pl-10
                          text-white
                          outline-none
                          focus:border-[#C6A15B]
                        "
                      />
                    </div>
                  )}

                  <button
                    disabled={
                      resetLoading
                    }
                    className="
                      w-full
                      rounded-xl
                      bg-[#C6A15B]
                      py-3
                      font-semibold
                      text-[#070B1A]
                      transition
                      hover:bg-[#D5B978]
                      disabled:opacity-60
                    "
                  >
                    {resetLoading
                      ? "Sending OTP..."
                      : "Send Reset OTP"}
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={
                    handleResetPassword
                  }
                  className="space-y-4"
                >
                  <div className="relative">
                    <ShieldCheck
                      size={20}
                      className="
                        absolute
                        left-3
                        top-3
                        text-[#C6A15B]
                      "
                    />

                    <input
                      required
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Enter 6-digit OTP"
                      value={resetOtp}
                      onChange={(e) =>
                        setResetOtp(
                          e.target.value.replace(
                            /\D/g,
                            ""
                          )
                        )
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-black/20
                        p-3
                        pl-10
                        text-center
                        tracking-[0.35em]
                        text-white
                        outline-none
                        focus:border-[#C6A15B]
                      "
                    />
                  </div>

                  <input
                    required
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-black/20
                      p-3
                      text-white
                      outline-none
                      focus:border-[#C6A15B]
                    "
                  />

                  <input
                    required
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-black/20
                      p-3
                      text-white
                      outline-none
                      focus:border-[#C6A15B]
                    "
                  />

                  <button
                    disabled={
                      resetLoading ||
                      resetOtp.length !==
                        6
                    }
                    className="
                      w-full
                      rounded-xl
                      bg-[#C6A15B]
                      py-3
                      font-semibold
                      text-[#070B1A]
                      transition
                      hover:bg-[#D5B978]
                      disabled:opacity-60
                    "
                  >
                    {resetLoading
                      ? "Resetting Password..."
                      : "Reset Password"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setResetOtpSent(
                        false
                      );
                      setResetOtp("");
                      setError("");
                      setSuccess("");
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      py-2
                      text-sm
                      text-gray-400
                      hover:text-white
                    "
                  >
                    <ArrowLeft
                      size={15}
                    />

                    Change{" "}
                    {resetChannel ===
                    "email"
                      ? "email"
                      : "phone"}
                  </button>
                </form>
              )}

              {/* BACK TO LOGIN */}

              <button
                type="button"
                onClick={
                  closeResetPassword
                }
                className="
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  text-sm
                  text-gray-400
                  hover:text-white
                "
              >
                <ArrowLeft size={15} />

                Back to login
              </button>
            </>
          ) : (
            <>
              {/* GOOGLE */}

              <button
                type="button"
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/login",
                  })
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/20
                  py-3
                  text-white
                  transition
                  hover:border-[#C6A15B]
                  hover:bg-white/5
                "
              >
                Continue with Google
              </button>

              {/* DIVIDER */}

              <div
                className="
                  my-6
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-gray-500
                "
              >
                <div className="h-px flex-1 bg-white/10" />

                OR

                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* LOGIN MODE SWITCH */}

              <div
                className="
                  mb-6
                  grid
                  grid-cols-2
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  p-1
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    switchLoginMode(
                      "password"
                    )
                  }
                  className={`
                    rounded-lg
                    py-2.5
                    text-sm
                    font-medium
                    transition
                    ${
                      loginMode ===
                      "password"
                        ? "bg-[#C6A15B] text-[#070B1A]"
                        : "text-gray-400 hover:text-white"
                    }
                  `}
                >
                  Email & Password
                </button>

                <button
                  type="button"
                  onClick={() =>
                    switchLoginMode(
                      "otp"
                    )
                  }
                  className={`
                    rounded-lg
                    py-2.5
                    text-sm
                    font-medium
                    transition
                    ${
                      loginMode === "otp"
                        ? "bg-[#C6A15B] text-[#070B1A]"
                        : "text-gray-400 hover:text-white"
                    }
                  `}
                >
                  Phone OTP
                </button>
              </div>

              {/* EMAIL LOGIN */}

              {loginMode ===
                "password" && (
                <form
                  onSubmit={
                    handleLogin
                  }
                  className="space-y-4"
                >
                  <div className="relative">
                    <Mail
                      size={20}
                      className="
                        absolute
                        left-3
                        top-3
                        text-[#C6A15B]
                      "
                    />

                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-black/20
                        p-3
                        pl-10
                        text-white
                        outline-none
                        focus:border-[#C6A15B]
                      "
                    />
                  </div>

                  <div className="relative">
                    <Lock
                      size={20}
                      className="
                        absolute
                        left-3
                        top-3
                        text-[#C6A15B]
                      "
                    />

                    <input
                      required
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-black/20
                        p-3
                        pl-10
                        text-white
                        outline-none
                        focus:border-[#C6A15B]
                      "
                    />
                  </div>

                  {/* FORGOT PASSWORD */}

                  <div className="text-right">
                    <button
                      type="button"
                      onClick={
                        openResetPassword
                      }
                      className="
                        text-sm
                        text-[#C6A15B]
                        transition
                        hover:text-[#D5B978]
                      "
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    disabled={loading}
                    className="
                      w-full
                      rounded-xl
                      bg-[#C6A15B]
                      py-3
                      font-semibold
                      text-[#070B1A]
                      transition
                      hover:bg-[#D5B978]
                      disabled:opacity-60
                    "
                  >
                    {loading
                      ? "Entering..."
                      : "Continue"}
                  </button>
                </form>
              )}

              {/* OTP LOGIN */}

              {loginMode === "otp" && (
                <>
                  {!otpSent ? (
                    <form
                      onSubmit={
                        handleSendOtp
                      }
                      className="space-y-4"
                    >
                      <div className="relative">
                        <Phone
                          size={20}
                          className="
                            absolute
                            left-3
                            top-3
                            text-[#C6A15B]
                          "
                        />

                        <input
                          required
                          type="tel"
                          placeholder="+91 9876543210"
                          value={phone}
                          onChange={(e) =>
                            setPhone(
                              e.target.value
                            )
                          }
                          className="
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            bg-black/20
                            p-3
                            pl-10
                            text-white
                            outline-none
                            focus:border-[#C6A15B]
                          "
                        />
                      </div>

                      <p className="text-xs text-gray-500">
                        Enter your phone
                        number with
                        country code.
                      </p>

                      <button
                        disabled={
                          otpLoading
                        }
                        className="
                          w-full
                          rounded-xl
                          bg-[#C6A15B]
                          py-3
                          font-semibold
                          text-[#070B1A]
                          transition
                          hover:bg-[#D5B978]
                          disabled:opacity-60
                        "
                      >
                        {otpLoading
                          ? "Sending OTP..."
                          : "Send OTP"}
                      </button>
                    </form>
                  ) : (
                    <form
                      onSubmit={
                        handleOtpLogin
                      }
                      className="space-y-4"
                    >
                      <div className="relative">
                        <ShieldCheck
                          size={20}
                          className="
                            absolute
                            left-3
                            top-3
                            text-[#C6A15B]
                          "
                        />

                        <input
                          required
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="Enter 6-digit OTP"
                          value={otp}
                          onChange={(e) =>
                            setOtp(
                              e.target.value.replace(
                                /\D/g,
                                ""
                              )
                            )
                          }
                          className="
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            bg-black/20
                            p-3
                            pl-10
                            text-center
                            tracking-[0.35em]
                            text-white
                            outline-none
                            focus:border-[#C6A15B]
                          "
                        />
                      </div>

                      <p className="text-center text-xs text-gray-500">
                        OTP sent to{" "}
                        <span className="text-gray-300">
                          {phone}
                        </span>
                      </p>

                      <button
                        disabled={
                          loading ||
                          otp.length !==
                            6
                        }
                        className="
                          w-full
                          rounded-xl
                          bg-[#C6A15B]
                          py-3
                          font-semibold
                          text-[#070B1A]
                          transition
                          hover:bg-[#D5B978]
                          disabled:opacity-60
                        "
                      >
                        {loading
                          ? "Verifying..."
                          : "Verify & Continue"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(
                            false
                          );
                          setOtp("");
                          setError("");
                          setSuccess("");
                        }}
                        className="
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          py-2
                          text-sm
                          text-gray-400
                          hover:text-white
                        "
                      >
                        <ArrowLeft
                          size={15}
                        />

                        Change phone
                        number
                      </button>
                    </form>
                  )}
                </>
              )}

              {/* MESSAGES */}

              {success && (
                <p
                  className="
                    mt-4
                    text-center
                    text-sm
                    text-emerald-400
                  "
                >
                  {success}
                </p>
              )}

              {error && (
                <p
                  className="
                    mt-4
                    text-center
                    text-sm
                    text-red-400
                  "
                >
                  {error}
                </p>
              )}

              {/* REGISTER */}

              <p
                className="
                  mt-6
                  text-center
                  text-sm
                  text-gray-400
                "
              >
                New to NationPath?

                <span
                  className="
                    ml-1
                    cursor-pointer
                    text-[#C6A15B]
                  "
                  onClick={() =>
                    router.push(
                      "/register"
                    )
                  }
                >
                  Create account
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}