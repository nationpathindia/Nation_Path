//////////////////////////////////////////////////////////////
// NATIONPATH AUTH + SYSTEM EMAIL TEMPLATES
//
// LOCKED VERSION
//
// Responsibilities:
// - Professional NationPath email templates
// - OTP verification
// - Welcome email
// - Login security email
// - Contact acknowledgement / auto-reply
//
// IMPORTANT:
// - NO Resend delivery logic here
// - NO database logic here
// - NO authentication logic here
// - Templates only
// - OTP is never stored here
// - OTP is only rendered into the outgoing email
//
// Delivery remains inside:
//   lib/auth/email.ts
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export type AuthEmailTemplate = {
  subject: string;
  html: string;
  text: string;
};


export type ContactAutoReplyTemplate = {
  subject: string;
  html: string;
  text: string;
};


//////////////////////////////////////////////////////////////
// BRAND CONFIG
//////////////////////////////////////////////////////////////

const BRAND_NAME =
  "NationPath India";

const BRAND_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://nationpathindia.com";

const SECURITY_EMAIL =
  process.env.SECURITY_EMAIL ||
  "security@nationpathindia.com";

const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL ||
  "info@nationpathindia.com";


//////////////////////////////////////////////////////////////
// HTML ESCAPE
//
// Important for user-provided values such as:
// - name
// - subject
// - reference number
//
// Prevents user-controlled text from being inserted
// directly into HTML markup.
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


//////////////////////////////////////////////////////////////
// SHARED EMAIL SHELL
//////////////////////////////////////////////////////////////

function getEmailShell({
  preheader,
  content,
  footerText,
}: {
  preheader: string;
  content: string;
  footerText?: string;
}) {

  const safePreheader =
    escapeHtml(preheader);

  const safeFooterText =
    footerText
      ? escapeHtml(footerText)
      : "Security & Account Services";


  return `
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <meta
    name="color-scheme"
    content="light"
  />

  <meta
    name="supported-color-schemes"
    content="light"
  />

  <title>${BRAND_NAME}</title>

</head>


<body
  style="
    margin:0;
    padding:0;
    width:100%;
    background:#f5f7fa;
    font-family:Arial,Helvetica,sans-serif;
    color:#172033;
  "
>

  <!-- PREHEADER -->

  <div
    style="
      display:none;
      max-height:0;
      overflow:hidden;
      opacity:0;
      color:transparent;
      mso-hide:all;
    "
  >
    ${safePreheader}
  </div>


  <!-- OUTER -->

  <table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
      width:100%;
      background:#f5f7fa;
      margin:0;
      padding:0;
    "
  >

    <tr>

      <td
        align="center"
        style="
          padding:40px 16px;
        "
      >

        <!-- MAIN CONTAINER -->

        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width:560px;
            width:100%;
            background:#ffffff;
            border:1px solid #e5e7eb;
            border-radius:16px;
            overflow:hidden;
          "
        >

          <!-- BRAND -->

          <tr>

            <td
              style="
                padding:28px 32px;
                border-bottom:1px solid #eef0f3;
              "
            >

              <a
                href="${BRAND_URL}"
                style="
                  text-decoration:none;
                  color:#163C80;
                  font-size:22px;
                  font-weight:700;
                  letter-spacing:-0.3px;
                "
              >
                ${BRAND_NAME}
              </a>


              <div
                style="
                  margin-top:5px;
                  font-size:12px;
                  color:#8a93a1;
                  letter-spacing:0.2px;
                "
              >
                News. Intelligence. India.
              </div>

            </td>

          </tr>


          <!-- CONTENT -->

          <tr>

            <td
              style="
                padding:32px;
              "
            >

              ${content}

            </td>

          </tr>


          <!-- FOOTER -->

          <tr>

            <td
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

                ${safeFooterText}

                <br /><br />

                ${BRAND_NAME} will never ask you to
                share your password, OTP, or security
                credentials over email.

              </div>

            </td>

          </tr>

        </table>


        <!-- OUTER FOOTER -->

        <div
          style="
            max-width:560px;
            margin-top:18px;
            text-align:center;
            font-size:12px;
            line-height:1.6;
            color:#8a93a1;
          "
        >

          <a
            href="${BRAND_URL}"
            style="
              color:#163C80;
              text-decoration:none;
              font-weight:600;
            "
          >
            ${BRAND_NAME}
          </a>

          <br />

          ${CONTACT_EMAIL}

        </div>

      </td>

    </tr>

  </table>

</body>

</html>
`;
}


