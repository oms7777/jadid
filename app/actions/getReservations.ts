import prisma from "@/app/libs/prismadb";
import { SafeReservation } from "@/app/types";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export async function getReservations(params: IParams): Promise<SafeReservation[]> {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        OR: [
          { listingId: params.listingId },
          { userId: params.userId },
          { listing: { userId: params.authorId } }
        ]
      },
      include: { listing: true },
    });

    return reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      reservationDate: reservation.reservationDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));
  } catch (error: any) {
    console.error("❌ Error in getReservations:", error);
    throw new Error(error.message || "Internal Server Error");
  }
}

// ✅ Ensure only ONE export (no duplicates)
