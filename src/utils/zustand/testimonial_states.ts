import { create } from "zustand";

type TestimonialModalTypes = {
    openTModal : boolean,
    setOpenTModal : (b : boolean) => void
}


export const useTestimonialModalStore = create<TestimonialModalTypes>((set) => ({
    openTModal : false,
    setOpenTModal : (b : boolean) => set({openTModal : b})
}))