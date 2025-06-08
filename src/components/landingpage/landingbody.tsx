"use client"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { motion } from "motion/react"

export const LandingHeader = () => {
    const router = useRouter()
    const headLine = "Collect Customer Stories"

    const initial = {
        filter : "blur(2px)",
        opacity : 0,
        y : 12
    }

    const animate = {
        filter : "blur(0)",
        opacity : 1,
        y : 0
    }
    return (
        <div className="flex justify-center md:my-40 m-30 items-center text-center flex-col md:gap-5 gap-3">
            <h1 className="md:text-6xl text-3xl">
                {
                    headLine.split(" ").map((w, index) => (
                        <motion.span
                        initial={initial}
                        animate={animate}
                        transition={{duration : 0.7 , delay : 0.1 * index, ease : "easeIn"}}
                        key={index} className="mr-3">{w}</motion.span>
                    ))
                }
                <motion.span
                initial={initial}
                animate={animate}
                transition={{duration : 0.5 , delay : 0.4, ease : "easeIn"}} 
                className="bg-gradient-to-r from-fuchsia-500 to-rose-800 bg-clip-text text-transparent">Effortlessly</motion.span>
            </h1>
            <motion.p 
            initial={initial}
            animate={animate}
            transition={{duration : 0.5, ease : "linear", delay : 0.1}}
            className="md:mx-50 mx-2 text-sm">Transform happy customers into powerful testimonials. Create stunning forms, collect video reviews, and showcase them with style across all your platforms</motion.p>
            <motion.div
            initial={initial}
            animate={animate}
            transition={{duration : 0.5, ease : "linear", delay : 0.1}}
            className="space-x-5">
                <Button onClick={() => router.push("/signin")} variant={"secondary"}>Start building for Free</Button>
                <Button onClick={() => router.push("/signin")} variant={"primary"}>Watch Demo </Button>
            </motion.div>
        </div>
    )
}