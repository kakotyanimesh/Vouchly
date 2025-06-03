"use client"

import { redirect, usePathname } from "next/navigation"
import { Logo } from "./ui/logo"
import { Grid3x3, House, Rocket, Shredder, User } from "lucide-react";
import { cn } from "@/utils/lib/cn"
import { motion } from "motion/react";


export const SideBar = () => {
    const pathName = usePathname()

    // console.log(`/${pathName.split("/")[1]}` );
    // console.log(pathName);
    
    const p = `/${pathName.split("/")[1]}`
    const activeIndex = SideBarRoutes.findIndex(i => i.src === p)

    
    return (
        <div className="md:h-full h-fit md:space-y-4 bg-gradient-to-b from-[hsl(var(--primary))]/4 to-[#0F0F0F] border-r border-white/20 md:w-[240px] w-full">
                <Logo className="text-2xl md:flex hidden items-center justify-center border-b border-white/20 px-3 p-4"/>
                <div className="space-y-3 md:px-3 relative flex md:flex-col flex-row">
                    {
                      activeIndex !== -1 && <motion.div 
                      initial={false}
                      animate={{
                        y : activeIndex * 52,
                        // height calculated (gpt hah)
                        height : 38
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.3
                      }}
                      style={{
                        zIndex: 0
                      }}
                      className="absolute md:block hidden inset-x-3 bg-[hsl(var(--primary))]/40 border border-[hsl(var(--primary))] rounded-2xl">

                      </motion.div>   
                    }
                    {SideBarRoutes.map((s, k) => (
                        <motion.button 
                        initial={{scale : 1}}
                        whileHover={{
                            scale : 0.98,
                            transition : {
                                ease : "linear"
                            }
                        }}
                        className={cn("w-full cursor-pointer text-start flex md:flex-row flex-col items-center md:gap-3 py-2 md:px-3 px-1 md:mt-0 mt-4  rounded-2xl transition-colors duration-250 ease-linear", 
                            `/${pathName.split("/")[1]}` === s.src ? " text-white md:bg-transparent bg-[hsl(var(--primary))]/40 md:border-0 border  md:border-transparent border-[hsl(var(--primary))] rounded-2xl" : "hover:bg-white/10 hover:text-[hsl(var(--primary))]"
                        )}
                        onClick={() => redirect(s.src)}
                        key={k}>
                            {s.icons}
                            <span className="md:block hidden">{s.name}</span>
                        </motion.button>
                    ))
                }
                </div>
            </div>
    )
}


const SideBarRoutes = [
    {name : "Dashboard", src : "/dashboard", icons : <House strokeWidth={1.5} size={18}/>},
    {name : "Space", src : "/space", icons : <Rocket strokeWidth={1.5} size={18}/>},
    {name : "Forms", src : "/forms", icons : <Shredder strokeWidth={1.5} size={18}/> },
    {name : "Submissions", src : "/submissions", icons : <Grid3x3 strokeWidth={1.5} size={18}/>},
    {name : "Account", src : "/account", icons : <User strokeWidth={1.5} size={18}/>},
]
