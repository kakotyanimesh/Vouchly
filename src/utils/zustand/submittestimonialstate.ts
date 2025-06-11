import { create } from "zustand";


type InputBoxesTypes = {
    storeNumber : number,
    setStoreNumber : (n : number) => void
}


export const InputBoxesTypesStore = create<InputBoxesTypes>((set) => ({
    storeNumber : 0,
    setStoreNumber : (n) => set({storeNumber : n})
}))