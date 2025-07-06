import { fetchedReviews } from "@/app/action/server_action/user";
import { Card, InfiniteScrollCard } from "@/components/ui/card";
import { CheckBox } from "@/components/ui/checkbox";
import { VideoTestimonialOne } from "@/components/ui/testimonialscomponents/customvideotestimonial";
import { TextReviewOne } from "@/components/ui/testimonialscomponents/textreviewone";
import { getUserSession } from "@/utils/lib/user_session";

export default async function ReviewsPage({
	params,
}: {
	params: Promise<{ formId: number }>;
}) {
	const formId = (await params).formId;
	const adminId = parseInt((await getUserSession()).id);

	const reviewData = await fetchedReviews({ formId, adminId });

	return (
		<Card className="flex-1 border-[hsl(var(--primary))]/20 h-[calc(100vh-11rem)] flex flex-col">
			{!reviewData.orderedReviews?.length ? (
				<h1 className="text-center mt-10 text-xl bg-gradient-to-bl from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] bg-clip-text text-transparent font-semibold">
					You dont have any reviews yet ! <br /> Please Ask Your users
					to submit their reviews
				</h1>
			) : (
				<InfiniteScrollCard>
					<div className="grid md:grid-cols-3 grid-cols-1 gap-2 p-4">
						{reviewData.orderedReviews.map((rv, k) => {
							if (rv.type === "text") {
								return (
									<div key={k} className="w-full relative ">
										<CheckBox
											data={rv}
											className="absolute top-2 right-2 z-10"
										/>
										<TextReviewOne
											textreviewid={rv.id}
											className="h-full w-full"
											customerName={rv.data.customerName}
											customerCompany={
												rv.data.customerCompany
											}
											textReview={rv.data.textReview}
											imageSrc={rv.data.imageSrc}
											stars={rv.data.stars}
										/>
									</div>
								);
							} else if (rv.type === "video") {
								return (
									<div key={k} className="w-full relative">
										<CheckBox
											data={rv}
											className="absolute top-2 right-2 z-10"
										/>

										<VideoTestimonialOne
											// className="h-full"
											stars={rv.data.stars}
											videoSrc={rv.data.videoLink}
											usercompany={
												rv.data.customerCompany
											}
											username={rv.data.customerName}
											key={k}
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
