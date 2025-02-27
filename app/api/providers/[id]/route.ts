import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const providerId = params?.id;
    if (!providerId) {
      return NextResponse.json({ error: "ID du prestataire manquant." }, { status: 400 });
    }

    console.log("🔍 Fetching provider ID:", providerId);

    const provider = await prisma.user.findUnique({
      where: { id: providerId },
      select: {
        id: true,
        name: true,
        profileImage: true,
        description: true,
        location: true,
        services: {
          select: {
            id: true,
            price: true,
            category: true,
            subcategory: true,
          },
        },
        availability: true,
      },
    });

    if (!provider) {
      return NextResponse.json({ error: "Prestataire introuvable." }, { status: 404 });
    }

    // ✅ Ensure subcategory is parsed correctly
    const formattedProvider = {
      ...provider,
      services: provider.services.map((service) => ({
        ...service,
        subcategory: typeof service.subcategory === "string" ? JSON.parse(service.subcategory) : service.subcategory,
      })),
    };

    return NextResponse.json(formattedProvider, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur API GET Provider:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
