import { LoadingSkeleton } from "../ui/loadingskeleton"

export const SpaceLoading = () => {
    return (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
            {
                Array.from({length : 3}).map((_, k) => (
                    <LoadingSkeleton className="w-full h-full rounded-xl px-5 py-7 space-y-4" key={k}>
                        <div className="flex flex-row gap-2 w-full items-center">
                            <LoadingSkeleton className="rounded-full size-6"/>
                            <LoadingSkeleton className="rounded-md w-20 h-5"/>
                        </div>
                        <div className="space-y-1">
                            <LoadingSkeleton className="w-10 h-4 rounded-md"/>
                            <LoadingSkeleton className="w-20 h-5 rounded-md"/>
                        </div>
                        <LoadingSkeleton className="w-full h-9 mt-10 rounded-md "/>
                    </LoadingSkeleton>
                ))
            }
        </div>
    )
}