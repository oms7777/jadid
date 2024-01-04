'use client'

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar.tsx/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import { useRouter } from "next/navigation";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,

}


const RentModal = () => {
    const router = useRouter ();
    const rentModal = useRentModal ();

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues : {
            category: '',
            location: null,
            imageSrc: '',
            price: 1,
            title: '',
            description:''

        }
    })

    const category = watch('category');
    const location = watch('location');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    const setCustomValue = (id: string, value:any) => {
        setValue(id,value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success('Listing Créé!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();

        })
        .catch(() => {
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const actionLabel= useMemo (() => {
        if(step === STEPS.PRICE) {
            return 'Créer';
        }
        return 'Suivant';
    },[step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Retour';
    },[step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Que recherchez vous ?"
                subtitle="Choisissez une catégorie"
            />
            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto"
            >
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick={(category) => 
                                setCustomValue('category',category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if(step == STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Où êtes vous situés ?"
                    subtitle="Aidez vos futurs clients à vous trouver"

                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location',value)}

                />
                <Map 
                    center={location?.latlng}
                
                />
                
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Partagez quelques informations sur vous"
                    subtitle="Quelles sont vos formations"
                />


            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col hap-8">
                <Heading
                    title="Ajoutez une photo de profil ou d'activité"
                    subtitle="Une photo de vos travaux accomplis"
                />
                <ImageUpload 
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}

                />

            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Rajouter une description de votre activité"
                    subtitle="Simple présentation (ancienneté, savoir-faire...)"
                />
                <Input
                    id="title"
                    type='text'
                    label="Nom ou nom de société"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    type="text"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent= (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Ajoutez votre prix"
                    subtitle="Par exemple, le devis moyen proposé"
                />
                <Input
                    id="price"
                    label="Prix"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

            </div>
        )
    }

    return (
        <Modal 
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Présentez votre profil"
            body={bodyContent}
        />
    )
}

export default RentModal;