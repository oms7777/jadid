"use client";

import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import SearchModal from "@/app/components/modals/SearchModal";
import RentModal from "@/app/components/modals/RentModal";

const ModalProvider = () => {
  return (
    <>
      <ToasterProvider />
      <LoginModal />
      <RegisterModal />
      <SearchModal onClose={() => {}} />
      <RentModal />
    </>
  );
};

export default ModalProvider;
