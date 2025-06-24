import { DashboardNavbarText } from "@/components/ui/dashboardnavbartext"
import { BackButton } from "@/components/ui/routerBack"
import { ReactNode } from "react"

interface EditorPageLayoutProps {
    children : ReactNode,
    reviews : ReactNode
}

export default function EditorPageLayout({children, reviews} : EditorPageLayoutProps) {
    return (
        <div className="space-y-5 overflow-y-hidden">
            <BackButton/>
            <DashboardNavbarText h1Title="Wall of Love" desc="Select how many reviews you want and click to generate your script"/>
            <div className="flex lg:flex-row flex-col gap-5">
                {/* stopped here  */}
                {reviews}
                {children}
            </div>
        </div>
    )
}