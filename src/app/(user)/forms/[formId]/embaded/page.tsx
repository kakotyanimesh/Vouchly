import { getTextReviews, getVideoReview } from "@/app/action/server_action/user"
import { DashboardNavbarText } from "@/components/ui/dashboardnavbartext"
import { BackButton } from "@/components/ui/routerBack"
import { GridChanger } from "@/components/walloflove/grid_changer"
import { WallOfLoveText, WallOfLoveVideo } from "@/components/walloflove/gridone"
import { getUserSession } from "@/utils/lib/user_session"

export default async function Embaded({params} : {params : Promise<{formId : number}>}) {

    const formId  = Number((await params).formId)
    const id = Number((await getUserSession()).id)
    const submissionsText = await getTextReviews({formId : formId, adminId : id})
    const videoSubmission = await getVideoReview({formId : formId, adminId  : id})
    
    

    if(!Array.isArray(submissionsText) || !Array.isArray(videoSubmission)){
        return (
            <h1>Currently there is no review here please tell your users to give one</h1>
        )
    }
    
    return (
        <div className="space-y-10">
            <BackButton/>
            <DashboardNavbarText h1Title="Wall of Love" desc="Customize and preview your wall of love design"/>        
            <div className="xl:w-[750px] w-[300px] space-y-4">
                <WallOfLoveText data={submissionsText}/>
                <WallOfLoveVideo data={videoSubmission}/>

            </div>
            <GridChanger cachedName={`text-review-cached-${formId}-${id}`}/>
        </div>
    )
}




