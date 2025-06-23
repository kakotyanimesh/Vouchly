// "use client"
// import { TextReviewPropsWallOfLove, VideoReviewPropsWallOflove } from "@/utils/types/user_types";
// import { Card } from "./ui/card"
// import { useGridStore, useReviewStore } from "@/utils/zustand/gridState";
// import { useEffect } from "react";
// import { TextReviewOne } from "./ui/testimonialscomponents/textreviewone";
// import { VideoTestimonialOne } from "./ui/testimonialscomponents/customvideotestimonial";
// // import { useReviewStore } from "@/utils/zustand/gridState";
// // import { useEffect } from "react";

// interface EditorProps {
//     textReviewArray: TextReviewPropsWallOfLove[];
//     videoReviewArray: VideoReviewPropsWallOflove[]
// }
// export const ClientEditorPage = ({textReviewArray, videoReviewArray} : EditorProps) => {
//     const {setTextReview, setVideoReview, orderedReviews, reset} = useReviewStore()
//         const { gridNumber } = useGridStore()

//     useEffect(() => {
//         reset()
//         textReviewArray.forEach(rev => setTextReview(rev))
//         videoReviewArray.forEach(rev => setVideoReview(rev))
    
//     }, [setTextReview, setVideoReview, textReviewArray, videoReviewArray, reset])

    
//     return (
//         <div className="space-y-2">
//             {/* <h1 className="bg-[hsl(var(--primary))]/60 px-5 text-sm rounded-xl w-fit border-2 border-[hsl(var(--tertiary))]">
//                 Select testimonials to display.
//             </h1> */}
//             <Card className="flex-1 overflow-auto border-[hsl(var(--primary))]/60 p-4 scrollbar h-96 scrollbar-thumb-[hsl(var(--primary))] scrollbar-w-0.9">
//                 <div className={`grid grid-cols-${gridNumber} gap-1`}>
//                             {orderedReviews.map((item) => {
//                                 if (item.type === "text") {
//                                     const tr = item.data as TextReviewPropsWallOfLove
//                                     return (
//                                         <TextReviewOne
//                                             key={`text-${item.id}`}
//                                             customerName={tr.customerName}
//                                             customerCompany={tr.customerCompany}
//                                             stars={tr.stars}
//                                             textReview={tr.textReview}
//                                             imageSrc={tr.imageSrc}
//                                         />
//                                     )
//                                 } else {
//                                     const vr = item.data as VideoReviewPropsWallOflove
//                                     return (
//                                         <VideoTestimonialOne 
//                                             key={`video-${item.id}`}
//                                             videoSrc={vr.videoLink}
//                                             usercompany={vr.customerCompany}
//                                             username={vr.customerName}
//                                         />
//                                     )
//                                 }
//                             })}
//                 </div>
//             </Card>
//         </div>
//     )
// }

// export const GridGuideLines = [
//   "✅ Select testimonials to display.",
//   "🔢 Choose display order.",
//   "✍️ Mix text and video freely.",
//   "📱 Use 1 column on mobile.",
//   "🧱 Pick number of columns from bottom",
// ];