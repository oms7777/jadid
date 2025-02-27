"use client";

import { useCallback, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
      
        const callback = await signIn("credentials", {
            ...data,
            redirect: false,
        });
    
        setIsLoading(false);
    
        if (callback?.ok) {
            toast.success("Connexion réussie");
    
            // ✅ Wait for session to update before retrieving data
            await new Promise((resolve) => setTimeout(resolve, 500)); 
            
            const session = await getSession(); // ✅ Retrieve updated session
            console.log("Session Data after Login:", session); // ✅ Debugging
            
            if (session?.user?.isProvider) {
                router.push("/providers/dashboard"); // ✅ Redirect providers correctly
            } else {
                router.push("/clients/dashboard"); // ✅ Redirect clients correctly
            }
    
            loginModal.onClose();
        }
    
        if (callback?.error) {
            toast.error(callback.error);
        }
    };
    
      
      

    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Se connecter"
            actionLabel="Continuer"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={
                <div className="flex flex-col gap-4">
                    <Heading title="Bienvenue sur Jadid" subtitle="Se connecter" />
                    <Input id="email" label="Email" type="text" disabled={isLoading} register={register} errors={errors} required />
                    <Input id="password" type="password" label="Mot de Passe" disabled={isLoading} register={register} errors={errors} required />
                </div>
            }
            footer={
                <div className="flex flex-col gap-4 mt-3">
                    <hr />
                    <Button outline label="Continuer avec Google" icon={FcGoogle} onClick={() => signIn("google")} />
                    <Button outline label="Continuer avec Facebook" icon={FaFacebook} onClick={() => signIn("facebook")} />
                    <div className="text-neutral-500 text-center mt-4 font-light">
                        <div className="justify-center flex flex-row items-center gap-2">
                            <div>Première fois sur Jadid ?</div>
                            <div onClick={onToggle} className="text-neutral-800 cursor-pointer hover:underline">
                                Créer un compte
                            </div>
                        </div>
                    </div>
                </div>
            }
        />
    );
};

export default LoginModal;
