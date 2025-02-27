import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function POST(req: Request) {
  try {
    console.log("✅ API /api/providers/add-service called!");

    // ✅ Get logged-in provider session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      console.error("❌ Non autorisé - No session found");
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    console.log("📥 Received Data:", body); // ✅ Debugging: Log received data

    const { category, subcategories, price } = body;

    // ✅ Validate required fields
    if (!category || !subcategories || subcategories.length === 0 || !price) {
      console.error("❌ Missing Fields:", { category, subcategories, price });
      return NextResponse.json({ error: "Tous les champs sont obligatoires." }, { status: 400 });
    }

    // ✅ Ensure price is a valid number
    const parsedPrice = parseInt(price, 10);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      console.error("❌ Invalid price format:", price);
      return NextResponse.json({ error: "Le prix doit être un nombre valide." }, { status: 400 });
    }

    const provider = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!provider || !provider.isProvider) {
      return NextResponse.json({ error: "Seuls les prestataires peuvent ajouter des services." }, { status: 403 });
    }

    // ✅ Save new service with default values for missing fields
    const newService = await prisma.listing.create({
      data: {
        title: "Service ajouté", // 🔹 Default title
        description: "Aucune description disponible", // 🔹 Default description
        locationValue: "Non spécifié", // 🔹 Default location
        category,
        subcategory: JSON.stringify(subcategories),
        price: parsedPrice,
        userId: provider.id, // ✅ Link service to provider
      },
    });

    console.log("✅ Service Added Successfully:", newService);
    return NextResponse.json(newService, { status: 201 });

  } catch (error) {
    console.error("❌ Erreur API:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
