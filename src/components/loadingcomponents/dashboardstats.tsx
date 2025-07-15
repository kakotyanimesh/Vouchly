import { LoadingSkeleton } from "../ui/loadingskeleton"

export const DashboadStatSkeleton = () => {
    return (
        <div className="grid md:grid-cols-3 md:space-y-0 space-y-3 md:gap-10 gap-3">
            {Array.from({length : 3}).map((_, k) => (
                <LoadingSkeleton key={k} className="w-full h-32 rounded-xl px-7 py-6 space-y-2">
                    <LoadingSkeleton className="w-32 h-2 rounded-md"/>
                    <LoadingSkeleton className="w-10 h-2 rounded-md"/>
                    <LoadingSkeleton className="w-40 h-2 rounded-md"/>
                </LoadingSkeleton>
            ))}
        </div>
    )
}

export const RecentlyActiveSkeleton = () => {
    return (
        <div>
            {
                Array.from({length : 3}).map((_, k) => (
                    <LoadingSkeleton key={k} className="w-full h-15 rounded-none first:rounded-t-2xl last:rounded-b-2xl border border-[hsl(var(--pure-white))]/20 p-4 flex flex-row justify-between">
                        <div className="space-y-1">
                            <LoadingSkeleton className="w-20 h-2 rounded-sm " />
                            <LoadingSkeleton className="w-10 h-2 rounded-sm " />
                        </div>
                        <div className="space-y-1">
                            <LoadingSkeleton className="w-10 h-2 rounded-sm " />
                            <LoadingSkeleton className="w-20 h-2 rounded-sm " />
                        </div>
                    </LoadingSkeleton>
                ))
            }
        </div>
    )
}