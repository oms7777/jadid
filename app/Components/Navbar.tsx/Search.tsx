'use client' ;


import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const { getByValue } = useCountries();

    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue as string)?.label;
        }

        return "N'importe où"

    },[getByValue, locationValue]);

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let diff = differenceInDays(end, start);

            if (diff === 0) {
                diff = 1
            }

            return `${diff} Jours`
        }

        return "N'importe quand"
    }, [startDate, endDate])



    return (
        <div
            onClick={searchModal.onOpen}
            className="
            border-[1.25px]
            w-full
            md:w-auto
            py-2
            rounded-full
            shadow-sm
            hover:shadow-md
            transition
            cursor-pointer
            "
        >
            <div 
                className="
                    flex
                    flex-row
                    items-center
                    justify-between
                    "
            >
                <div 
                    className="
                        text-sm
                        font-semibold
                        px-6
                        text-white
                        "
                >
                    {locationLabel}
                </div>
                <div 
                    className="
                        hidden
                        sm:block
                        text-sm
                        font-semibold
                        px-6
                        border-x-[1px]
                        flex-1
                        text-center
                        text-white
                        "
                >
                    {durationLabel}
                </div>
                <div
                    className="
                    text-sm
                    pl-5
                    pr-3
                    text-yellow-600
                    flex
                    flex-row
                    items-center
                    gap-3
                    "
                >
                    <div className="=hidden sm:block">Publier un projet</div>
                    <div
                        className="
                        p-2
                        bg-yellow-600
                        rounded-full
                        text-white
                        "
                    >
                        <BiSearch size= {18} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search