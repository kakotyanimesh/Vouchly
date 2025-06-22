import { create } from "zustand";
import { TextReviewPropsWallOfLove, VideoReviewPropsWallOflove } from "../types/user_types";


type WallOfLoveState = {
    gridNumber : number,
}

type GridActions = {
    setGridNumber : (n : number) => void
}

const initialState : WallOfLoveState = {
    gridNumber : 1,
}


export const useGridStore = create<WallOfLoveState & GridActions>((set) => ({
    ...initialState,
    setGridNumber : (n) => set({gridNumber : n})
}))

export type OrderedReview = {
    id: number;
    type: "text" | "video";
    data: TextReviewPropsWallOfLove | VideoReviewPropsWallOflove;
}



type EmbadedIdState = {
    embededIds : number[],
    textReviewState : TextReviewPropsWallOfLove[]
    videoReviewState : VideoReviewPropsWallOflove[]
    orderedReviews: OrderedReview[] 
}


type useReviewActions = {
    setTextReview : (tob : TextReviewPropsWallOfLove) => void
    setVideoReview : (vob : VideoReviewPropsWallOflove) => void
    reset : () => void
}


const initialReviewStore : EmbadedIdState = {
    embededIds : [],
    textReviewState : [],
    videoReviewState : [],
    orderedReviews: []
}

export const useReviewStore = create<useReviewActions & EmbadedIdState>((set) => ({
    ...initialReviewStore,
    reset : () => set(initialReviewStore),
    setTextReview: (tr) =>
        set((state) => {
            const isAdded = state.embededIds.includes(tr.id)

            if (isAdded) {
                return {
                    embededIds: state.embededIds.filter(id => id !== tr.id),
                    textReviewState: state.textReviewState.filter(review => review.id !== tr.id),
                    videoReviewState: state.videoReviewState,
                    orderedReviews: state.orderedReviews.filter(item => item.id !== tr.id)
                }
            } else {
                return {
                    embededIds: [...state.embededIds, tr.id],
                    textReviewState: [...state.textReviewState, tr],
                    videoReviewState: state.videoReviewState,
                    orderedReviews: [...state.orderedReviews, { id: tr.id, type: "text", data: tr }]
                }
            }
        }),
    setVideoReview: (vo) =>
        set((state) => {
            const isAdded = state.embededIds.includes(vo.id)
            
            if (isAdded) {
                return {
                    embededIds: state.embededIds.filter(id => id !== vo.id),
                    textReviewState: state.textReviewState,
                    videoReviewState: state.videoReviewState.filter(video => video.id !== vo.id),
                    orderedReviews: state.orderedReviews.filter(item => item.id !== vo.id)
                }
            } else {
                return {
                    embededIds: [...state.embededIds, vo.id],
                    textReviewState: state.textReviewState,
                    videoReviewState: [...state.videoReviewState, vo],
                    orderedReviews: [...state.orderedReviews, { id: vo.id, type: "video", data: vo }]
                }
            }
        })
}))



type ScriptGeneratedProps = {
    isGenerated : boolean,
    scriptKey : string,
    setScriptKey : (s : string) => void,
    setIsGenerated : (n : boolean) => void
}


export const useScriptStore = create<ScriptGeneratedProps>((set) => ({
    isGenerated : false,
    scriptKey : "",
    setScriptKey: (s) => set({scriptKey : s}),
    setIsGenerated : (n) => set({isGenerated : n})
}))