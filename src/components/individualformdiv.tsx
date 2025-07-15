"use client";
import { Check, Copy, Eye, Link } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { InputBox } from "./ui/input";
import { TextArea } from "./ui/textbox";
import { useEffect, useState } from "react";
import { LinkTag } from "./ui/Link";
import { toast } from "sonner";
import { SubscriptionPlanType } from "@/generated/prisma";
import { heightLightText } from "./landingpage/iframefile";
import { FaFileCode } from "react-icons/fa6";

export interface IndividualFormDivProps {
	Name: string;
	logoUrl?: string;
	Description: string;
	questions: string[];
	submission: number;
	subcriptionPlanName: SubscriptionPlanType;
	remainingReviews: number;
	createdAt: string;
	token: string;
	formId: number;
	embaedId: string | null | undefined;
}

export const IndividualFormDiv = (data: IndividualFormDivProps) => {
	const [copied, setCopied] = useState(false);

	const scriptCodeOne = heightLightText({
		code: `<script type="text/javascript" src="https://cdn.vouchly.kakoty.me/js/iframeResizer.min.js"></script>`,
	});

	const iframeCode = heightLightText({
		code: `<iframe id="review-wall-${data.embaedId}" src="https://vouchly.kakoty.me/embadedwall/${data.embaedId}" frameborder="0" scrolling="no" width="100%"></iframe>`,
	});

	const scriptCodeTwo = heightLightText({
		code: `<script>window.addEventListener("load", function () {iFrameResize({ log: false, checkOrigin: false }, "#review-wall-${data.embaedId}")})</script>`,
	});

	useEffect(() => {
		const id = setTimeout(() => {
			setCopied(false);
		}, 2000);

		return () => {
			clearTimeout(id);
		};
	}, [copied]);

	// will add one dat
	// const update = async (formData: FormData) => {
	// 	const Name = formData.get("Title");
	// 	const Description = formData.get("Description");

	// 	const res = await updateForm(
	// 		{
	// 			formId: data.formId,
	// 			Name,
	// 			Description,
	// 			spaceId
	// 		}
	// 	)

	// };
	return (
		<div className="space-y-5">
			{/* <BackButton /> */}
			<section className="flex flex-col space-y-2 lg:flex-row lg:justify-between lg:items-center">
				<div>
					<h1 className="font-semibold text-2xl">{data.Name}</h1>
					<p className="text-[hsl(var(--secondary-foreground))] text-sm">
						{data.Description}
					</p>
				</div>
				<div className="flex flex-row gap-4 items-center">
					<LinkTag
						variants={"secondary"}
						href={`${process.env.NEXT_PUBLIC_NEXT_URL}/submit/${data.token}`}
						target="_blank"
						sizes={"md"}
						className="flex flex-row items-center gap-1 cursor-pointer"
					>
						<Eye className="" size={14} />
						View Live Form
					</LinkTag>
					<Button
						onClick={() => {
							navigator.clipboard.writeText(
								`${process.env.NEXT_PUBLIC_NEXT_URL}/submit/${data.token}`,
							);
							toast.info("URL copied");
						}}
						variant={"secondary"}
						className="flex flex-row items-center gap-2"
					>
						<Link size={14} />
						Share
					</Button>
				</div>
			</section>
			<div className="grid xl:grid-cols-3 grid-cols-1 gap-2">
				<div className="xl:col-span-2 col-span-1 space-y-2">
					<Card className=" p-5  space-y-4 border-[hsl(var(--primary))]/20">
						<div>
							<h1 className="text-md font-semibold">
								Embed Widget
							</h1>
							<p className="text-[hsl(var(--secondary-foreground))]/70 text-sm">
								{data.embaedId === null || undefined
									? "Embed your testimonial display on your website. A script will be available here once you have collected approved testimonials."
									: "Copy and paste this code into your website to display your testimonials."}
							</p>
						</div>
						{data.embaedId === null || undefined ? (
							<LinkTag
								variants="secondary"
								sizes="md"
								className="flex flex-row items-center gap-1"
								href={`/forms/${data.formId}/editor`}
							>
								<FaFileCode
									size={16}
									className="fill-[hsl(var(--pure-white))] text-[hsl(var(--pure-white))]"
								/>{" "}
								Generate Embed Code
							</LinkTag>
						) : (
							<>
								<h1 className="rounded-md border-2 border-[hsl(var(--primary))] bg-white/5 whitespace-nowrap md:px-5 px-3 py-3 text-[hsl(var(--secondary-foreground))] overflow-x-auto scrollbar scrollbar-h-1.5 scrollbar-thumb-rounded-full scrollbar-track-[hsl(var(--primary))]/20 scrollbar-thumb-[hsl(var(--primary))]/80 overflow-scroll">
									<code
										dangerouslySetInnerHTML={{
											__html: scriptCodeOne,
										}}
									/>
									<code
										dangerouslySetInnerHTML={{
											__html: iframeCode,
										}}
									/>
									<code
										dangerouslySetInnerHTML={{
											__html: scriptCodeTwo,
										}}
									/>
								</h1>
								<Button
									onClick={() => {
										navigator.clipboard.writeText(
											`
											<script type="text/javascript" src="https://cdn.vouchly.kakoty.me/js/iframeResizer.min.js"></script>
											<iframe id="review-wall-${data.embaedId}" src="https://vouchly.kakoty.me/embadedwall/${data.embaedId}" frameborder="0" scrolling="no" width="100%"></iframe>
											<script>window.addEventListener("load", function () {iFrameResize({ log: false, checkOrigin: false }, "#review-wall-${data.embaedId}")})</script>
											`,
										);
										toast.message("Embed script copied!", {
											description:
												"Paste it in your website's HTML to show the testimonial widget.",
										});
									}}
									className="flex flex-row items-center gap-3"
								>
									<Copy size={16} />
									Copy Script
								</Button>
							</>
						)}
					</Card>
					<Card className=" py-7 px-5  space-y-5 border-[hsl(var(--primary))]/20">
						<h1 className="text-md font-semibold">
							Update Your Testimonia Form here
						</h1>
						<form className="space-y-5">
							<InputBox
								placeholder={data.Name}
								name="New Title"
							/>
							<TextArea
								name="New Description"
								placeholder={data.Description}
							/>

							<h1 className="text-sm text-[hsl(var(--secondary-foreground))]">
								Advanced fileds will be added soon
							</h1>
							<Button
								type="button"
								variant={"secondary"}
								onClick={() =>
									toast.message("Hold up ⚙️", {
										description:
											"This update feature is cooking... check back soon!",
									})
								}
							>
								Save Changes
							</Button>
						</form>
					</Card>
				</div>

				<div className="space-y-2 col-span-1">
					<Card className=" p-5  h-fit space-y-3 border-[hsl(var(--primary))]/20">
						<section>
							<h1 className="font-semibold text-xl">
								Submissions
							</h1>
							<p className="text-[hsl(var(--secondary-foreground))]/70 text-sm">
								View and manage responses to this form
							</p>
						</section>
						<section>
							<h1 className="text-4xl font-bold">
								{data.submission}
							</h1>
							<p className="text-[hsl(var(--secondary-foreground))]/70 text-sm">
								Total submissions
							</p>
						</section>
						{/* <Button 
                        onClick={() => router.push(`/forms/${data.formId}/embaded`)}
                        className="w-full" variant={"secondary"}>View all Submissions</Button> */}
						<LinkTag
							variants="secondary"
							sizes="md"
							href={`/forms/${data.formId}/editor`}
						>
							View All Submissions
						</LinkTag>
						<h1 className="bg-[hsl(var(--primary))]/30 px-5 mt-4 text-xs rounded-xl w-fit border border-[hsl(var(--primary))]/50">
							You can collect up to {data.remainingReviews || 0}{" "}
							reviews with the{" "}
							{data.subcriptionPlanName || "Free"} plan.
						</h1>
					</Card>

					<Card className="py-7 px-5  h-fit space-y-5 border-[hsl(var(--primary))]/20">
						<section>
							<h1 className="font-semibold text-xl">
								Share & Embed Options
							</h1>
							<p className="text-[hsl(var(--secondary-foreground))]/70 text-sm">
								Share your form and view its identifiers.
							</p>
						</section>
						<section className="flex flex-row gap-2 justify-between">
							<h1 className="rounded-md border-2 border-[hsl(var(--primary))]/40 p-2 text-[hsl(var(--secondary-foreground))] overflow-x-auto whitespace-nowrap scrollbar scrollbar-h-1.5 scrollbar-thumb-rounded-full scrollbar-track-[hsl(var(--primary))]/20 scrollbar-thumb-[hsl(var(--primary))]/80 overflow-scroll overflow-y-hidden">
								{process.env.NEXT_PUBLIC_NEXT_URL}/submit/
								{data.token}
							</h1>
							<Button
								variant={"transparent"}
								sizes={"sm"}
								onClick={() => {
									navigator.clipboard.writeText(
										`${process.env.NEXT_PUBLIC_NEXT_URL}/submit/${data.token}`,
									);
									setCopied(true);
									toast.info("URL copied");
								}}
							>
								{!copied ? (
									<Copy size={19} />
								) : (
									<Check size={19} />
								)}
							</Button>
						</section>
						<h1 className="bg-[hsl(var(--primary))]/60 px-5 text-sm rounded-xl w-fit border-2 border-[hsl(var(--tertiary))]">
							{data.createdAt}
						</h1>
					</Card>
				</div>
			</div>
		</div>
	);
};
