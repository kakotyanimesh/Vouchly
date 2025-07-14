// export const reviewStyleType =

import { create } from "zustand";
import { TextReviewProps, VideoReviewProps } from "../types/user_types";

export type reviewsType = {
	id: number;
	type: "text" | "video";
	data: TextReviewProps | VideoReviewProps;
};

export type gridStyleType =
	| "ManualSlide"
	| "AutoSlide"
	| "FlipView"
	| "GlideUp"
	| "Luminate"
	| "BlueEcho"
	| "Default";

type GridV2State = {
	gridStyleType: gridStyleType;
	selectedReviews: reviewsType[];
};

type gridV2Action = {
	addReviews: (rv: reviewsType) => void;
	setGridStyle: (s: GridV2State["gridStyleType"]) => void;
};

const initialGridV2State: GridV2State = {
	gridStyleType: "Default",
	selectedReviews: [],
};

export const useGridStoreV2 = create<GridV2State & gridV2Action>((set) => ({
	...initialGridV2State,
	reset: () => set(initialGridV2State),
	addReviews: (rv) =>
		set((state) => {
			if (state.selectedReviews.includes(rv)) {
				return {
					selectedReviews: state.selectedReviews.filter(
						(sr) => sr.id !== rv.id,
					),
				};
			} else {
				return {
					selectedReviews: [...state.selectedReviews, rv],
				};
			}
		}),
	setGridStyle: (s) => set({ gridStyleType: s }),
}));

export type TestimonialCardStyleProps = {
	parentBgColor: string;
	textColor: string;
	starColor: string;
	tesimoonialCardBg: string;
	shadowColor: string;
	roundedCorner: number;
};

type TestimonialCardAction = {
	setTextColor: (c: string) => void;
	settesimoonialCardBg: (C: string) => void;
	setShadowColor: (c: string) => void;
	setStarColor: (c: string) => void;
	setRoundedCorner: (cr: number) => void;
	setparentBgColor: (c: string) => void;
	restyles: () => void;
};

const TestimonialCardInitialState: TestimonialCardStyleProps = {
	textColor: "#FFFFFF",
	tesimoonialCardBg: "",
	shadowColor: "#d53f8c",
	starColor: "#26bfa7",
	roundedCorner: 12,
	parentBgColor: "#121212",
};

export const useTestimonialStyleStore = create<
	TestimonialCardAction & TestimonialCardStyleProps
>((set) => ({
	...TestimonialCardInitialState,
	setTextColor: (c) => set({ textColor: c }),
	setparentBgColor: (p) => set({ parentBgColor: p }),
	setRoundedCorner: (c) => set({ roundedCorner: c }),
	setShadowColor: (s) => set({ shadowColor: s }),
	setStarColor: (s) => set({ starColor: s }),
	settesimoonialCardBg: (tg) => set({ tesimoonialCardBg: tg }),
	restyles : () => set({...TestimonialCardInitialState})
}));

// if we are not depanding on prev state just write set({statename : value})
// if we are depandent then set((state) => ({no : state.inc - 2}))