//////////////////////////////////////////////////////////////
// OTP EMAIL
//////////////////////////////////////////////////////////////

export function getOtpEmailTemplate({

  otp,

  expiresInMinutes = 5,

  purpose = "login",

}: {

  otp: string;

  expiresInMinutes?: number;

  purpose?:
    | "login"
    | "signup"
    | "verify_phone"
    | "verify_email"
    | "change_phone"
    | "change_email"
    | "reset_password";

}): AuthEmailTemplate {


  ////////////////////////////////////////////////////////////
  // OTP VALIDATION
  ////////////////////////////////////////////////////////////

  if (
    !/^\d{6}$/.test(
      String(otp || "")
    )
  ) {

    throw new Error(
      "Invalid OTP"
    );

  }


  ////////////////////////////////////////////////////////////
  // PURPOSE MESSAGE
  ////////////////////////////////////////////////////////////

  const purposeMessage =
    purpose === "signup"
      ? "to complete your NationPath account registration."
      : purpose === "verify_email"
      ? "to verify your email address."
      : purpose === "reset_password"
      ? "to reset your NationPath password."
      : purpose === "change_email"
      ? "to confirm your new email address."
      : purpose === "change_phone"
      ? "to confirm your phone number change."
      : "to securely continue signing in to your NationPath account.";


  ////////////////////////////////////////////////////////////
  // SUBJECT
  ////////////////////////////////////////////////////////////

  const subject =
    purpose === "signup"
      ? "Complete your NationPath registration"
      : purpose === "reset_password"
      ? "Your NationPath password reset code"
      : "Your NationPath verification code";


  ////////////////////////////////////////////////////////////
  // TEXT
  ////////////////////////////////////////////////////////////

  const text = `
${BRAND_NAME}

Your verification code

Use the verification code below ${purposeMessage}

Verification code: ${otp}

This code expires in ${expiresInMinutes} minutes.

For your security:

- Never share this code with anyone.
- NationPath will never ask you for your OTP.
- If you did not request this code, you can safely ignore this email.

${BRAND_NAME}
${BRAND_URL}
`.trim();


  ////////////////////////////////////////////////////////////
  // HTML
  ////////////////////////////////////////////////////////////

  const content = `

    <div
      style="
        font-size:12px;
        font-weight:700;
        color:#EA661B;
        text-transform:uppercase;
        letter-spacing:1px;
        margin-bottom:12px;
      "
    >
      Account Security
    </div>


    <h1
      style="
        margin:0 0 12px;
        font-size:28px;
        line-height:1.25;
        letter-spacing:-0.5px;
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
      Use the verification code below
      ${escapeHtml(purposeMessage)}
    </p>


    <!-- OTP -->

    <div
      style="
        margin:26px 0;
        padding:24px 16px;
        text-align:center;
        background:#f5f7fa;
        border:1px solid #e5e7eb;
        border-radius:12px;
      "
    >

      <div
        style="
          margin-bottom:10px;
          font-size:11px;
          font-weight:700;
          text-transform:uppercase;
          letter-spacing:1.5px;
          color:#8a93a1;
        "
      >
        Verification code
      </div>


      <div
        style="
          font-size:34px;
          line-height:1.2;
          font-weight:700;
          letter-spacing:9px;
          color:#163C80;
          padding-left:9px;
        "
      >
        ${otp}
      </div>

    </div>


    <!-- EXPIRY -->

    <p
      style="
        margin:0 0 22px;
        font-size:14px;
        line-height:1.6;
        color:#5b6472;
      "
    >

      This code expires in

      <strong
        style="
          color:#172033;
        "
      >
        ${expiresInMinutes} minutes
      </strong>.

    </p>


    <!-- SECURITY -->

    <div
      style="
        padding:16px;
        background:#fff8f3;
        border-left:4px solid #EA661B;
        border-radius:6px;
      "
    >

      <div
        style="
          margin-bottom:5px;
          font-size:13px;
          font-weight:700;
          color:#172033;
        "
      >
        Keep your account secure
      </div>


      <div
        style="
          font-size:13px;
          line-height:1.6;
          color:#5b6472;
        "
      >
        Never share this code with anyone.
        NationPath will never ask you to provide
        your OTP over phone, email, or chat.
      </div>

    </div>


    <p
      style="
        margin:24px 0 0;
        font-size:13px;
        line-height:1.6;
        color:#8a93a1;
      "
    >
      If you did not request this code, you can safely
      ignore this email. Your account remains protected.
    </p>

  `;


  return {

    subject,

    html:
      getEmailShell({
        preheader:
          `Your NationPath verification code. It expires in ${expiresInMinutes} minutes.`,
        content,
        footerText:
          "This is an automated authentication email from NationPath Security.",
      }),

    text,

  };

}


