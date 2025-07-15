import { shortCutArrayDashboard } from "@/utils/hardcodeddata/shortcuts";
import { Usercards } from "@/components/ui/usercards";
import { getUserSession } from "@/utils/lib/user_session";
import { Suspense } from "react";
import {
	DashboadStatSkeleton,
	RecentlyActiveSkeleton,
} from "@/components/loadingcomponents/dashboardstats";
import {
	Dashboardstats,
	DashboardToSpace,
} from "@/components/dashboard/dashboardstats";
import { LinkTag } from "@/components/ui/Link";
import { Crown } from "lucide-react";
import { getFirstThreeSpaces } from "@/app/action/server_action/user";
import { RecentSpacecard } from "@/components/dashboard/recentSpace";

export default async function dashboard() {
	const { id, name } = await getUserSession();
	const spaces = await getFirstThreeSpaces({ userId: Number(id) });

	return (
		<div className="md:space-y-8 space-y-5">
			<div className="flex justify-between items-center ">
				<h1 className="font-semibold text-2xl">Welcome {name}</h1>
				<LinkTag
					href={"/pricing"}
					variants={"secondary"}
					sizes={"md"}
					className="flex flex-row items-center gap-1"
				>
					<Crown
						size={16}
						className="fill-[hsl(var(--pure-white))] text-[hsl(var(--pure-white))]"
					/>
					Upgrade Your Plan
				</LinkTag>
			</div>
			<div className="grid xl:grid-cols-4 xl:gap-10 gap-5 grid-cols-2 ">
				{shortCutArrayDashboard.map((s, k) => (
					<Usercards
						redirectLink={s.redirect}
						parentColor={s.parentColor}
						title={s.title}
						icon={s.icon}
						key={k}
						iconStyle={s.iconStyle}
					/>
				))}
			</div>
			<Suspense fallback={<DashboadStatSkeleton />}>
				<Dashboardstats userId={Number(id)} />
			</Suspense>
			<Suspense fallback={<RecentlyActiveSkeleton />}>
				{spaces.recentSpaces?.length === 0 ? (
					<DashboardToSpace />
				) : (
					<div className="space-y-3">
						<h1 className="font-semibold text-2xl">
							Recent Spaces
						</h1>

						<div>
							{spaces.recentSpaces?.map((rs, Idx) => (
								<RecentSpacecard
									spaceId={rs.id}
									spaceName={rs.spaceName}
									url={rs.url}
									createdAt={rs.createdAt}
									key={Idx}
									noOfForms={rs._count.testimonialForms}
								/>
							))}
						</div>
					</div>
				)}
			</Suspense>
		</div>
	);
}
