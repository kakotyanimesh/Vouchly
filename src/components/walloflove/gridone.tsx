"use client"
import { useGridStore } from "@/utils/zustand/gridState"
import { TextReviewOne } from "../ui/testimonialscomponents/textreviewone"
import { TextReviewProps } from "@/utils/types/user_types"

export const WallOfLoveText = ({data} : {data : TextReviewProps[]}) => {
    const { gridNumber } = useGridStore()
    return (
        <div className="space-y-5">
            <h1 className="bg-[hsl(var(--primary))]/60 px-5 py-1 rounded-2xl w-fit border border-[hsl(var(--primary))]">{gridNumber} X {gridNumber} Grid</h1>
            <div className={`grid md:grid-cols-${gridNumber} grid-cols-1 gap-1`}>
            {
                data.map((s, k) => (
                    <TextReviewOne
                    className=""
                    customerCompany={s.customerName} imageSrc={"/images/logo.png"} stars={s.stars} textReview={s.textReview!} customerName={s.customerName} key={k}/>
                ))
            }
            </div>
        </div>
    )
}