//////////////////////////////////////////////////////////////
// WELCOME EMAIL
//////////////////////////////////////////////////////////////

export function getWelcomeEmailTemplate({

  name,

}: {

  name?: string | null;

}): AuthEmailTemplate {


  const displayName =
    escapeHtml(
      name?.trim() ||
      "there"
    );


  const plainName =
    name?.trim() ||
    "there";


  ////////////////////////////////////////////////////////////
  // SUBJECT
  ////////////////////////////////////////////////////////////

  const subject =
    "Welcome to NationPath India";


  ////////////////////////////////////////////////////////////
  // TEXT
  ////////////////////////////////////////////////////////////

  const text = `
${BRAND_NAME}

Welcome, ${plainName}!

Your NationPath account has been successfully created and your identity has been verified.

You can now explore NationPath India and access your account using your verified credentials.

Visit NationPath:
${BRAND_URL}

Thank you for being part of NationPath India.

— NationPath Team
`.trim();


  ////////////////////////////////////////////////////////////
  // HTML
  ////////////////////////////////////////////////////////////

  const content = `

    <div
      style="
        font-size:12px;
        font-weight:700;
        color:#EA661B;
        text-transform:uppercase;
        letter-spacing:1px;
        margin-bottom:12px;
      "
    >
      Welcome to NationPath
    </div>


    <h1
      style="
        margin:0 0 14px;
        font-size:30px;
        line-height:1.25;
        letter-spacing:-0.6px;
        color:#172033;
      "
    >
      Welcome, ${displayName}!
    </h1>


    <p
      style="
        margin:0 0 20px;
        font-size:16px;
        line-height:1.7;
        color:#5b6472;
      "
    >
      Your NationPath account has been successfully
      created and your identity has been verified.
    </p>


    <div
      style="
        margin:26px 0;
        padding:20px;
        background:#f5f7fa;
        border:1px solid #e5e7eb;
        border-radius:12px;
      "
    >

      <div
        style="
          margin-bottom:8px;
          font-size:14px;
          font-weight:700;
          color:#163C80;
        "
      >
        Your NationPath journey starts here.
      </div>


      <div
        style="
          font-size:14px;
          line-height:1.7;
          color:#5b6472;
        "
      >
        Stay informed with trusted news, discover
        intelligent insights, and explore everything
        NationPath India has to offer.
      </div>

    </div>


    <!-- CTA -->

    <div
      style="
        margin:28px 0;
        text-align:center;
      "
    >

      <a
        href="${BRAND_URL}"
        style="
          display:inline-block;
          padding:13px 24px;
          background:#163C80;
          color:#ffffff;
          text-decoration:none;
          border-radius:8px;
          font-size:14px;
          font-weight:700;
        "
      >
        Explore NationPath
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
      Your account security matters to us.
      If you notice anything unusual, please contact
      ${escapeHtml(SECURITY_EMAIL)}.
    </p>

  `;


  return {

    subject,

    html:
      getEmailShell({
        preheader:
          `Welcome to ${BRAND_NAME}, ${plainName}!`,
        content,
        footerText:
          "Welcome to NationPath India.",
      }),

    text,

  };

}


//////////////////////////////////////////////////////////////
// LOGIN SECURITY EMAIL
//////////////////////////////////////////////////////////////

