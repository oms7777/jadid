'use client'



import { useRouter } from "next/navigation";
import { SafeListing, SafeUser } from "../types";
import Container from "../Components/Container";
import Heading from "../Components/Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../Components/listings/ListingCard";

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser: SafeUser | null
}


const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id:string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success('Liste supprimée!');
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
                title="Services"
                subtitle="Services proposés"

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
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel="Supprimer un service"
                        currentUser={currentUser}
                    />
                ))}

            </div>

        </Container>
    );
}

export default PropertiesClient;