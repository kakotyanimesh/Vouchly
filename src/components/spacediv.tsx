"use client";
import { cn } from "@/utils/lib/cn";
import { SpaceCardProps } from "@/utils/types/user_types";
import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { File, Rocket } from "lucide-react";
import { IconDiv } from "./ui/icondiv";
import { SpaceCard } from "./ui/spacecard";
import { SpaceModal } from "./ui/spaceModal";
import { useSpaceModalStore } from "@/utils/zustand/space_state";

type SpaceDivTypes = {
	data: SpaceCardProps[];
} & React.HTMLAttributes<HTMLDivElement>;

export const SpaceDiv: React.FC<SpaceDivTypes> = ({
	className,
	data,
	...props
}) => {
	const { openModal, setOpneModal } = useSpaceModalStore();

	return (
		<div className={cn("", className)} {...props}>
			{data.length === 0 ? (
				<Card className="w-full h-full text-center py-10 items-center flex flex-col space-y-5 justify-center  bg-[hsl(var(--pure-white))]/5 transition-colors duration-200 ease-linear cursor-pointer group">
					<IconDiv className="p-3" reactNode={<File />} />
					<h1 className="text-sm">
						No projects found. Create your first space to effectively organize and <br /> collect testimonials.
					</h1>
					<Button
						onClick={() => setOpneModal(true)}
						variant={"tertiary"}
						className="flex items-center gap-1 "
						sizes={"md"}
					>
						<Rocket size={16} className="fill-[hsl(var(--pure-white))] text-[hsl(var(--pure-white))]" />
						Add New Space
					</Button>
					{openModal && <SpaceModal />}
				</Card>
			) : (
				<div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
					{data.map((d, k) => (
						<SpaceCard
							src={d.src}
							Id={d.Id}
							key={k}
							spaceName={d.spaceName}
							createdAt={d.createdAt}
							totalForms={d.totalForms}
						/>
					))}
				</div>
			)}
		</div>
	);
};
