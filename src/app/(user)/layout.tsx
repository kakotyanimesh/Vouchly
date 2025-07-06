import { SideBar } from "@/components/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex md:flex-row flex-col-reverse h-screen overflow-hidden">
			<SideBar />
			<div className="pt-10 md:pr-5 md:ml-20 sm:pb-0 pb-20 px-5 w-full h-full overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-[hsl(var(--primary))]/70 scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-track-[hsl(var(--primary))]/30">
				{children}
			</div>
		</div>
	);
}
