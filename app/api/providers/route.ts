export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import locations from "@/app/libs/location";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "";
    const subcategory = searchParams.get("subcategory") || "";
    const clientAddress = searchParams.get("clientAddress") || "";
    const date = searchParams.get("date") || "";
    const time = searchParams.get("time") || "";

    console.log("📌 Searching Providers for:", { category, subcategory, clientAddress, date, time });

    // ✅ Extract city/neighborhood from clientAddress
    const extractedLocation = extractLocationFromAddress(clientAddress);
    console.log("📍 Extracted Location:", extractedLocation);

    // ✅ Fetch providers based on category & subcategory
    const providers = await prisma.user.findMany({
      where: {
        isProvider: true,
        services: {
          some: {
            category: category,
            subcategory: { contains: subcategory, mode: "insensitive" },
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        profileImage: true,
        location: true,
        availability: true,
      },
    });

    console.log("✅ Fetched Providers:", JSON.stringify(providers, null, 2));

    // ✅ Filter providers by matching location
    const availableProviders = providers.filter((provider) => {
      if (!provider.location) return false;

      // ✅ Check if provider's selected location is included in extracted client address
      return extractedLocation.toLowerCase().includes(provider.location.toLowerCase());
    });

    console.log("✅ Available Providers After Filtering:", JSON.stringify(availableProviders, null, 2));

    return NextResponse.json(availableProviders, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur API GET Providers:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}

// ✅ Function to extract city/neighborhood from clientAddress
function extractLocationFromAddress(address: string) {
  // 🏙️ List of known locations in Morocco
  const knownLocations = locations.map((loc) => loc.label.toLowerCase());

  // 🔎 Try to find a known location in the address
  const foundLocation = knownLocations.find((loc) => address.toLowerCase().includes(loc));

  return foundLocation || "Unknown"; // Return found location or "Unknown"
}
