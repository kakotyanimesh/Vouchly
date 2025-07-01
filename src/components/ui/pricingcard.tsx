"use client";
import { HTMLMotionProps } from "motion/react";
import React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/utils/lib/cn";
import { Button } from "./button";
import { redirect } from "next/navigation";
import animeshvideo from "@/videos/animeshvideo.mp4.json";
import { VideoTestimonial } from "./testimonialscomponents/videotestimonial";

export type CardType = "Free" | "Professional" | "Enterprice";

type PricingProps = HTMLMotionProps<"div"> & {
	title: CardType;
	price: number;
	desc: string;
	features: string[];
};

export const PricingCard: React.FC<PricingProps> = ({
	className,
	title,
	price,
	desc,
	features,
	...props
}) => {
	return (
		<motion.div
			initial={false}
			whileHover={{
				scale: 1.02,
				// backgroundColor : "black"
			}}
			transition={{

				ease: "easeOut",
				duration: 0.1,
				// delay : 0.1
			}}
			className={cn(
				"space-y-3 h-fit group relative transition-colors ease-linear duration-200 rounded-2xl text-left p-4",
				title === "Professional"
					? "shadow-[0px_0px_1px_1px_#a62fd5] bg-gradient-to-bl from-[hsl(var(--feature-preview))]/10 to-[hsl(var(--primary))]/10"
					: "border-slate-100/10 bg-[hsl(var(--primary))]/10",
				className
			)}
			{...props}
		>
			{title === "Professional" && (
				<h1 className="absolute -top-3 left-1/2 bg_card_gradient text-white text-sm px-2 py-0.5 rounded-md backdrop-blur-3xl">
					Most Popular
				</h1>
			)}
			<h1
				className={cn(
					"text-2xl font-bold",
					title === "Professional"
						? "bg-gradient-to-br from-[hsl(var(--primary))] to-teal-500 bg-clip-text text-transparent"
						: "text-white"
				)}
			>
				{title}
			</h1>
			<h1 className="text-sm text-slate-500">
				<span className="text-2xl text-[hsl(var(--primary))]">
					{price}
				</span>
				/month
			</h1>
			<p className="text-sm">{desc}</p>
			<div>
				{features.map((f, k) => (
					<h1
						className="flex flex-row items-center gap-2 text-sm"
						key={k}
					>
						<Check
							className="bg-[hsl(var(--primary))] rounded-full text-black"
							size={12}
						/>{" "}
						{f}
					</h1>
				))}
			</div>
			<Button
				onClick={() => redirect("/signin")}
				className={cn(
					"w-full mt-3 transition-colors ease-linear duration-200",
					title !== "Professional" ? "" : undefined
				)}
				variant={title === "Professional" ? "secondary" : "transparent"}
			>
				Get Started
			</Button>
		</motion.div>
	);
};

export const DetailedPricingCard = ({cardType}: {cardType : CardType}) => {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, scale: 0.7 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.7 }}
			transition={{ type: "spring", stiffness: 300, damping: 30, delay : 0.1 }}
			className="text-left space-y-4 pt-14 flex flex-col rounded-2xl absolute -left-90 h-[500px] -top-10 w-72 p-4 bg-[hsl(var(--feature-preview))]/60 border-0"
		>
			{/* <Logo className="text-sm"/> */}
			<h1 className="text-xl">
				{cardType === "Enterprice"
					? "Enterprise-Ready"
					: cardType === "Professional"
					? "Built for Professionals"
					: " Start for Free"}
			</h1>
			<p className="text-sm">
				{cardType === "Enterprice"
					? "Scalable and secure solutions tailored for growing organizations."
					: cardType === "Professional"
					? "Powerful features to help individuals and small teams grow credibility"
					: "A simple way to begin collecting authentic testimonials."}
			</p>
			<Button className="bg-[hsl(var(--primary))]/40 text-white border border-[hsl(var(--tertiary))]">
				Get Started
			</Button>
			<div className="flex justify-end mt-auto">
				<VideoTestimonial
					// {...leftAnimation}
					className="bg-gradient-to-bl from-[hsl(var(--feature-preview))]/40 to-[hsl(var(--primary))]/60 text-center"
					username="Animesh"
					usercompany="Tits.com"
					// going to change this video based on cardtype
					videoSrc={animeshvideo}
				/>
			</div>
		</motion.div>
	);
};
