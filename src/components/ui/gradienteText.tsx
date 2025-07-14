"use client";
import { motion } from "motion/react";
import { cn } from "@/utils/lib/cn";
import { HTMLMotionProps } from "motion/react";

type GradientTextType = HTMLMotionProps<"span">;

export const GradientText: React.FC<GradientTextType> = ({
	className,
	...props
}) => {
	return (
		<motion.span
			className={cn(
				"bg-gradient-to-r relative from-[hsl(var(--primary))] to-[hsl(var(--primary-light))] bg-clip-text text-transparent",
				className,
			)}
			{...props}
		/>
	);
};

export const FallBackText = ({
	t1,
	className,
    delayTime
}: {
	t1: string;
	className?: string;
    delayTime ?:number
}) => {
	return (
		<h1 className={cn("text-center text-2xl break-all", className)}>
			{t1.split(" ").map((t, tIdx) => (
				<motion.span
					initial={{ opacity: 0, filter: "blur(4px)", y: 4 }}
					animate={{ opacity: 1, filter: "blur(0px)", y : 0 }}
					className="mx-1"
					transition={{
					    delay : (delayTime ? delayTime : 0.04) * tIdx,
					    type : "spring",
					    bounce : 0
					}}
					key={tIdx}
				>
					{t}
				</motion.span>
			))}
		</h1>
	);
};
