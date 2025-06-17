"use client"

import { VideoElement } from "@/components/ui/videoelememt"



// import { motion } from "motion/react"

export default function Loding() {
    return (
        // <div className="md:space-y-12 space-y-2">
        //     <LoadingSkeleton className="w-24 md:h-5 h-7 rounded-md"/>
        //     <div className="grid md:grid-cols-4 md:gap-10 gap-2 grid-cols-2 ">
        //         {Array.from({length : 4}).map((_, k) => (
        //             <LoadingSkeleton key={k} className="md:w-64 w-32 h-16 rounded-2xl flex md:flex-row flex-col items-center md:px-7 md:gap-2 gap-1 py-5">
        //                 <LoadingSkeleton className="rounded-full w-7 md:h-7 h-20"/>
        //                 <LoadingSkeleton className="rounded-full md:w-32 w-20 md:h-5 h-10"/>
        //             </LoadingSkeleton>
        //         ))}
        //     </div>
        //     <div className="grid md:grid-cols-3 md:space-y-0 space-y-3 md:gap-10 gap-3">
        //         {Array.from({length : 3}).map((_, k) => (
        //             <LoadingSkeleton key={k} className="w-full h-32 rounded-xl px-7 py-6 space-y-2">
        //                 <LoadingSkeleton className="w-32 h-5 rounded-md"/>
        //                 <LoadingSkeleton className="w-10 h-5 rounded-md"/>
        //                 <LoadingSkeleton className="w-40 h-5 rounded-md"/>
        //             </LoadingSkeleton>
        //         ))}
        //     </div>
        //     <div className="space-y-3">
        //         <LoadingSkeleton className="w-24 h-5 rounded-md"/>
        //         <LoadingSkeleton className="md:w-full w-[300px] md:h-56 h-20 space-y-5">
        //         {/* {
        //             Array.from({length : 3}).map((arraylike, k) => (
        //                 <LoadingSkeleton key={k} className="w-full h-10 flex flex-row justify-between p-4">
        //                     <LoadingSkeleton className="w-10 h-4 rounded-md"/>
        //                     <LoadingSkeleton className="w-10 h-4 rounded-md"/>
        //                 </LoadingSkeleton>
        //             ))
        //         } */}
        //         </LoadingSkeleton>
        //     </div>
        // // </div>
        // <div>
        //     {/* <motion.div 
        //     initial={{scaleX : 0}}
        //     animate={{scaleX : 1}}
        //     transition={{
        //         duration : 1,
        //         ease : "easeOut",
        //         delay : 0.3
        //     }}
        //     className="w-full h-1 rotate-45 origin-left bg-gradient-to-r from-green-600 via-pink-800 to-transparent">

        //     </motion.div> */}

        //     {/* <div className="flex flex-row gap-20">
        //         <svg width={300} height={300}>
        //             <rect x={10} y={20} width={20} height={20} fill="blue"/>
        //             <circle  cx="250" cy="250" r="100" fill="orange"/>
        //             <line x1={50} y1={50} x2={2000} y2={600} stroke="pink" strokeWidth={1}/>
        //         </svg>
        //     </div> */}
        //             {/* x1, y1 starting coordinate and x2 and y2 last  */}
        //             {/* x and y are starting cordinate */}
        //             {/* cx and cy center x and center y and r is radius */}
            
        //     <div>
        //         <svg width={300} height={500}>
        //             {/* <path d="M 30 20 L 300 200" stroke="red" strokeWidth={10}/> */}
        //             {/* M x 1 x2 are starting points an c X2 Y2 X3 Y3 are curving points and LAST X4 Y4 are ending points */}
        //             <path d="M 10 150 C 100 10, 200 200, 390 100" stroke="blue" strokeWidth={10} fill="none"/>
        //         </svg>
        //     </div>

            
        // </div>
        // <div>
        //     <table>
        //         <thead>
        //             {SubmissionTableheaders.map((h, k) => (
        //                 <tr key={k}>
        //                     {h.label}
        //                 </tr>
        //             ))}
        //         </thead>
        //         <tbody>
        //             <tr>animesh</tr>
        //             <tr>animesh</tr>
        //             <tr>animesh</tr>
        //             <tr>animesh</tr>
        //         </tbody>
        //     </table>
        // </div>
        <div className="flex justify-center items-center h-screen flex-col">
            <h1>anime</h1>
            <VideoElement videoSrc="https://d3kl3yb9qelts0.cloudfront.net/testimonial-videos/237036c0-f3e5-42ca-a8b6-8fab369951e8/mp4"/>
        </div>
    )
}


