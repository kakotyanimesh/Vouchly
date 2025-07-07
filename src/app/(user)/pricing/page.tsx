import { PricingSection } from "@/components/pricingSection";


export default function PricePage() {
	return (
		<div className="flex justify-center items-center flex-col md:gap-24 gap-10">
			<h1 className="text-3xl font-semibold">Upgrade your plan</h1>
            <PricingSection className="md:gap-0 gap-3" />
		</div>
	);
}
