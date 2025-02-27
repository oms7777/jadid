'use client';

import useLocations from '@/app/hooks/useLocations';
import Select from 'react-select';

export type LocationSelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    country: string;
    value: string;
};

interface LocationSelectProps {
    value?: LocationSelectValue;
    onChange: (value: LocationSelectValue) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
    value,
    onChange,
}) => {
    const { getAll } = useLocations();

    return (
        <div>
            <Select 
                placeholder="Sélectionnez une ville ou un quartier"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as LocationSelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className='flex flex-row items-center gap-3'>
                        <div>{option.flag}</div>
                        <div>
                            {option.label}, 
                            <span className='text-neutral-500 ml-1'>
                                {option.country}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6',
                    }
                })}
            />
        </div>
    );
};

export default LocationSelect;
