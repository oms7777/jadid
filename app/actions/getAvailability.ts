import prisma from "@/app/libs/prismadb";

interface IParams {
  providerId: string;
}

export default async function getAvailability(params: IParams) {
  try {
    const { providerId } = params;

    const provider = await prisma.user.findUnique({
      where: { id: providerId },
      select: { availability: true },
    });

    if (!provider) {
      throw new Error("Provider not found");
    }

    return provider.availability || [];
  } catch (error: any) {
    throw new Error(error.message);
  }
}
