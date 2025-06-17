import { getAllSpaces } from "@/app/action/server_action/user";
import { SpaceNavabr } from "@/components/dashboardnavbar";
import { SpaceLoading } from "@/components/loadingcomponents/spacedataloading";
import { SpaceDiv } from "@/components/spacediv";
import { getUserSession } from "@/utils/lib/user_session";
import { Suspense } from "react";
// import { SpaceCarddata } from "@/utils/hardcodeddata/shortcuts";

export default async function Space() {
    
    return (
        <div className="space-y-5">
            <SpaceNavabr heading="My spaces" desc="Organize your projects and forms into dedicated workspaces" buttonTitle="Create Space"/>
            <Suspense fallback={<SpaceLoading/>}>
                <SpaceContent/>
            </Suspense>
        </div>
    )
}


async function SpaceContent() {
    const { id } = await getUserSession()

    // await new Promise(resolve => setTimeout(resolve, 2000));
    const data = await getAllSpaces(id)

    if(!Array.isArray(data)){
        return (
            <p className="text-[hsl(var(--primary))]">Something went wrong went at server level please try again later !! </p>
        )
    }

    return <SpaceDiv data={data}/>
}