export function getLoginSecurityEmailTemplate({

  name,

  loginTime,

}: {

  name?: string | null;

  loginTime?: Date;

}): AuthEmailTemplate {


  const displayName =
    escapeHtml(
      name?.trim() ||
      "there"
    );


  const plainName =
    name?.trim() ||
    "there";


  const time =
    loginTime ||
    new Date();


  const formattedTime =
    time.toISOString();


  ////////////////////////////////////////////////////////////
  // SUBJECT
  ////////////////////////////////////////////////////////////

  const subject =
    "New sign-in to your NationPath account";


  ////////////////////////////////////////////////////////////
  // TEXT
  ////////////////////////////////////////////////////////////

  const text = `
${BRAND_NAME}

New sign-in detected

Hello ${plainName},

A new sign-in to your NationPath account was detected.

Time:
${formattedTime}

If this was you, no action is required.

If you do not recognize this activity, secure your account immediately and contact ${SECURITY_EMAIL}.

${BRAND_NAME}
${BRAND_URL}
`.trim();


  ////////////////////////////////////////////////////////////
  // HTML
  ////////////////////////////////////////////////////////////

  const content = `

    <div
      style="
        font-size:12px;
        font-weight:700;
        color:#EA661B;
        text-transform:uppercase;
        letter-spacing:1px;
        margin-bottom:12px;
      "
    >
      Account Security
    </div>


    <h1
      style="
        margin:0 0 14px;
        font-size:28px;
        line-height:1.25;
        letter-spacing:-0.5px;
        color:#172033;
      "
    >
      New sign-in detected
    </h1>


    <p
      style="
        margin:0 0 22px;
        font-size:15px;
        line-height:1.7;
        color:#5b6472;
      "
    >
      Hello ${displayName},
    </p>


    <p
      style="
        margin:0 0 22px;
        font-size:15px;
        line-height:1.7;
        color:#5b6472;
      "
    >
      A new sign-in to your NationPath account
      was detected.
    </p>


    <div
      style="
        margin:24px 0;
        padding:18px;
        background:#f5f7fa;
        border:1px solid #e5e7eb;
        border-radius:10px;
      "
    >

      <div
        style="
          margin-bottom:6px;
          font-size:12px;
          font-weight:700;
          text-transform:uppercase;
          letter-spacing:0.8px;
          color:#8a93a1;
        "
      >
        Sign-in time
      </div>


      <div
        style="
          font-size:14px;
          color:#172033;
          font-weight:600;
        "
      >
        ${escapeHtml(formattedTime)}
      </div>

    </div>


    <div
      style="
        padding:16px;
        background:#f1f7f3;
        border-left:4px solid #238636;
        border-radius:6px;
      "
    >

      <div
        style="
          font-size:13px;
          line-height:1.6;
          color:#4b5563;
        "
      >
        If this was you, no action is required.
      </div>

    </div>


    <p
      style="
        margin:24px 0 0;
        font-size:13px;
        line-height:1.7;
        color:#5b6472;
      "
    >
      If you do not recognize this activity,
      please secure your account and contact
      <strong>
        ${escapeHtml(SECURITY_EMAIL)}
      </strong>.
    </p>

  `;


  return {

    subject,

    html:
      getEmailShell({
        preheader:
          `A new sign-in to your ${BRAND_NAME} account was detected.`,
        content,
        footerText:
          "This is an automated account security notification.",
      }),

    text,

  };

}


//////////////////////////////////////////////////////////////
// CONTACT AUTO REPLY
//
// Sent to the person who submitted the contact/info form.
//
// IMPORTANT:
// - This is an acknowledgement only.
// - It does NOT promise a specific response time.
// - Reference number is optional.
// - User-controlled values are HTML escaped.
//////////////////////////////////////////////////////////////

