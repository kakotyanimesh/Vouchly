import { getTextReviews } from "@/app/action/server_action/user"
import { DashboardNavbarText } from "@/components/ui/dashboardnavbartext"
import { GridChanger } from "@/components/walloflove/grid_changer"
import { WallOfLoveText } from "@/components/walloflove/gridone"
import { getUserSession } from "@/utils/lib/user_session"

export default async function Embaded({params} : {params : Promise<{formId : number}>}) {

    const formId  = Number((await params).formId)
    const id = Number((await getUserSession()).id)
    const submissions = await getTextReviews({formId : formId, adminId : id})

    if(!Array.isArray(submissions)){
        return (
            <h1>Currently there is no review here please tell your users to give one</h1>
        )
    }
    
    return (
        <div className="space-y-10">
            <DashboardNavbarText h1Title="Wall of Love" desc="Customize and preview your wall of love design"/>        
            <div className="md:w-[750px] w-[300px]">
                <WallOfLoveText data={submissions}/>
            </div>
            <GridChanger cachedName={`text-review-cached-${formId}-${id}`}/>
        </div>
    )
}




