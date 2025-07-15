import { getUserDataCount } from "@/app/action/server_action/user";
import { DashboardCardProps } from "@/utils/types/user_types";
import { DashboardCard } from "../ui/dashboardcard";
import { LinkTag } from "../ui/Link";
import { IconDiv } from "../ui/icondiv";
import { Card } from "../ui/card";
import { File, Rocket } from "lucide-react";
import { FallBackText } from "@/components/ui/gradienteText";

export async function Dashboardstats({ userId }: { userId: number }) {
	const dashboadData = await getUserDataCount(Number(userId));

	// if(!dashboadData.success){
	//     return (
	//         <div className="md:space-y-10 space-y-5">
	//                 <h1 className="font-semibold text-2xl">Welcome {name}</h1>
	//                 <div className="text-red-500">
	//                     Failed to load dashboard data. Please try again later.
	//                 </div>
	//         </div>
	//     )
	// }

	const DashboardCardData: DashboardCardProps[] = [
		{
			title: "Space",
			data: Number(dashboadData.data?.spaceCount),
			desc: "your centralized hub for projects",
		},
		{
			title: "Forms",
			data: Number(dashboadData.data?.formsCount),
			desc: "new forms created recently",
		},
		{
			title: "Submission",
			data: Number(dashboadData.data?.submissionCount),
			desc: "Total submissions received",
		},
	];

	return (
		<div className="grid xl:grid-cols-3 md:gap-10 gap-3">
			{DashboardCardData.map((d, k) => (
				<DashboardCard
					title={d.title}
					data={d.data}
					desc={d.desc}
					key={k}
				/>
			))}
		</div>
	);
}

export const DashboardToSpace = () => {
	return (
		<Card className="w-full h-full py-10 items-center bg-[hsl(var(--pure-white))]/5 border border-[hsl(var(--primary))]/20 backdrop-blur-3xl  flex flex-col space-y-2 justify-center  transition-colors ease-linear duration-200">
			<IconDiv className="p-2" reactNode={<File />} />
			<FallBackText t1="No Space Yet" />
			<LinkTag
				variants={"secondary"}
				sizes={"md"}
				className="flex items-center gap-1"
				href={"/space"}
			>
				<Rocket
					size={16}
					className="fill-[hsl(var(--pure-white))] text-[hsl(var(--pure-white))]"
				/>
				Add Space
			</LinkTag>
		</Card>
	);
};
