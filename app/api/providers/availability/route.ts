import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface AvailabilityEntry {
  date: string;
  times: string[];
}

// ✅ Get Provider's Availability
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const provider = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { availability: true },
    });

    let availability = provider?.availability ?? [];

    // ✅ Ensure `availability` is correctly formatted
    availability = Array.isArray(availability)
      ? availability.map((entry) => ({
          date: (entry as { date: string }).date,
          times: Array.isArray((entry as { times: string[] }).times)
            ? (entry as { times: string[] }).times
            : [],
        }))
      : [];

    console.log("📌 Fetched Provider's Availability:", JSON.stringify(availability, null, 2));
    return NextResponse.json(availability, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur API GET:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}

// ✅ Update Provider's Availability
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { availability } = await req.json();

    // ✅ Validate input structure
    if (!availability || !Array.isArray(availability)) {
      return NextResponse.json({ error: "Format de disponibilité invalide." }, { status: 400 });
    }

    // ✅ Ensure each entry has `date` and `times` formatted correctly
    const formattedAvailability = availability.map((entry) => ({
      date: (entry as { date: string }).date,
      times: Array.isArray((entry as { times: string[] }).times)
        ? (entry as { times: string[] }).times
        : [],
    }));

    // ✅ Store the formatted data in MongoDB
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { availability: formattedAvailability },
    });

    console.log("✅ Updated Provider's Availability:", JSON.stringify(updatedUser.availability, null, 2));
    return NextResponse.json(updatedUser.availability, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur API PUT:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
