import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<
    Listing,
    "createdAt" | "userId"
> & {
    createdAt: string;
    provider?: { id: string; name: string } | null;
};

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "reservationDate" | "listing"
> & {
    createdAt: string; // ✅ Ensure date is a string
    reservationDate: string; // ✅ Fix type to match `getReservations.ts`
    listing: SafeListing;
};

export type SafeUser = {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    isProvider: boolean; // ✅ Ensures provider status is always defined
};
