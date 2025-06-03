import { FormCreation } from "@/components/fromModal"


export default async function SpaceSlug({params} : {params : Promise<{slug : string[]}>}) {
    const [ spaceName, Id ]= (await params).slug

    // const { id : adminId } = await getUserSession()

    
    const sName = decodeURIComponent(spaceName)
    const sId = decodeURIComponent(Id)

    // const d = await getSpaceDataWithId({adminId, spaceId : iD})
    // console.log(d);
    

    return (
        <div>
            <FormCreation sName={sName} sId={sId}/>
        </div>
    )
}