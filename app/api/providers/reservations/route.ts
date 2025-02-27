export const dynamic = "force-dynamic";


import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET() {
  try {
    // ✅ Get logged-in provider
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // ✅ Find provider in the database
    const provider = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!provider || !provider.isProvider) {
      return NextResponse.json({ error: "Seuls les prestataires peuvent voir les réservations." }, { status: 403 });
    }

    // ✅ Use `provider` instead of `providerId`
    const reservations = await prisma.reservation.findMany({
      where: {
        provider: { id: provider.id } // ✅ Correct way to filter by provider ID
      },
      include: {
        client: { select: { name: true } }, // ✅ Get client name
        listing: { select: { title: true, category: true } }, // ✅ Get service title and category
      },
    });

    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur API RÉSERVATIONS FOURNISSEUR:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
