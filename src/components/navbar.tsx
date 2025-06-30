"use client"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { LinkTag } from "./ui/Link"
import { Logo } from "./ui/logo"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/utils/lib/cn"
import { useRouter } from "next/navigation"

export  const Navbar = () => {
    const [openmenu, setOpenmenu] = useState(false)
    const router = useRouter()
    return (
        <div className="flex justify-center items-center">
            <div className="flex fixed flex-row p-3 rounded-2xl md:gap-44 gap-20 px-5 mt-28 justify-self-center bg-[hsl(var(--primary))]/20 backdrop-blur-lg z-10 shadow-[0px_0px_2px_0px_#4fd1c5]">
                <div className="flex flex-row gap-10 items-center">
                    <Logo className="text-2xl"/>
                    <div className="lg:flex hidden flex-row justify-between gap-4 items-center ">
                        {
                            NavbarArray.map((l, k) => (
                                <LinkTag className="text-[hsl(var(--pure-white))] hover:text-[hsl(var(--primary))] transition-colors ease-linear duration-200" href={l.src} key={k} >{l.name}</LinkTag>
                            ))
                        }
                    </div>
                </div>
                <div className="lg:flex flex-row gap-5 hidden">
                    <Button onClick={() => router.push("/signin")} variant={"secondary"}>Sign in</Button>
                    <Button onClick={() => router.push("/signin")} className="md:px-10" variant={"primary"}>Get Started</Button>
                </div>
                <Button variant={"fetch"} onClick={() => setOpenmenu(!openmenu)} className="lg:hidden flex text-white">{!openmenu ? <Menu /> : <X/>}</Button>

                {
                    openmenu && 
                    <AnimatePresence mode="wait">
                        <motion.div 
                        initial={{opacity : 0, y : 10}}
                        animate={{ opacity : 1, y : 0}}
                        transition={{type : "spring", damping : 10, stiffness : 150}}
                        className={cn("rounded-b-2xl absolute flex flex-col bg-black backdrop-blur-3xl z-99 w-full mt-10 text-center justify-center items-center h-screen -mx-5", !openmenu ? "hidden" : "")}>
                        {
                            NavbarArray.map((l, k) => (
                                <LinkTag className="text-xl text-white" href={l.src} key={k}>{l.name}</LinkTag>
                            ))
                        }
                        </motion.div>
                    </AnimatePresence>
                }
            </div>
        </div>
    )
}


const NavbarArray = [
    {name : "About", src : "/about"},
    {name : "Pricing", src : "/pricing"},
    {name : "Features", src : "/features"}
]