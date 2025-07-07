import { NewPricingCard } from "@/components/ui/newPricingcard";
import { cn } from "@/utils/lib/cn";

export default function PricePage() {
	return (
		<div className="flex justify-center items-center flex-col md:gap-24 gap-10">
			<h1 className="text-3xl font-semibold">Upgrade your plan</h1>
            <PricingSection className="md:gap-0 gap-3" />
		</div>
	);
}

export const PricingSection = ({className} : {className ?: string}) => {
	return (
        <div className={cn("grid md:grid-cols-3 grid-cols-1", className)}>
			<NewPricingCard
				title="Free"
				price={0}
				desc="For hobby projects, early testing, or quick trials."
				features={[
					"1 space to manage testimonials",
					"Collect up to 2 video testimonials",
					"Store up to 5 total testimonials (text + video)",
					"Share a public Wall of Love (with our branding)",
					"Testimonials auto-delete after 7 days",
					"Great for trying out the platform before committing",
				]}
			/>
			<NewPricingCard
				title="Professional"
				price={17}
				desc="Ideal for creators, freelancers, and growing startups."
				features={[
					"Manage up to 5 spaces (for different products or brands)",
					"Accept up to 3 video testimonials per space",
					"Create up to 10 unique testimonial forms",
					"Collect a total of 20 testimonials across all forms",
					"No Embrify branding on your Wall of Love",
					"Perfect for building social proof for your service or business",
				]}
			/>
			<NewPricingCard
				title="Enterprise"
				price={34}
				desc="For large teams, agencies, or businesses needing full flexibility."
				features={[
					"Unlimited spaces – organize however you want",
					"Unlimited video testimonials",
					"Unlimited text testimonials",
					"Fully customizable Wall of Love",
					"Remove or white-label branding (on request)",
					"Priority support and onboarding help",
				]}
			/>
		</div>
	);
};
