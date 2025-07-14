"use client";
import { useOptimizedReviewRender } from "@/hooks/useReviewRenderV2";
import { cn } from "@/utils/lib/cn";
import {
	gridStyleType,
	reviewsType,
	TestimonialCardStyleProps,
	useGridStoreV2,
	useTestimonialStyleStore,
} from "@/utils/zustand/gridstateV2";
import { AutoSlide } from "./styles/SlideSpeak";
import { FlipViewWrapper } from "./styles/flipViewWrapper";
import { AnimatePresence, MotionProps } from "motion/react";
import { HorizontalAutoScrolling } from "./styles/horizontalscrolling";
import { FallBackText } from "@/components/ui/gradienteText";
import { GlassyReviewDiv } from "./styles/Glassydiv";
import { pickNonfunctios } from "@/utils/zustand/zustandUtils";

export const ReviewWrapperdiv = () => {
	const { gridStyleType, selectedReviews } = useGridStoreV2();

	const styleStore = useTestimonialStyleStore();

	const { shadowColor, ...withoutShadowColor } = pickNonfunctios(styleStore, [
		"parentBgColor",
	]);

	// const {}

	return (
		<div
			style={{
				background: styleStore.parentBgColor
			}}
			className={cn(
				"lg:h-[78vh] md:h-[62vh]  h-[calc(100vh-19rem)] lg:w-[68vw] w-[86vw] p-3 relative",
				gridStyleType === "Default"
					? "overflow-y-auto scrollbar scrollbar-thumb-[hsl(var(--primary))]/70 scrollbar-h-1 py-2 scrollbar-thumb-rounded-full scrollbar-track-[hsl(var(--primary))]/30 scrollbar-track-rounded-3xl"
					: "overflow-hidden flex justify-center items-center",
			)}
		>
			{(gridStyleType === "FlipView" ||
				gridStyleType === "GlideUp") && (
					<FallBackText
						className="lg:hidden block"
						t1="⚠️ This section won’t render here please open in a larger screen. "
					/>
				)}
			{selectedReviews.length === 0 && (
				<FallBackText
					className="absolute top-1/2 left-1/2 -translate-x-1/2"
					t1="Oops! Nothing to edit yet 😅"
				/>
			)}
			{(() => {
				switch (gridStyleType) {
					case "Default":
						return (
							<OnceselectedReviews
								selectedReviews={selectedReviews}
								gridType={gridStyleType}
								// motionProps={{
								// 	whileHover : {
								// 		// y : -2,
								// 		boxShadow: "1px 5px 4px #ffff"
								// 	}
								// }}
								className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1"
								data={{
									...withoutShadowColor,
								}}
							/>
						);
					case "ManualSlide":
						return (
							<OnceselectedReviews
								selectedReviews={selectedReviews}
								gridType={gridStyleType}
								// data={ }
								data={{
									...withoutShadowColor,
								}}
								className="flex flex-row  overflow-x-scroll gap-2 scrollbar scrollbar-thumb-[hsl(var(--primary))]/70 scrollbar-h-1 py-2 scrollbar-thumb-rounded-full scrollbar-track-[hsl(var(--primary))]/30 scrollbar-track-rounded-3xl"
							/>
						);
					case "AutoSlide":
						return (
							<AutoSlide
								selectedReviews={selectedReviews}
								gridType={gridStyleType}
								shadowcolor={shadowColor!}
								data={{
									...withoutShadowColor,
								}}
							/>
						);
					case "FlipView":
						return (
							<FlipViewWrapper
								data={{
									...withoutShadowColor,
								}}
								selectedReviews={selectedReviews}
								className="min-w-[490px]  hidden lg:flex"
							/>
						);
					case "GlideUp":
						return (
							<HorizontalAutoScrolling
								shadowcolor={shadowColor}
								data={{
									...withoutShadowColor,
								}}
								className="hidden lg:flex "
								selectedReviews={selectedReviews}
							/>
						);

					case "Luminate":
						return (
							<GlassyReviewDiv
								shadowcolor={shadowColor}
								className="w-[450px]"
								data={{ ...withoutShadowColor }}
								selectedReviews={selectedReviews}
								gridType={gridStyleType}
							/>
						);
					default:
						return (
							<OnceselectedReviews
								selectedReviews={selectedReviews}
								gridType={gridStyleType}
								className="grid grid-cols-3 gap-2 "
							/>
						);
				}
			})()}
		</div>
	);
};

export const OnceselectedReviews = ({
	className,
	selectedReviews,
	gridType,
	individualStyles,
	motionProps,
	data,
}: {
	className?: string;
	selectedReviews: reviewsType[];
	gridType: gridStyleType;
	individualStyles?: string;
	motionProps?: MotionProps;
	data?: Partial<Omit<TestimonialCardStyleProps, "parentBgColor">>;
}) => {
	const { renderReviews } = useOptimizedReviewRender();
	return (
		<AnimatePresence mode="wait">
			<div className={cn("", className)}>
				{selectedReviews.map((sr, k) =>
					renderReviews({
						review: sr,
						gridType,
						index: k,
						individualStyles,
						motionProps,
						data,
					}),
				)}
			</div>
		</AnimatePresence>
	);
};

// export <!--  -->
