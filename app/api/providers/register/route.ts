import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const { name, email, password, isProvider } = await req.json();

        // ✅ Ensure all fields are provided
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
        }

        // ✅ Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: "Cet email est déjà utilisé." }, { status: 400 });
        }

        // ✅ Hash password before saving to DB
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create new user with `isProvider` instead of `role`
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
                isProvider: isProvider ?? false, // ✅ Store provider status
            }
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Erreur API:", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
}
