import { getAllTestimonials } from "@/app/action/server_action/user";
import { FormsNavabar } from "@/components/dashboardnavbar";
import { FormTable } from "@/components/formtable";
import { InputBox } from "@/components/ui/input";
import { LoadingSkeleton } from "@/components/ui/loadingskeleton";
import { FormTableheaders } from "@/utils/hardcodeddata/shortcuts";
import { getUserSession } from "@/utils/lib/user_session";
import { Search } from "lucide-react";
import { Suspense } from "react";

export default async function Forms() {
    
    return (
        <div className="space-y-5">
            <FormsNavabar buttonTitle="Create Form" heading="All Forms" desc="Manage all your forms in one place."/>
            <Suspense fallback={<LoadingForm/>}>
                <WaitedForm/>
            </Suspense>
        </div>
    )
}


async function WaitedForm() {
    const { id } = await getUserSession()

    // await new Promise(resolve => setTimeout(resolve, 2000));

    const data = await getAllTestimonials(Number(id), 10)
    
    

    if(!Array.isArray(data)){
        return (
            <div>
                <h1>Somehinggggggggggggg went wrong</h1>
            </div>
        )
    }

    return <FormTable thead={FormTableheaders} tdata={data}/>
}


const LoadingForm = () => {
    return (
        <div>
            <LoadingSkeleton className="w-full h-72 p-10 rounded-xl space-y-7">
                <InputBox disabled icon={<Search size={14} strokeWidth={1.2}/>} variants={"secondary"} placeholder="search"/>
                <div className="grid grid-cols-5">
                    {Array.from({length : 5}).map((_, k) => (
                        <LoadingSkeleton key={k} className="w-44"/>
                    ))}
                </div>
                <div className="grid grid-cols-5">
                    {Array.from({length : 5}).map((_, k) => (
                        <LoadingSkeleton key={k} className="w-44"/>
                    ))}
                </div>
            </LoadingSkeleton>
        </div>
    )
}