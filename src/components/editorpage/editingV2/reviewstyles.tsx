"use client";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils/lib/cn";
import { gridStyleType, useGridStoreV2 } from "@/utils/zustand/gridstateV2";
import { useRef } from "react";

export const EditingStyles = () => {
	const { setGridStyle, gridStyleType } = useGridStoreV2();
	const divRef = useRef<HTMLDivElement | null>(null)
	return (
		<Card className="lg:w-72 w-full h-26 rounded-md lg:h-[82vh] lg:overflow-y-auto overflow-y-hidden lg:overflow-x-hidden overflow-x-auto p-2 scrollbar scrollbar-thumb-[hsl(var(--primary))]/70 scrollbar-w-1 scrollbar-h-1 scrollbar-thumb-rounded-full scrollbar-track-[hsl(var(--primary))]/30 scrollbar-track-rounded-3xl flex-row flex gap-2 lg:flex-col ">
			{/* <div className="space-y-3 flex lg:flex-col flex-row lg:gap-0 gap-2  items-center"> */}
				{StyleGuid.map((s, k1) => (
					<Card
						ref={divRef}
						key={k1}
						className={cn(
							"p-3 cursor-pointer lg:w-full h-19 lg:h-28 w-48 relative transition-colors ease-out flex-shrink-0",
							gridStyleType === s.title
								? "bg-gradient-to-bl from-[hsl(var(--feature-preview))]/10 to-[hsl(var(--primary))]/10 border-0 shadow-[0px_0px_6px_0px_#81e6d9]"
								: "hover:shadow-[0px_0px_6px_0px_#81e6d9]",
						)}
						onClick={(e) => {
							setGridStyle(s.title);
							(e.currentTarget as HTMLDivElement).scrollIntoView({
								behavior : "smooth",
								block : "center",
								inline : "center"
							})
						}}
					>
						<h1 className="text-[hsl(var(--primary))]">
							{s.title}
						</h1>
						<p className="text-xs text-[hsl(var(--pure-white))]/30 break-all">
							{s.desc}
						</p>
						{gridStyleType === s.title && (
							<motion.p
								initial={{ opacity: 0, scale: 0.99 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									ease: "easeOut",
								}}
								className="text-xs  absolute right-4 top-2 bg-white/80 text-black rounded-2xl px-2"
							>
								selected
							</motion.p>
						)}
						<div className="hidden lg:grid grid-cols-2 gap-1 space-x-1 h-fit w-fit lg:mt-1 xl:mx-4">
							{s.feature.map((f, k2) => (
								<h1
									key={k2}
									className="text-xs bg-[hsl(var(--tertiary))]/10 border border-[hsl(var(--tertiary))]/40 text-[hsl(var(--tertiary))] w-fit rounded-2xl px-1 h-fit"
								>
									{f}
								</h1>
							))}
						</div>
					</Card>
				))}
			{/* </div> */}
		</Card>
	);
};
const StyleGuid: { title: gridStyleType; desc: string; feature: string[] }[] = [
	{
		title: "Default",
		desc: "Clean, grid-style layout",
		feature: ["responsive", "starRatings", "userAvatars", "cardLayout"],
	},
	{
		title: "ManualSlide",
		desc: "Clean, grid-style layout with social elements.",
		feature: ["responsive", "starRatings", "userAvatars", "cardLayout"],
	},
	{
		title: "AutoSlide",
		desc: "Carousel-style testimonials for hero sections.",
		feature: [
			"Navigation",
			"Slide",
			"starRatings",
			"Design",
		],
	},
	{
		title: "FlipView",
		desc: "Large quotes in a clean, professional layout.",
		feature: ["bigQuote", "responsive"],
	},
	{
		title: "GlideUp",
		desc: "Horizontal layout focused on trust and profiles.",
		feature: ["horizontalScroll"],
	},
	{
		title: "Luminate",
		desc: "Focused spotlight with a high-conversion layout.",
		feature: [ "clientAvatars", "highTrust"],
	},
	{
		title: "BlueEcho",
		desc: "Modern layout with vibrant gradients.",
		feature: ["gradientBg", "cleanText", "visualBrand"],
	},
];
