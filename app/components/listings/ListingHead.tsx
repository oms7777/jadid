'use client'

import { SafeUser } from "@/app/types";
import React from "react";
import Heading from "../Heading";
import useCountries from "@/app/hooks/useLocations";
import Image from "next/image";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    id: string;
    currentUser?: SafeUser | null;
}



const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue)
    return(
        <>
            <Heading
                title={title}
                subtitle={`${location?.country}, ${location?.label}`}
                />
            <div
                className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative
                "
            >



            </div>
        </>
    )
}

export default ListingHead 