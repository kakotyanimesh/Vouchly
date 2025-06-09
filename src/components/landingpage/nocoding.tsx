import { TextReviews } from "@/utils/hardcodeddata/shortcuts"
import { TextReviewOne } from "../ui/testimonialscomponents/textreviewone"
import { VideoTestimonial } from "../ui/testimonialscomponents/videotestimonial"
import animeshvideo from "@/videos/animeshvideo.mp4.json"
import { useAnimationProps } from "@/hooks/useAnimationhook"

export const NoCoding = () => {
    const downAnimation = useAnimationProps("down")
    const leftAnimation = useAnimationProps("left")
    const rightAnimation = useAnimationProps("right")
    const upAnimation = useAnimationProps("up")

    return (
        <div className="space-y-2">
            <h1 className="md:text-4xl text-2xl">
              Add Testimonials to Your Website With
              <span className="bg-gradient-to-br from-[hsl(var(--primary))] to-teal-500 bg-clip-text text-transparent mx-2">No Coding !</span>
              <br />
              With our 
              <span className="mx-2 bg-gradient-to-br from-[hsl(var(--primary))] via-white/10 to-teal-500 px-2">Wall of Love</span>
            </h1>
            <div className="grid grid-cols-3 gap-1 md:w-[650px] w-[300px] ">
                <VideoTestimonial
                    {...leftAnimation}
                    className="md:col-span-1 col-span-3"
                    username="Animesh"
                    usercompany="Tits.com"
                    videoSrc={animeshvideo} 
                />
                {
                    TextReviews.slice(0, 1).map((t, k) => (
                        <TextReviewOne
                            {...downAnimation}
                            className="md:col-span-1 col-span-3"
                            textReview={t.textReview}
                            username={t.username}
                            userCompany={t.userCompany}
                            starts={t.starts}
                            imageSrc={t.imageSrc}
                            key={k}
                            />
                    ))
                }
                <VideoTestimonial
                    {...rightAnimation}
                    className="md:col-span-1 col-span-3"
                    username="Animesh"
                    usercompany="Tits.com"
                    videoSrc={animeshvideo} 
                />
            </div>
            <div className="grid grid-cols-3 gap-1 md:w-[650px] w-[300px] ">
                {
                    TextReviews.slice(1, 2).map((t, k) => (
                        <TextReviewOne
                            {...leftAnimation}
                            className="md:col-span-1 col-span-3"
                            textReview={t.textReview}
                            username={t.username}
                            userCompany={t.userCompany}
                            starts={t.starts}
                            imageSrc={t.imageSrc}
                            key={k}
                            />
                    ))
                }
                <VideoTestimonial
                    {...upAnimation}
                    className="md:col-span-1 col-span-3"
                    username="Animesh"
                    usercompany="Tits.com"
                    videoSrc={animeshvideo} 
                />
                {
                    TextReviews.slice(2, 3).map((t, k) => (
                        <TextReviewOne
                            className="md:col-span-1 col-span-3 w-full"
                            {...rightAnimation}
                            
                            textReview={t.textReview}
                            username={t.username}
                            userCompany={t.userCompany}
                            starts={t.starts}
                            imageSrc={t.imageSrc}
                            key={k}
                            />
                    ))
                }
            </div>
        </div>
    )
}