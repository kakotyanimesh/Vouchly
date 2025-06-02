
import { DashboardCardData, RecentlyActiveCardData, shortCutArrayDashboard } from "@/utils/hardcodeddata/shortcuts"
import { auth } from "../../../../auth"
import { Usercards } from "@/components/ui/usercards"
import { DashboardCard, RecentlyActiveCard } from "@/components/ui/dashboardcard"
import { Card } from "@/components/ui/card"

export default async function dashboard() {

    const session = await auth()
    return (
        <div className="md:space-y-10 space-y-5">
            <h1 className="font-semibold text-2xl">Welcome {session?.user?.name}</h1>
            <div className="grid md:grid-cols-4 md:gap-10 gap-5 grid-cols-2 ">
                {shortCutArrayDashboard.map((s, k) => (
                    <Usercards  parentColor={s.parentColor} title={s.title} icon={s.icon} key={k} iconStyle={s.iconStyle} />
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

