
import { SideBar } from "@/components/sidebar";
import { ReactNode } from "react";

export default function Layout({children} : {children : ReactNode}) {
    
    return (
        <div className="flex md:flex-row flex-col-reverse  h-screen overflow-hidden">
            <SideBar/>
            <div className="pt-12 md:pr-5 md:ml-20 px-5 w-full h-full overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-[hsl(var(--primary))]/70 scrollbar-w-0.5">
                {children}
            </div>
        </div>
    )
}


