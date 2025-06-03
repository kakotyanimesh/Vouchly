import { IndividualSpaceNavbar } from "@/components/dashboardnavbar"
import { EmptyFormDiv } from "@/components/emptyFormdiv"


export default async function SpaceSlug({params} : {params : Promise<{slug : string[]}>}) {
    const [ spaceName, Id ]= (await params).slug

    // const { id : adminId } = await getUserSession()

    
    const sName = decodeURIComponent(spaceName)
    const sId = decodeURIComponent(Id)

    // const d = await getSpaceDataWithId({adminId, spaceId : iD})
    // console.log(d);
    

    return (
        <div className="space-y-10">
            <IndividualSpaceNavbar heading={sName} sId={sId} buttonTitle="Create Testimonia Forms" />
            <EmptyFormDiv sId={sId} sName={sName}/>
        </div>
    )
}