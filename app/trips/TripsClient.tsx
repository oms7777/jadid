'use client'



import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "../types";
import Container from "../Components/Container";
import Heading from "../Components/Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../Components/listings/ListingCard";

interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser: SafeUser | null
}


const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id:string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservation annulée');
            router.refresh();
        })
        .catch((error) => {
            toast.error(error(error?.response?.data?.error));
        })
        .finally(() => {
            setDeletingId('');
        })
    },[router]);



    return (
        <Container>
            <Heading
                title="Commande"
                subtitle="Commandes réalisées et à venir"


            />
            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "

            >
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Annuler la réservation"
                        currentUser={currentUser}
                    />
                ))}

            </div>

        </Container>
    );
}

export default TripsClient;