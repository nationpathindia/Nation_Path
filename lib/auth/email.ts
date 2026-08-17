//////////////////////////////////////////////////////////////
// NATIONPATH AUTH EMAIL SERVICE
//
// LOCKED ENHANCED VERSION
//
// Responsibilities:
// - Authentication/security emails through Resend
// - OTP delivery
// - OTP + optional verification-link delivery
// - Verification-link delivery
// - Welcome email
// - Login/security notification
// - Professional NationPath branding
// - Plain-text fallback
//
// SECURITY:
// - Never expose RESEND_API_KEY
// - Never log plaintext OTP
// - Never log verification URLs/tokens
// - Never expose provider errors to clients
// - Verification token itself is never stored by this service
//
// Sender:
// NationPath Security <security@nationpathindia.com>
//////////////////////////////////////////////////////////////

import { Resend } from "resend";


//////////////////////////////////////////////////////////////
// CONFIG
//////////////////////////////////////////////////////////////

const RESEND_API_KEY =
  process.env.RESEND_API_KEY;

const SECURITY_EMAIL =
  process.env.SECURITY_EMAIL ||
  "security@nationpathindia.com";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://nationpathindia.com";


//////////////////////////////////////////////////////////////
// RESEND CLIENT
//////////////////////////////////////////////////////////////

if (!RESEND_API_KEY) {
  throw new Error(
    "RESEND_API_KEY is not configured"
  );
}

const resend =
  new Resend(RESEND_API_KEY);


//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

type LoginMethod =
  | "password"
  | "google"
  | "phone_otp"
  | "email_otp";


//////////////////////////////////////////////////////////////
// SHARED HELPERS
//////////////////////////////////////////////////////////////

function escapeHtml(
  value: string
): string {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function getSafeName(
  name?: string | null
): string {

  const value =
    String(name || "").trim();

  return value || "there";
}


function normalizeEmail(
  email: string
): string {

  return String(email || "")
    .trim()
    .toLowerCase();
}


function validateRecipient(
  email: string
): string {

  const recipient =
    normalizeEmail(email);

  if (!recipient) {
    throw new Error(
      "Recipient email is required"
    );
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      recipient
    )
  ) {
    throw new Error(
      "Invalid recipient email"
    );
  }

  return recipient;
}


function validateUrl(
  value: string,
  fieldName: string
): string {

  const url =
    String(value || "").trim();

  if (!url) {
    throw new Error(
      `${fieldName} is required`
    );
  }

  try {

    const parsed =
      new URL(url);

    if (
      parsed.protocol !== "https:" &&
      parsed.protocol !== "http:"
    ) {
      throw new Error(
        "Invalid protocol"
      );
    }

    return url;

  } catch {

    throw new Error(
      `${fieldName} is invalid`
    );

  }
}


function getLoginMethodLabel(
  method?: LoginMethod
): string {

  switch (method) {

    case "password":
      return "Password";

    case "google":
      return "Google";

    case "phone_otp":
      return "Phone verification";

    case "email_otp":
      return "Email verification";

    default:
      return "Account sign-in";

  }
}


//////////////////////////////////////////////////////////////
// SHARED EMAIL LAYOUT
//////////////////////////////////////////////////////////////

