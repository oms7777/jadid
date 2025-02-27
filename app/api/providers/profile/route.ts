export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const provider = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        description: true,
        location: true,
        profileImage: true,
      },
    });

    return NextResponse.json(provider, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur API GET Profile:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { description, location, profileImage } = await req.json();

    if (!description || !location) {
      return NextResponse.json({ error: "Tous les champs sont obligatoires." }, { status: 400 });
    }

    const updatedProfile = await prisma.user.update({
      where: { email: session.user.email },
      data: { description, location, profileImage },
    });

    return NextResponse.json(updatedProfile, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur API PUT Profile:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
