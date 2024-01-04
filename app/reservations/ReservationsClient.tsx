'use client'


import { toast } from "react-hot-toast"
import axios from "axios"
import React, {useCallback, useState } from "react"
import { useRouter } from "next/navigation"

import { SafeReservation, SafeUser } from "../types"

import Heading from "../Components/Heading"
import Container from "../Components/Container"
import ListingCard from "../Components/listings/ListingCard"

interface ReservationsClientProps {
    reservations: SafeReservation [];
    currentUser?: SafeUser | null;

}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback(() => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("Réservation annulée");
            router.refresh();
        })
        .catch(() => {
            toast.error('Un problème est survenu.')
        })
        .finally(() => {
            setDeletingId('');
        })
    },[router])


    return (
        <Container>
            <Heading
                title="Réservations"
                subtitle="Réservations réalisées chez vous"
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
                        actionLabel="Annuler la réservation de votre client"
                        currentUser={currentUser}
                    
                    />
                ))}

            </div>
        </Container>

    )
}

export default ReservationsClient