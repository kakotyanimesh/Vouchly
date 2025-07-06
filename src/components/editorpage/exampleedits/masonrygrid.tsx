"use client";
import { OrderedReview, ReviewStyleType } from "@/utils/zustand/gridState";
import { motion, MotionProps, Target } from "motion/react";
import { CorosoulGrid } from "./corosoulgrid";

export const MassonaryGridComponent = ({
	orderedReviews,
	reviewStyles,
}: {
	orderedReviews: OrderedReview[];
	reviewStyles: Omit<ReviewStyleType, "parentBgColor">;
}) => {
	const firstArray = orderedReviews.slice(
		0,
		Math.floor(orderedReviews.length / 2),
	);
	const totalFirstArray = [...firstArray, ...firstArray];
	const secondArray = orderedReviews.slice(
		Math.floor(orderedReviews.length / 2),
	);
	const totalSecondArry = [...secondArray, ...secondArray];
	return (
		<motion.div className="flex flex-col space-y-1 px-10 ">
			<CorosoulGrid
				direction="left"
				reviewStyles={reviewStyles}
				orderedReviews={totalFirstArray}
			/>
			<CorosoulGrid
				direction="right"
				reviewStyles={reviewStyles}
				orderedReviews={totalSecondArry}
			/>
		</motion.div>
	);
};

export const HoverAnimation = ({
	k,
	shadowColor,
}: {
	k: number;
	shadowColor: string;
}): MotionProps => {
	const animtaion: Target = {
		scale: 1.04,
		rotate: k % 2 === 0 ? 2 : -2,
		boxShadow: `0px 0px 8px 2px ${shadowColor}`,
	};
	return {
		initial: false,
		whileHover: { ...animtaion },
		whileTap: { ...animtaion },
		transition: {
			ease: "easeOut",
			duration: 0.5,
		},
	};
};

// export const SingleCorosoul = ({review, totalLength } : {review : OrderedReview[], totalLength : number}) => {
//     const [ishoverd, setIshoverd] = useState(false)
//     const {renderReview} = useRenderReview()

//     const animationControls = useAnimationControls()
//     const xValue = useMotionValue(0)
//     useEffect(() => {
//       if(!ishoverd){
//         animationControls.start({
//             x : totalLength,
//             transition : {
//                     repeat : Infinity,
//                     repeatType : "loop",
//                     duration : 3,
//                     ease : "linear"
//                 }
//         })
//       } else {
//         animationControls.stop()
//       }

//     }, [ishoverd, animationControls, totalLength])

//     return (
//             <motion.div
//             onHoverStart={() => setIshoverd(true)}
//             onHoverEnd={() => setIshoverd(false)}
//             animate={animationControls}
//             style={{x : xValue}}
//             className="flex flex-row gap-2 w-full relative"
//         >

//             {
//                 review.map((rev, k) => (
//                     renderReview({
//                         review : rev,
//                         index : k,
//                         className : "h-[180px] xl:w-[320px] md:w-[280px] w-[150px] flex-shrink-0",
//                         motionProps : HoverAnimation(k)
//                     })
//                 ))
//             }
//         </motion.div>
//     )
// }
