import prisma from "@/app/libs/prismadb";

export default async function getServiceProviders() {
  try {
    const providers = await prisma.user.findMany({
      where: {
        listings: { some: {} }, // Users with at least one listing
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        availability: true,
      },
    });

    return providers;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
