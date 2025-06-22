import { DashboardNavbarText } from "@/components/ui/dashboardnavbartext"
import { BackButton } from "@/components/ui/routerBack"
import { ReactNode } from "react"

interface EditorPageLayoutProps {
    children : ReactNode,
    reviews : ReactNode
}

export default function EditorPageLayout({children, reviews} : EditorPageLayoutProps) {
    return (
        <div className="space-y-7">
            <BackButton/>
            <DashboardNavbarText h1Title="Wall of Love" desc="Select how many reviews you want and click to generate your script"/>
            <div className="flex flex-row gap-5">
                {reviews}
                {children}
            </div>
        </div>
    )
}