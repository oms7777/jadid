"use client";

import { useState, useEffect } from "react";
import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  // State to track the scroll position
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Handle scroll event
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update scroll position
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarHeight = 350; // Define the navbar height (adjust as needed)

  return (
    <div
      className={`fixed w-full bg-yellow-600 z-10 shadow-md `}
      style={{
        transform: `translateY(-${Math.min(scrollY, navbarHeight)}px)`, // Hide navbar gradually as you scroll down
      }}
    >
      <div className="py-20 border-b-[1px]">
        <Container>
          <div className="flex justify-between items-center text-white gap-3 md:gap-0">
            <Logo />
            <div className="mx-auto">
              <Search />
            </div>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>

      <div className="w-full bg-white overflow-x-auto">
        <Categories />
      </div>
    </div>
  );
};

export default Navbar;
