import { create } from "zustand";


type WallOfLoveState = {
    gridNumber : number,
}

type GridActions = {
    setGridNumber : (n : number) => void
}

const initialState : WallOfLoveState = {
    gridNumber : 3,
}


export const useGridStore = create<WallOfLoveState & GridActions>((set) => ({
    ...initialState,
    setGridNumber : (n) => set({gridNumber : n})
}))