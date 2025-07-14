"use client";
import { useOptimizedReviewRender } from "@/hooks/useReviewRenderV2";
import { gridStyleType, reviewsType, TestimonialCardStyleProps } from "@/utils/zustand/gridstateV2";
import { motion, useAnimationControls } from "motion/react";
import { useEffect, useState } from "react";

// const getCardWidth = (review: reviewsType) => {
// 	if (review.type === "text") return 384;
// 	if (review.type === "video") return 288;
// 	return 0;
// };

export const AutoSlide = ({
	selectedReviews,
	gridType,
	data,
	shadowcolor
}: {
	selectedReviews: reviewsType[];
	gridType: gridStyleType;
	shadowcolor ?: string,
	data?: Partial<Omit<TestimonialCardStyleProps, "parentBgColor">>;
}) => {
	const { renderReviews } = useOptimizedReviewRender();
	const [isHoverd, setIsHoverd] = useState(false);
	const duplicateReviews = [
		...selectedReviews,
		...selectedReviews,
		...selectedReviews,
		...selectedReviews,
	];

	const animateControls = useAnimationControls();
	const totalLength = selectedReviews.length * (288 + 8) - 8;

	useEffect(() => {
		if (!isHoverd) {
			animateControls.start({
				x: -totalLength,
				transition: {
					ease: "linear",
					duration: totalLength / 50,
					repeat: Infinity,
				},
			});
		} else {
			animateControls.stop();
		}

		return () => {};
	}, [animateControls, isHoverd, totalLength]);

	return (
		<div className="overflow-hidden py-5">
			<motion.div
				onHoverStart={() => setIsHoverd(true)}
				onHoverEnd={() => setIsHoverd(false)}
				className="flex gap-2 cursor-pointer"
				animate={animateControls}
			>
				{duplicateReviews.map((sr, k) =>
					renderReviews({
						review: sr,
						gridType,
						index: k,
						data,
						motionProps: {
							initial: { y: 3 },
							whileHover: {
								boxShadow: `5px 5px 5px 0px ${shadowcolor || "rgba(109,40,217)"}`,
								y: 0,
								transition: {
									ease: "easeOut",
								},
								// rotate: -2,
							},
						},
					}),
				)}
			</motion.div>
		</div>
	);
};
