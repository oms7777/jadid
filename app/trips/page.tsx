import EmptyState from "../Components/EmptyState";
import ClientOnly from "../Components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
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

    const reservations = await getReservations ({
        userId: currentUser.id
    });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Pas de commandes trouvées"
                    subtitle="Il semble que vous n'ayez pas encore commandé"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage