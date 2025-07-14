"use client";

import { cn } from "@/utils/lib/cn";
import { OrderedReviewTypes } from "@/utils/types/user_types";
import { useGridStoreV2 } from "@/utils/zustand/gridstateV2";
import { HTMLMotionProps, motion } from "motion/react";
import { useEffect, useRef } from "react";

type inputType = HTMLMotionProps<"input"> & {
	data: OrderedReviewTypes;
};

export const CheckBox: React.FC<inputType> = ({
	className,
	data,
	...props
}) => {
	// const { setTextReview, setVideoReview, } = useReviewStore()
	const { addReviews, selectedReviews } = useGridStoreV2();
	// useEffect(() => {

	//     console.log(videoReviewState);
	//     console.log(textReviewState);

	// }, [videoReviewState, textReviewState])
	const isAddedtoZustand = useRef<boolean>(false);

	useEffect(() => {
		if (props.defaultChecked && !isAddedtoZustand.current) {
			const isInZustandStore = selectedReviews.some(
				(rv) => rv.id === data.id,
			);
			if (!isInZustandStore) {
				addReviews(data);
			}
			isAddedtoZustand.current = true;
		}
	}, [props.defaultChecked, data, addReviews, selectedReviews]);

	return (
		<motion.input
			initial={{
				scale: 1,
			}}
			whileTap={{
				scale: 0.9,
				transition: {
					ease: "easeOut",
				},
			}}
			onChange={() => {
				addReviews(data);
				// if(data.type === "text"){
				//     setTextReview(data.data)
				// } else if(data.type === "video"){
				//     setVideoReview(data.data)
				// }
			}}
			type="checkbox"
			className={cn(
				"appearance-none hover:shadow-[1px_0px_28px_0px_#f687b3] size-4 border-2 cursor-pointer border-[hsl(var(--tertiary))] rounded-md bg-white/20 checked:bg-[hsl(var(--tertiary))]/70 checked:shadow-2xl checked:shadow-amber-700",
				className,
			)}
			{...props}
		/>
	);
};
