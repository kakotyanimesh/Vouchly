"use client"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { motion } from "motion/react"
import { GlowingComponent } from "../ui/glowingdiv"

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
        <div className="flex justify-center md:my-48 mt-30 mb-20 items-center text-center flex-col md:gap-5 gap-3">
            <h1 className="md:text-6xl text-3xl">
                {
                    headLine.split(" ").map((w, index) => (
                        <motion.span
                        initial={initial}
                        animate={animate}
                        transition={{duration : 0.8 , delay : 0.2 * index, ease : "easeIn"}}
                        key={index} className="mr-3">{w}</motion.span>
                    ))
                }
                <br/>
                <motion.span
                initial={initial}
                animate={animate}
                transition={{duration : 0.5 , delay : 0.4, ease : "easeIn"}} 
                className="bg-gradient-to-r relative from-[hsl(var(--primary))] to-teal-500 bg-clip-text text-transparent">
                    Effortlessly
                    
                </motion.span>
            </h1>
            <motion.p 
            initial={initial}
            animate={animate}
            transition={{duration : 0.5, ease : "linear", delay : 0.1}}
            className="max-w-2xl mx-auto px-4 text-sm">Transform happy customers into powerful testimonials. Create stunning forms, collect video reviews, and showcase them with style across all your platforms</motion.p>
            <motion.div
            initial={initial}
            animate={animate}
            transition={{duration : 0.5, ease : "linear", delay : 0.1}}
            className="space-x-5">
                <Button onClick={() => router.push("/signin")} variant={"secondary"}>Start building for Free</Button>
                <Button onClick={() => router.push("/signin")} variant={"primary"}>Watch Demo </Button>
            </motion.div>
            {/* <GlowingComponent className="left-1/2 bottom-1  from-teal-400/20 to-emerald-400/15"/> */}
            {/* <GlowingComponent className="left-1/2  bottom-20 -translate-x-1/2 from-teal-400/20 to-emerald-400/15 rounded-tl-4xl w-full rounded-tr-4xl "/> */}
            <GlowingComponent 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay : 0.4, ease: "easeOut" }}
                className="bg-gradient-to-r from-transparent via-[hsl(var(--primary))] w-72 rounded-4xl h-[2px] to-transparent"/>
            
        </div>
    )
}