"use client";
import { cn } from "@/utils/lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import React from "react";
// import { motion } from "motion/react"

const LinkVariant = cva(
	"w-fit disabled:cursor-not-allowed rounded-xl disabled:opacity-50 transition-all ease-out duration-200",
	{
		variants: {
			variants: {
				primary: "text-[hsl(var(--primary))]",
				secondary:
					"bg-[hsl(var(--primary))]/60 text-white hover:shadow-[0px_0px_6px_0px_#38b2ac]",
				tertiary:
					"bg-[hsl(var(--pure-white))]/80 text-black hover:shadow-[0px_0px_9px_0px_#a0aec0]",
			},
			sizes: {
				sm: "",
				md: "md:px-5 px-3 py-2 text-sm",
			},
		},
		defaultVariants: {
			variants: "primary",
			sizes: "sm",
		},
	},
);

interface LinkProps
	extends React.ComponentProps<typeof Link>,
		VariantProps<typeof LinkVariant> {}

export const LinkTag = React.forwardRef<
	React.ComponentRef<typeof Link>,
	LinkProps
>(({ className, variants, sizes, ...props }, ref) => {
	return (
		<Link
			ref={ref}
			className={cn(LinkVariant({ variants, sizes }), className)}
			{...props}
		/>
	);
});

LinkTag.displayName = "Link";
