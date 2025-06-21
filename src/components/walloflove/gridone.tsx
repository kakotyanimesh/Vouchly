"use client"

import { TextReviewOne } from "../ui/testimonialscomponents/textreviewone"
import { TextReviewPropsWallOfLove, VideoReviewPropsWallOflove } from "@/utils/types/user_types"
import { VideoTestimonialOne } from "../ui/testimonialscomponents/customvideotestimonial"
import { cn } from "@/utils/lib/cn"
import { useEffect } from "react"
import { useReviewStore } from "@/utils/zustand/gridState"

export const WallOfLoveText = ({data} : {data : TextReviewPropsWallOfLove[]}) => {

    const { embededIds, setTextReview, textReviewState } = useReviewStore()

    useEffect(() => {
      console.log(textReviewState);
      console.log(embededIds);
      
    
      return () => {
        
      }
    }, [textReviewState,embededIds])
    return (
        <div className="space-y-3 overflow-y-auto">
            <div className={`grid grid-cols-1 gap-2`}>
            {
                data.map((s, k) => (
                    <div key={k} className="relative w-full">
                        <input 
                            type="checkbox"
                            checked={embededIds.includes(s.id)}
                            onChange={() => setTextReview(s)}
                            className="absolute cursor-pointer bottom-3 right-2 z-10 appearance-none rounded-full size-4 bg-[hsl(var(--pure-white))]/20 border-2 border-[hsl(var(--primary))] checked:border-[hsl(var(--primary))] checked:bg-[hsl(var(--primary))]"
                            />
                        
                        <TextReviewOne
                        whileHover={{
                            scale : 1
                        }}
                        className={cn("h-full w-full", embededIds.includes(s.id) ? "border-[hsl(var(--primary))] border-2" : undefined)}
                        customerCompany={s.customerName} imageSrc={s.imageSrc} stars={s.stars} textReview={s.textReview!} customerName={s.customerName}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}


export const WallOfLoveVideo = ({data} : {data : VideoReviewPropsWallOflove[]}) => {
    const { embededIds, setVideoReview, videoReviewState } = useReviewStore()  
    useEffect(() => {
      console.log(videoReviewState);
      console.log(embededIds);
      
    
      return () => {
        
      }
    }, [videoReviewState,embededIds])
    
    return (
        <div className="space-y-3 overflow-y-auto">
            <div className={`grid grid-cols-1 gap-2`}>
                {
                    data.map((d, k) => (
                        <div key={k} className="relative">
                            <input 
                            type="checkbox"
                            checked={embededIds.includes(d.id)}
                            onChange={() => setVideoReview(d)}
                            className="absolute cursor-pointer bottom-3 right-2 z-10 appearance-none rounded-full size-4 bg-[hsl(var(--pure-white))]/20 border-2 border-[hsl(var(--primary))] checked:border-[hsl(var(--primary))] checked:bg-[hsl(var(--primary))]"
                            />
                            <VideoTestimonialOne 
                            whileHover={{
                                scale : 1
                            }}
                            className={cn("", embededIds.includes(d.id) ? "border-2 border-[hsl(var(--primary))]" : undefined)}
                            videoSrc={d.videoLink}  username={d.customerName} usercompany={d.customerCompany} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

