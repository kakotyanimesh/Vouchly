"use client";

import { cn } from "@/utils/lib/cn";
import { HTMLMotionProps, motion } from "motion/react";
import React, { useState } from "react";
import { BlurdivTertiary } from "./animateddivs";
import { DashboardPreview } from "./featuresReactNodes/dashboardPreview";
import { FormPreview } from "./featuresReactNodes/templatePreviewGrid";
import { EmbadedPreview } from "./featuresReactNodes/embadedPreview";
import { ModerationPreview } from "./featuresReactNodes/moderationPreview";
import { ReviewTamplatePreview } from "./featuresReactNodes/reviewTamplatesPreview";
import { GlowingComponent } from "./glowingdiv";

export type featureIconTypes = "Templates" | "Form" | "Dashboard" | "Moderation" | "Embaded"

type FeatureCardProps = HTMLMotionProps<"div"> & {
	title: string;
	desc: string;
	featureIconTypes: featureIconTypes;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
	className,
	title,
	desc,
	featureIconTypes,
	...props
}) => {
	const [isHover, setisHover] = useState<boolean>(false)
	return (
		<motion.div
			viewport={{ once: true }}
			onHoverStart={() => setisHover(true)}
			className={cn("relative", className)}
			{...props}
		>
			<BlurdivTertiary
				viewport={{ once: true }}
				initial={{ scale: 0, opacity: 0 }}
				whileInView={{ scale: 1, opacity: 0.7 }}
				transition={{
					duration: 0.4,
					// delay : 0.4,
					ease: "linear",
				}}
				className="right-0 size-20 rounded-2xl opacity-30 -z-10"
			/>
			<div
				className={
					"rounded-2xl group space-y-2 h-full bg-[hsl(var(--primary))]/10 backdrop-blur-3xl py-3 px-5 text-left"
				}
			>
				{returnIcon({ iconType: featureIconTypes, isHover })}

				<h1 className="">{title}</h1>
				{featureIconTypes === "Templates" && isHover && (
					<GlowingComponent
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{
							duration: 1,
							delay: 0.2,
							ease: "easeOut",
						}}
						className="-mt-3 bg-gradient-to-r from-transparent via-[hsl(var(--primary))] rounded-4xl h-[1px] w-28 to-transparent "
					/>
				)}
				<p className="text-sm text-white/70">{desc}</p>
			</div>
		</motion.div>
	);
};


const returnIcon = ({iconType, isHover} : {iconType : featureIconTypes, isHover : boolean}) => {
	switch (iconType) {
		case "Dashboard":
			return <DashboardPreview isHover={isHover} />;
		case "Form":
			return <FormPreview isHover={isHover} />;
		case "Embaded":
			return <EmbadedPreview isHover={isHover} />;
		case "Moderation":
			return <ModerationPreview isHover={isHover} />;
		case "Templates":
			return <ReviewTamplatePreview/>;
		default:
			return <DashboardPreview isHover={isHover} />;
	}
}