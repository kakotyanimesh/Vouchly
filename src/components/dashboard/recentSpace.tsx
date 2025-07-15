"use client";
import Link from "next/link";
import { nakedURL } from "@/utils/lib/lib_new";

export const RecentSpacecard = (data: {
	spaceName: string;
	url: string;
	createdAt: Date;
    spaceId : number,
	noOfForms: number;
}) => {
	return (
        <Link href={`/space/${data.spaceName}/${data.spaceId}`} className="flex flex-row justify-between  items-center px-7 py-3 rounded-none first:rounded-t-2xl last:rounded-b-2xl border-[hsl(var(--card-bg-one))]/10 text-sm hover:bg-[hsl(var(--primary))]/10 transition-all duration-200 ease-out cursor-pointer bg-[hsl(var(--deep-black))] border">
			<div>
				<h1>{data.spaceName}</h1>
				<button
					className="text-[10px] text-slate-500 hover:text-[hsl(var(--primary))] transition-colors ease-out  cursor-pointer "
					onClick={() =>
						window.open(
							nakedURL({ url: data.url }),
							"_blank",
							"noopener,noreferrer",
						)
					}
				>
					{data.url}
				</button>
			</div>

			<div className="space-y-1">
				<h1>{data.noOfForms} Forms</h1>
				<p className="bg-[hsl(var(--primary))]/20 rounded-full px-3 text-[10px] border border-[hsl(var(--primary))]">
					{new Date(data.createdAt).toDateString()}
				</p>
			</div>
		</Link>
	);
};
