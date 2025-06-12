import { LoadingSkeleton } from "@/components/ui/loadingskeleton";

export default function Loding() {
    return (
        <div className="md:space-y-12 space-y-2">
            <LoadingSkeleton className="w-24 md:h-5 h-7 rounded-md"/>
            <div className="grid md:grid-cols-4 md:gap-10 gap-2 grid-cols-2 ">
                {Array.from({length : 4}).map((_, k) => (
                    <LoadingSkeleton key={k} className="md:w-64 w-32 h-16 rounded-2xl flex md:flex-row flex-col items-center md:px-7 md:gap-2 gap-1 py-5">
                        <LoadingSkeleton className="rounded-full w-7 md:h-7 h-20"/>
                        <LoadingSkeleton className="rounded-full md:w-32 w-20 md:h-5 h-10"/>
                    </LoadingSkeleton>
                ))}
            </div>
            <div className="grid md:grid-cols-3 md:space-y-0 space-y-3 md:gap-10 gap-3">
                {Array.from({length : 3}).map((_, k) => (
                    <LoadingSkeleton key={k} className="w-full h-32 rounded-xl px-7 py-6 space-y-2">
                        <LoadingSkeleton className="w-32 h-5 rounded-md"/>
                        <LoadingSkeleton className="w-10 h-5 rounded-md"/>
                        <LoadingSkeleton className="w-40 h-5 rounded-md"/>
                    </LoadingSkeleton>
                ))}
            </div>
            <div className="space-y-3">
                <LoadingSkeleton className="w-24 h-5 rounded-md"/>
                <LoadingSkeleton className="md:w-full w-[300px] md:h-56 h-20 space-y-5">
                {/* {
                    Array.from({length : 3}).map((arraylike, k) => (
                        <LoadingSkeleton key={k} className="w-full h-10 flex flex-row justify-between p-4">
                            <LoadingSkeleton className="w-10 h-4 rounded-md"/>
                            <LoadingSkeleton className="w-10 h-4 rounded-md"/>
                        </LoadingSkeleton>
                    ))
                } */}
                </LoadingSkeleton>
            </div>
        </div>
    )
}