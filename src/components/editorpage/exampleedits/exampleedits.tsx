"use client";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils/lib/cn";

export const MassonaryGrid = () => {
	return (
		<Card className="columns-3 space-y-1 space-x-1 p-3 md:block hidden">
			{Array.from({ length: 5 }).map((_, k) => (
				<div
					key={k}
					className={cn(
						"w-full rounded-md bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] max-h-5",
						k % 2 === 0 ? "aspect-3/2" : "aspect-square",
					)}
				></div>
			))}
		</Card>
	);
};

export const ClassicGrid = () => {
	return (
		<Card className="md:grid grid-cols-2 hidden gap-1 p-3">
			{Array.from({ length: 4 }).map((_, k) => (
				<div
					key={k}
					className="w-full rounded-md bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] h-5"
				></div>
			))}
		</Card>
	);
};

export const Carousel = () => {
	return (
		<Card className="md:flex p-3 overflow-hidden hidden">
			<motion.div
				className="flex gap-3"
				animate={{ x: [0, -(64 + 12) * 12] }}
				transition={{
					duration: 35,
					ease: "linear",
					repeat: Infinity,
				}}
			>
				{Array.from({ length: 24 }).map((_, k) => (
					<div
						key={k}
						className="w-16 h-5 rounded-md bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] shrink-0"
					></div>
				))}
			</motion.div>
		</Card>
	);
};
