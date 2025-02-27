"use client";

import { usePathname } from "next/navigation";
 // Assuming your Navbar is here
import { SafeUser } from "@/app/types";
import Navbar from "./Navbar";


interface NavbarProps {
  currentUser?: SafeUser | null;
}

const NavbarWithCondition: React.FC<NavbarProps> = ({ currentUser }) => {
  const pathname = usePathname();

  // Check if the current route is for providers or dashboard
  const isProviderPage = pathname?.includes("/providers");

  // Render the Navbar only if not on /providers or /providers/dashboard page
  if (isProviderPage) return null;

  return <Navbar currentUser={currentUser} />;
};

export default NavbarWithCondition;
