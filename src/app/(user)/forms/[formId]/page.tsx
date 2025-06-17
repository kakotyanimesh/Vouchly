import { getIndividualTestimonialFormData } from "@/app/action/server_action/user"
import { IndividualFormDiv } from "@/components/individualformdiv"
import { BackButton } from "@/components/ui/routerBack"
import { generateToken } from "@/utils/lib/lib_new"
import { getUserSession } from "@/utils/lib/user_session"

export default async function IndividualForms({params}:{params : Promise<{formId : string}>}) {
    const id = Number((await params).formId)
    
    const { id : adminId } = await getUserSession()
    
    const data = await getIndividualTestimonialFormData({adminId : Number(adminId), formId : id})
    // console.log(data);

    const token = generateToken(id, Number(adminId))
    // you cant use env variable in client component 
    
    if(!data || "success" in data){
        return (
            <h1>Database is down at this moment please try again later pleaseeeeeeeeee </h1>
        )
    }
    return (
        <div className="">
            <BackButton/>
            <IndividualFormDiv formId={Number(id)} token={token} questions={data.questions} Name={data.Name} Description={data.Description} submission={data._count.customerReview} createdAt={data.createdAt.toDateString()}/>
        </div>
    )
}