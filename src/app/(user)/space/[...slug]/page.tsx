import { getSpaceTestimonialsDataWithId } from "@/app/action/server_action/user"
import { FormCreation } from "@/components/fromModal"
import { BackButton } from "@/components/ui/routerBack"
import { getUserSession } from "@/utils/lib/user_session"


export default async function SpaceSlug({params} : {params : Promise<{slug : string[]}>}) {
    const [ spaceName, Id ]= (await params).slug
    
    
    const sName = decodeURIComponent(spaceName)
    const sId = decodeURIComponent(Id)

    /** 
     * urls won't be like this space 30 / bla bla bla 
     * so it makes it by own adding some jibrish
     * so we can use decodedURIComponent
     */


    const { id } = await getUserSession()

    const testimonialsData = await getSpaceTestimonialsDataWithId({spaceId : sId, adminId : id})


    // const tArray : TestimoniaTableDataTypes[] = testimonialsData.map
    
    return (
        <div>
            <BackButton/>
            <FormCreation sName={sName} sId={sId} data={testimonialsData}/>
        </div>
    )
}