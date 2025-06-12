import { LoadingSkeleton } from "@/components/ui/loadingskeleton";

export default function Loding() {
    return (
        <div className="mt-20 space-y-10">
            <div className="grid md:grid-cols-4 md:gap-10 gap-5 grid-cols-2 ">
                {Array.from({length : 4}).map((s, k) => (
                    <LoadingSkeleton key={k} className="w-64 h-16 rounded-xl"/>
                ))}
            </div>
            <div className="grid md:grid-cols-3 md:gap-10 gap-3">
                {Array.from({length : 3}).map((s, k) => (
                    <LoadingSkeleton key={k} className="w-80 h-32 rounded-xl"/>
                ))}
            </div>
            <div className="grid md:grid-cols-3 md:gap-10 gap-3">
                {Array.from({length : 3}).map((s, k) => (
                    <LoadingSkeleton key={k} className="w-80 h-32 rounded-xl"/>
                ))}
            </div>
        </div>
    )
}