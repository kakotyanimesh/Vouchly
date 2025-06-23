// import { getTextReviews } from "@/app/action/server_action/user"
// import { Card } from "@/components/ui/card"
// import { NoArrayReviewDiv } from "@/components/ui/noArray"
// import { WallOfLoveText } from "@/components/walloflove/gridone"
// import { getUserSession } from "@/utils/lib/user_session"

// export default async function TextReviewsPage({params} : {params : Promise<{formId : number}>}){
//     const formId = Number((await params).formId)

//     const adminId = Number((await getUserSession()).id)

//     try {
//         const reviews = await getTextReviews({formId, adminId})

//         if(!Array.isArray(reviews)){
//             return <NoArrayReviewDiv reviewType="Text review"/>
//         }

//         return (
//             <>
//                 <h1 className="bg-[hsl(var(--primary))]/60 px-5 text-sm rounded-xl w-fit border-2 border-[hsl(var(--tertiary))]">
//                     Select testimonials to display.
//                 </h1>
//                 <Card className="flex-1 border-[hsl(var(--primary))]/60 overflow-auto rounded-md p-3 scrollbar scrollbar-thumb-[hsl(var(--primary))] scrollbar-w-0.7">
//                     <WallOfLoveText data={reviews}/>
//                 </Card>
//             </>
//         )
        
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//         <>
//             <h1 className="bg-[hsl(var(--primary))]/60 px-5 text-sm rounded-xl w-fit border-2 border-[hsl(var(--tertiary))]">
//                 Text Reviews
//             </h1>
//             <Card className="flex-1 overflow-auto rounded-md p-3 scrollbar scrollbar-thumb-[hsl(var(--primary))] scrollbar-w-0.7">
//                 <h1 className="bg-[hsl(var(--primary))]/60 px-5 text-sm rounded-xl w-fit border-2 border-[hsl(var(--tertiary))]">
//                     something went wrong at the bg
//                 </h1>
//             </Card>
//         </>
//     }
// }

