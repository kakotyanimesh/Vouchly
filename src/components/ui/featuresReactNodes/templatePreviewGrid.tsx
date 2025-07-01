
"use client";
import { motion, Variants } from "motion/react";
import { cn } from "@/utils/lib/cn";
import React from "react";
import { HTMLMotionProps } from "motion/react";
import { FeatureIconDivProps } from "./dashboardPreview";

export const FormPreview: React.FC<FeatureIconDivProps> = ({
	className,
	isHover,
	...props
}) => {
	return (

		<div className={cn("h-28 md:mx-7 relative", className)} {...props}>
			<DeskTopFormCard isHover={isHover} />


			<MobileFormCard isHover={isHover} />
		</div>
	);
};

const cardVariants: Variants = {
	initial: {},
	hover: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const childVarient: Variants = {
	initial: {
		opacity: 0.3,
	},
	hover: {
		opacity: 1,
	},
};

const DeskTopFormCard = ({ isHover }: { isHover: boolean }) => {
	return (
		<motion.div
			variants={cardVariants}
			initial="initial"
			animate={isHover ? "hover" : "initial"}
			className="rounded-2xl bg-gradient-to-b from-[hsl(var(--feature-preview))]/10 to-transparent border-0 h-full md:w-72 flex flex-col items-center space-y-2 px-2 pt-2"
		>
			<MotionDiv variants={childVarient} />
			<MotionDiv variants={childVarient} className="md:w-42 w-28 h-2" />
			<div className="w-full flex flex-col justify-center items-center space-y-0.5">
				{Array.from({ length: 3 }).map((_, k) => (
					<MotionDiv
						variants={childVarient}
						key={k}
						className={cn("h-1", k % 2 === 0 ? "md:w-52 w-36" : "md:w-60 w-44")}
					/>
				))}
			</div>
			<MotionDiv
				variants={childVarient}
				className=" bg-gradient-to-b from-[hsl(var(--primary))] to-transparent w-40 h-full rounded"
			/>
		</motion.div>
	);
};

const MobileFormCard = ({ isHover }: { isHover: boolean }) => {
	return (
		<motion.div
			variants={cardVariants}
			initial="initial"
			animate={isHover ? "hover" : "initial"}
			className="rounded-2xl border-0 bg-gradient-to-b from-[hsl(var(--primary))]/20 to-transparent absolute h-full w-36 top-5 right-4 hidden md:flex flex-col items-center space-y-2 px-2 pt-2"
		>
			<MotionDiv variants={childVarient} className="w-6 h-4 bg-[hsl(var(--feature-preview))]" />
			<MotionDiv variants={childVarient} className="w-1/2 h-2 bg-[hsl(var(--feature-preview))]" />

			<div className="w-full flex flex-col justify-center items-center space-y-0.5">
				{Array.from({ length: 3 }).map((_, k) => (
					<MotionDiv
						key={k}

						variants={childVarient}
						className={cn(
							" h-1 bg-[hsl(var(--feature-preview))]",
							k % 2 === 0 ? "w-24" : "w-28"
						)}
					/>
				))}
			</div>

			<MotionDiv variants={childVarient} className=" bg-gradient-to-b from-[hsl(var(--feature-preview))] to-transparent w-28 h-full rounded" />
		</motion.div>
	);
};

export const MotionDiv: React.FC<HTMLMotionProps<"div">> = ({
	className,
	...props
}) => {
	return (
		<motion.div
			className={cn(
				"bg-[hsl(var(--primary))] w-6 h-5 border-0 rounded-2xl",

				className
			)}
			{...props}
		/>
	);
};

