// import { wallofSubmissions } from "@/app/action/server_action/user"
// import { DashboardNavbarText } from "@/components/ui/dashboardnavbartext"
// import { TextReviewOne } from "@/components/ui/testimonialscomponents/textreviewone"
// import { getUserSession } from "@/utils/lib/user_session"

// export default async function Submissions({params} : {params : Promise<{formId : string}>}) {
//     const formId = (await params).formId

//     const id = Number(((await getUserSession()).id))

//     const submissions = await wallofSubmissions({formId : Number(formId), adminId : id})


//     if(!Array.isArray(submissions)){
//         return <h1>nothjing </h1>
//     }
    
//     return (
//         <div>
//             <DashboardNavbarText h1Title={`Submissions for ${formId}`} desc="Browse and manage all submissions for this form & create wall of Love"/>
            
//             <div className="grid grid-cols-4 gap-5">
//                 {submissions.map((s, k) => (
//                     <TextReviewOne 
//                         key={k} 
//                         textReview={s.textReview!} 
//                         username={s.customerName}
//                         userCompany = {s.customerCompany}
//                         imageSrc = "/images/logo.png"
//                         starts = {s.stars}
//                         />
//                 ))}
//             </div>
//         </div>
//     )
// }