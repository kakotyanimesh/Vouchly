import { cn } from "@/utils/lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLMotionProps } from "motion/react";
import React from "react";
import { motion } from "motion/react";

const ButtonVariants = cva(
	"w-fit rounded-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-all ease-out duration-200",
	{
		variants: {
			variant: {
				primary: "bg-[hsl(var(--pure-white))]/60 text-black hover:shadow-[0px_0px_6px_1px_#e2e8f0]",
				secondary:
					"bg-gradient-to-r from-[hsl(var(--tertiary))]/60 to-[hsl(var(--primary))]/60 text-white hover:shadow-[0px_0px_4px_1px_#f687b3]",
				transparent:
					"bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/50 text-white hover:bg-[hsl(var(--primary))]/50",
				fetch: "hover:underline decoration-[hsl(var(--card-bg-one))] bg-gradient-to-r  from-[hsl(var(--card-bg-two))]/60 to-[hsl(var(--card-bg-one))] bg-clip-text text-transparent underline-offset-2",
				// decoration underline color
				randomColor:
					"bg-sky-300 text-blue-900 hover:shadow-[0px_0px_2px_1px_#667eea]",
			},
			sizes: {
				sm: "py-1 px-2 text-sm",
				md: "md:px-5 px-3 py-2 text-sm",
			},
		},
		defaultVariants: {
			variant: "primary",
			sizes: "md",
		},
	},
);

export interface ButtonProps
	extends Omit<HTMLMotionProps<"button">, "ref">,
		VariantProps<typeof ButtonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, variant, sizes, ...props }, ref) => {
		return (
			<motion.button
				initial={{
					scale: 1,
				}}
				whileTap={{
					scale: 0.95,
					transition: {
						ease: "easeOut",
					},
				}}
				ref={ref}
				className={cn(
					"",
					ButtonVariants({ variant, sizes }),
					className,
				)}
				{...props}
			>
				{children}
			</motion.button>
		);
	},
);

Button.displayName = "Button";
