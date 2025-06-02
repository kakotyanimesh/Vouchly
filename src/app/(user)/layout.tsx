
import { SideBar } from "@/components/sidebar";
import { ReactNode } from "react";

export default function Layout({children} : {children : ReactNode}) {
    
    return (
        <div className="flex md:flex-row flex-col-reverse  h-screen overflow-hidden">
            <SideBar/>
            <div className="pt-7 md:px-10 px-5 w-full h-full bg-gradient-to-br from-[hsl(var(--user-background))]/70  to-[#2e2626] overflow-y-auto scrollbar-hide">
                {children}
            </div>
        </div>
    )
}


