import {
	RecentlyActiveCardData,
	shortCutArrayDashboard,
} from "@/utils/hardcodeddata/shortcuts";
import { Usercards } from "@/components/ui/usercards";
import { RecentlyActiveCard } from "@/components/ui/dashboardcard";
import { Card } from "@/components/ui/card";
import { getUserSession } from "@/utils/lib/user_session";
import { Suspense } from "react";
import { DashboadStats } from "@/components/loadingcomponents/dashboardstats";
import { Dashboardstats } from "@/components/dashboard/dashboardstats";
import { LinkTag } from "@/components/ui/Link";
import { Crown } from "lucide-react";

export default async function dashboard() {
	const { id, name } = await getUserSession();

	return (
		<div className="md:space-y-7 space-y-5">
			<div className="flex justify-between items-center ">
				<h1 className="font-semibold text-2xl">Welcome {name}</h1>
				<LinkTag href={"/pricing"} variants={"secondary"} sizes={"md"} className="flex flex-row items-center gap-1">
					
                    <Crown size={16} className="fill-[hsl(var(--pure-white))] text-[hsl(var(--pure-white))]"/>
					Upgrade
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
			<Suspense fallback={<DashboadStats />}>
				<Dashboardstats userId={Number(id)} />
			</Suspense>
			<div className="space-y-3">
				<h1 className="font-semibold text-2xl">Recently Active</h1>
				<Card className="">
					{RecentlyActiveCardData.map((r, k) => (
						<RecentlyActiveCard
							src={r.src}
							key={k}
							Name={r.Name}
							position={r.position}
							status={r.status}
							time={r.time}
						/>
					))}
				</Card>
			</div>
		</div>
	);
}
