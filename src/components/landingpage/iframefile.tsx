"use client";
import { Card } from "../ui/card";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import { Button } from "../ui/button";
import { LinkTag } from "../ui/Link";
import { toast } from "sonner";

export const IframeFile = () => {
	const scriptCodeOne = heightLightText({
		code: `<script type="text/javascript" src="https://cdn.vouchly.kakoty.me/js/iframeResizer.min.js"></script>`,
	});

	const iframeCode = heightLightText({
		code: `<iframe id="review-wall-79d7aa54-d0d8-4607-90a6-1f498f780d14" src="https://vouchly.kakoty.me/embadedwall/79d7aa54-d0d8-4607-90a6-1f498f780d14" frameborder="0" scrolling="no" width="100%"></iframe>`,
	});

	const scriptCodeTwo = heightLightText({
		code: `<script>window.addEventListener("load", function () {iFrameResize({ log: false, checkOrigin: false }, "#review-wall-79d7aa54-d0d8-4607-90a6-1f498f780d14")})</script>`,
	});
	return (
		<Card className="lg:w-[600px] w-full bg-gradient-to-bl from-[hsl(var(--feature-preview))]/30 to-[hsl(var(--primary))]/30 py-3 px-6 border-0 space-y-3">
			<h1 className="">Try our sample embed code</h1>

			<Card className="overflow-x-auto rounded-none scrollbar scrollbar-thumb-[hsl(var(--primary))]/70 scrollbar-track-[hsl(var(--primary))]/30 scrollbar-h-2 text-sm pt-3 px-2 pb-1  border-0 ">
				<pre className="whitespace-nowrap">
					<code dangerouslySetInnerHTML={{ __html: scriptCodeOne }} />
				</pre>
				<pre className="whitespace-nowrap">
					<code dangerouslySetInnerHTML={{ __html: iframeCode }} />
				</pre>
				<pre className="whitespace-nowrap">
					<code dangerouslySetInnerHTML={{ __html: scriptCodeTwo }} />
				</pre>
			</Card>
			<div className="flex  gap-3">
				<LinkTag
					sizes={"md"}
					className="py-1 px-2"
					target="_blank"
					href={"https://vouchly-demo.vercel.app/"}
					variants={"secondary"}
				>
					Live Demo
				</LinkTag>
				<Button
					variant={"randomColor"}
					sizes={"sm"}
					onClick={() => {
						navigator.clipboard.writeText(
							`
											<script type="text/javascript" src="https://cdn.vouchly.kakoty.me/js/iframeResizer.min.js"></script>
											<iframe id="review-wall-79d7aa54-d0d8-4607-90a6-1f498f780d14" src="https://vouchly.kakoty.me/embadedwall/79d7aa54-d0d8-4607-90a6-1f498f780d14" frameborder="0" scrolling="no" width="100%"></iframe>
											<script>window.addEventListener("load", function () {iFrameResize({ log: false, checkOrigin: false }, "#review-wall-79d7aa54-d0d8-4607-90a6-1f498f780d14")})</script>
											`,
						);
						toast.message("Embed script copied!", {
							description:
								"Paste it in your website's HTML to show the testimonial widget.",
						});
					}}
				>
					Copy
				</Button>
			</div>
		</Card>
	);
};

export const heightLightText = ({ code }: { code: string }) => {
	return Prism.highlight(code, Prism.languages.markup, "markup");
};
