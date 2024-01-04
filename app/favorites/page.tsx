import EmptyState from "../Components/EmptyState";
import ClientOnly from "../Components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Pas de favoris trouvé"
                    subtitle="Il semble que vous n'ayez pas de favoris dans votre liste"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ListingPage