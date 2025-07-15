import {
	fetchedReviews,
	getEmbadedReviewsId,
} from "@/app/action/server_action/user";

import { Card, InfiniteScrollCard } from "@/components/ui/card";
import { CheckBox } from "@/components/ui/checkbox";
import { FallBackText } from "@/components/ui/gradienteText";
import { VideoTestimonialOne } from "@/components/ui/testimonialscomponents/customvideotestimonial";
import { TextReviewOne } from "@/components/ui/testimonialscomponents/textreviewone";
import { cn } from "@/utils/lib/cn";
import { getUserSession } from "@/utils/lib/user_session";
import { TextReviewProps, VideoReviewProps } from "@/utils/types/user_types";

export default async function ReviewsPage({
	params,
}: {
	params: Promise<{ formId: number }>;
}) {
	const formId = (await params).formId;
	const adminId = parseInt((await getUserSession()).id);

	const reviewData = await fetchedReviews({ formId, adminId });

	const generatedReview = await getEmbadedReviewsId({ formId: formId });

	return (
		<Card className="border-[hsl(var(--primary))]/20 md:h-[calc(100vh-11rem)] h-[calc(100vh-15rem)] flex flex-col">
			{!reviewData.orderedReviews?.length ? (
				// <h1 className="text-center mt-10 text-xl bg-gradient-to-bl from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] bg-clip-text text-transparent font-semibold">
				// 	You dont have any reviews yet ! <br /> Please Ask Your users
				// 	to submit their reviews
				// </h1>
				<div className="flex flex-col justify-center items-center h-full">
					<FallBackText className="text-[hsl(var(--primary))]" t1="It's quiet here! No testimonials available." />
				</div>
			) : (
				<InfiniteScrollCard>
					<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 p-4">
						{reviewData.orderedReviews.map((rv, Idx) => {
							if (rv.type === "text") {
								const textReview = rv.data as TextReviewProps;
								return (
									<div key={Idx} className="relative">
										<CheckBox
											data={rv}
											defaultChecked={generatedReview.ids?.includes(
												rv.id,
											)}
											className="absolute top-2 right-2 z-10"
										/>
										<TextReviewOne
											// key={Idx}
											className={cn(
												"h-full",
												generatedReview.ids?.includes(
													rv.id,
												) &&
													"border-2 border-[hsl(var(--tertiary))]",
											)}
											customerCompany={
												textReview.customerCompany
											}
											customerName={
												textReview.customerName
											}
											textReview={textReview.textReview}
											textreviewid={
												textReview.textreviewid
											}
											imageSrc={textReview.imageSrc}
											stars={textReview.stars}
										/>
									</div>
								);
							} else if (rv.type === "video") {
								const videoReview = rv.data as VideoReviewProps;
								return (
									<div key={Idx} className="relative">
										<CheckBox
											data={rv}
											defaultChecked={generatedReview.ids?.includes(
												rv.id,
											)}
											className="absolute top-2 right-2 z-10"
										/>
										<VideoTestimonialOne
											username={videoReview.customerName}
											usercompany={
												videoReview.customerCompany
											}
											videoSrc={videoReview.videoLink}
											stars={videoReview.stars}
											// key={Idx}
										/>
									</div>
								);
							}
						})}
					</div>
				</InfiniteScrollCard>
			)}
		</Card>
	);
}
