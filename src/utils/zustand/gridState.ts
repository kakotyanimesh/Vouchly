import { create } from "zustand";
import { TextReviewProps, VideoReviewProps } from "../types/user_types";

export type gridTypes = "Carousel" | "Classic" | "Masonry";

type WallOfLoveState = {
	gridType: gridTypes;
	gridWidth: number;
	openFinalWidget: boolean;
};

type GridActions = {
	setgridType: (n: gridTypes) => void;
	setOpenFinalWidget: () => void;
	setGridWidth: (n: number) => void;
};

const initialState: WallOfLoveState = {
	gridType: "Masonry",
	gridWidth: 80,
	openFinalWidget: false,
};

export const useGridStore = create<WallOfLoveState & GridActions>((set) => ({
	...initialState,
	setgridType: (n: gridTypes) => set({ gridType: n }),
	setOpenFinalWidget: () =>
		set((state) => ({ openFinalWidget: !state.openFinalWidget })),
	setGridWidth: (n: number) => set({ gridWidth: n }),
}));

export type ReviewStyleType = {
	parentBgColor: string;
	textColor: string;
	starColor: string;
	rewiewCardBg: string;
	meteorColor: string;
	shadowColor: string;
	roundedCorner: number;
};

type ReviewStyleAction = {
	setTextColor: (c: string) => void;
	setrewiewCardBg: (C: string) => void;
	setMeteor: (c: string) => void;
	setShadowColor: (c: string) => void;
	setStarColor: (c: string) => void;
	setRoundedCorner: (cr: number) => void;
	setparentBgColor: (c: string) => void;
	restyles: () => void;
};

const reviewStyleInitiateState: ReviewStyleType = {
	textColor: "#FFFFFF",
	rewiewCardBg: "#242424",
	meteorColor: "#26bfa7",
	shadowColor: "#d53f8c",
	starColor: "#26bfa7",
	roundedCorner: 12,
	parentBgColor: "#121212",
};

export const useReviewStyle = create<ReviewStyleType & ReviewStyleAction>(
	(set) => ({
		...reviewStyleInitiateState,
		setrewiewCardBg: (c) => set({ rewiewCardBg: c }),
		setparentBgColor: (c) => set({ parentBgColor: c }),
		setMeteor: (c) => set({ meteorColor: c }),
		setRoundedCorner: (cr) => set({ roundedCorner: cr }),
		setShadowColor: (c) => set({ shadowColor: c }),
		setTextColor: (c) => set({ textColor: c }),
		setStarColor: (c) => set({ starColor: c }),
		restyles: () => set(reviewStyleInitiateState),
	}),
);
// depricited
export type OrderedReview = {
	id: number;
	type: "text" | "video";
	data: TextReviewProps | VideoReviewProps;
};

type EmbadedIdState = {
	embededIds: number[];
	textReviewState: TextReviewProps[];
	videoReviewState: VideoReviewProps[];
	orderedReviews: OrderedReview[];
};

type useReviewActions = {
	setTextReview: (tob: TextReviewProps) => void;
	setVideoReview: (vob: VideoReviewProps) => void;
	reset: () => void;
};

const initialReviewStore: EmbadedIdState = {
	embededIds: [],
	textReviewState: [],
	videoReviewState: [],
	orderedReviews: [],
};

export const useReviewStore = create<useReviewActions & EmbadedIdState>(
	(set) => ({
		...initialReviewStore,
		reset: () => set(initialReviewStore),
		setTextReview: (tr) =>
			set((state) => {
				const isAdded = state.embededIds.includes(tr.textreviewid);

				if (isAdded) {
					return {
						embededIds: state.embededIds.filter(
							(id) => id !== tr.textreviewid,
						),
						textReviewState: state.textReviewState.filter(
							(review) => review.textreviewid !== tr.textreviewid,
						),
						videoReviewState: state.videoReviewState,
						orderedReviews: state.orderedReviews.filter(
							(item) => item.id !== tr.textreviewid,
						),
					};
				} else {
					return {
						embededIds: [...state.embededIds, tr.textreviewid],
						textReviewState: [...state.textReviewState, tr],
						videoReviewState: state.videoReviewState,
						orderedReviews: [
							...state.orderedReviews,
							{ id: tr.textreviewid, type: "text", data: tr },
						],
					};
				}
			}),
		setVideoReview: (vo) =>
			set((state) => {
				const isAdded = state.embededIds.includes(vo.videoReviewid);

				if (isAdded) {
					return {
						embededIds: state.embededIds.filter(
							(id) => id !== vo.videoReviewid,
						),
						textReviewState: state.textReviewState,
						videoReviewState: state.videoReviewState.filter(
							(video) => video.videoReviewid !== vo.videoReviewid,
						),
						orderedReviews: state.orderedReviews.filter(
							(item) => item.id !== vo.videoReviewid,
						),
					};
				} else {
					return {
						embededIds: [...state.embededIds, vo.videoReviewid],
						textReviewState: state.textReviewState,
						videoReviewState: [...state.videoReviewState, vo],
						orderedReviews: [
							...state.orderedReviews,
							{ id: vo.videoReviewid, type: "video", data: vo },
						],
					};
				}
			}),
	}),
);

type ScriptGeneratedProps = {
	isGenerated: boolean;
	scriptKey: string;
	setScriptKey: (s: string) => void;
	setIsGenerated: (n: boolean) => void;
};

export const useScriptStore = create<ScriptGeneratedProps>((set) => ({
	isGenerated: false,
	scriptKey: "",
	setScriptKey: (s) => set({ scriptKey: s }),
	setIsGenerated: (n) => set({ isGenerated: n }),
}));
