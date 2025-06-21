import { getEmbadedWall } from "@/app/action/server_action/user";
import { ClientEditorPage } from "@/components/editorClinetPage";
import { Card } from "@/components/ui/card";

export default async function EditorPage({params} : {params : Promise<{formId : number}>}) {
    const formId = Number((await params).formId)
    
    try {
        const reviews = await getEmbadedWall({formId : Number(formId)})    
        return <ClientEditorPage textReviewArray={reviews.textReviewArrayWithURL!} videoReviewArray={reviews.videoReviewWithURL!}/>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {   
        return (
            <Card className="flex-1 overflow-auto p-2 scrollbar h-96  scrollbar-thumb-[hsl(var(--primary))] scrollbar-w-2">
                <h1>Something went really at the backend sorry</h1>
            </Card>
        )
    }
}