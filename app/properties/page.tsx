import EmptyState from "../Components/EmptyState";
import ClientOnly from "../Components/ClientOnly";
import PropertiesClient from "./PropertiesClient"
import getCurrentUser from "../actions/getCurrentUser";


import getListings from "../actions/getListings";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Non autorisé"
                    subtitle="Connextez-vous"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings ({
        userId: currentUser.id
    });

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Pas de services trouvés"
                    subtitle="Il semble que vous n'ayez pas encore proposé de services"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage