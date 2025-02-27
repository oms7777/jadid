export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        // ✅ Use `client` instead of `clientId`
        const reservations = await prisma.reservation.findMany({
            where: {
                client: { id: session.user.id } // ✅ Correct way to filter by client ID
            },
            include: {
                provider: { select: { name: true } }, // ✅ Get provider name
                listing: { select: { title: true, category: true } }, // ✅ Get service title and category
            },
        });

        return NextResponse.json(reservations, { status: 200 });
    } catch (error) {
        console.error("❌ Erreur API RÉSERVATIONS:", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
}
