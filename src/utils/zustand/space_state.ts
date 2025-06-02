import { create } from "zustand";


type SpaceModal = {
    openModal : boolean,
    setOpneModal : (b : boolean) => void
}


export const useSpaceModalStore = create<SpaceModal>((set) => ({
    openModal : false,
    setOpneModal : (b : boolean) => set({openModal : b})
}))