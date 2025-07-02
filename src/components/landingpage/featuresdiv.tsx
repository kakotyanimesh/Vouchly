import { FeatureCard } from "../ui/featurecard"
import { BentoGridFeatures } from "@/utils/hardcodeddata/shortcuts"
import { GradientText } from "../ui/gradienteText"

export const FeaturesDiv = () => {
    return (
		<div className=" space-y-4 lg:w-[850px] md:[w-550px] w-full">
			<h1 className="md:text-4xl text-2xl">
				From
				<GradientText className="mx-2">Collection</GradientText>
				to
				<GradientText className="mx-2">Conversion</GradientText>
				<br className="md:hidden flex" />
				Built In Features
			</h1>
			<div className="space-y-1">
				<div className="grid md:grid-cols-3 grid-cols-1 gap-1">
					{BentoGridFeatures.slice(0, 2).map((g, k) => (
						<FeatureCard
							featureIconTypes={g.featureIconTypes}
							// initial={g.initial}
							// whileInView={g.whileInView}
							className={g.className}
							title={g.title}
							key={k}
							desc={g.desc}
						/>
					))}
				</div>
				<div className="grid md:grid-cols-3 grid-cols-2 gap-1">
					{BentoGridFeatures.slice(2, 5).map((g, k) => (
						<FeatureCard
							featureIconTypes={g.featureIconTypes}
							// initial={g.initial}
							// whileInView={g.whileInView}
							title={g.title}
							className={g.className}
							desc={g.desc}
							key={k}
						/>
					))}
				</div>
			</div>
		</div>
	);
}