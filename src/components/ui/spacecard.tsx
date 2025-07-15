"use client";
import { CalendarRange, Rocket } from "lucide-react";
import { Card } from "./card";
import { IconDiv } from "./icondiv";
import { Button } from "./button";
import { SpaceCardProps } from "@/utils/types/user_types";
import { cn } from "@/utils/lib/cn";
import { HTMLMotionProps, motion } from "motion/react";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { deleteSpace } from "@/app/action/server_action/user";
import { LinkTag } from "./Link";

type SpceCardProps = HTMLMotionProps<"div"> & SpaceCardProps;

export const SpaceCard: React.FC<SpceCardProps> = ({
	className,
	spaceName,
	createdAt,
	src,
	Id,
	totalForms,
}) => {
	const dSpace = async () => {
		const res = await deleteSpace({ spaceId: Id });
		toast.message(res.message);
	};
	return (
		<motion.div>
			<Card
				className={cn(
					"px-5 py-7 space-y-5 group hover:border-[hsl(var(--card-bg-one))] transition-colors ease-linear duration-200",
					className,
				)}
			>
				<div className="flex flex-row justify-between items-center">
					<div className="flex items-center gap-2">
						<IconDiv
							reactNode={<Rocket size={18} />}
							className="rounded-md p-2"
						/>
						<div className="-space-y-1">
							<h1 className="text-[hsl(var(--card-bg-one))] transition-colors ease-linear duration-150 font-semibold">
								{spaceName}
							</h1>
							<p className="text-xs text-[hsl(var(--slate-text))]">
								{src}
							</p>
						</div>
					</div>
					<Button
						variant={"transparent"}
						sizes={"sm"}
						onClick={dSpace}
						type="button"
						className=" border-0 bg-gradient-to-r from-teal-400/40 to-emerald-400/40"
					>
						<MdDelete className="text-teal-200" />{" "}
					</Button>
				</div>
				<div>
					<h1>{totalForms} forms </h1>
					<h1 className="flex items-center text-sm gap-2">
						<CalendarRange size={12} />
						{new Date(createdAt).toDateString()}
					</h1>
				</div>
				<LinkTag
					href={`/space/${spaceName}/${Id}`}
					sizes={"md"}
					className="flex text-center justify-center w-full "
					variants={"secondary"}
				>
					Open space
				</LinkTag>
			</Card>
		</motion.div>
	);
};