function emailLayout({
  title,
  children,
}: {
  title: string;
  children: string;
}): string {

  return `
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>${escapeHtml(title)}</title>

</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f5f7fa;
    font-family:Arial,Helvetica,sans-serif;
    color:#172033;
  "
>

  <div
    style="
      max-width:560px;
      margin:0 auto;
      padding:32px 20px;
    "
  >

    <div
      style="
        background:#ffffff;
        border:1px solid #e5e7eb;
        border-radius:16px;
        overflow:hidden;
      "
    >

      <!-- HEADER -->

      <div
        style="
          padding:28px 32px;
          border-bottom:1px solid #eef0f3;
        "
      >

        <div
          style="
            font-size:22px;
            font-weight:700;
            color:#163C80;
            letter-spacing:-0.3px;
          "
        >
          NationPath India
        </div>

        <div
          style="
            margin-top:5px;
            font-size:12px;
            color:#8a93a1;
          "
        >
          News. Intelligence. India.
        </div>

      </div>

      <!-- CONTENT -->

      <div
        style="
          padding:32px;
        "
      >

        ${children}

      </div>

      <!-- FOOTER -->

      <div
        style="
          padding:22px 32px;
          background:#fafbfc;
          border-top:1px solid #eef0f3;
        "
      >

        <div
          style="
            font-size:12px;
            line-height:1.6;
            color:#8a93a1;
          "
        >

          This is an automated message from NationPath India.

          <br />

          Please do not reply to this email unless specifically instructed.

        </div>

        <div
          style="
            margin-top:10px;
            font-size:12px;
            color:#a0a7b2;
          "
        >
          © ${new Date().getFullYear()} NationPath India
        </div>

      </div>

    </div>

  </div>

</body>

</html>
`;

}


//////////////////////////////////////////////////////////////
// OTP EMAIL
//
// Supports:
//
// 1. OTP only
//
// 2. OTP + verification link
//
// Existing callers remain compatible because
// verificationUrl is optional.
//
// IMPORTANT:
// - OTP is only used in email content.
// - verification URL is never logged.
// - Raw verification token is never stored here.
//////////////////////////////////////////////////////////////

