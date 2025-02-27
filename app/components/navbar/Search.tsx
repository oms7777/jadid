"use client";

import { BiSearch } from "react-icons/bi";
import useSearchModal from "@/app/hooks/useSearchModal"; // ✅ Import Zustand store

const Search = () => {
  const searchModal = useSearchModal(); // ✅ Use Zustand hook

  return (
    <>
      <div
        onClick={searchModal.onOpen} // ✅ Open modal using Zustand
        className="border-[1px] w-full md:w-auto py-3 bg-white rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      >
        <div className="flex flex-row items-center justify-between">
          <div className="text-sm text-yellow-600 font-semibold px-6">Rechercher un prestataire</div>
          <div className="text-sm pl-5 pr-3 text-white flex flex-row items-center gap-12">
            <div className="p-2 bg-yellow-600 rounded-full text-white">
              <BiSearch size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
