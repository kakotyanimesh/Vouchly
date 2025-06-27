import { getReviews } from "@/app/action/client_action/user"
import { ClassicGridComponent } from "@/components/editorpage/exampleedits/classicgrid"
import { CorosoulGrid } from "@/components/editorpage/exampleedits/corosoulgrid"
import { MassonaryGridComponent } from "@/components/editorpage/exampleedits/masonrygrid"
import { OrderedReviewTypes } from "@/utils/types/user_types"
import Script from "next/script"

export default async function EmbadedScript({params}:{params : Promise<{slug : string}>}) {
    const embadedId = (await params).slug

    const {orderedReviews, reviewStyle} = await getReviews({embadedId})

    if(!orderedReviews){
        return <div className="flex justify-center items-center text-center min-h-screen bg-[hsl(var(--tertiary))]/30">
            <h1 className="text-2xl bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] bg-clip-text text-transparent">There is no reviews for this url Please contact Providers</h1>
        </div>
    }

    const { shadowColor, starColor,textColor,rewiewCardBg, roundedCorner, parentPageBgColor, gridType } = reviewStyle

    const inlineStyles = {
        shadowColor,
        starColor,
        textColor,
        rewiewCardBg,
        roundedCorner,
        meteorColor : starColor
    }

    const reviews : OrderedReviewTypes[] = orderedReviews

    const IfrmaeSrc = process.env.CLOUD_FRONT_DOMAIN_NAME

    return (
        <div className="w-full min-h-screen p-3" style={{backgroundColor : parentPageBgColor}}>
            <Script src={`${IfrmaeSrc}/js/iframeResize.max.js`}/>
                {/* out div that has whole width and height ( get from db ) */}
                <div className="flex justify-center items-center text-center">
                    {
                    
                        gridType === "Classic" ? <ClassicGridComponent orderedReviews={reviews} reviewStyles={inlineStyles}/> : 
                        gridType === "Carousel" ? <CorosoulGrid direction="left"  orderedReviews={reviews} reviewStyles={inlineStyles}/> : 
                        <MassonaryGridComponent reviewStyles={reviewStyle} orderedReviews={reviews}/>
                    
                    }
                </div>
        </div>
    )
}