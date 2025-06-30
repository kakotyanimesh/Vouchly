/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/utils/lib/cn";
import { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import React from "react";
import Video from "next-video";
import Instaplay from "player.style/instaplay/react";

type VideoTestimonialType = HTMLMotionProps<"div"> & {
	username: string;
	usercompany: string;
	videoSrc: any;
};

export const VideoTestimonial: React.FC<VideoTestimonialType> = ({
	usercompany,
	username,
	videoSrc,
	className,
	...props
}) => {
	return (
		<motion.div
			// initial={false}
			// whileHover={{
			//     // y : -2,
			//     scale : 1.01,
			//     transition : {
			//         ease : "linear",
			//         duration : 0.4
			//     }
			// }}
			className={cn(
				"w-full h-full group bg-[hsl(var(--primary))]/40 backdrop-blur-2xl rounded-2xl overflow-hidden",
				className
			)}
			{...props}
		>
			<Video
				src={videoSrc}
				theme={Instaplay}
				controls
				className="rounded-md h-3/4 "
			/>
			<div className="font-semibold ">
				<h1>{username}</h1>
				<p>{usercompany}</p>
			</div>
		</motion.div>
	);
};
