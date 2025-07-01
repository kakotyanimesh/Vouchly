"use client";
import { GradientText } from "../ui/gradienteText";
import { PricingCard } from "../ui/pricingcard";

export const PricingDiv = () => {
	return (
		<div className="space-y-5 relative">
			<h1 className="md:text-4xl text-2xl">
				Start
				<GradientText className=" mx-2">Free</GradientText>
				Scale When You
				<GradientText className=" mx-2">Grow</GradientText>
			</h1>


			<div className="grid md:grid-cols-3 grid-cols-1 gap-5 lg:w-[850px] md:[w-550px]">

				<PricingCard
					// className="-rotate-3"
					title="Free"
					desc="For hobbies"
					price={0}
					features={[
						"1 Space",
						"1 Video Testimonial",
						"5 text Testimonial",
						"Wall of Love with Our Logo",
					]}
				/>

				<PricingCard
					// className="rotate-0 py-5"
					title="Professional"
					desc="Perfect for individuals and small businesses getting started with testimonials"
					price={20}
					features={[
						"4 Space",
						"10 Video Testimonial",
						"Unlimited Text Testimonial",
						"Wall of Love without Our Logo",
					]}
				/>

				<PricingCard
					// className="rotate-3"
					title="Enterprice"
					desc="For organizations requiring maximum control and customization."
					price={100}
					features={[
						"Unlimted space",
						"Unlimted Testimonial",
						"Unlimited Text Testimonial",
						"Wall of Love with Our Logo",
					]}
				/>
			</div>
		</div>
	);
};


{/* <AnimatePresence mode="wait">
	{cardName && (
		<div>
			{cardName === "Enterprice" && (
				<DetailedPricingCard cardType="Enterprice" />
			)}
			{cardName === "Professional" && (
				<DetailedPricingCard cardType="Professional" />
			)}
			{cardName === "Free" && <DetailedPricingCard cardType="Free" />}
		</div>
	)}
</AnimatePresence>; */}