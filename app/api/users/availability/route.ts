import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { dates, times } = await req.json();

    if (!dates || !times || dates.length === 0 || times.length === 0) {
      return NextResponse.json({ error: "Dates et heures requises." }, { status: 400 });
    }

    // ✅ Update provider's availability in MongoDB
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        availability: {
          dates, // ✅ Save available dates
          times, // ✅ Save available times
        },
      },
    });

    console.log("✅ Disponibilités mises à jour:", updatedUser.availability);
    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur API:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
