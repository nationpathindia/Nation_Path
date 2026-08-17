//////////////////////////////////////////////////////////////
// NATIONPATH OTP CORE
//
// LOCKED VERSION
//
// Responsibilities:
// - International phone normalization
// - Email normalization
// - Secure OTP generation
// - OTP hashing
// - Phone OTP
// - Email OTP
// - OTP verification
// - OTP expiry
// - OTP attempt protection
// - OTP consumption
// - Phone verification identity
// - Email verification identity
//
// IMPORTANT:
// - Canonical Prisma User only
// - MongoDB collection = "users"
// - Never use Mongoose User
// - Never store plaintext OTP in MongoDB
// - OTP is stored only as otpHash
// - Development terminal may display plaintext OTP
// - Production terminal must NEVER display plaintext OTP
//
// IMPORTANT DEBUG FIX:
// - getActiveOtp() intentionally does NOT filter
//   consumedAt at MongoDB query level.
// - Latest OTP is fetched first.
// - consumedAt is checked explicitly in application code.
// - This avoids MongoDB/Prisma null-filter ambiguity.
// - This also gives us exact OTP state in development logs.
//////////////////////////////////////////////////////////////

import crypto from "crypto";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";


//////////////////////////////////////////////////////////////
// CONFIG
//////////////////////////////////////////////////////////////

const OTP_LENGTH = 6;

const OTP_EXPIRY_MINUTES = 5;

const OTP_MAX_ATTEMPTS = 5;

const OTP_HASH_ROUNDS = 10;


//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export type OtpChannel =
  | "phone"
  | "email";

export type OtpPurpose =
  | "login"
  | "signup"
  | "verify_phone"
  | "verify_email"
  | "change_phone"
  | "change_email"
  | "reset_password";


//////////////////////////////////////////////////////////////
// PHONE NORMALIZATION
//////////////////////////////////////////////////////////////

export function normalizePhone(
  phone: string
): string {

  const value =
    String(phone || "")
      .trim()
      .replace(/[\s()-]/g, "");

  if (!value) {
    throw new Error(
      "Phone number is required"
    );
  }

  if (!value.startsWith("+")) {
    throw new Error(
      "Phone number must include country code"
    );
  }

  const digits =
    value.slice(1);

  if (!/^\d+$/.test(digits)) {
    throw new Error(
      "Invalid phone number"
    );
  }

  if (
    digits.length < 7 ||
    digits.length > 15
  ) {
    throw new Error(
      "Invalid phone number"
    );
  }

  return `+${digits}`;
}


//////////////////////////////////////////////////////////////
// EMAIL NORMALIZATION
//////////////////////////////////////////////////////////////

export function normalizeEmail(
  email: string
): string {

  const value =
    String(email || "")
      .trim()
      .toLowerCase();

  if (!value) {
    throw new Error(
      "Email address is required"
    );
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  ) {
    throw new Error(
      "Invalid email address"
    );
  }

  if (value.length > 254) {
    throw new Error(
      "Invalid email address"
    );
  }

  return value;
}


//////////////////////////////////////////////////////////////
// OTP GENERATION
//////////////////////////////////////////////////////////////

export function generateOtp(): string {

  const max =
    10 ** OTP_LENGTH;

  return crypto
    .randomInt(0, max)
    .toString()
    .padStart(
      OTP_LENGTH,
      "0"
    );
}


//////////////////////////////////////////////////////////////
// OTP HASH
//////////////////////////////////////////////////////////////

export async function hashOtp(
  otp: string
): Promise<string> {

  return bcrypt.hash(
    otp,
    OTP_HASH_ROUNDS
  );
}


//////////////////////////////////////////////////////////////
// OTP HASH VERIFY
//////////////////////////////////////////////////////////////

export async function verifyOtpHash(
  otp: string,
  otpHash: string
): Promise<boolean> {

  return bcrypt.compare(
    otp,
    otpHash
  );
}


//////////////////////////////////////////////////////////////
// OTP EXPIRY
//////////////////////////////////////////////////////////////

export function getOtpExpiry(): Date {

  return new Date(
    Date.now() +
      OTP_EXPIRY_MINUTES *
        60 *
        1000
  );
}


//////////////////////////////////////////////////////////////
// VALIDATE DESTINATION
//////////////////////////////////////////////////////////////

