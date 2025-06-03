import { getAllSpaces } from "@/app/action/server_action/user";
import { SpaceNavabr } from "@/components/dashboardnavbar";
import { SpaceDiv } from "@/components/spacediv";
// import { SpaceCarddata } from "@/utils/hardcodeddata/shortcuts";

export default async function Space() {
    const spacedata = await getAllSpaces()
    
    if(!Array.isArray(spacedata)){
        return (
            <p className="text-[hsl(var(--primary))]">Something went wrong went at server level please try again later !! </p>
        )
    }
    
    return (
        <div className="space-y-10">
            <SpaceNavabr heading="My spaces" desc="Organize your projects and forms into dedicated workspaces" buttonTitle="Create Space"/>
            <SpaceDiv data={spacedata}/>
        </div>
    )
}