import { getReviews } from "@/app/action/client_action/user";
import { OnceselectedReviews } from "@/components/editorpage/editingV2/reviewStylediv";
import { GlassyReviewDiv } from "@/components/editorpage/editingV2/styles/Glassydiv";
import { HorizontalAutoScrolling } from "@/components/editorpage/editingV2/styles/horizontalscrolling";
import { FlipViewWrapper } from "@/components/editorpage/editingV2/styles/flipViewWrapper";
import { AutoSlide } from "@/components/editorpage/editingV2/styles/SlideSpeak";
import Script from "next/script";

export default async function EmbadedScript({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const embadedId = (await params).slug;

    // const

    const reviewData = await getReviews({ embadedId });
    const { textColor, tesimoonialCardBg, starColor, roundedCorner } = reviewData.emdadeddata;


    const gridType = reviewData.emdadeddata.gridType;
    const selectedReviews = reviewData.reviews;
    return (
        <div
            className="w-full h-fit p-3"
            style={{ background: reviewData.emdadeddata.parentBgColor }}
        >
            <Script
                src={`${process.env.CLOUD_FRONT_DOMAIN_NAME}/js/iframeResize.max.js`}
            />
            {/* out div that has whole width and height ( get from db ) */}
            {/* {reviewData} */}
            {(() => {
                switch (gridType) {
                    case "Default":
                        return (
                            <OnceselectedReviews
                                selectedReviews={selectedReviews}
                                data={{
                                    textColor,
                                    tesimoonialCardBg,
                                    starColor,
                                    roundedCorner
                                }}
                                gridType={"Default"}
                                // motionProps={{
                                // 	whileHover : {
                                // 		// y : -2,
                                // 		boxShadow: "1px 5px 4px #ffff"
                                // 	}
                                // }}
                                className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1 lg:mx-60 md:mx-28 content-center"
                            // data={{
                            // 	...withoutShadowColor,
                            // }}
                            />
                        );
                    case "ManualSlide":
                        return (
                            <OnceselectedReviews
                                selectedReviews={selectedReviews}
                                gridType={gridType}
                                // data={ }
                                data={{
                                    textColor,
                                    tesimoonialCardBg,
                                    starColor,
                                    roundedCorner
                                }}
                                className="flex flex-row  overflow-x-scroll gap-2 scrollbar scrollbar-thumb-[hsl(var(--primary))]/70 scrollbar-h-1 py-2 scrollbar-thumb-rounded-full scrollbar-track-[hsl(var(--primary))]/30 scrollbar-track-rounded-3xl"
                            />
                        );
                    case "AutoSlide":
                        return (
                            <AutoSlide
                                selectedReviews={selectedReviews}
                                gridType={gridType}
                                shadowcolor={reviewData.emdadeddata.shadowColor}
                                data={{
                                    textColor,
                                    tesimoonialCardBg,
                                    starColor,
                                    roundedCorner
                                }}
                            />
                        );
                    case "FlipView":
                        return (
                            <FlipViewWrapper
                                data={{
                                    textColor,
                                    tesimoonialCardBg,
                                    starColor,
                                    roundedCorner
                                }}

                                selectedReviews={selectedReviews}
                            />
                        );
                    case "GlideUp":
                        return (
                            <HorizontalAutoScrolling
                                shadowcolor={reviewData.emdadeddata.shadowColor}
                                data={{
                                    textColor,
                                    tesimoonialCardBg,
                                    starColor,
                                    roundedCorner
                                }}
                                className="flex xl:h-[570px] h-[400px]"
                                selectedReviews={selectedReviews}
                            />
                        );

                    case "Luminate":
                        return (
                            <GlassyReviewDiv
                                shadowcolor={
                                    reviewData.emdadeddata.shadowColor!
                                }
                                className="lg:w-[450px] md:w-[450px] w-[300px] flex justify-center items-center  left-1/2 -translate-x-1/2"
                                data={{
                                    textColor,
                                    tesimoonialCardBg,
                                    starColor,
                                    roundedCorner
                                }}
                                selectedReviews={selectedReviews}
                                gridType={gridType}
                            />
                        );
                    default:
                        return (
                            <OnceselectedReviews
                                selectedReviews={selectedReviews}
                                gridType={gridType}
                                className="grid grid-cols-3 gap-2 "
                                data={{
                                    textColor,
                                    tesimoonialCardBg,
                                    starColor,
                                    roundedCorner
                                }}
                            />
                        );
                }
            })()}
        </div>
    );
}
