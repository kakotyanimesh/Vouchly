"use client"
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
        <div className="space-y-1">
            <h1 className="md:text-4xl text-2xl">
              Everything You Need to
              Collect & 
              <span className="bg-gradient-to-br from-[hsl(var(--primary))]/20 to-teal-500 via-white/40 px-2  ml-2">Showcase</span>
            </h1>
            <TextReviewOne 
              {...fromYanimation}
              className="md:w-[610px] w-[300px]"
              textReview="ProofCloud transformed how we collect and display testimonials. Our conversion rate increased by 30% after adding their testimonial wall to our landing page."
              starts={3}
              username="Animesh"
              userCompany="Titls.com"
              imageSrc="https://i.pinimg.com/736x/22/c9/fd/22c9fd09af9b520ca3678e441be77723.jpg"
            />
            
            <div className="flex md:flex-row flex-col gap-1">
              <TextReviewOne
                {...fromNXanimation}
                className="md:w-[500px] w-full"
                textReview="ProofCloud transformed how we collect and display testimonials. Our conversion rate increased by 30% after adding their testimonial wall to our landing page."
                starts={3}
                username="Animesh"
                userCompany="Titls.com"
                imageSrc="https://i.pinimg.com/736x/22/c9/fd/22c9fd09af9b520ca3678e441be77723.jpg"
                />
                
              <VideoTestimonial
                {...fromPXanimation}
                username="Animesh"
                usercompany="Tits.com"
                videoSrc={animeshvideo} 
              />
            </div>
        </div>
    )
}