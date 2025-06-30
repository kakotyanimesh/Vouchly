"use client"
import { GradientText } from "../ui/gradienteText"
import { TextReviewOne } from "../ui/testimonialscomponents/textreviewone"
import { VideoTestimonial } from "../ui/testimonialscomponents/videotestimonial"
import animeshvideo from "@/videos/animeshvideo.mp4.json"

const fromYanimation = {
  initial : { y : 12, opacity : 0 },
  animate : { y : 0, opacity : 1 },
  viewport : { once : true },
  transition : { duration : 0.5, ease : "linear"}
}

const fromNXanimation = {
  initial : { x : -12, opacity : 0},
  whileInView : { x : 0, opacity : 1},
  viewport : { once : true },
  transition : { duration : 0.5, ease : "linear"}
}
export const fromPXanimation = {
  initial : { x : 12, opacity : 0},
  whileInView : { x : 0, opacity : 1},
  viewport : { once : true },
  transition : { duration : 0.5, ease : "linear"}
}

export const Reviewdiv = () => {
    return (
        <div className="space-y-1 relative">
            {/* <GlowingComponent 
            animate={{opacity : 1, scaleY : 1}}
            initial={{opacity : 0, scaleY : 0}}
            className="-z-50 bg-gradient-to-t from-[hsl(var(--primary))] blur-md to-transparent rounded-t-[400px] w-full h-42 opacity-50 rounded-b-none -top-32 left-1/2 -translate-x-1/2"/> */}
            <h1 className="md:text-4xl text-2xl z-10">
              Everything You Need to
              Collect & 
              <GradientText className="ml-2">Showcase</GradientText>
            </h1>
            <TextReviewOne
              textreviewid={1} 
              {...fromYanimation}
              className="md:w-[610px] w-full"
              textReview="ProofCloud transformed how we collect and display testimonials. Our conversion rate increased by 30% after adding their testimonial wall to our landing page."
              stars={1}
              customerName="Animesh"
              customerCompany="Titls.com"
              imageSrc="https://i.pinimg.com/736x/22/c9/fd/22c9fd09af9b520ca3678e441be77723.jpg"
            />
            
            <div className="flex md:flex-row flex-col gap-1">
              <TextReviewOne
                textreviewid={2}
                {...fromNXanimation}
                className="md:w-[500px] w-full"
                textReview="ProofCloud transformed how we collect and display testimonials. Our conversion rate increased by 30% after adding their testimonial wall to our landing page."
                stars={3}
                customerName="Animesh"
                customerCompany="Titls.com"
                imageSrc="https://i.pinimg.com/736x/22/c9/fd/22c9fd09af9b520ca3678e441be77723.jpg"
                />
                
              <VideoTestimonial
                {...fromPXanimation}
                usercompany="Animesh"
                // st={3}
                username="Tits.com"
                videoSrc={animeshvideo} 
              />
            </div>
        </div>
    )
}