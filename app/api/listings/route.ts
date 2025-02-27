import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const providers = await prisma.user.findMany({
        where: { isProvider: true },
        include: { services: true },
      });
      
      console.log("🚀 API Response Debug:", providers);
      
      return NextResponse.json(providers, { status: 200 });
      
    const body = await request.json();
    const {
        title,
        description,
        category,
        subcategory, // ✅ Ensure this field is received
        location,
        price,
    } = body;

    // ✅ Ensure required fields are present
    if (!title || !description || !category || !subcategory || !location || !price) {
        return NextResponse.json({ error: "Tous les champs sont obligatoires." }, { status: 400 });
    }

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            category,
            subcategory, // ✅ Now added
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id,
        },
    });

    return NextResponse.json(listing, { status: 201 });
}