function validateChannelDestination({
  channel,
  phone,
  email,
}: {
  channel: OtpChannel;
  phone?: string;
  email?: string;
}) {

  if (channel === "phone") {

    if (!phone) {
      throw new Error(
        "Phone number is required for phone OTP"
      );
    }

    return {
      phone: normalizePhone(phone),
      email: null,
    };
  }

  if (!email) {
    throw new Error(
      "Email address is required for email OTP"
    );
  }

  return {
    phone: null,
    email: normalizeEmail(email),
  };
}


//////////////////////////////////////////////////////////////
// INVALIDATE PREVIOUS ACTIVE OTPs
//////////////////////////////////////////////////////////////

async function invalidatePreviousOtps({
  channel,
  phone,
  email,
  purpose,
}: {
  channel: OtpChannel;
  phone: string | null;
  email: string | null;
  purpose: OtpPurpose;
}) {

  const now =
    new Date();

  const where =
    channel === "phone"
      ? {
          channel,
          phone,
          purpose,
          consumedAt: null,
          expiresAt: {
            gt: now,
          },
        }
      : {
          channel,
          email,
          purpose,
          consumedAt: null,
          expiresAt: {
            gt: now,
          },
        };

  await prisma.userOtp.updateMany({
    where,
    data: {
      consumedAt: now,
    },
  });
}


//////////////////////////////////////////////////////////////
// CREATE OTP RECORD
//////////////////////////////////////////////////////////////

export async function createOtpRecord({

  channel,

  phone,

  email,

  purpose = "login",

  userId,

}: {
  channel: OtpChannel;
  phone?: string;
  email?: string;
  purpose?: OtpPurpose;
  userId?: string;
}) {

  ////////////////////////////////////////////////////////////
  // NORMALIZE DESTINATION
  ////////////////////////////////////////////////////////////

  const destination =
    validateChannelDestination({
      channel,
      phone,
      email,
    });


  ////////////////////////////////////////////////////////////
  // GENERATE OTP
  ////////////////////////////////////////////////////////////

  const otp =
    generateOtp();


  ////////////////////////////////////////////////////////////
  // HASH OTP
  ////////////////////////////////////////////////////////////

  const otpHash =
    await hashOtp(otp);


  ////////////////////////////////////////////////////////////
  // EXPIRY
  ////////////////////////////////////////////////////////////

  const expiresAt =
    getOtpExpiry();


  ////////////////////////////////////////////////////////////
  // INVALIDATE PREVIOUS OTP
  ////////////////////////////////////////////////////////////

  await invalidatePreviousOtps({
    channel,

    phone:
      destination.phone,

    email:
      destination.email,

    purpose,
  });


  ////////////////////////////////////////////////////////////
  // CREATE OTP
  ////////////////////////////////////////////////////////////

  const otpRecord =
    await prisma.userOtp.create({
      data: {

        channel,

        phone:
          destination.phone,

        email:
          destination.email,

        otpHash,

        expiresAt,

        purpose,

        attempts: 0,

        maxAttempts:
          OTP_MAX_ATTEMPTS,

        userId:
          userId || null,
      },
    });


  ////////////////////////////////////////////////////////////
  // IMPORTANT DB PERSISTENCE VERIFICATION
  //
  // Re-read exact OTP by ID.
  ////////////////////////////////////////////////////////////

  const savedOtp =
    await prisma.userOtp.findUnique({
      where: {
        id:
          otpRecord.id,
      },

      select: {
        id: true,
        channel: true,
        phone: true,
        email: true,
        otpHash: true,
        expiresAt: true,
        consumedAt: true,
        purpose: true,
        attempts: true,
        maxAttempts: true,
        userId: true,
        createdAt: true,
      },
    });


  ////////////////////////////////////////////////////////////
  // DEVELOPMENT DB DEBUG
  ////////////////////////////////////////////////////////////

  if (
    process.env.NODE_ENV !==
    "production"
  ) {

    console.log(
      [
        "",
        "==================================================",
        "🧪 NATIONPATH OTP CREATED",
        "==================================================",
        `🆔 OTP ID   : ${savedOtp?.id || "NOT FOUND"}`,
        `📱 Channel  : ${savedOtp?.channel || "NOT FOUND"}`,
        `📱 Phone    : ${savedOtp?.phone || "null"}`,
        `📧 Email    : ${savedOtp?.email || "null"}`,
        `🎯 Purpose  : ${savedOtp?.purpose || "UNDEFINED"}`,
        `💾 DB Found : ${savedOtp ? "YES" : "NO"}`,
        `🔒 Consumed : ${savedOtp?.consumedAt || "null"}`,
        `🔢 Attempts : ${savedOtp?.attempts ?? "null"}/${savedOtp?.maxAttempts ?? "null"}`,
        `👤 User ID  : ${savedOtp?.userId || "null"}`,
        `⏳ Expires  : ${
          savedOtp?.expiresAt
            ? savedOtp.expiresAt.toISOString()
            : "null"
        }`,
        `🕐 Created  : ${
          savedOtp?.createdAt
            ? savedOtp.createdAt.toISOString()
            : "null"
        }`,
        "==================================================",
        "",
      ].join("\n")
    );

  }


  ////////////////////////////////////////////////////////////
  // DEVELOPMENT TERMINAL OTP
  ////////////////////////////////////////////////////////////

  if (
    process.env.NODE_ENV !==
    "production"
  ) {

    console.log(
      [
        "",
        "==================================================",
        "🔐 NATIONPATH DEVELOPMENT OTP",
        "==================================================",
        `📱 Channel  : ${channel}`,
        channel === "phone"
          ? `📱 Phone    : ${destination.phone}`
          : `📧 Email    : ${destination.email}`,
        `🎯 Purpose  : ${purpose}`,
        `🔢 OTP      : ${otp}`,
        `🆔 OTP ID   : ${otpRecord.id}`,
        `⏳ Expires  : ${expiresAt.toISOString()}`,
        `🕐 Created  : ${otpRecord.createdAt.toISOString()}`,
        "==================================================",
        "",
      ].join("\n")
    );

  }


  ////////////////////////////////////////////////////////////
  // RETURN
  ////////////////////////////////////////////////////////////

  return {

    id:
      otpRecord.id,

    channel,

    phone:
      destination.phone,

    email:
      destination.email,

    purpose,

    otp,

    expiresAt,

  };

}


