"use client"
import { Button } from "@/components/ui/button";
import { FallBackText } from "@/components/ui/gradienteText";
import { useOptimizedReviewRender } from "@/hooks/useReviewRenderV2";
import { cn } from "@/utils/lib/cn";
import {
	gridStyleType,
	reviewsType,
	TestimonialCardStyleProps,
} from "@/utils/zustand/gridstateV2";
import { MoveLeft, MoveRight } from "lucide-react";
import { AnimatePresence, wrap } from "motion/react";
import { useState } from "react";

export const GlassyReviewDiv = ({
	selectedReviews,
	gridType,
	data,
	shadowcolor,
	className
}: {
	selectedReviews: reviewsType[];
	gridType: gridStyleType;
	shadowcolor?: string;
	data?: Partial<Omit<TestimonialCardStyleProps, "parentBgColor">>;
	className?:string
}) => {
	const { renderReviews } = useOptimizedReviewRender();
	const [cardNo, setCardNo] = useState<number>(0);
	const [direction, setDirection] = useState<1 | -1>(1);

	if (selectedReviews.length === 0)
		return (
			<FallBackText
				className="absolute top-1/2 left-1/2 -translate-x-1/2"
				t1="Oops! Nothing to edit yet 😅"
			/>
		);

	const setSlide = (newDirection: 1 | -1) => {
		const newSlideIndex = wrap(
			1,
			selectedReviews.length,
			cardNo + newDirection,
		);
		setCardNo(newSlideIndex);
		setDirection(newDirection);
	};
	return (
		<div className={cn("relative h-[300px] flex justify-center items-center", className)}>
			<AnimatePresence mode="wait">
				{renderReviews({
					review: selectedReviews[cardNo],
					gridType,
					data,
					shadowcolor,
					individualStyles: "flex justify-center items-center",
					index: selectedReviews[cardNo].id || cardNo,
					motionProps: {
						initial: { opacity: 0, x: 50 * direction },
						animate: { opacity: 1, x: 0 },
						exit: { opacity: 0, x: -50 * direction },
						transition: {
							ease: "easeOut",
							bounce: 0.3,
							duration: 0.2,
						},
					},
				})}
			</AnimatePresence>
			<Button
				className={cn(
					"z-30 md:-right-10 md:top-1/2 top-83 -translate-y-1/2 translate-x-7 rounded-full text-shadow-indigo-50 absolute",
					// selectedReviews.length == 1 && "hidden",
				)}
				variant={"randomColor"}
				sizes={"sm"}
				disabled={selectedReviews.length === 1}
				initial={{
					y: 0,
				}}
				whileHover={{
					y: -2,
					boxShadow: "5px 5px 0px 0px rgba(109,40,217)",
				}}
				onClick={() => setSlide(-1)}
			>
				<MoveRight size={14} />
			</Button>
			<Button
				className={cn(
					"absolute z-30 md:-left-15 md:top-1/2 top-83 -translate-x-7 -translate-y-1/2 rounded-full text-shadow-indigo-50",
					// selectedReviews.length === 1 && "hidden",
				)}
				variant={"randomColor"}
				sizes={"sm"}
				disabled={selectedReviews.length === 1}
				initial={{
					y: 0,
				}}
				whileHover={{
					y: -2,
					rotate: 1,
					boxShadow: "5px 5px 0px 0px rgba(109,40,217)",
				}}
				onClick={() => setSlide(1)}
			>
				<MoveLeft size={14} />
			</Button>
		</div>
	);
};
