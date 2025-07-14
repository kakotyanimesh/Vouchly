"use client";
import { Button } from "@/components/ui/button";

import {
	reviewsType,
	TestimonialCardStyleProps,
} from "@/utils/zustand/gridstateV2";
import { MoveLeft, MoveRight } from "lucide-react";
import { useState } from "react";
import { useOptimizedReviewRender } from "@/hooks/useReviewRenderV2";
import { cn } from "@/utils/lib/cn";

export const FlipViewWrapper = ({
	selectedReviews,
	data,
	className
}: {
	selectedReviews: reviewsType[];
	data?: Partial<Omit<TestimonialCardStyleProps, "parentBgColor">>;
	className ?:string
}) => {
	const { renderReviews } = useOptimizedReviewRender();

	const [cardIndex, setCardIndex] = useState<number>(0);
	const foreward = () => {
		setCardIndex((prev) =>
			prev === selectedReviews.length - 1 ? 0 : prev + 1,
		);
	};
	const backward = () => {
		setCardIndex((prev) =>
			prev === 0 ? selectedReviews.length - 1 : prev - 1,
		);
	};
	
	const seededRandom = (seed: number) => {
		const x = Math.sin(seed) * 10000;
		return x - Math.floor(x);
	};

	const randomRotateY = (index: number) => {
		return Math.floor(seededRandom(index + 1) * 21) - 10;
	};

	return (
		<div className={cn("px-5 h-96 overflow-hidden relative", className)}>
			{selectedReviews.map((sr, k) =>
				renderReviews({
					review: sr,
					gridType: "FlipView",
					data,
					index: k,
					individualStyles:
						"absolute inset-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:size-80 w-68 h-fit origin-bottom backdrop-blur-3xl ",
					motionProps: {
						initial: {
							opacity: 0,
							scale: 0.9,
							z: -100,
							rotate: randomRotateY(k),
						},
						animate: {
							opacity: k === cardIndex ? 1 : 0.7,
							scale: k === cardIndex ? 1 : 0.97,
							z: k === cardIndex ? 0 : -100,
							zIndex:
								k === cardIndex
									? 40
									: selectedReviews.length + 3 - k,
							y: k === cardIndex ? [0, -80, 0] : 0,
						},
						exit: {
							opacity: 0,
							scale: 0.9,
							z: 100,
							rotate: randomRotateY(k),
						},
						transition: {
							duration: 0.4,
							ease: "easeInOut",
						},
					},
				}),
			)}

			<Button
				className="absolute z-99 right-1/2 md:translate-x-56  md:top-1/2 top-91 translate-x-10 -translate-y-1/2 rounded-full text-shadow-indigo-50"
				variant={"randomColor"}
				sizes={"sm"}
				initial={{
					y: 0,
				}}
				whileHover={{
					y: -2,
					boxShadow: "5px 5px 0px 0px rgba(109,40,217)",
				}}
				onClick={foreward}
			>
				<MoveRight size={14} />
			</Button>
			<Button
				className="absolute z-99 left-1/2 md:-translate-x-56 md:top-1/2 top-91 -translate-x-10 -translate-y-1/2 rounded-full text-shadow-indigo-50"
				variant={"randomColor"}
				sizes={"sm"}
				initial={{
					y: 0,
				}}
				whileHover={{
					y: -2,
					rotate: 1,
					boxShadow: "5px 5px 0px 0px rgba(109,40,217)",
				}}
				onClick={backward}
			>
				<MoveLeft size={14} />
			</Button>
		</div>
	);
};