//////////////////////////////////////////////////////////////
// GET LATEST OTP
//
// IMPORTANT FIX:
//
// DO NOT FILTER:
//
//   consumedAt: null
//
// inside MongoDB query.
//
// Instead:
//
// 1. Find latest OTP for channel + destination + purpose.
// 2. Inspect consumedAt explicitly.
// 3. Inspect expiry explicitly.
// 4. Inspect attempts explicitly.
//
// This avoids MongoDB/Prisma null-field filtering problems
// and gives us exact state visibility.
//////////////////////////////////////////////////////////////

export async function getActiveOtp({

  channel,

  phone,

  email,

  purpose = "login",

}: {
  channel: OtpChannel;
  phone?: string;
  email?: string;
  purpose?: OtpPurpose;
}) {

  ////////////////////////////////////////////////////////////
  // NORMALIZE DESTINATION
  ////////////////////////////////////////////////////////////

  const destination =
    validateChannelDestination({
      channel,
      phone,
      email,
    });


  ////////////////////////////////////////////////////////////
  // BUILD LOOKUP
  //
  // IMPORTANT:
  // consumedAt is intentionally NOT included.
  ////////////////////////////////////////////////////////////

  const where =
    channel === "phone"
      ? {
          channel,
          phone:
            destination.phone,
          purpose,
        }
      : {
          channel,
          email:
            destination.email,
          purpose,
        };


  ////////////////////////////////////////////////////////////
  // FIND LATEST OTP
  ////////////////////////////////////////////////////////////

  const record =
    await prisma.userOtp.findFirst({

      where,

      orderBy: {
        createdAt: "desc",
      },

    });


  ////////////////////////////////////////////////////////////
  // DEVELOPMENT DEBUG
  ////////////////////////////////////////////////////////////

  if (
    process.env.NODE_ENV !==
    "production"
  ) {

    if (!record) {

      console.log(
        [
          "",
          "==================================================",
          "⚠️ NATIONPATH OTP LOOKUP",
          "==================================================",
          `📱 Channel  : ${channel}`,
          channel === "phone"
            ? `📱 Phone    : ${destination.phone}`
            : `📧 Email    : ${destination.email}`,
          `🎯 Purpose  : ${purpose}`,
          "❌ Latest OTP record: NOT FOUND",
          "==================================================",
          "",
        ].join("\n")
      );

    } else {

      console.log(
        [
          "",
          "==================================================",
          "🔎 NATIONPATH OTP LOOKUP",
          "==================================================",
          `🆔 OTP ID   : ${record.id}`,
          `📱 Channel  : ${record.channel}`,
          `📱 Phone    : ${record.phone || "null"}`,
          `📧 Email    : ${record.email || "null"}`,
          `🎯 Purpose  : ${record.purpose}`,
          `⏳ Expires  : ${record.expiresAt.toISOString()}`,
          `🕐 Created  : ${record.createdAt.toISOString()}`,
          `🔒 Consumed : ${record.consumedAt || "null"}`,
          `🔢 Attempts : ${record.attempts}/${record.maxAttempts}`,
          `👤 User ID  : ${record.userId || "null"}`,
          "==================================================",
          "",
        ].join("\n")
      );

    }

  }


  ////////////////////////////////////////////////////////////
  // RETURN
  ////////////////////////////////////////////////////////////

  return record;
}


