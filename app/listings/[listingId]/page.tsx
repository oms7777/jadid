import { getListingById } from "@/app/actions/getListingById"; // ✅ Correct import
import { getReservations } from "@/app/actions/getReservations"; // ✅ Ensure import is correct
import { getCurrentUser } from "@/app/actions/getCurrentUser"; // ✅ Ensure import is correct

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <p>Listing not found.</p>;
  }

  return (
    <div>
      <h1>{listing.title}</h1>
      {/* Add listing details here */}
    </div>
  );
};

export default ListingPage;
