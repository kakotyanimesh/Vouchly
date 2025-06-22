import { WidgetCustomizer } from "@/components/editorpage/editfunctions";
import { Card } from "@/components/ui/card";
import { RevalidateCachedButton } from "@/components/ui/revalidatecachedButton";

export default function EditorStaticPage() {
    return(
        <Card className="w-80 h-full px-5 py-2 border-[hsl(var(--primary))]/20">
            <RevalidateCachedButton cachedName="review-cached"/>
            <h1 className="text-xl bg-gradient-to-bl from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] bg-clip-text text-transparent font-semibold">
                Example Styles
            </h1>
            <p className="text-[hsl(var(--secondary-foreground))]/70 mb-2 text-sm">Choose a layout style for your wall</p>
            <WidgetCustomizer/>
        </Card>
    )
}

