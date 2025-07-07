"use client";
import React from "react";
import { cn } from "@/utils/lib/cn";
import { Button } from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Card } from "./card";
import { toast } from "sonner";

export type CardType = "Free" | "Professional" | "Enterprise";

type newPricingCardProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
	title: CardType;
	price: number;
	desc: string;
	features: string[];
	// src : string
};

export const NewPricingCard: React.FC<newPricingCardProps> = ({
	title,
	price,
	desc,
	features,
	className,
	...props
}) => {
	return (
		<Card
			className={cn(
				"px-5 py-5 space-y-3 border-0 text-left",
				className,
				title === "Professional"
					? "lg:-mt-10 md:-mt-5 lg:h-[540px] bg-[hsl(var(--primary))]/20 "
					: "md:h-[520px] lg:h-[450px]",
			)}
			{...props}
		>
			<h1 className="font-semibold text-xl">{title}</h1>
			<h1 className="text-slate-600">
				$ <span className="text-4xl text-white">{price}</span>
				/month
			</h1>
			<p className="text-sm">{desc}</p>
			<Button
				onClick={() =>
					toast.info("Payment Gateway Not Available Yet", {
						description:
							"The payment gateway integration is pending because my Lemon Squeezy account is still under verification. However, all backend logic is ready and in place.",
					})
				}
				variant={title === "Professional" ? "secondary" : "primary"}
				className="w-full"
			>
				Get {title}
			</Button>
			<div className="space-y-2">
				{features.map((f, k) => (
					<h1
						key={k}
						className="flex flex-row gap-2 items-center text-sm"
					>
						<FontAwesomeIcon icon={faCheck} size="2xs" />
						{f}
					</h1>
				))}
			</div>
		</Card>
	);
};
