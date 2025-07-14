// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { cn } from "@/utils/lib/cn";
// import { HTMLMotionProps } from "motion/react";
// import { motion } from "motion/react";
// import { useRef, useState } from "react";
// import { Pause, Play, Star } from "lucide-react";
// import React from "react";

// type VideoTestimonialType = HTMLMotionProps<"div"> & {
// 	username: string;
// 	usercompany: string;
// 	videoSrc: any;
// 	stars: number;
// 	borderRadius?: number;
// 	bgColor?: string;
// 	starColor?: string;
// };

// export const VideoTestimonialOne: React.FC<VideoTestimonialType> = ({
// 	usercompany,
// 	bgColor,
// 	username,
// 	videoSrc,
// 	starColor,
// 	borderRadius,
// 	stars,
// 	className,
// 	...props
// }) => {
// 	const type = getVideoType(videoSrc);
// 	const videoRef = useRef<HTMLVideoElement>(null);
// 	const [isPlaying, setIsPlaying] = useState<boolean>(false);

// 	const videoHandle = () => {
// 		const video = videoRef.current;

// 		if (!video) return;
// 		if (video.paused) {
// 			setIsPlaying(true);
// 			video.play();
// 		} else {
// 			setIsPlaying(false);
// 			video.pause();
// 		}
// 	};

// 	return (
// 		<motion.div
// 			// initial={false}
// 			// whileHover={{
// 			//     // y : -2,
// 			//     scale : 1.01,
// 			//     transition : {
// 			//         ease : "linear",
// 			//         duration : 0.1
// 			//     }
// 			// }}
// 			style={{
// 				borderRadius: borderRadius,
// 			}}
// 			className={cn(
// 				" rounded-2xl  h-[300px]  relative overflow-hidden ",
// 				className,
// 			)}
// 			{...props}
// 		>
// 			<video
// 				ref={videoRef}
// 				style={{
// 					borderRadius: borderRadius,
// 					objectFit: "cover",
// 				}}
// 				className={cn("w-full h-full")}
// 				preload="metadata"
// 			>
// 				<source src={videoSrc} type={`video/${type}`} />
// 				your brower does not support video
// 			</video>
// 			<button
// 				onClick={videoHandle}
// 				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[hsl(var(--tertiary))]/70 text-[hsl(var(--primary))] rounded-full size-10 items-center justify-center flex cursor-pointer"
// 			>
// 				{!isPlaying ? (
// 					<Play className="fill-[hsl(var(--primary))]" size={20} />
// 				) : (
// 					<Pause className="fill-[hsl(var(--primary))]" size={20} />
// 				)}
// 			</button>
// 			<div
// 				style={bgColor ? { backgroundColor: bgColor } : {}}
// 				className="font-semibold text-center absolute w-full rounded-b-xl bottom-0 bg_card_gradient"
// 			>
// 				<h1>{username}</h1>
// 				<p>{usercompany}</p>
// 				<div className="flex flex-row gap-1 justify-center">
// 					{Array.from({ length: 5 }).map((_, k) => (
// 						<Star
// 							key={k}
// 							size={15}
// 							className={cn(
// 								"text-[hsl(var(--primary))]",
// 								stars > k ? "fill-[hsl(var(--primary))]" : "",
// 							)}
// 							style={{
// 								color: starColor,
// 								fill: stars > k ? starColor : undefined,
// 							}}
// 						/>
// 					))}
// 				</div>
// 			</div>
// 		</motion.div>
// 	);
// };

// const getVideoType = (url: string) => {
// 	const type = url.split(".").pop();
// 	switch (type) {
// 		case "mp4":
// 			return "mp4";
// 		case "webm":
// 			return "webm";
// 		case "ogg":
// 			return "ogg";
// 		case "mov":
// 			return "mov";

// 		case "avi":
// 			return "avi";
// 		default:
// 			return "mp4";
// 	}
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/utils/lib/cn";
import { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import React from "react";
import { TestimonialCardStyleProps } from "@/utils/zustand/gridstateV2";
import { RenderStars } from "./flipview";

export type VideoTestimonialType = HTMLMotionProps<"div"> & {
	username: string;
	usercompany: string;
	videoSrc: any;
	stars: number;
	fixedHeight?: number;
} & Partial<Omit<TestimonialCardStyleProps, "parentBgColor" | "shadowColor">>;

export const VideoTestimonialOne: React.FC<VideoTestimonialType> = ({
	usercompany,
	username,
	videoSrc,
	textColor,
	roundedCorner,
	tesimoonialCardBg,
	starColor,
	stars,
	className,
	fixedHeight = 250,
	...props
}) => {
	const type = getVideoType(videoSrc);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	const videoHandle = () => {
		const video = videoRef.current;

		if (!video) return;
		if (video.paused) {
			setIsPlaying(true);
			video.play();
		} else {
			setIsPlaying(false);
			video.pause();
		}
	};

	return (
		<motion.div
			style={{
				borderRadius: `${roundedCorner || 16}px`,
				height: fixedHeight,
				color: textColor
			}}
			className={cn("relative overflow-hidden", className)}
			{...props}
		>
			<video
				ref={videoRef}
				style={{
					// borderRadius: `${roundedCorner}px`,
					objectFit: "cover",
					width: "100%",
					height: "70%",
				}}
				className={cn(" inset-0")}
				preload="metadata"
			>
				<source src={videoSrc} type={`video/${type}`} />
				your browser does not support video
			</video>
			<button
				onClick={videoHandle}
				style={{
					background: tesimoonialCardBg || "hsl(var(--tertiary)/0.7)",
				}}
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-[hsl(var(--primary))] rounded-full size-10 flex items-center justify-center cursor-pointer z-20 transition-all duration-200 hover:scale-110 backdrop-blur-3xl"
			>
				{!isPlaying ? (
					<Play
						style={{
							fill:
								"hsl(var(--primary))",
						}}
						size={24}
					/>
				) : (
					<Pause
						style={{
							fill:
								"hsl(var(--primary))",
						}}
						size={20}
					/>
				)}
			</button>
			<div
				style={{
					background:
						tesimoonialCardBg ||
						`linear-gradient(to right, hsl(var(--feature-preview)/ 0.4), hsl(var(--primary)/0.6))`,
				}}
				className="font-semibold text-center w-full rounded-b-xl p-3"
			>
				<h1 className="text-sm">{username}</h1>
				<p className="text-xs">{usercompany}</p>
				{RenderStars({ starNo: stars, starColor, className: "flex justify-center items-center" })}
			</div>
		</motion.div>
	);
};


export const getVideoType = (url: string) => {
	const type = url.split(".").pop();
	switch (type) {
		case "mp4":
			return "mp4";
		case "webm":
			return "webm";
		case "ogg":
			return "ogg";
		case "mov":
			return "mov";

		case "avi":
			return "avi";
		default:
			return "mp4";
	}
};
