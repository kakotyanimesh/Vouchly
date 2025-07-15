"use client";
import { File, Shredder } from "lucide-react";
import { Card } from "./ui/card";
import { IconDiv } from "./ui/icondiv";
import { cn } from "@/utils/lib/cn";
import { endcodeURL } from "@/utils/lib/lib_new";
import { TestimoniaTableDataTypes } from "@/utils/types/user_types";
import { TestimonialsTableheaders } from "@/utils/hardcodeddata/shortcuts";
import { FormTable } from "./formtable";
import { LinkTag } from "./ui/Link";

type FormDivtypes = {
	sName: string;
	sId: string;
	data:
		| TestimoniaTableDataTypes[]
		| { success: boolean; message: string; status: number | undefined };
};

export const FormCreation = ({ sName, sId, data }: FormDivtypes) => {
	// console.log(data);

	const isArray = Array.isArray(data);

	if (!isArray) {
		return <div>somthing went wrong baba </div>;
	}

	return (
		<div className="space-y-5">
			<div
				className={cn(
					"flex md:flex-row flex-col justify-between md:items-center md:gap-0 gap-3",
				)}
			>
				<div>
					<h1 className="font-semibold text-2xl">{sName}</h1>
				</div>
				<LinkTag
					variants={"secondary"}
					sizes={"md"}
					className="flex items-center gap-2 group-hover:bg-[hsl(var(--primary))]/20 "
					href={`/space/createForm?data=${endcodeURL(JSON.stringify({ sName, sId }))}`}
				>
					<Shredder
						size={16}
						className="fill-[hsl(var(--pure-white))] text-[hsl(var(--pure-white))]"
					/>
					Build a Form
				</LinkTag>
			</div>

			{data.length === 0 ? (
				<Card className="w-full h-full py-10 items-center text-center bg-[hsl(var(--pure-white))]/5 border border-[hsl(var(--primary))]/20 backdrop-blur-3xl  flex flex-col space-y-3 justify-center  transition-colors ease-linear duration-200">
					<IconDiv className="p-3" reactNode={<File />} />
					<h1 className="text-sm">
						Ready to collect testimonials?
						Design your first form now{" "}
					</h1>
					<LinkTag
						variants={"secondary"}
						sizes={"md"}
						className="flex items-center gap-2"
						href={`/space/createForm?data=${endcodeURL(JSON.stringify({ sName, sId }))}`}
					>
						<Shredder
							size={16}
							className="fill-[hsl(var(--pure-white))] text-[hsl(var(--pure-white))]"
						/>
						Build a Form
					</LinkTag>
				</Card>
			) : (
				<FormTable thead={TestimonialsTableheaders} tdata={data} />
			)}
		</div>
	);
};
