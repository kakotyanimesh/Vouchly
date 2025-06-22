"use client"

import { usePathname } from "next/navigation"
import { House, Rocket, Shredder, User } from "lucide-react";
import { cn } from "@/utils/lib/cn"
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";



export const SideBar = () => {
    const pathName = usePathname()

    const [showFullSidebar, setShowFullSidebar] = useState<boolean>(false)
    // console.log(`/${pathName.split("/")[1]}` );
    // console.log(pathName);
    
    const p = `/${pathName.split("/")[1]}`
    const activeIndex = SideBarRoutes.findIndex(i => i.src === p)

    
    return (
        <motion.div 
            onHoverStart={() => setShowFullSidebar(true)}
            onHoverEnd={() => setShowFullSidebar(false)}
            
            className={cn("md:h-full z-10 fixed md:space-y-4 bg-[#171717] transition-all ease-out duration-75  border-r-1 border-[hsl(var(--pure-white))]/10", showFullSidebar ? "md:w-48 w-full" : "md:w-16 w-full")}>
                <Link href={"/"} className={cn("font-bold hidden text-white text-2xl gap-2 pl-4 md:flex items-baseline border-b border-[hsl(var(--pure-white))]/10 py-4")}>
                    <span className="bg_card_gradient rounded-md px-2 pt-1">T</span>
                    { showFullSidebar ? <span className="bg-gradient-to-r from-[hsl(var(--card-bg-one))] to-[hsl(var(--card-bg-two))] text-transparent bg-clip-text">Testimonia</span> : undefined}
                    
                </Link>
                <div className="space-y-2 md:px-3 px-10 md:py-0 py-2 relative flex md:flex-col flex-row justify-between">
                    {
                      activeIndex !== -1 && <motion.div 
                      initial={false}
                      animate={{
                        y : activeIndex * 48,
                        // height calculated (gpt hah)
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.3
                      }}
                    //   style={{
                    //     zIndex: 0
                    //   }}
                      className="absolute md:block hidden inset-x-3 w-[calc(100%-24px)] h-10 bg_card_gradient border border-[hsl(var(--primary))] rounded-md z-0">

                      </motion.div>   
                    }
                        {SideBarRoutes.map((s, k) => (
                            <Link key={k} href={s.src} className={cn("cursor-pointer h-10 transition-colors duration-200 ease-linear rounded-md p-2 flex items-center gap-2 z-10", p === s.src ? "text-white md:bg-transparent bg_card_gradient" : "hover:bg-[hsl(var(--pure-white))]/20")}>
                                {s.icons}
                                {showFullSidebar ? `${s.name}` : undefined}
                            </Link>
                        ))
                    }
                </div>
            </motion.div>
    )
}


const SideBarRoutes = [
    {name : "Dashboard", src : "/dashboard", icons : <House strokeWidth={1.5} size={18}/>},
    {name : "Space", src : "/space", icons : <Rocket strokeWidth={1.5} size={18}/>},
    {name : "Forms", src : "/forms", icons : <Shredder strokeWidth={1.5} size={18}/> },
    {name : "Account", src : "/account", icons : <User strokeWidth={1.5} size={18}/>},
]



// <motion.button 
                        // initial={{scale : 1}}
                        // whileHover={{
                        //     scale : 0.98,
                        //     transition : {
                        //         ease : "linear"
                        //     }
                        // }}
                        // className={cn("w-full cursor-pointer text-start flex md:flex-row flex-col items-center md:gap-3 py-2 md:px-3 px-1 md:mt-0 mt-4  rounded-md transition-colors duration-250 ease-linear z-10", 
                        //     `/${pathName.split("/")[1]}` === s.src ? " text-white md:border-0 border  md:border-transparent border-[hsl(var(--primary))] rounded-2xl" : "hover:bg-[hsl(var(--pure-white))]/10"
                        // )}
                        // onClick={() => router.push(s.src)}
                        // key={k}>
                        //     {s.icons}
                        //     <span className="md:block hidden">{s.name}</span>
                        // </motion.button>