//////////////////////////////////////////////////////////////
// MARK PHONE VERIFIED
//////////////////////////////////////////////////////////////

async function markPhoneVerified({

  phone,

  userId,

}: {
  phone: string;
  userId: string;
}) {

  const normalizedPhone =
    normalizePhone(phone);


  const existing =
    await prisma.userPhone.findUnique({
      where: {
        phone:
          normalizedPhone,
      },
    });


  ////////////////////////////////////////////////////////////
  // SECURITY CHECK
  ////////////////////////////////////////////////////////////

  if (
    existing &&
    existing.userId !== userId
  ) {

    throw new Error(
      "Phone number is already linked to another account"
    );

  }


  ////////////////////////////////////////////////////////////
  // UPDATE EXISTING
  ////////////////////////////////////////////////////////////

  if (existing) {

    return prisma.userPhone.update({
      where: {
        id:
          existing.id,
      },

      data: {
        isVerified:
          true,

        verifiedAt:
          new Date(),
      },
    });

  }


  ////////////////////////////////////////////////////////////
  // CREATE NEW
  ////////////////////////////////////////////////////////////

  return prisma.userPhone.create({
    data: {
      phone:
        normalizedPhone,

      userId,

      isVerified:
        true,

      verifiedAt:
        new Date(),
    },
  });
}


//////////////////////////////////////////////////////////////
// MARK EMAIL VERIFIED
//////////////////////////////////////////////////////////////

async function markEmailVerified({

  email,

  userId,

}: {
  email: string;
  userId: string;
}) {

  const normalizedEmail =
    normalizeEmail(email);


  const existing =
    await prisma.userEmail.findUnique({
      where: {
        email:
          normalizedEmail,
      },
    });


  ////////////////////////////////////////////////////////////
  // SECURITY CHECK
  ////////////////////////////////////////////////////////////

  if (
    existing &&
    existing.userId !== userId
  ) {

    throw new Error(
      "Email address is already linked to another account"
    );

  }


  ////////////////////////////////////////////////////////////
  // UPDATE EXISTING
  ////////////////////////////////////////////////////////////

  if (existing) {

    return prisma.userEmail.update({
      where: {
        id:
          existing.id,
      },

      data: {
        isVerified:
          true,

        verifiedAt:
          new Date(),
      },
    });

  }


  ////////////////////////////////////////////////////////////
  // CREATE NEW
  ////////////////////////////////////////////////////////////

  return prisma.userEmail.create({
    data: {
      email:
        normalizedEmail,

      userId,

      isVerified:
        true,

      verifiedAt:
        new Date(),
    },
  });
}


//////////////////////////////////////////////////////////////
// VERIFY OTP
//////////////////////////////////////////////////////////////

