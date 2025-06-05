
import { RecentlyActiveCardData, shortCutArrayDashboard } from "@/utils/hardcodeddata/shortcuts"
import { Usercards } from "@/components/ui/usercards"
import { DashboardCard, RecentlyActiveCard } from "@/components/ui/dashboardcard"
import { Card } from "@/components/ui/card"
import { getUserDataCount } from "@/app/action/server_action/user"
import { getUserSession } from "@/utils/lib/user_session"
import { DashboardCardProps } from "@/utils/types/user_types"

export default async function dashboard() {


    const { id,name } = await getUserSession()

    const dashboadData = await getUserDataCount(Number(id))


    const DashboardCardData : DashboardCardProps[] = [
    {title : "Space", data : Number(dashboadData.spaceCount), desc : "Organize your projects"},
    {title : "Forms", data : Number(dashboadData.formsCount), desc : "+2 from last week"},
    {title : "Submission", data : Number(dashboadData.submissionCount), desc : "+12 from last month"}
    ] 

    
    return (
        <div className="md:space-y-10 space-y-5">
            <h1 className="font-semibold text-2xl">Welcome {name}</h1>
            <div className="grid md:grid-cols-4 md:gap-10 gap-5 grid-cols-2 ">
                {shortCutArrayDashboard.map((s, k) => (
                    <Usercards  redirectLink={s.redirect} parentColor={s.parentColor} title={s.title} icon={s.icon} key={k} iconStyle={s.iconStyle} />
                ))}
            </div>
            <div className="grid md:grid-cols-3 md:gap-10 gap-3">
                {DashboardCardData.map((d, k) => (
                    <DashboardCard title={d.title} data={d.data} desc={d.desc} key={k}/>
                ))}
            </div>
            <div className="space-y-3">
                <h1 className="font-semibold text-2xl">Recently Active</h1>
                <Card className="">
                {
                    RecentlyActiveCardData.map((r, k) => (
                        <RecentlyActiveCard src={r.src}  key={k} Name={r.Name} position={r.position} status={r.status} time={r.time}/>
                    ))
                }
                </Card>
            </div>
            
        </div>
    )
}

