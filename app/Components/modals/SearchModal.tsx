'use client'

import qs from "query-string"

import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { Range } from "react-date-range"
import dynamic from "next/dynamic"
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect"
import { formatISO } from "date-fns"
import Heading from "../Heading"
import useSearchModal from "@/app/hooks/useSearchModal"
import { Headland_One } from "next/font/google"
import Calendar from "../inputs/Calendar"

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}



const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();


    const [location, setlocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    },[]);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true});

        setStep(STEPS.LOCATION)
        searchModal.onClose();
        router.push(url);
    },
    [
        step,
        searchModal,
        location,
        router,
        dateRange,
        onNext,
        params
    ]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Recherche'
        }
        
        return 'Suivant'
    },[step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }

        return 'Retour'
    },[step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Où recherchez-vous ?"
                subtitle="Trouvez et comparez les professionnels"
            />
            <CountrySelect 
                value={location}
                onChange={(value) =>
                    setlocation(value as CountrySelectValue)
                }
            />
            <hr />
            <Map center = {location?.latlng} />
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Quand voulez-vous une intervention?"
                    subtitle="Vérifier la disponibilité"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Plus d'informations"
                    subtitle="Cherchez vos Professionnels preférés"
                />
            </div>
        )
    }



    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filtres"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined: onBack}
            body={bodyContent}

        />
    )
}

export default SearchModal