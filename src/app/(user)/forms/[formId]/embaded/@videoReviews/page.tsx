import { getVideoReview } from "@/app/action/server_action/user";
import { Card } from "@/components/ui/card";
import { NoArrayReviewDiv } from "@/components/ui/noArray";
import { WallOfLoveVideo } from "@/components/walloflove/gridone";
import { getUserSession } from "@/utils/lib/user_session";

export default async function VideoReviewPage({params}:{params : Promise<{formId : number}>}) {
    const adminId = Number((await getUserSession()).id)

    const formId = Number((await params).formId)
    try {
        const reviews = await getVideoReview({formId, adminId})

        if(!Array.isArray(reviews)){
            return <NoArrayReviewDiv reviewType="Video review"/>
        }

        return (
            <>
                {/* <h1 className="bg-[hsl(var(--primary))]/60 px-5 text-sm rounded-xl w-fit border-2 border-[hsl(var(--tertiary))]">
                                        Video Reviews
                </h1> */}
                <Card className="p-3 flex-1 border-[hsl(var(--primary))]/60 overflow-auto rounded-md scrollbar  scrollbar-thumb-[hsl(var(--primary))] scrollbar-w-0.7">
                    <WallOfLoveVideo data={reviews}/>   
                </Card>
            </>
        )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        
    }
}