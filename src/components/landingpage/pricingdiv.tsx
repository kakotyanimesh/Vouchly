"use client";
import { PricingSection } from "@/app/(user)/pricing/page";
import { GradientText } from "../ui/gradienteText";

export const PricingDiv = () => {
	return (
		<div className="md:space-y-20 space-y-5">
			<h1 className="md:text-4xl text-2xl">
				Start
				<GradientText className=" mx-2">Free</GradientText>
				Scale When You
				<GradientText className=" mx-2">Grow</GradientText>
			</h1>
			<PricingSection className="xl:mx-44 gap-3 md:gap-0"/>
		</div>
	);
};

