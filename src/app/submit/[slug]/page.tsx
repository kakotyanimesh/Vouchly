import { extractDataFromToken } from "@/utils/lib/lib_new"
import { SubmitFormComponent } from "@/components/submitForm"
import { getIndividualTestimonialFormData } from "@/app/action/server_action/user"

export default async function SubmitTestimonia({params}:{params : Promise<{slug : string}>}) {
    const decoded = extractDataFromToken((await params).slug)

    if(decoded === null){
        return (
            // we neeed to make this page
            <div>wrong url brother</div>
        )
    }

    const data = await getIndividualTestimonialFormData({adminId : decoded.adminId, formId : decoded.formId})


    if(!data || "success" in data){
        return (
            <h1>Database is down at this moment please try again later pleaseeeeeeeeee </h1>
        )
    }

    // console.log(data);
    

    return (
        <div className="flex justify-center items-center mt-10">
            <SubmitFormComponent adminId={decoded.adminId} formId={decoded.formId} spaceId={data.spaceId} Name={data.Name} Description={data.Description} questions={data.questions} />
        </div>
    )
}