export async function sendOtpEmail({
  email,
  otp,
  expiresInMinutes = 5,
  verificationUrl,
}: {
  email: string;
  otp: string;
  expiresInMinutes?: number;
  verificationUrl?: string;
}) {

  const recipient =
    validateRecipient(email);


  ////////////////////////////////////////////////////////////
  // OTP VALIDATION
  ////////////////////////////////////////////////////////////

  if (
    !/^\d{6}$/.test(otp)
  ) {

    throw new Error(
      "Invalid OTP"
    );

  }


  ////////////////////////////////////////////////////////////
  // OPTIONAL VERIFICATION URL
  ////////////////////////////////////////////////////////////

  let safeVerificationUrl:
    string | null = null;

  if (verificationUrl) {

    safeVerificationUrl =
      validateUrl(
        verificationUrl,
        "Verification URL"
      );

  }


  ////////////////////////////////////////////////////////////
  // OPTIONAL VERIFICATION CONTENT
  ////////////////////////////////////////////////////////////

  const verificationText =
    safeVerificationUrl
      ? `

Verify your email address:
${safeVerificationUrl}

This verification link is intended to complete your email verification.
`
      : "";


  const verificationHtml =
    safeVerificationUrl
      ? `

          <div
            style="
              margin:30px 0 0;
              padding-top:28px;
              border-top:1px solid #eef0f3;
            "
          >

            <h2
              style="
                margin:0 0 10px;
                font-size:19px;
                line-height:1.4;
                color:#172033;
              "
            >
              Verify your email address
            </h2>

            <p
              style="
                margin:0 0 20px;
                font-size:14px;
                line-height:1.7;
                color:#5b6472;
              "
            >
              You can also verify your email directly
              using the secure button below.
            </p>

            <div
              style="
                text-align:center;
                margin:22px 0;
              "
            >

              <a
                href="${escapeHtml(
                  safeVerificationUrl
                )}"
                style="
                  display:inline-block;
                  padding:14px 24px;
                  background:#163C80;
                  color:#ffffff;
                  text-decoration:none;
                  border-radius:8px;
                  font-size:15px;
                  font-weight:700;
                "
              >
                Verify Email Address
              </a>

            </div>

            <p
              style="
                margin:20px 0 0;
                font-size:12px;
                line-height:1.6;
                color:#8a93a1;
              "
            >
              If the button does not work, open this link:
            </p>

            <p
              style="
                margin:8px 0 0;
                font-size:12px;
                line-height:1.6;
                word-break:break-all;
                color:#163C80;
              "
            >
              ${escapeHtml(
                safeVerificationUrl
              )}
            </p>

          </div>

        `
      : "";


  ////////////////////////////////////////////////////////////
  // SEND
  ////////////////////////////////////////////////////////////

  try {

    const result =
      await resend.emails.send({

        from:
          `NationPath Security <${SECURITY_EMAIL}>`,

        to:
          recipient,

        subject:
          safeVerificationUrl
            ? "Your NationPath verification code and email link"
            : "Your NationPath verification code",

        text:
`Your NationPath verification code is: ${otp}

This code expires in ${expiresInMinutes} minutes.
${verificationText}
If you did not request this code, you can safely ignore this email.

For your security, never share this verification code with anyone.

— NationPath Security`,

        html:
          emailLayout({

            title:
              safeVerificationUrl
                ? "NationPath Verification"
                : "NationPath Verification Code",

            children: `

          <h1
            style="
              margin:0 0 12px;
              font-size:26px;
              line-height:1.3;
              color:#172033;
            "
          >
            Your verification code
          </h1>

          <p
            style="
              margin:0 0 24px;
              font-size:15px;
              line-height:1.7;
              color:#5b6472;
            "
          >
            Use the verification code below to continue
            securely with your NationPath account.
          </p>

          <!-- OTP -->

          <div
            style="
              margin:24px 0;
              padding:22px;
              text-align:center;
              background:#f5f7fa;
              border:1px solid #e5e7eb;
              border-radius:12px;
            "
          >

            <div
              style="
                font-size:12px;
                color:#8a93a1;
                margin-bottom:10px;
                letter-spacing:0.5px;
                text-transform:uppercase;
              "
            >
              Verification Code
            </div>

            <div
              style="
                font-size:34px;
                line-height:1;
                font-weight:700;
                letter-spacing:8px;
                color:#163C80;
              "
            >
              ${escapeHtml(otp)}
            </div>

          </div>

          <p
            style="
              margin:0 0 12px;
              font-size:14px;
              line-height:1.6;
              color:#5b6472;
            "
          >
            This code expires in
            <strong>
              ${expiresInMinutes} minutes
            </strong>.
          </p>

          ${verificationHtml}

          <!-- SECURITY -->

          <div
            style="
              margin-top:28px;
              padding:16px;
              background:#fff8f3;
              border-left:4px solid #EA661B;
              border-radius:8px;
              font-size:13px;
              line-height:1.6;
              color:#6b7280;
            "
          >

            <strong style="color:#172033;">
              Security reminder:
            </strong>

            Never share your verification code.
            NationPath Security will never ask you
            for your OTP.

          </div>

          <p
            style="
              margin:18px 0 0;
              font-size:13px;
              line-height:1.6;
              color:#8a93a1;
            "
          >
            If you did not request this code,
            you can safely ignore this email.
          </p>

        `,
          }),

      });


    //////////////////////////////////////////////////////////
    // RESEND ERROR
    //////////////////////////////////////////////////////////

    if (result.error) {

      console.error(
        "AUTH EMAIL DELIVERY ERROR:",
        result.error
      );

      throw new Error(
        "Unable to send authentication email"
      );

    }


    //////////////////////////////////////////////////////////
    // SUCCESS
    //////////////////////////////////////////////////////////

    return {

      success: true,

      id:
        result.data?.id ||
        null,

    };


  } catch (error) {

    console.error(
      "AUTH EMAIL SEND ERROR:",
      error
    );

    throw new Error(
      "Unable to send authentication email"
    );

  }

}


//////////////////////////////////////////////////////////////
// VERIFICATION LINK EMAIL
//////////////////////////////////////////////////////////////

