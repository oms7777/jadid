'use client';

import useRentModal from '@/app/hooks/useRentModal';
import Modal from './Modal';
import { useMemo, useState } from 'react';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import LocationSelect from '../inputs/LocationSelect';
import dynamic from 'next/dynamic';
import Input from '../inputs/Input';
import axios from 'axios';
import toast from 'react-hot-toast';

const RentModal = () => {
    const rentModal = useRentModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            price: 1,
            title: '',
            description: '',
            providerId: '',
        }
    });

    const category = watch('category');
    const location = watch('location');

    const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/listings', { ...data, providerId: 'currentUserId' })
            .then(() => {
                toast.success('Profil créé avec succès!');
                reset();
                rentModal.onClose();
            })
            .catch(() => {
                toast.error('Erreur lors de la création du profil');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Modal isOpen={rentModal.isOpen} onClose={rentModal.onClose} onSubmit={handleSubmit(onSubmit)} actionLabel="Créer un profil" title="Créez votre profil de prestataire" />
    );
};

export default RentModal;