"use client";
import React from "react";
import { Button } from "./ui/button";
import { Rocket } from "lucide-react";
import { cn } from "@/utils/lib/cn";
import { useSpaceModalStore } from "@/utils/zustand/space_state";
import { SpaceModal } from "./ui/spaceModal";

type DashboardNavbarTypes = React.HTMLAttributes<HTMLDivElement> & {
	heading: string;
	desc: string;
	buttonTitle: string;
};

export const SpaceNavabr: React.FC<DashboardNavbarTypes> = ({
	className,
	heading,
	desc,
	buttonTitle,
}) => {
	const { openModal, setOpneModal } = useSpaceModalStore();
	return (
		<div
			className={cn(
				"flex md:flex-row flex-col justify-between md:items-center md:gap-0 gap-3",
				className,
			)}
		>
			<div>
				<h1 className="font-semibold text-2xl">{heading}</h1>
				<p className="text-[hsl(var(--slate-text))]">{desc}.</p>
			</div>
			<Button
				onClick={() => setOpneModal(true)}
				variant={"tertiary"}
				className="flex items-center gap-1"
				sizes={"md"}
			>
				<Rocket
					size={16}
					className="fill-[hsl(var(--pure-white))] text-[hsl(var(--pure-white))]"
				/>
				{buttonTitle}
			</Button>
			{openModal && <SpaceModal />}
		</div>
	);
};

export const FormsNavabar: React.FC<DashboardNavbarTypes> = ({
	className,
	heading,
	desc,
}) => {
	return (
		<div
			className={cn(
				"flex md:flex-row flex-col justify-between md:items-center md:gap-0 gap-3",
				className,
			)}
		>
			<div>
				<h1 className="font-semibold text-2xl">{heading}</h1>
				<p className="text-[hsl(var(--slate-text))]">{desc}.</p>
			</div>
			{/* <Button onClick={() => redirect("/dashboard")} variant={"secondary"} className="flex items-center gap-2" sizes={"md"}><Plus size={16}/>{buttonTitle}</Button> */}
		</div>
	);
};

// type IndividualSpaceNavbarTypes = React.HTMLAttributes<HTMLDivElement> & {
//     heading : string,
//     buttonTitle : string,

// }

// export const IndividualSpaceNavbar : React.FC<IndividualSpaceNavbarTypes> = ({className, heading, buttonTitle}) => {
//     const { setOpneModal} = useSpaceModalStore()
//     return (
//         <div className={cn("flex md:flex-row flex-col justify-between md:items-center md:gap-0 gap-3", className)}>
//             <div>
//                 <h1 className="font-semibold text-2xl">{heading}</h1>
//             </div>
//             <Button onClick={() => setOpneModal(true)} variant={"secondary"} className="flex items-center gap-2" sizes={"md"}><Plus size={16}/>{buttonTitle}</Button>
//         </div>
//     )
// }