export async function sendVerificationLinkEmail({
  email,
  name,
  verificationUrl,
}: {
  email: string;
  name?: string | null;
  verificationUrl: string;
}) {

  const recipient =
    validateRecipient(email);

  const safeUrl =
    validateUrl(
      verificationUrl,
      "Verification URL"
    );

  const safeName =
    escapeHtml(
      getSafeName(name)
    );


  try {

    const result =
      await resend.emails.send({

        from:
          `NationPath Security <${SECURITY_EMAIL}>`,

        to:
          recipient,

        subject:
          "Verify your NationPath email address",

        text:
`Hi ${getSafeName(name)},

Please verify your email address to complete your NationPath account setup.

Verify your email:
${safeUrl}

If you did not create this account, you can safely ignore this email.

— NationPath Security`,

        html:
          emailLayout({

            title:
              "Verify your NationPath email",

            children: `

          <h1
            style="
              margin:0 0 12px;
              font-size:26px;
              color:#172033;
            "
          >
            Verify your email
          </h1>

          <p
            style="
              margin:0 0 24px;
              font-size:15px;
              line-height:1.7;
              color:#5b6472;
            "
          >
            Hi ${safeName},
            <br /><br />

            Please verify your email address to complete
            your NationPath account setup.
          </p>

          <div
            style="
              text-align:center;
              margin:28px 0;
            "
          >

            <a
              href="${escapeHtml(safeUrl)}"
              style="
                display:inline-block;
                padding:14px 24px;
                background:#163C80;
                color:#ffffff;
                text-decoration:none;
                border-radius:8px;
                font-size:15px;
                font-weight:700;
              "
            >
              Verify Email Address
            </a>

          </div>

          <p
            style="
              margin:24px 0 0;
              font-size:13px;
              line-height:1.6;
              color:#8a93a1;
            "
          >
            If the button does not work, open this link:
          </p>

          <p
            style="
              margin:8px 0 0;
              font-size:12px;
              line-height:1.6;
              word-break:break-all;
              color:#163C80;
            "
          >
            ${escapeHtml(safeUrl)}
          </p>

          <p
            style="
              margin:24px 0 0;
              font-size:13px;
              line-height:1.6;
              color:#8a93a1;
            "
          >
            If you did not create this account,
            you can safely ignore this email.
          </p>

        `,
          }),

      });


    if (result.error) {

      console.error(
        "VERIFICATION EMAIL DELIVERY ERROR:",
        result.error
      );

      throw new Error(
        "Unable to send verification email"
      );

    }


    return {

      success: true,

      id:
        result.data?.id ||
        null,

    };


  } catch (error) {

    console.error(
      "VERIFICATION EMAIL SEND ERROR:",
      error
    );

    throw new Error(
      "Unable to send verification email"
    );

  }

}


//////////////////////////////////////////////////////////////
// WELCOME EMAIL
//
// IMPORTANT:
// Send ONLY after successful account creation.
// Do NOT send on every login.
//////////////////////////////////////////////////////////////

export async function sendWelcomeEmail({
  email,
  name,
}: {
  email: string;
  name?: string | null;
}) {

  const recipient =
    validateRecipient(email);

  const safeName =
    escapeHtml(
      getSafeName(name)
    );


  try {

    const result =
      await resend.emails.send({

        from:
          `NationPath India <${SECURITY_EMAIL}>`,

        to:
          recipient,

        subject:
          "Welcome to NationPath India 🇮🇳",

        text:
`Welcome to NationPath India, ${getSafeName(name)}.

Your account has been created successfully.

You can now explore NationPath news, stories, intelligence and more.

Visit NationPath India:
${APP_URL}

We're glad to have you with us.

— NationPath India`,

        html:
          emailLayout({

            title:
              "Welcome to NationPath India",

            children: `

          <div
            style="
              margin-bottom:18px;
              font-size:32px;
            "
          >
            🇮🇳
          </div>

          <h1
            style="
              margin:0 0 12px;
              font-size:28px;
              line-height:1.3;
              color:#172033;
            "
          >
            Welcome to NationPath,
            ${safeName}
          </h1>

          <p
            style="
              margin:0 0 22px;
              font-size:16px;
              line-height:1.7;
              color:#5b6472;
            "
          >
            Your NationPath account has been created
            successfully.
          </p>

          <div
            style="
              margin:24px 0;
              padding:20px;
              background:#f5f7fa;
              border-radius:12px;
              border:1px solid #e5e7eb;
            "
          >

            <div
              style="
                font-size:15px;
                line-height:1.7;
                color:#5b6472;
              "
            >
              Explore trusted news, stories and
              intelligent experiences built for India.
            </div>

          </div>

          <div
            style="
              text-align:center;
              margin:30px 0;
            "
          >

            <a
              href="${escapeHtml(APP_URL)}"
              style="
                display:inline-block;
                padding:14px 26px;
                background:#163C80;
                color:#ffffff;
                text-decoration:none;
                border-radius:8px;
                font-size:15px;
                font-weight:700;
              "
            >
              Explore NationPath
            </a>

          </div>

          <p
            style="
              margin:0;
              font-size:14px;
              line-height:1.7;
              color:#5b6472;
            "
          >
            We're glad to have you with us.
          </p>

        `,
          }),

      });


    if (result.error) {

      console.error(
        "WELCOME EMAIL DELIVERY ERROR:",
        result.error
      );

      throw new Error(
        "Unable to send welcome email"
      );

    }


    return {

      success: true,

      id:
        result.data?.id ||
        null,

    };


  } catch (error) {

    console.error(
      "WELCOME EMAIL SEND ERROR:",
      error
    );

    throw new Error(
      "Unable to send welcome email"
    );

  }

}


