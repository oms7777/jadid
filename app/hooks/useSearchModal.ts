import { create } from "zustand";

interface SearchModalStore {
  isOpen: boolean;
  category: string | null;
  onOpen: () => void;
  onClose: () => void;
  setCategory: (category: string) => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  category: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setCategory: (category) => set({ category }),
}));

export default useSearchModal;
