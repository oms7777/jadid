import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
    }

    const body = await request.json();
    const {
        title,
        description,
        category,
        subcategory,
        location,
        price,
    } = body;

    // ✅ Ensure required fields are present
    if (!title || !description || !category || !subcategory || !location || !price) {
        return NextResponse.json({ error: "Tous les champs sont obligatoires." }, { status: 400 });
    }

    // ✅ Ensure `currentUser` exists before using it
    if (!currentUser.id) {
        return NextResponse.json({ error: "Utilisateur non valide" }, { status: 403 });
    }

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            category,
            subcategory,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id, // ✅ Now TypeScript knows it's safe to access
        },
    });

    return NextResponse.json(listing, { status: 201 });
}
