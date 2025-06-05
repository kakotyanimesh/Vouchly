import { getAllTestimonials } from "@/app/action/server_action/user";
import { FormsNavabar } from "@/components/dashboardnavbar";
import { FormTable } from "@/components/formtable";
import { FormTableheaders } from "@/utils/hardcodeddata/shortcuts";
import { getUserSession } from "@/utils/lib/user_session";

export default async function Forms() {
    const { id } = await getUserSession()

    const td = await getAllTestimonials(Number(id))

    if(!Array.isArray(td)){
        return (
            <div>something went wrong </div>
        )
    }
    
    return (
        <div className="space-y-10">
            <FormsNavabar buttonTitle="Create Form" heading="All Forms" desc="Manage all your forms in one place."/>
            <FormTable thead={FormTableheaders} tdata={td}/>
        </div>
    )
}