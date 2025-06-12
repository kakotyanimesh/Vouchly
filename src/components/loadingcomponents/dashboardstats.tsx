import { LoadingSkeleton } from "../ui/loadingskeleton"

export const DashboadStats = () => {
    return (
        <div className="grid md:grid-cols-3 md:space-y-0 space-y-3 md:gap-10 gap-3">
            {Array.from({length : 3}).map((_, k) => (
                <LoadingSkeleton key={k} className="w-full h-32 rounded-xl px-7 py-6 space-y-2">
                    <LoadingSkeleton className="w-32 h-5 rounded-md"/>
                    <LoadingSkeleton className="w-10 h-5 rounded-md"/>
                    <LoadingSkeleton className="w-40 h-5 rounded-md"/>
                </LoadingSkeleton>
            ))}
        </div>
    )
}