//////////////////////////////////////////////////////////////
// LOGIN SECURITY EMAIL
//
// IMPORTANT:
// - Send after a successful login if enabled.
// - Do NOT automatically send on every OTP request.
// - Useful for password, Google and OTP sign-ins.
//////////////////////////////////////////////////////////////

export async function sendLoginSecurityEmail({
  email,
  name,
  loginMethod,
}: {
  email: string;
  name?: string | null;
  loginMethod?: LoginMethod;
}) {

  const recipient =
    validateRecipient(email);

  const safeName =
    escapeHtml(
      getSafeName(name)
    );

  const methodLabel =
    getLoginMethodLabel(
      loginMethod
    );


  try {

    const result =
      await resend.emails.send({

        from:
          `NationPath Security <${SECURITY_EMAIL}>`,

        to:
          recipient,

        subject:
          "Your NationPath account was accessed",

        text:
`Hi ${getSafeName(name)},

Your NationPath account was successfully accessed.

Sign-in method: ${methodLabel}

If this was you, no action is required.

If you do not recognize this activity, please secure your account immediately.

NationPath:
${APP_URL}

— NationPath Security`,

        html:
          emailLayout({

            title:
              "NationPath Account Access",

            children: `

          <h1
            style="
              margin:0 0 12px;
              font-size:25px;
              color:#172033;
            "
          >
            Account access confirmed
          </h1>

          <p
            style="
              margin:0 0 24px;
              font-size:15px;
              line-height:1.7;
              color:#5b6472;
            "
          >
            Hi ${safeName},
            <br /><br />

            Your NationPath account was successfully
            accessed.
          </p>

          <div
            style="
              padding:18px;
              background:#f5f7fa;
              border:1px solid #e5e7eb;
              border-radius:10px;
              font-size:14px;
              line-height:1.6;
              color:#5b6472;
            "
          >

            <strong style="color:#172033;">
              Sign-in method:
            </strong>

            ${escapeHtml(methodLabel)}

            <br /><br />

            If this was you, no action is required.

          </div>

          <p
            style="
              margin:22px 0 0;
              font-size:14px;
              line-height:1.7;
              color:#5b6472;
            "
          >
            If you do not recognize this activity,
            please secure your account immediately.
          </p>

          <div
            style="
              text-align:center;
              margin-top:28px;
            "
          >

            <a
              href="${escapeHtml(APP_URL)}"
              style="
                display:inline-block;
                padding:13px 22px;
                background:#163C80;
                color:#ffffff;
                text-decoration:none;
                border-radius:8px;
                font-size:14px;
                font-weight:700;
              "
            >
              Open NationPath
            </a>

          </div>

        `,
          }),

      });


    if (result.error) {

      console.error(
        "LOGIN SECURITY EMAIL DELIVERY ERROR:",
        result.error
      );

      throw new Error(
        "Unable to send login security email"
      );

    }


    return {

      success: true,

      id:
        result.data?.id ||
        null,

    };


  } catch (error) {

    console.error(
      "LOGIN SECURITY EMAIL SEND ERROR:",
      error
    );

    throw new Error(
      "Unable to send login security email"
    );

  }

}