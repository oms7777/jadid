import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(req: Request) {
  try {
    // ✅ Extract query parameters
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || ""; // The category the client is searching for
    const subcategory = searchParams.get("subcategory") || ""; // If applicable
    const clientLocation = searchParams.get("location") || "";
    const selectedDate = searchParams.get("date") || "";
    const selectedTime = searchParams.get("time") || "";

    console.log("🔍 Recherche client:", { category, subcategory, clientLocation, selectedDate, selectedTime });

    // ✅ Find providers offering this service
    const matchingProviders = await prisma.user.findMany({
      where: {
        isProvider: true,
        services: {
          some: {
            category: category, // Match category
            subcategory: {
              contains: subcategory, // You can also check for subcategory if needed
            },
          },
        },
      },
      include: {
        services: true, // Include services to filter them by category
      },
    });

    console.log("✅ Providers trouvés:", matchingProviders.length);

    // ✅ Manually filter providers based on:
    // - **Location Match** (Neighborhood or City)
    // - **Availability Match** (Date & Time)
    const filteredProviders = matchingProviders.filter((provider) => {
      // ✅ Check if the provider's location matches the client’s city or neighborhood
      const isLocationMatch = provider.location && clientLocation.includes(provider.location);

      // ✅ Check if provider has availability on the chosen date & time
      if (!provider.availability) return false;
      const availability = JSON.parse(provider.availability as unknown as string);

      const isDateMatch = availability.dates.includes(selectedDate);
      const isTimeMatch = availability.times.includes(selectedTime);

      return isLocationMatch && isDateMatch && isTimeMatch;
    });

    console.log("✅ Providers après filtrage:", filteredProviders.length);

    return NextResponse.json(filteredProviders, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur API Recherche:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
