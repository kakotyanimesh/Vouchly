"use client";
import { cn } from "@/utils/lib/cn";
import { motion } from "motion/react";
import React from "react";
import { Card } from "../card";
import { FeatureIconDivProps } from "./dashboardPreview";

export const ModerationPreview: React.FC<FeatureIconDivProps> = ({
	className,
	isHover,
	...props
}) => {
	return (
		<div
			className={cn("h-28 w-full overflow-hidden relative", className)}
			{...props}
		>
			<Card
				className={cn(
					"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0 p-1 transition-colors ease-linear delay-75",
					isHover
						? "bg-[hsl(var(--primary))]/40"
						: "bg-[hsl(var(--primary))]/5"
				)}
			>
				<ShieldIcon />
			</Card>
			<div className="border border-[hsl(var(--primary))]/30 w-28 h-28 rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
			<motion.div
				className="absolute w-28 h-28 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
				animate={{ rotate: 360 }}
				transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
			>
				<Card
					className={cn(
						" border-0 p-1 w-fit absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors ease-linear delay-200",
						isHover
							? "bg-[hsl(var(--feature-preview))]/40"
							: "bg-[hsl(var(--feature-preview))]/5"
					)}
				>
					<RocketIcon />
				</Card>

				<Card
					className={cn(
						"border-0 p-1 w-fit absolute bottom-2 left-1/2 translate-x-1/2 translate-y-1/2 transition-colors ease-linear delay-300",
						isHover
							? "bg-[hsl(var(--feature-preview))]/40"
							: "bg-[hsl(var(--feature-preview))]/5"
					)}
				>
					<MessageIcon />
				</Card>
			</motion.div>
		</div>
	);
};

const ShieldIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="size-6 fill-[hsl(var(--primary))] text-[hsl(var(--primary))]"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
			/>
		</svg>
	);
};

const RocketIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="size-6 fill-[hsl(var(--primary))] text-[hsl(var(--primary))]"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
			/>
		</svg>
	);
};

const MessageIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="size-6 fill-[hsl(var(--primary))] text-[hsl(var(--primary))]"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
			/>
		</svg>
	);
};
