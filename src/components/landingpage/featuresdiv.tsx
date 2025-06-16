import { FeatureCard } from "../ui/featurecard"
import { BentoGridFeatures } from "@/utils/hardcodeddata/shortcuts"

export const FeaturesDiv = () => {
    return (
        <div className=" space-y-4 md:w-[650px] w-full">
            <h1 className="md:text-4xl text-2xl">
                From 
                <span className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] bg-clip-text text-transparent mx-2">Collection</span>
                to 
                <span className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] bg-clip-text text-transparent mx-2">Conversion</span>
                <br  className="md:hidden flex"/>
                 Built In Features
            </h1>
            <div className="space-y-1">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-1">
                    {
                        BentoGridFeatures.slice(0, 2).map((g, k) => (
                            <FeatureCard
                                initial={g.initial}
                                whileInView={g.whileInView}
                                icon={g.icon}
                                className={g.className}
                                title={g.title}
                                key={k}
                                desc={g.desc}
                            />
                        ))
                    }
                </div>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-1">
                    {
                        BentoGridFeatures.slice(2, 5).map((g, k) => (
                            <FeatureCard 
                                initial={g.initial}
                                whileInView={g.whileInView}
                                icon={g.icon}
                                title={g.title}
                                className={g.className}
                                desc={g.desc}
                                key={k}
                                />

                        ))
                    }
                </div>
            </div>
        </div>
    )
}