"use client"
import { motion } from "motion/react"
import { LandingReviews } from "@/utils/hardcodeddata/shortcuts"
import { TextReviewOne } from "../ui/testimonialscomponents/textreviewone"

export const Reviewdiv = () => {
    return (
        <div className="space-y-3 mb-30 ">
            <h1 className="md:text-4xl text-2xl">
              Everything You Need to
              Collect & 
              <span className="bg-gradient-to-br from-fuchsia-500 to-rose-800 px-2  ml-2">Showcase</span>
            </h1>
            <motion.div
            initial={{ y : 12, opacity : 0}}
            whileInView={{y : 0, opacity : 1}}
            viewport={{once : true}}
            transition={{duration : 0.5, ease : "linear"}}
            >
                <TextReviewOne 
                className="md:w-[610px] w-[300px]"
                textReview="ProofCloud transformed how we collect and display testimonials. Our conversion rate increased by 30% after adding their testimonial wall to our landing page."
                starts={3}
                username="Animesh"
                userCompany="Titls.com"
                imageSrc="https://i.pinimg.com/736x/22/c9/fd/22c9fd09af9b520ca3678e441be77723.jpg"
                />
            </motion.div>
            <div className="flex md:flex-row flex-col gap-2">
              {
                LandingReviews.map((r, index) => (
                  <TextReviewOne
                  className="md:w-[200px] w-full" 
                  textReview={r.textReview} userCompany={r.userCompany} username={r.username} imageSrc={r.imageSrc} starts={r.starts} key={index}/>
                ))
              }

            </div>
        </div>
    )
}