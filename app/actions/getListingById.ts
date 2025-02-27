import prisma from "@/app/libs/prismadb";
import { SafeListing } from "@/app/types";

interface IParams {
  listingId?: string;
}

export async function getListingById(params: IParams): Promise<SafeListing | null> {
  try {
    if (!params.listingId) return null;

    const listing = await prisma.listing.findUnique({
      where: { id: params.listingId },
    });

    if (!listing) return null;

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    };
  } catch (error) {
    console.error("❌ Error in getListingById:", error);
    throw new Error(error.message || "Internal Server Error");
  }
}
