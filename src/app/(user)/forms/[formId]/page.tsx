import {
	fetchEmbadedId,
	getIndividualTestimonialFormData,
} from "@/app/action/server_action/user";
import { IndividualFormDiv } from "@/components/individualformdiv";
import { BackButton } from "@/components/ui/routerBack";
import { generateToken } from "@/utils/lib/lib_new";
import { getUserSession } from "@/utils/lib/user_session";

export default async function IndividualForms({
	params,
}: {
	params: Promise<{ formId: string }>;
}) {
	const id = Number((await params).formId);

	const { id: adminId } = await getUserSession();

	const data = await getIndividualTestimonialFormData({
		adminId: Number(adminId),
		formId: id,
	});
	// console.log(data);

	const token = generateToken(id, Number(adminId));
	// you cant use env variable in client component

	const embadedId = await fetchEmbadedId({ formId: Number(id) });

	//  too much of objects and i don't want to fix it
	

	if (!data || "success" in data) {
		return (
			<h1>
				Database is down at this moment please try again later
				pleaseeeeeeeeee 
			</h1>
		);
	}
	return (
		<div className="">
			<BackButton link="space"/>
			<IndividualFormDiv
				embaedId={embadedId.embadedId}
				formId={Number(id)}
				token={token}
				questions={data.questions}
				Name={data.Name}
				subcriptionPlanName={data.admin.subscription[0].subscriptionName}
				remainingReviews={data.admin.subscription[0].subscriptionData.maxReview - data._count.customerReview}
				Description={data.Description}
				submission={data._count.customerReview}
				createdAt={data.createdAt.toDateString()}
			/>
		</div>
	);
}
