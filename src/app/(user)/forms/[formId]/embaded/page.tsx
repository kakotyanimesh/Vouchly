import { DashboardNavbarText } from "@/components/ui/dashboardnavbartext"
import { BackButton } from "@/components/ui/routerBack"


export default async function Embaded() {
    
    return (
        <div className="">
            <BackButton/>
            <DashboardNavbarText h1Title="Wall of Love" desc="Select how many reviews you want and click to generate your script"/>
        </div>
    )
}