export async function verifyOtp({

  channel,

  phone,

  email,

  otp,

  purpose = "login",

}: {
  channel: OtpChannel;
  phone?: string;
  email?: string;
  otp: string;
  purpose?: OtpPurpose;
}) {

  ////////////////////////////////////////////////////////////
  // NORMALIZE DESTINATION
  ////////////////////////////////////////////////////////////

  const destination =
    validateChannelDestination({
      channel,
      phone,
      email,
    });


  ////////////////////////////////////////////////////////////
  // CLEAN OTP
  ////////////////////////////////////////////////////////////

  const cleanOtp =
    String(otp || "")
      .trim();


  ////////////////////////////////////////////////////////////
  // VALIDATE OTP FORMAT
  ////////////////////////////////////////////////////////////

  if (
    !/^\d{6}$/.test(cleanOtp)
  ) {

    throw new Error(
      "Invalid OTP"
    );

  }


  ////////////////////////////////////////////////////////////
  // GET LATEST OTP
  ////////////////////////////////////////////////////////////

  const otpRecord =
    await getActiveOtp({

      channel,

      phone:
        destination.phone ||
        undefined,

      email:
        destination.email ||
        undefined,

      purpose,
    });


  ////////////////////////////////////////////////////////////
  // NO RECORD
  ////////////////////////////////////////////////////////////

  if (!otpRecord) {

    if (
      process.env.NODE_ENV !==
      "production"
    ) {

      console.log(
        [
          "",
          "==================================================",
          "❌ NATIONPATH OTP VERIFY FAILED",
          "==================================================",
          channel === "phone"
            ? `📱 Phone    : ${destination.phone}`
            : `📧 Email    : ${destination.email}`,
          `🎯 Purpose  : ${purpose}`,
          `🔢 OTP      : ${cleanOtp}`,
          "❌ Reason   : No OTP record found",
          "==================================================",
          "",
        ].join("\n")
      );

    }

    throw new Error(
      "OTP expired or not found"
    );
  }


  ////////////////////////////////////////////////////////////
  // EXPLICIT CONSUMED CHECK
  //
  // IMPORTANT:
  // This check now happens AFTER the record has been fetched.
  ////////////////////////////////////////////////////////////

  if (
    otpRecord.consumedAt
  ) {

    if (
      process.env.NODE_ENV !==
      "production"
    ) {

      console.log(
        [
          "",
          "==================================================",
          "❌ NATIONPATH OTP ALREADY CONSUMED",
          "==================================================",
          `🆔 OTP ID   : ${otpRecord.id}`,
          channel === "phone"
            ? `📱 Phone    : ${destination.phone}`
            : `📧 Email    : ${destination.email}`,
          `🎯 Purpose  : ${purpose}`,
          `🔒 Consumed : ${otpRecord.consumedAt.toISOString()}`,
          `🔢 Attempts : ${otpRecord.attempts}/${otpRecord.maxAttempts}`,
          "==================================================",
          "",
        ].join("\n")
      );

    }

    throw new Error(
      "OTP already used"
    );
  }


  ////////////////////////////////////////////////////////////
  // EXPLICIT EXPIRY CHECK
  ////////////////////////////////////////////////////////////

  const now =
    new Date();


  if (
    otpRecord.expiresAt.getTime() <=
    now.getTime()
  ) {

    await prisma.userOtp.update({
      where: {
        id:
          otpRecord.id,
      },

      data: {
        consumedAt:
          now,
      },
    });


    if (
      process.env.NODE_ENV !==
      "production"
    ) {

      console.log(
        [
          "",
          "==================================================",
          "❌ NATIONPATH OTP EXPIRED",
          "==================================================",
          `🆔 OTP ID   : ${otpRecord.id}`,
          channel === "phone"
            ? `📱 Phone    : ${destination.phone}`
            : `📧 Email    : ${destination.email}`,
          `🎯 Purpose  : ${purpose}`,
          `⏳ Expires  : ${otpRecord.expiresAt.toISOString()}`,
          `🕐 Current  : ${now.toISOString()}`,
          "==================================================",
          "",
        ].join("\n")
      );

    }

    throw new Error(
      "OTP expired"
    );
  }


  ////////////////////////////////////////////////////////////
  // ATTEMPT PROTECTION
  ////////////////////////////////////////////////////////////

  if (
    otpRecord.attempts >=
    otpRecord.maxAttempts
  ) {

    await prisma.userOtp.update({
      where: {
        id:
          otpRecord.id,
      },

      data: {
        consumedAt:
          now,
      },
    });


    if (
      process.env.NODE_ENV !==
      "production"
    ) {

      console.log(
        [
          "",
          "==================================================",
          "❌ NATIONPATH OTP BLOCKED",
          "==================================================",
          `🆔 OTP ID   : ${otpRecord.id}`,
          channel === "phone"
            ? `📱 Phone    : ${destination.phone}`
            : `📧 Email    : ${destination.email}`,
          `🎯 Purpose  : ${purpose}`,
          `🔢 Attempts : ${otpRecord.attempts}/${otpRecord.maxAttempts}`,
          "❌ Reason   : Maximum OTP attempts exceeded",
          "==================================================",
          "",
        ].join("\n")
      );

    }

    throw new Error(
      "Maximum OTP attempts exceeded"
    );
  }


  ////////////////////////////////////////////////////////////
  // VERIFY HASH
  ////////////////////////////////////////////////////////////

  const valid =
    await verifyOtpHash(
      cleanOtp,
      otpRecord.otpHash
    );


  ////////////////////////////////////////////////////////////
  // INVALID OTP
  ////////////////////////////////////////////////////////////

  if (!valid) {

    const nextAttempts =
      otpRecord.attempts + 1;


    await prisma.userOtp.update({
      where: {
        id:
          otpRecord.id,
      },

      data: {

        attempts:
          nextAttempts,

        ...(nextAttempts >=
          otpRecord.maxAttempts
          ? {
              consumedAt:
                now,
            }
          : {}),
      },
    });


    if (
      process.env.NODE_ENV !==
      "production"
    ) {

      console.log(
        [
          "",
          "==================================================",
          "❌ NATIONPATH OTP INVALID",
          "==================================================",
          `🆔 OTP ID   : ${otpRecord.id}`,
          channel === "phone"
            ? `📱 Phone    : ${destination.phone}`
            : `📧 Email    : ${destination.email}`,
          `🎯 Purpose  : ${purpose}`,
          `🔢 Entered  : ${cleanOtp}`,
          `🔢 Attempts : ${nextAttempts}/${otpRecord.maxAttempts}`,
          `⏳ Expires  : ${otpRecord.expiresAt.toISOString()}`,
          "==================================================",
          "",
        ].join("\n")
      );

    }


    throw new Error(
      "Invalid OTP"
    );
  }


  ////////////////////////////////////////////////////////////
  // CONSUME OTP
  ////////////////////////////////////////////////////////////

  await prisma.userOtp.update({
    where: {
      id:
        otpRecord.id,
    },

    data: {
      consumedAt:
        now,
    },
  });


  ////////////////////////////////////////////////////////////
  // VERIFIED USER
  ////////////////////////////////////////////////////////////

  const userId =
    otpRecord.userId;


  ////////////////////////////////////////////////////////////
  // PHONE VERIFICATION
  ////////////////////////////////////////////////////////////

  if (
    channel === "phone" &&
    userId &&
    (
      purpose === "verify_phone" ||
      purpose === "change_phone"
    )
  ) {

    await markPhoneVerified({
      phone:
        destination.phone!,
      userId,
    });

  }


  ////////////////////////////////////////////////////////////
  // EMAIL VERIFICATION
  ////////////////////////////////////////////////////////////

  if (
    channel === "email" &&
    userId &&
    (
      purpose === "verify_email" ||
      purpose === "change_email"
    )
  ) {

    await markEmailVerified({
      email:
        destination.email!,
      userId,
    });

  }


  ////////////////////////////////////////////////////////////
  // SUCCESS LOG
  ////////////////////////////////////////////////////////////

  if (
    process.env.NODE_ENV !==
    "production"
  ) {

    console.log(
      [
        "",
        "==================================================",
        "✅ NATIONPATH OTP VERIFIED",
        "==================================================",
        `🆔 OTP ID   : ${otpRecord.id}`,
        channel === "phone"
          ? `📱 Phone    : ${destination.phone}`
          : `📧 Email    : ${destination.email}`,
        `🎯 Purpose  : ${purpose}`,
        `👤 User ID  : ${userId || "null"}`,
        `🔒 Consumed : ${now.toISOString()}`,
        "==================================================",
        "",
      ].join("\n")
    );

  }


  ////////////////////////////////////////////////////////////
  // RETURN
  ////////////////////////////////////////////////////////////

  return {

    success:
      true,

    channel,

    phone:
      destination.phone,

    email:
      destination.email,

    userId,

    otpId:
      otpRecord.id,

    purpose,

  };
}


//////////////////////////////////////////////////////////////
// OTP CONFIG
//////////////////////////////////////////////////////////////

export const OTP_CONFIG = {

  length:
    OTP_LENGTH,

  expiryMinutes:
    OTP_EXPIRY_MINUTES,

  maxAttempts:
    OTP_MAX_ATTEMPTS,

  hashRounds:
    OTP_HASH_ROUNDS,

} as const;