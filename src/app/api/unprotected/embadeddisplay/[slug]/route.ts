import prisma from "@/utils/lib/prisma";
import { reviewsType } from "@/utils/zustand/gridstateV2";
import { NextRequest, NextResponse } from "next/server";

// fact => you are using next req or not you have to define it bruh 

export async function GET(req : NextRequest, {params} : {params : Promise<{slug : string}>}) {
	try {
        
		const embadedId = (await params).slug;        

		const emabdedData = await prisma.reviewStyle.findUnique({
			where: {
				id: embadedId,
			},
			omit: {
				testimonialFormId: true,
			},
		});

		if (!emabdedData) {
			throw new Error("Invalid Embaded Id");
		}
		const testimonialdata = await prisma.customerReview.findMany({
			where: {
				id: {
					in: emabdedData.selectedReviews,
				},
			},
			include: {
				textReview: {
					select: {
						textReview: true,
					},
				},
				videoReview: {
					select: {
						videoLink: true,
					},
				},
			},
			omit: {
				testimonialFormsId: true,
				spaceId: true,
				adminId: true,
				approved: true,
			},
		});

		// we have send reviews with prefield like cdn links and with defining types

		const reviews: reviewsType[] = testimonialdata
			.map((td) => {
				if (td.textReview) {
					return {
						id: td.id,
						type: "text",
						data: {
							textReview: td.textReview.textReview,
							customerCompany: td.customerCompany,
							customerName: td.customerName,
							imageSrc: `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${td.customerImageUrl}`,
							stars: td.stars,
							textreviewid: td.id,
						},
					} satisfies reviewsType;
				} else if (td.videoReview) {
					return {
						id: td.id,
						type: "video",
						data: {
							customerCompany: td.customerCompany,
							customerName: td.customerName,
							videoLink: `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${td.videoReview.videoLink}`,
							stars: td.stars,
							videoReviewid: td.id,
						},
					} satisfies reviewsType;
				}
				return undefined;
			})
			.filter(Boolean) as reviewsType[];

		return NextResponse.json({ emabdedData, reviews }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				msg:
					process.env.NODE_ENV === "development"
						? `${error}, embadeddisplay`
						: `something went wrong`,
			},
			{ status: 500 },
		);
	}
}
