"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";

import { signIn } from "next-auth/react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const RegisterModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const [isProvider, setIsProvider] = useState(false); // ✅ Track provider checkbox

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            const response = await axios.post("/api/providers/register", { 
                ...data, 
                isProvider, // ✅ Send correct provider status
            });

            toast.success("Inscription réussie!");

            // ✅ Automatically log in user after registration
            const signInResponse = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (signInResponse?.ok) {
                toast.success("Connexion réussie!");

                if (isProvider) {
                    router.push("/providers/dashboard"); // ✅ Redirect Providers to Dashboard
                } else {
                    router.push("/"); // ✅ Clients stay on Home
                }

                registerModal.onClose();
            } else {
                toast.error("Erreur lors de la connexion automatique.");
            }
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            toast.error("Une erreur est survenue.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="S'inscrire"
            actionLabel="Créer un compte"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={
                <div className="flex flex-col gap-4">
                    <Heading title="Bienvenue chez Maalem" subtitle="Créer un compte" />
                    <Input id="name" type="text" label="Nom" disabled={isLoading} register={register} errors={errors} required />
                    <Input id="email" type="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
                    <Input id="password" type="password" label="Mot de Passe" disabled={isLoading} register={register} errors={errors} required />
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={isProvider} onChange={() => setIsProvider(!isProvider)} />
                        <label>Je suis un prestataire de services</label>
                    </div>
                </div>
            }
            footer={
                <div className="flex flex-col gap-4 mt-3">
                    <hr />
                    <Button outline label="S'inscrire avec Google" icon={FcGoogle} onClick={() => signIn("google", { callbackUrl: isProvider ? "/providers/dashboard" : "/" })} />
                    <Button outline label="S'inscrire avec Facebook" icon={FaFacebook} onClick={() => signIn("facebook", { callbackUrl: isProvider ? "/providers/dashboard" : "/" })} />
                    <div className="text-neutral-500 text-center mt-4 font-light">
                        <div className="justify-center flex flex-row items-center gap-2">
                            <div>Déjà un compte?</div>
                            <div onClick={() => { registerModal.onClose(); loginModal.onOpen(); }} className="text-neutral-800 cursor-pointer hover:underline">
                                Se connecter
                            </div>
                        </div>
                    </div>
                </div>
            }
        />
    );
};

export default RegisterModal;
