"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  console.log("🔍 User Session Data:", session); // ✅ Debugging session data

  const userRole = session?.user?.isProvider ? "provider" : "client"; // ✅ Fix user role detection

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="absolute top-4 right-4 flex gap-3">
      {/* ✅ Show "Espace Maalem" for providers only */}
      {userRole === "provider" && (
        <button
          onClick={() => {
            if (session) {
              console.log("Redirecting to dashboard..."); // ✅ Debugging
              router.push("/providers/dashboard");
            } else {
              loginModal.onOpen();
            }
          }}
          className="hidden md:block text-sm text-white font-semibold py-2 px-10 rounded-full hover:bg-neutral-200 transition"
        >
          Espace Maalem
        </button>
      )}

      {/* User Menu */}
      <div className="relative">
        <div
          onClick={toggleOpen}
          className="p-3 border border-neutral-200 text-white bg-yellow-600 flex items-center justify-center rounded-full cursor-pointer hover:bg-yellow-500 transition"        >
          <AiOutlineMenu size={24}/>

        </div>

        {isOpen && (
          <div className="absolute w-48 bg-white text-yellow-600 shadow-md rounded-md right-0 mt-2">
            {session ? (
              <>
                {userRole === "provider" ? (
                  <>
                    <MenuItem
                      onClick={() => {
                        console.log("Navigating to /providers/dashboard");
                        router.push("/providers/dashboard");
                      }}
                      label="Dashboard"
                    />
                    <MenuItem onClick={() => router.push("/providers/reservations")} label="Réservations en attente" />
                  </>
                ) : (
                  <>
                    <MenuItem onClick={() => router.push("/clients/dashboard")} label="Mon espace" />
                    <MenuItem onClick={() => router.push("/reservations")} label="Mes réservations" />
                  </>
                )}
                <MenuItem onClick={signOut} label="Se déconnecter" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Se connecter" />
                <MenuItem onClick={registerModal.onOpen} label="Créer un compte" />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
