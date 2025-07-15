import { DashboardNavbarText } from "@/components/ui/dashboardnavbartext";
import { RevalidateCachedButton } from "@/components/ui/revalidatecachedButton";
import { BackButton } from "@/components/ui/routerBack";
import { ReactNode } from "react";

interface EditorPageLayoutProps {
	children: ReactNode;
	reviews: ReactNode;
}

export default function EditorPageLayout({
	children,
	reviews,
}: EditorPageLayoutProps) {
	return (
		<div className="md:space-y-1   overflow-y-hidden">
			<BackButton />
			<div className="flex md:flex-row flex-col md:justify-between md:items-center space-y-3 relative">
				<DashboardNavbarText
					h1Title="Widget Builder"
                    desc="Select your preferred layout and the number of testimonials to showcase"
				/>
				<RevalidateCachedButton
					cachedName="review-cached"
					className="h-fit md:mr-10 top-0 right-0 absolute md:block"
				/>
			</div>
			<div className="flex flex-col gap-2">
				{/* stopped here  */}
				{reviews}
				{children}
			</div>
		</div>
	);
}
