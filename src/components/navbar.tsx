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
        <div className="flex flex-row md:mx-34 px-4 my-5 md:py-4 py-3 rounded-md justify-between items-center relative bg-white/20">
            <div className="flex flex-row gap-20 items-center">
                <Logo className="text-2xl"/>
                <div className="sm:flex hidden flex-row justify-between gap-10 items-center ">
                    {
                        NavbarArray.map((l, k) => (
                            <LinkTag href={l.src} key={k} >{l.name}</LinkTag>
                        ))
                    }
                </div>
            </div>
            <div className="md:flex flex-row gap-5 hidden">
                <Button onClick={() => router.push("/signin")} variant={"secondary"}>Sign in</Button>
                <Button onClick={() => router.push("/signin")} className="md:px-10" variant={"primary"}>Get Started</Button>
            </div>
            <Button variant={"fetch"} onClick={() => setOpenmenu(!openmenu)} className="md:hidden flex">{!openmenu ? <Menu /> : <X/>}</Button>

            {
                openmenu && 
                <AnimatePresence mode="wait">
                    <motion.div 
                    initial={{opacity : 0, y : 10}}
                    animate={{ opacity : 1, y : 0}}
                    transition={{type : "spring", damping : 10, stiffness : 150}}
                    className={cn("rounded-md  border-slate-100/10 -mx-4  mt-1 z-50 bg-black/98 border space-y-5 h-fit top-15 flex flex-col absolute w-full  text-center py-30", !openmenu ? "hidden" : "")}>
                    {
                        NavbarArray.map((l, k) => (
                            <LinkTag className="text-xl text-white" href={l.src} key={k}>{l.name}</LinkTag>
                        ))
                    }
                    </motion.div>
                </AnimatePresence>
            }
        </div>
    )
}


const NavbarArray = [
    {name : "About", src : "/about"},
    {name : "Pricing", src : "/pricing"},
    {name : "Features", src : "/features"}
]