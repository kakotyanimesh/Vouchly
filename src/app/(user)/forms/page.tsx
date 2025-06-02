import { FormsNavabar } from "@/components/dashboardnavbar";
import { FormTable } from "@/components/formtable";


export default function Forms() {
    return (
        <div className="space-y-10">
            <FormsNavabar buttonTitle="Create Form" heading="All Forms" desc="Manage all your forms in one place."/>
            <FormTable/>
        </div>
    )
}