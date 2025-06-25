import { WidgetCustomizer } from "@/components/editorpage/editfunctions";
import { Card } from "@/components/ui/card";
import { RevalidateCachedButton } from "@/components/ui/revalidatecachedButton";

export default async function EditorStaticPage({params} : {params : Promise<{formId : number}>}) {
    return(
        <Card className="lg:w-80 w-full lg:px-5 px-3 py-2 border-[hsl(var(--primary))]/20">
            <RevalidateCachedButton cachedName="review-cached"/>
            <h1 className="md:text-xl text-sm bg-gradient-to-bl from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] bg-clip-text text-transparent font-semibold">
                Example Styles
            </h1>
            <p className="text-[hsl(var(--secondary-foreground))]/70 mb-2 md:text-sm text-xs">Choose a layout style for your wall</p>
            <WidgetCustomizer formId={(await params).formId}/>
        </Card>
    )
}

