"use client";
import { useOptimizedReviewRender } from "@/hooks/useReviewRenderV2";
import { cn } from "@/utils/lib/cn";
import {
	reviewsType,
	TestimonialCardStyleProps,
} from "@/utils/zustand/gridstateV2";
import { motion, useAnimationControls } from "motion/react";
import { useEffect, useState } from "react";

export const HorizontalAutoScrolling = ({
	selectedReviews,
	data,
	shadowcolor,
	className
}: {
	selectedReviews: reviewsType[];
	shadowcolor ?:string
	data?: Partial<Omit<TestimonialCardStyleProps, "parentBgColor">>;
	className ?:string
}) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	const duplicateReviews = [
		...selectedReviews,
		...selectedReviews,
		...selectedReviews,
	];

	const animateControls = useAnimationControls();

	const totalLength = selectedReviews.length * (256 + 12) -12


	useEffect(() => {
		if (!isHovered) {
			animateControls.start({
				y: -totalLength,
				transition: {
					repeat: Infinity,
					ease: "linear",
					duration: 10
				},
			});
			return () => {
				animateControls.stop();
			};
		} else {
			animateControls.stop();
		}
	}, [isHovered, totalLength, animateControls]);

	const { renderReviews } = useOptimizedReviewRender();
	return (
		<div
			className={cn("min-w-[50vw] h-[50vw] justify-center scrollbar-hide overflow-hidden relative",className)}
			style={{ perspective: 800 }}
		>
			{/* <BlurdivTertiary className="size-32 blur-2xl "/> */}

			<motion.div
				onHoverStart={() => setIsHovered(true)}
				onHoverEnd={() => setIsHovered(false)}
				className="space-y-3 px-10"
				animate={animateControls}
			>
				{duplicateReviews.map((r, k) =>
					renderReviews({
						review: r,
						index: k,
						data,
						gridType: "GlideUp",
						individualStyles: "w-64",
						motionProps: {
							initial: {
								boxShadow: `5px 5px 10px 0px ${shadowcolor || "rgba(109,40,217)"}`,
								skew: -10,
							},
							animate: {
								boxShadow: `5px 5px 10px 0px ${shadowcolor || "rgba(109,40,217)"}`,
								skew: -10,
							},
							whileHover: {
								boxShadow: `-7px 7px 10px 0px ${shadowcolor || "rgba(109,40,217)"}`,
								skew: 3,
								transition: {
									ease: "easeOut",
								},
							},
						},

						// motionProps : {
						//     initial : {
						//         z : 2
						//     },
						//     whileHover : {
						//         boxShadow: "0 25px 50px -12px #3b82f620",
						//         y: 0,
						//     }
						// }
					}),
				)}
			</motion.div>
			{/* <div className="transform translate(-50%,-50%) rotateX(40deg)  bg-sky-300/75 h-fit px-10">1</div> */}
			{/* <BlurdivTertiary className="size-32 blur-2xl top-1/2 -translate-y-1/2 -z-1" /> */}
		</div>
	);
};

// const Hori
