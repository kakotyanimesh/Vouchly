import { SpaceNavabr } from "@/components/dashboardnavbar";
import { SpaceDiv } from "@/components/spacediv";
import { SpaceCarddata } from "@/utils/hardcodeddata/shortcuts";

export default async function Space() {
    return (
        <div className="space-y-10">
            <SpaceNavabr heading="My spaces" desc="Organize your projects and forms into dedicated workspaces" buttonTitle="Create Space"/>
            <SpaceDiv data={SpaceCarddata}/>
        </div>
    )
}