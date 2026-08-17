"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Mail,
  Lock,
  User,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

type VerificationMethod = "phone" | "email";

export default function RegisterPage() {
  const router = useRouter();

  ////////////////////////////////////////////////////////////
  // FORM STATE
  ////////////////////////////////////////////////////////////

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [verificationMethod, setVerificationMethod] =
    useState<VerificationMethod>("phone");

  ////////////////////////////////////////////////////////////
  // OTP STATE
  ////////////////////////////////////////////////////////////

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  ////////////////////////////////////////////////////////////
  // VERIFIED USER STATE
  //
  // OTP verification creates/resolves the canonical User.
  // Keep the userId so the SAME User is completed by register API.
  ////////////////////////////////////////////////////////////

  const [verifiedUserId, setVerifiedUserId] =
    useState<string | null>(null);

  ////////////////////////////////////////////////////////////
  // UI STATE
  ////////////////////////////////////////////////////////////

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);

  ////////////////////////////////////////////////////////////
  // HELPERS
  ////////////////////////////////////////////////////////////

  function normalizedEmail() {
    return email.trim().toLowerCase();
  }

  function normalizedPhone() {
    return phone.trim();
  }

  function clearMessages() {
    setError("");
    setSuccess("");
  }

  ////////////////////////////////////////////////////////////
  // VALIDATE REGISTRATION DETAILS
  ////////////////////////////////////////////////////////////

  function validateDetails(): boolean {
    if (!name.trim()) {
      setError("Name is required");
      return false;
    }

    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        normalizedEmail()
      )
    ) {
      setError("Enter a valid email address");
      return false;
    }

    if (!phone.trim()) {
      setError(
        "Enter your phone number with country code"
      );
      return false;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters"
      );
      return false;
    }

    return true;
  }

  ////////////////////////////////////////////////////////////
  // SEND SIGNUP OTP
  ////////////////////////////////////////////////////////////

  async function handleSendOtp() {
    clearMessages();

    if (!validateDetails()) {
      return;
    }

    if (
      sendingOtp ||
      verifyingOtp ||
      resendingOtp
    ) {
      return;
    }

    setSendingOtp(true);

    try {
      const payload =
        verificationMethod === "phone"
          ? {
              channel: "phone",
              phone: normalizedPhone(),
              purpose: "signup",
            }
          : {
              channel: "email",
              email: normalizedEmail(),
              purpose: "signup",
            };

      const response = await fetch(
        "/api/auth/otp/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.error ||
            "Unable to send verification code"
        );

        return;
      }

      ////////////////////////////////////////////////////////
      // RESET VERIFICATION STATE
      ////////////////////////////////////////////////////////

      setOtp("");
      setVerifiedUserId(null);
      setOtpSent(true);

      setExpiresAt(
        data.expiresAt || null
      );

      setSuccess(
        verificationMethod === "phone"
          ? "Verification code sent to your phone"
          : "Verification code sent to your email"
      );
    } catch (error) {
      console.error(
        "SEND SIGNUP OTP ERROR:",
        error
      );

      setError(
        "Unable to send verification code"
      );
    } finally {
      setSendingOtp(false);
    }
  }

  ////////////////////////////////////////////////////////////
  // VERIFY OTP
  //
  // IMPORTANT:
  //
  // 1. OTP API creates/resolves canonical User.
  // 2. We receive user.id.
  // 3. Register API completes that SAME User.
  // 4. Phone OTP registration requires email verification
  //    through the verification link.
  // 5. Email OTP registration has already verified email,
  //    so automatic login is allowed.
  ////////////////////////////////////////////////////////////

  async function handleVerifyOtp(
    e: React.FormEvent
  ) {
    e.preventDefault();

    clearMessages();

    if (verifyingOtp) {
      return;
    }

    if (!otp || !/^\d{6}$/.test(otp)) {
      setError(
        "Enter the 6-digit verification code"
      );

      return;
    }

    setVerifyingOtp(true);

    try {
      ////////////////////////////////////////////////////////
      // STEP 1 — VERIFY OTP
      ////////////////////////////////////////////////////////

      const verifyPayload =
        verificationMethod === "phone"
          ? {
              channel: "phone",
              phone: normalizedPhone(),
              otp,
              purpose: "signup",
            }
          : {
              channel: "email",
              email: normalizedEmail(),
              otp,
              purpose: "signup",
            };

      const verifyResponse =
        await fetch(
          "/api/auth/otp/verify",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              verifyPayload
            ),
          }
        );

      const verifyData =
        await verifyResponse.json();

      if (
        !verifyResponse.ok ||
        !verifyData.success
      ) {
        setError(
          verifyData.error ||
            "Invalid or expired OTP"
        );

        return;
      }

      ////////////////////////////////////////////////////////
      // RESOLVE CANONICAL USER
      ////////////////////////////////////////////////////////

      const userId =
        verifyData.user?.id;

      if (!userId) {
        setError(
          "Verification completed, but the user account could not be resolved"
        );

        return;
      }

      ////////////////////////////////////////////////////////
      // KEEP USER ID
      ////////////////////////////////////////////////////////

      setVerifiedUserId(userId);

      ////////////////////////////////////////////////////////
      // STEP 2 — COMPLETE REGISTRATION
      //
      // Same canonical Prisma User.
      ////////////////////////////////////////////////////////

      const registerResponse =
        await fetch(
          "/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              userId,

              name: name.trim(),

              email: normalizedEmail(),

              password,

              phone: normalizedPhone(),

              channel:
                verificationMethod,
            }),
          }
        );

      const registerData =
        await registerResponse.json();

      if (
        !registerResponse.ok ||
        !registerData.success
      ) {
        setError(
          registerData.error ||
            "Account creation failed"
        );

        return;
      }

      ////////////////////////////////////////////////////////
      // STEP 3 — VERIFICATION LINK REQUIRED
      //
      // PHONE OTP:
      //
      // Phone is verified by OTP.
      // Email is still unverified.
      // Register API sends verification link.
      //
      // IMPORTANT:
      // Do NOT automatically sign in here.
      ////////////////////////////////////////////////////////

      if (
        registerData.verificationRequired === true
      ) {
        setSuccess(
          "Account created successfully. Please check your email and click the verification link to verify your account."
        );

        return;
      }

      ////////////////////////////////////////////////////////
      // STEP 4 — EMAIL OTP FLOW
      //
      // Email OTP already verified the email.
      // No verification link is required.
      // Automatic sign-in is allowed.
      ////////////////////////////////////////////////////////

      setSuccess(
        "Account created successfully. Signing you in..."
      );

      const loginResult =
        await signIn(
          "credentials",
          {
            email:
              normalizedEmail(),

            password,

            redirect: false,
          }
        );

      ////////////////////////////////////////////////////////
      // LOGIN FAILURE
      ////////////////////////////////////////////////////////

      if (
        !loginResult ||
        loginResult.error
      ) {
        setError(
          "Account was created, but automatic sign-in failed. Please sign in manually."
        );

        router.push("/login");

        return;
      }

      ////////////////////////////////////////////////////////
      // SUCCESS
      ////////////////////////////////////////////////////////

      router.push("/dashboard");
    } catch (error) {
      console.error(
        "VERIFY SIGNUP OTP ERROR:",
        error
      );

      setError(
        "Unable to complete registration"
      );
    } finally {
      setVerifyingOtp(false);
    }
  }

  ////////////////////////////////////////////////////////////
  // RESEND OTP
  ////////////////////////////////////////////////////////////

  async function handleResendOtp() {
    clearMessages();

    if (
      resendingOtp ||
      verifyingOtp
    ) {
      return;
    }

    setResendingOtp(true);

    try {
      const payload =
        verificationMethod === "phone"
          ? {
              channel: "phone",
              phone: normalizedPhone(),
              purpose: "signup",
            }
          : {
              channel: "email",
              email: normalizedEmail(),
              purpose: "signup",
            };

      const response =
        await fetch(
          "/api/auth/otp/send",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              payload
            ),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        setError(
          data.error ||
            "Unable to resend OTP"
        );

        return;
      }

      ////////////////////////////////////////////////////////
      // NEW OTP INVALIDATES OLD OTP
      ////////////////////////////////////////////////////////

      setOtp("");

      setExpiresAt(
        data.expiresAt || null
      );

      setVerifiedUserId(null);

      setSuccess(
        verificationMethod === "phone"
          ? "A new verification code has been sent to your phone"
          : "A new verification code has been sent to your email"
      );
    } catch (error) {
      console.error(
        "RESEND SIGNUP OTP ERROR:",
        error
      );

      setError(
        "Unable to resend verification code"
      );
    } finally {
      setResendingOtp(false);
    }
  }

  ////////////////////////////////////////////////////////////
  // BACK TO DETAILS
  ////////////////////////////////////////////////////////////

  function goBackToDetails() {
    setOtpSent(false);
    setOtp("");
    setExpiresAt(null);
    setVerifiedUserId(null);

    clearMessages();
  }

  ////////////////////////////////////////////////////////////
  // CHANGE VERIFICATION METHOD
  ////////////////////////////////////////////////////////////

  function changeVerificationMethod(
    method: VerificationMethod
  ) {
    if (otpSent) {
      return;
    }

    setVerificationMethod(method);
    clearMessages();
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
        py-10
      "
    >
      {/* Background glow */}

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

      <div
        className="
          absolute
          bottom-0
          right-0
          h-[350px]
          w-[350px]
          rounded-full
          bg-[#163C80]/20
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
            backdrop-blur-xl
          "
        >
          {/* Header */}

          <div className="mb-8 text-center">
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
              NationPath
            </div>

            <h1
              className="
                mt-4
                text-3xl
                font-bold
                text-white
              "
            >
              {otpSent
                ? verificationMethod ===
                  "phone"
                  ? "Verify Your Phone"
                  : "Verify Your Email"
                : "Create Account"}
            </h1>

            <p
              className="
                mt-2
                text-gray-400
              "
            >
              {otpSent
                ? `Enter the verification code sent to your ${
                    verificationMethod ===
                    "phone"
                      ? "phone"
                      : "email"
                  }`
                : "Start your personalized NationPath journey"}
            </p>
          </div>

          {/* ================================================= */}
          {/* STEP 1 — ACCOUNT DETAILS                         */}
          {/* ================================================= */}

          {!otpSent && (
            <div className="space-y-4">
              {/* Name */}

              <div className="relative">
                <User
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
                  autoComplete="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
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
                    placeholder:text-gray-500
                    focus:border-[#C6A15B]
                  "
                />
              </div>

              {/* Email */}

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
                  autoComplete="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
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
                    placeholder:text-gray-500
                    focus:border-[#C6A15B]
                  "
                />
              </div>

              {/* Phone */}

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
                  autoComplete="tel"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
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
                    placeholder:text-gray-500
                    focus:border-[#C6A15B]
                  "
                />

                <p
                  className="
                    mt-1
                    px-1
                    text-xs
                    text-gray-500
                  "
                >
                  Include your country code
                </p>
              </div>

              {/* Verification Method */}

              <div className="pt-2">
                <p
                  className="
                    mb-3
                    text-sm
                    font-medium
                    text-gray-300
                  "
                >
                  Verify your account using
                </p>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-3
                  "
                >
                  {/* PHONE */}

                  <button
                    type="button"
                    onClick={() =>
                      changeVerificationMethod(
                        "phone"
                      )
                    }
                    className={`
                      rounded-xl
                      border
                      p-3
                      text-left
                      transition
                      ${
                        verificationMethod ===
                        "phone"
                          ? "border-[#C6A15B] bg-[#C6A15B]/10 text-white"
                          : "border-white/10 bg-black/20 text-gray-400 hover:border-white/20"
                      }
                    `}
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <Phone size={18} />

                      <span className="font-medium">
                        Phone
                      </span>
                    </div>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-gray-500
                      "
                    >
                      OTP via SMS
                    </p>
                  </button>

                  {/* EMAIL */}

                  <button
                    type="button"
                    onClick={() =>
                      changeVerificationMethod(
                        "email"
                      )
                    }
                    className={`
                      rounded-xl
                      border
                      p-3
                      text-left
                      transition
                      ${
                        verificationMethod ===
                        "email"
                          ? "border-[#C6A15B] bg-[#C6A15B]/10 text-white"
                          : "border-white/10 bg-black/20 text-gray-400 hover:border-white/20"
                      }
                    `}
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <Mail size={18} />

                      <span className="font-medium">
                        Email
                      </span>
                    </div>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-gray-500
                      "
                    >
                      OTP via email
                    </p>
                  </button>
                </div>
              </div>

              {/* Password */}

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
                  autoComplete="new-password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
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
                    placeholder:text-gray-500
                    focus:border-[#C6A15B]
                  "
                />

                <p
                  className="
                    mt-1
                    px-1
                    text-xs
                    text-gray-500
                  "
                >
                  Minimum 6 characters
                </p>
              </div>

              {/* Send OTP */}

              <button
                type="button"
                disabled={sendingOtp}
                onClick={handleSendOtp}
                className="
                  w-full
                  rounded-xl
                  bg-[#C6A15B]
                  py-3
                  font-semibold
                  text-[#070B1A]
                  transition
                  hover:bg-[#D5B978]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {sendingOtp
                  ? "Sending Code..."
                  : verificationMethod ===
                    "phone"
                    ? "Verify Phone & Continue"
                    : "Verify Email & Continue"}
              </button>

              {/* Google */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  py-2
                  text-sm
                  text-gray-500
                "
              >
                <div className="h-px flex-1 bg-white/10" />

                OR

                <div className="h-px flex-1 bg-white/10" />
              </div>

              <button
                type="button"
                onClick={() =>
                  signIn("google")
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
            </div>
          )}

          {/* ================================================= */}
          {/* STEP 2 — OTP                                    */}
          {/* ================================================= */}

          {otpSent && (
            <form
              onSubmit={handleVerifyOtp}
              className="space-y-5"
            >
              {/* Destination */}

              <div
                className="
                  rounded-2xl
                  border
                  border-[#C6A15B]/20
                  bg-[#C6A15B]/5
                  p-4
                  text-center
                "
              >
                <ShieldCheck
                  size={28}
                  className="
                    mx-auto
                    mb-2
                    text-[#C6A15B]
                  "
                />

                <p className="text-sm text-gray-300">
                  Verification code sent to your{" "}
                  {verificationMethod ===
                  "phone"
                    ? "phone"
                    : "email"}
                </p>

                <p
                  className="
                    mt-1
                    break-all
                    font-medium
                    text-white
                  "
                >
                  {verificationMethod ===
                  "phone"
                    ? phone
                    : email}
                </p>
              </div>

              {/* OTP */}

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
                  autoComplete="one-time-code"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6)
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
                    text-xl
                    tracking-[0.5em]
                    text-white
                    outline-none
                    placeholder:text-gray-500
                    focus:border-[#C6A15B]
                  "
                />
              </div>

              {/* Expiry */}

              {expiresAt && (
                <p
                  className="
                    text-center
                    text-xs
                    text-gray-500
                  "
                >
                  Code expires in 5 minutes
                </p>
              )}

              {/* Verify */}

              <button
                type="submit"
                disabled={
                  verifyingOtp ||
                  otp.length !== 6
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#C6A15B]
                  py-3
                  font-semibold
                  text-[#070B1A]
                  transition
                  hover:bg-[#D5B978]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {verifyingOtp ? (
                  <>
                    <RefreshCw
                      size={18}
                      className="animate-spin"
                    />

                    Creating Account...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />

                    Verify & Create Account
                  </>
                )}
              </button>

              {/* Actions */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <button
                  type="button"
                  disabled={verifyingOtp}
                  onClick={goBackToDetails}
                  className="
                    flex
                    items-center
                    gap-1
                    text-sm
                    text-gray-400
                    transition
                    hover:text-white
                    disabled:opacity-50
                  "
                >
                  <ArrowLeft size={16} />

                  Change details
                </button>

                <button
                  type="button"
                  disabled={
                    resendingOtp ||
                    verifyingOtp
                  }
                  onClick={handleResendOtp}
                  className="
                    flex
                    items-center
                    gap-1
                    text-sm
                    text-[#C6A15B]
                    transition
                    hover:text-[#D5B978]
                    disabled:opacity-50
                  "
                >
                  <RefreshCw
                    size={15}
                    className={
                      resendingOtp
                        ? "animate-spin"
                        : ""
                    }
                  />

                  {resendingOtp
                    ? "Sending..."
                    : "Resend OTP"}
                </button>
              </div>
            </form>
          )}

          {/* ================================================= */}
          {/* ERROR                                            */}
          {/* ================================================= */}

          {error && (
            <div
              className="
                mt-5
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                p-3
                text-center
                text-sm
                text-red-400
              "
            >
              {error}
            </div>
          )}

          {/* ================================================= */}
          {/* SUCCESS                                          */}
          {/* ================================================= */}

          {success && (
            <div
              className="
                mt-5
                rounded-xl
                border
                border-green-500/20
                bg-green-500/10
                p-3
                text-center
                text-sm
                text-green-400
              "
            >
              {success}
            </div>
          )}

          {/* ================================================= */}
          {/* LOGIN                                            */}
          {/* ================================================= */}

          <p
            className="
              mt-6
              text-center
              text-sm
              text-gray-400
            "
          >
            Already have an account?

            <button
              type="button"
              onClick={() =>
                router.push("/login")
              }
              className="
                ml-1
                text-[#C6A15B]
                transition
                hover:text-[#D5B978]
              "
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}