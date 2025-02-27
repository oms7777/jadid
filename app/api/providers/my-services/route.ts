import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(req: Request) {
  try {
    // ✅ Get provider session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // ✅ Find provider and fetch services
    const provider = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        services: true, // ✅ Fetch services
      },
    });

    if (!provider || !provider.isProvider) {
      return NextResponse.json({ error: "Seuls les prestataires peuvent voir leurs services." }, { status: 403 });
    }

    // ✅ Parse subcategories correctly (if stored as JSON)
    const formattedServices = provider.services.map((service) => ({
      ...service,
      subcategory: JSON.parse(service.subcategory), // ✅ Ensure subcategories are parsed
    }));

    return NextResponse.json(formattedServices, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur API:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
