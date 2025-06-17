"use client"

import { usePathname } from "next/navigation"
import { Logo } from "./ui/logo"
import { House, Rocket, Shredder, User } from "lucide-react";
import { cn } from "@/utils/lib/cn"
import { motion } from "motion/react";
import Link from "next/link";



export const SideBar = () => {
    const pathName = usePathname()

    // console.log(`/${pathName.split("/")[1]}` );
    // console.log(pathName);
    
    const p = `/${pathName.split("/")[1]}`
    const activeIndex = SideBarRoutes.findIndex(i => i.src === p)

    
    return (
        <div className="md:h-full relative h-fit md:space-y-4 bg-gradient-to-b from-[hsl(var(--primary))]/4 to-[#0F0F0F] border-r border-[hsl(var(--pure-white))]/10 md:w-[240px] w-full">
                <Logo className="text-2xl md:flex hidden items-center justify-center border-b border-[hsl(var(--pure-white))]/10 px-3 p-4"/>
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
                      className="absolute md:block hidden inset-x-3 bg_card_gradient border border-[hsl(var(--primary))] rounded-md">

                      </motion.div>   
                    }
                    {SideBarRoutes.map((s, k) => (
                        <Link 
                            href={s.src} 
                            key={k}
                            className={cn("w-full cursor-pointer text-start flex md:flex-row flex-col items-center md:gap-3 py-2 md:px-3 px-1 md:mt-0 mt-4  rounded-md transition-colors duration-250 ease-linear z-10", 
                            `/${pathName.split("/")[1]}` === s.src ? " text-white md:border-0 border  md:border-transparent border-[hsl(var(--primary))] rounded-2xl" : "hover:bg-[hsl(var(--pure-white))]/10")}

                        >
                            {s.icons}
                            <span className="md:block hidden">{s.name}</span>
                        </Link>
                    ))
                }
                </div>
                {/* <Button   
                    className="md:fixed hidden bottom-10 left-14" 
                    variant={"secondary"} 
                    onClick={() => {
                        toast.message("✅ You’ve been logged out successfully.")
                        signOut({callbackUrl : "/", redirect : true})
                    }}
                >log out</Button> */}
            </div>
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