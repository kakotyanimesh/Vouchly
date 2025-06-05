
import { SideBar } from "@/components/sidebar";
import { ReactNode } from "react";

export default function Layout({children} : {children : ReactNode}) {
    
    return (
        <div className="flex md:flex-row flex-col-reverse  h-screen overflow-hidden">
            <SideBar/>
            <div className="pt-7 md:px-10 px-5 w-full h-full overflow-y-auto scrollbar-hide">
                {children}
            </div>
        </div>
    )
}


