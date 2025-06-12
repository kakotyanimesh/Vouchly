import { getUserDataCount } from "@/app/action/server_action/user"
import { DashboardCardProps } from "@/utils/types/user_types"
import { DashboardCard } from "../ui/dashboardcard"

export async function Dashboardstats({userId} : {userId : number}) {

    const dashboadData = await getUserDataCount(Number(userId))
    
        // if(!dashboadData.success){
        //     return (
        //         <div className="md:space-y-10 space-y-5">
        //                 <h1 className="font-semibold text-2xl">Welcome {name}</h1>
        //                 <div className="text-red-500">
        //                     Failed to load dashboard data. Please try again later.
        //                 </div>
        //         </div>
        //     )
        // }
    
        const DashboardCardData : DashboardCardProps[] = [
        {title : "Space", data : Number(dashboadData.data?.spaceCount), desc : "Organize your projects"},
        {title : "Forms", data : Number(dashboadData.data?.formsCount), desc : "+2 from last week"},
        {title : "Submission", data : Number(dashboadData.data?.submissionCount), desc : "+12 from last month"}
        ] 
    
    return (
        <div className="grid md:grid-cols-3 md:gap-10 gap-3">
            {DashboardCardData.map((d, k) => (
                <DashboardCard title={d.title} data={d.data} desc={d.desc} key={k}/>
            ))}
        </div>
    )
}