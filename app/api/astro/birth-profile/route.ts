import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import dbConnect from "@/lib/mongodb";
import User from "@/app/models/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const {
      name,
      dateOfBirth,
      birthTime,
      isBirthTimeApproximate,
      birthPlace,
      location,
    } = body;

    await dbConnect();

    await User.findByIdAndUpdate(
      session.user.id,
      {
        birthProfile: {
          name,

          dateOfBirth: dateOfBirth
            ? new Date(dateOfBirth)
            : null,

          birthTime: birthTime || null,

          isBirthTimeApproximate:
            Boolean(isBirthTimeApproximate),

          // Backward compatibility
          birthPlace: birthPlace || location?.displayName || null,

          // Structured Location
          location: location
            ? {
                displayName: location.displayName ?? null,
                city: location.city ?? null,
                district: location.district ?? null,
                state: location.state ?? null,
                country: location.country ?? null,
                postalCode: location.postalCode ?? null,
                latitude: location.latitude ?? null,
                longitude: location.longitude ?? null,
              }
            : undefined,

          profileCompleted: true,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Birth Profile Error:", error);

    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}