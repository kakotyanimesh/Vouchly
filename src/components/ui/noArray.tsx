import { Card } from "./card"

export const NoArrayReviewDiv = ({ reviewType} : {reviewType : string}) => {
    return (
        <>
            <h1 className="bg-[hsl(var(--primary))]/60 px-5 text-sm rounded-xl w-fit border-2 border-[hsl(var(--tertiary))]">
                {reviewType}
            </h1>
            <Card className="flex-1 overflow-auto rounded-md p-3 scrollbar scrollbar-thumb-[hsl(var(--primary))] scrollbar-w-2">
                <h1 className="bg-[hsl(var(--primary))]/60 px-5 text-sm rounded-xl w-fit border-2 border-[hsl(var(--tertiary))]">
                    You don&apos;t have any {reviewType} yet ask User&apos;s to submit 
                </h1>
            </Card>
        </>
    )
}