export function getContactAutoReplyTemplate({

  name,

  referenceNumber,

}: {

  name?: string | null;

  referenceNumber?: string | null;

}): ContactAutoReplyTemplate {


  const displayName =
    name?.trim() ||
    "there";


  const safeName =
    escapeHtml(displayName);


  const safeReference =
    referenceNumber?.trim()
      ? escapeHtml(
          referenceNumber.trim()
        )
      : null;


  ////////////////////////////////////////////////////////////
  // SUBJECT
  ////////////////////////////////////////////////////////////

  const subject =
    safeReference
      ? `We received your message — ${referenceNumber}`
      : "We received your message — NationPath India";


  ////////////////////////////////////////////////////////////
  // TEXT
  ////////////////////////////////////////////////////////////

  const textReference =
    referenceNumber?.trim()
      ? `Reference number: ${referenceNumber.trim()}`
      : "";


  const text = `
${BRAND_NAME}

Thanks for reaching out, ${displayName}.

We have received your message and our team will review it.

${textReference}

Please keep this email for your records. If we need any additional information, our team may contact you.

For further assistance:
${CONTACT_EMAIL}

Visit NationPath:
${BRAND_URL}

Thank you for contacting ${BRAND_NAME}.

— NationPath India Team
`.trim();


  ////////////////////////////////////////////////////////////
  // REFERENCE BLOCK
  ////////////////////////////////////////////////////////////

  const referenceBlock =
    safeReference
      ? `

        <div
          style="
            margin:24px 0;
            padding:16px;
            background:#f5f7fa;
            border:1px solid #e5e7eb;
            border-radius:10px;
          "
        >

          <div
            style="
              margin-bottom:6px;
              font-size:11px;
              font-weight:700;
              text-transform:uppercase;
              letter-spacing:1px;
              color:#8a93a1;
            "
          >
            Reference number
          </div>

          <div
            style="
              font-size:15px;
              font-weight:700;
              color:#163C80;
            "
          >
            ${safeReference}
          </div>

        </div>

      `
      : "";


  ////////////////////////////////////////////////////////////
  // HTML CONTENT
  ////////////////////////////////////////////////////////////

  const content = `

    <div
      style="
        font-size:12px;
        font-weight:700;
        color:#EA661B;
        text-transform:uppercase;
        letter-spacing:1px;
        margin-bottom:12px;
      "
    >
      Contact Confirmation
    </div>


    <h1
      style="
        margin:0 0 14px;
        font-size:28px;
        line-height:1.25;
        letter-spacing:-0.5px;
        color:#172033;
      "
    >
      Thanks for reaching out.
    </h1>


    <p
      style="
        margin:0 0 18px;
        font-size:16px;
        line-height:1.7;
        color:#5b6472;
      "
    >
      Hello ${safeName},
    </p>


    <p
      style="
        margin:0 0 18px;
        font-size:15px;
        line-height:1.7;
        color:#5b6472;
      "
    >
      We have received your message and appreciate
      you taking the time to contact ${BRAND_NAME}.
    </p>


    <div
      style="
        margin:24px 0;
        padding:18px;
        background:#f5f7fa;
        border:1px solid #e5e7eb;
        border-radius:10px;
      "
    >

      <div
        style="
          margin-bottom:7px;
          font-size:14px;
          font-weight:700;
          color:#163C80;
        "
      >
        What happens next?
      </div>


      <div
        style="
          font-size:14px;
          line-height:1.7;
          color:#5b6472;
        "
      >
        Our team will review your message and respond
        when appropriate. If additional information is
        required, we may contact you using the details
        you provided.
      </div>

    </div>


    ${referenceBlock}


    <div
      style="
        margin:24px 0;
        padding:16px;
        background:#fff8f3;
        border-left:4px solid #EA661B;
        border-radius:6px;
      "
    >

      <div
        style="
          font-size:13px;
          line-height:1.6;
          color:#5b6472;
        "
      >
        This email is an automatic acknowledgement.
        Please do not reply to this message unless
        instructed by our team.
      </div>

    </div>


    <!-- CTA -->

    <div
      style="
        margin:28px 0;
        text-align:center;
      "
    >

      <a
        href="${BRAND_URL}"
        style="
          display:inline-block;
          padding:13px 24px;
          background:#163C80;
          color:#ffffff;
          text-decoration:none;
          border-radius:8px;
          font-size:14px;
          font-weight:700;
        "
      >
        Visit NationPath
      </a>

    </div>


    <p
      style="
        margin:24px 0 0;
        font-size:13px;
        line-height:1.7;
        color:#8a93a1;
      "
    >
      For further assistance, contact
      <strong>
        ${escapeHtml(CONTACT_EMAIL)}
      </strong>.
    </p>

  `;


  return {

    subject,

    html:
      getEmailShell({
        preheader:
          `We received your message, ${displayName}. Thank you for contacting ${BRAND_NAME}.`,
        content,
        footerText:
          "This is an automated acknowledgement from the NationPath India contact team.",
      }),

    text,

  };

}