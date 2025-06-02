// not in used rn 
import { RecentlyActiveCardData } from "@/utils/hardcodeddata/shortcuts"
import { Card } from "./ui/card"
import { RecentlyActiveCard } from "./ui/dashboardcard"


export const RecentlyActiveDiv = () => {
    return (
        <div className="space-y-4">
            <h1 className="font-semibold text-2xl">Recently Active</h1>
            <Card className="">
            {
                RecentlyActiveCardData.map((r, k) => (
                    <RecentlyActiveCard
                        src={r.src}  
                        key={k} 
                        Name={r.Name} 
                        position={r.position} 
                        status={r.status}
                        time={r.time}/>
                ))
            }
            </Card>
        </div>
    )
}