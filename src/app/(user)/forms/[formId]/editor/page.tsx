"use client";

import { EditingTool } from "@/components/editorpage/editingV2/editingTool";
import { ReviewWrapperdiv } from "@/components/editorpage/editingV2/reviewStylediv";
import { EditingStyles } from "@/components/editorpage/editingV2/reviewstyles";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function EditorStaticPage() {
	const [isClicked, setIsClicked] = useState<boolean>(false);

	return (
		<div className="overflow-y-auto">
			<AnimatePresence initial={false}>
				{isClicked && (
					<motion.div
						initial={{ opacity: 0, scale: 0.7 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						transition={{
							ease: "easeOut",
							duration: 0.2,
						}}
						className="rounded-xl overflow-hidden border-[hsl(var(--pure-white))]/20 border bg-[hsl(var(--deep-black))] xl:left-20  md:inset-y-2 md:right-2 md:left-20 inset-x-3 top-2 bottom-10 z-20 absolute lg:px-4 lg:pt-1 px-2	 space-y-1"
					>
						<section className="flex flex-row justify-between  items-center p-1">
							<h1>💡Testimonial Editor</h1>
								
							<Button
								variant={"transparent"}
								className="px-1"
								sizes={"sm"}
								onClick={() => setIsClicked(!isClicked)}
							>
								<X size={18} />
							</Button>
						</section>
						<section className="flex lg:flex-row flex-col lg:gap-5  gap-1">
							<Card className="relative flex-1 flex justify-center items-center flex-col pt-7">
								<h1 className="absolute top-2 left-5 animate-pulse ml-2 border border-red-600 bg-red-600/20 w-fit rounded-2xl text-xs px-2">
									Live Preview
								</h1>
								<ReviewWrapperdiv />
							</Card>
							<EditingStyles />
						</section>
						<EditingTool />
					</motion.div>
				)}
			</AnimatePresence>
			<div className="flex justify-end mr-2">
				<Button
					variant={"secondary"}
					onClick={() => setIsClicked(!isClicked)}
					className="w-36"
				>
					Choose A style
				</Button>
			</div>
		</div>
	);
}

// const AllSelectedReviews = () => {
// 	const { renderReviews } = useOptimizedReviewRender();
// 	const { selectedReviews, gridStyleType } = useGridStoreV2();

// 	return (
// 		<div className="grid grid-cols-3 gap-2 max-h-[72vh] p-3 overflow-y-auto scrollbar scrollbar-thumb-[hsl(var(--primary))]/70 scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-track-[hsl(var(--primary))]/30 scrollbar-track-rounded-3xl">
// 			{selectedReviews.map((sr, k) =>
// 				renderReviews({
// 					review: sr,
// 					gridType: gridStyleType,
// 					index: k,
// 				}),
// 			)}
// 		</div>
// 	);
// };

{
	/* <Card className="lg:w-80 w-full lg:px-5 px-3 py-2 border-[hsl(var(--primary))]/20">
	<RevalidateCachedButton cachedName="review-cached" />
	<h1 className="bg-[hsl(var(--primary))]/60 absolute bottom-5 md:right-44 right-2  px-5 mt-4 text-sm rounded-xl w-fit border-2 border-[hsl(var(--tertiary))]">
		You can collect up to reviews with the plan.
	</h1>
	<h1 className="md:text-xl text-sm bg-gradient-to-bl from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] bg-clip-text text-transparent font-semibold">
		Example Styles
	</h1>
	<p className="text-[hsl(var(--secondary-foreground))]/70 mb-2 md:text-sm text-xs">
		Choose a layout style for your wall
	</p>
	<WidgetCustomizer formId={(await params).formId} />
</Card> */
}
