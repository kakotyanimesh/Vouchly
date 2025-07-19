"use server";
import { embadedTypes } from "@/utils/config/user.config";
import { handlerError } from "@/utils/lib/errorhandler";
import prisma from "@/utils/lib/prisma";
import { getUserSession } from "@/utils/lib/user_session";
import {
	OrderedReviewTypes,
	SpaceCardProps,
	TestimoniaTableDataTypes,
	TextReviewPropsWallOfLove,
	VideoReviewPropsWallOflove,
} from "@/utils/types/user_types";
import {
	gridStyleType,
	TestimonialCardStyleProps,
} from "@/utils/zustand/gridstateV2";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { cache } from "react";
import { ZodError } from "zod/v4";

const cachedUserdataCount = (id: number) =>
	unstable_cache(
		async () => {
			const numberedId = Number(id);
			const [spaceCount, formsCount, submissionCount] = await Promise.all(
				[
					prisma.spaces.count({
						where: {
							userId: numberedId,
						},
					}),
					prisma.testimonialForm.count({
						where: {
							adminId: numberedId,
						},
					}),
					prisma.customerReview.count({
						where: {
							adminId: numberedId,
						},
					}),
				],
			);

			return {
				spaceCount,
				formsCount,
				submissionCount,
			};
		},
		[`user-count-data${id}`],
		{
			revalidate: 300,
			tags: [
				`user-all-data-count-${id}`,
				`spaces`,
				`testimonials`,
				`user-data`,
			],
		},
	);

export const getUserDataCount = async (id: number) => {
	try {
		const countfunction = cachedUserdataCount(id);

		const data = await countfunction();

		return {
			success: true,
			data,
		};
	} catch (error) {
		const err = await handlerError(error);

		return {
			success: false,
			message: err.errorMsg,
			status: err.statusCode,
		};
	}
};

const cachedSpaceData = (userId: string) =>
	unstable_cache(
		async () => {
			const spaces = await prisma.spaces.findMany({
				where: {
					userId: Number(userId),
				},
				select: {
					spaceName: true,
					url: true,
					id: true,
					createdAt: true,
					_count: {
						select: {
							testimonialForms: true,
						},
					},
				},
				orderBy: {
					createdAt: "asc",
				},
			});

			return spaces;
		},
		[`spaces-${userId}`],
		{
			revalidate: 300,
			tags: [`user-spaces-${userId}`, `spaces`],
		},
	);

type GetAllSpacesTypes =
	| SpaceCardProps[]
	| { success: false; message: string; status?: number };

export const getAllSpaces = async (id: string): Promise<GetAllSpacesTypes> => {
	try {
		// const { id } = await getUserSession()

		const spaces = cachedSpaceData(id);

		const formatedData: SpaceCardProps[] = (await spaces()).map((s) => ({
			spaceName: s.spaceName,
			createdAt: s.createdAt,
			totalForms: s._count.testimonialForms,
			Id: s.id,
			src: s.url,
		}));

		return formatedData;
	} catch (error) {
		const err = await handlerError(error);

		return {
			success: false,
			message: err.errorMsg,
			status: err.statusCode,
		};
	}
};

const cachedIndividualSpaceTestimonialsData = ({
	adminId,
	spaceId,
}: {
	adminId: string;
	spaceId: string;
}) =>
	unstable_cache(
		async () => {
			const data = await prisma.testimonialForm.findMany({
				where: {
					spaceId: Number(spaceId),
					adminId: Number(adminId),
				},
				select: {
					Name: true,
					Description: true,
					createdAt: true,
					id: true,
					status: true,
					_count: {
						select: {
							customerReview: true,
						},
					},
				},
			});

			return data;
		},
		[`individual_space_testimonials${spaceId}`],
		{
			revalidate: 300,
			tags: [`user-inidividual-space-testimoials-${spaceId}`, `spaces`],
		},
	);

export const getSpaceTestimonialsDataWithId = async ({
	spaceId,
	adminId,
}: {
	spaceId: string;
	adminId: string;
}) => {
	try {
		const alltestimonials = cachedIndividualSpaceTestimonialsData({
			spaceId,
			adminId,
		});

		const res = await alltestimonials();

		return res.map(
			(t): TestimoniaTableDataTypes => ({
				id: t.id,
				Name: t.Name,
				Description: t.Description,
				createdAt: new Date(t.createdAt).toLocaleDateString(),
				Submissions: t._count.customerReview,
				status: t.status,
			}),
		);
	} catch (error) {
		const err = await handlerError(error);
		return {
			success: false,
			message: err.errorMsg,
			status: err.statusCode,
		};
	}
};

// const cached

const cachedAllTestimonialForms = (adminId: number, takeNumber: number) =>
	unstable_cache(
		async () => {
			const allTestimonials = await prisma.testimonialForm.findMany({
				where: {
					adminId: Number(adminId),
				},
				take: takeNumber,
				orderBy: {
					createdAt: "desc",
				},
				select: {
					Name: true,
					space: {
						select: {
							spaceName: true,
						},
					},
					id: true,
					Description: true,
					status: true,
					createdAt: true,
					_count: {
						select: {
							customerReview: true,
						},
					},
				},
			});
			return allTestimonials;
		},
		[`all_testimonials-${adminId}`],
		{
			revalidate: 3000,
			tags: [`all_testimonials-${adminId}`, `spaces`, `testimonials`],
		},
	);

export const getAllTestimonials = async (
	adminId: number,
	takeNumber: number,
) => {
	try {
		const res = cachedAllTestimonialForms(adminId, takeNumber);

		const allT = await res();

		return allT.map(
			(t): TestimoniaTableDataTypes => ({
				id: t.id,
				Name: t.Name,
				Space: t.space.spaceName,
				Description: t.Description,
				createdAt: new Date(t.createdAt).toLocaleDateString(),
				status: t.status,
				Submissions: t._count.customerReview,
			}),
		);
	} catch (error) {
		const err = await handlerError(error);

		return {
			success: false,
			message: err.errorMsg,
			statusCode: err.statusCode,
		};
	}
};

// const cachedIndividualTestimonialFormdata = ({adminId, formId} : {adminId : number, formId : number}) => unstable_cache(async() => {
//     return prisma.testimonialForm.findUnique({
//         where : {
//             id : Number(formId),
//             adminId : Number(adminId)
//         },select : {
//             Name : true,
//             Description : true,
//             _count : {
//                 select : {
//                     customerReview : true
//                 }
//             },
//             createdAt : true
//         }
//     })
// })

export const getIndividualTestimonialFormData = async ({
	adminId,
	formId,
}: {
	adminId: number;
	formId: number;
}) => {
	try {
		return await prisma.testimonialForm.findUnique({
			where: {
				id: Number(formId),
				adminId: Number(adminId),
			},
			select: {
				spaceId: true,
				Name: true,
				brandLogo: true,
				Description: true,
				questions: true,
				_count: {
					select: {
						customerReview: true,
					},
				},
				admin: {
					select: {
						subscription: {
							select: {
								subscriptionName: true,
								subscriptionData: {
									select: {
										maxReview: true,
										maxVideoReview: true,
									},
								},
							},
						},
					},
				},
				createdAt: true,
			},
		});
	} catch (error) {
		const err = await handlerError(error);

		return {
			success: false,
			message: err.errorMsg,
			status: err.statusCode,
		};
	}
};

/**
 * two functions -> for text review
 * another for vidoes => not in use im fetching everything with one function written in last
 */

const cachedTextReviews = ({
	formId,
	adminId,
}: {
	formId: number;
	adminId: number;
}) =>
	unstable_cache(
		async () => {
			return await prisma.customerReview.findMany({
				where: {
					adminId: Number(adminId),
					testimonialFormsId: Number(formId),
					textReview: {
						isNot: null,
					},
				},
				select: {
					id: true,
					customerName: true,
					customerImageUrl: true,
					customerCompany: true,
					stars: true,
					textReview: {
						select: {
							textReview: true,
						},
					},
				},
			});
		},
		[`text-reviews-cached${formId}-${adminId}`],
		{
			revalidate: 300,
			tags: [`text-review-cached-${formId}-${adminId}`, `review-cached`],
		},
	);

export const getTextReviews = async ({
	formId,
	adminId,
}: {
	formId: number;
	adminId: number;
}) => {
	try {
		const res = cachedTextReviews({ formId, adminId });

		return (await res()).map(
			(t): TextReviewPropsWallOfLove => ({
				id: t.id,
				customerName: t.customerName,
				customerCompany: t.customerCompany,
				stars: t.stars,
				imageSrc: `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${t.customerImageUrl}`,
				textReview: t.textReview?.textReview as string,
			}),
		);
	} catch (error) {
		const err = await handlerError(error);
		return {
			success: false,
			message: err.errorMsg,
			status: err.statusCode,
		};
	}
};

const cachedVideoReviews = ({
	formId,
	adminId,
}: {
	formId: number;
	adminId: number;
}) =>
	unstable_cache(
		async () => {
			return await prisma.customerReview.findMany({
				where: {
					adminId: Number(adminId),
					testimonialFormsId: Number(formId),
					videoReview: {
						isNot: null,
					},
				},
				select: {
					id: true,
					customerCompany: true,
					customerName: true,
					stars: true,
					videoReview: {
						select: {
							videoLink: true,
						},
					},
				},
			});
		},
		[`video-reviews-cached${formId}-${adminId}`],
		{
			revalidate: 300,
			tags: [`video-review-cached-${formId}-${adminId}`, `review-cached`],
		},
	);

export const getVideoReview = async ({
	formId,
	adminId,
}: {
	formId: number;
	adminId: number;
}) => {
	try {
		const res = cachedVideoReviews({ adminId, formId });

		return (await res()).map(
			(vt): VideoReviewPropsWallOflove => ({
				id: vt.id,
				customerName: vt.customerName,
				customerCompany: vt.customerCompany,
				stars: vt.stars,
				videoLink: `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${vt.videoReview?.videoLink}`,
			}),
		);
	} catch (error) {
		const err = await handlerError(error);

		return {
			success: false,
			message: err.errorMsg,
			status: err.statusCode,
		};
	}
};

export const revalidateCached = async ({
	cachedName,
}: {
	cachedName: string;
}) => {
	revalidateTag(`${cachedName}`);
};

type AddWidgetTypes = {
	formId: number;
	embadedIds: number[];
	style: Partial<TestimonialCardStyleProps>;
	gridType: gridStyleType;
};

export const addWidgetstoDb = async ({
	formId,
	embadedIds,
	style,
	gridType,
}: AddWidgetTypes) => {
	try {
		const parsedObject = embadedTypes.safeParse({
			formId,
			embadedIds,
			gridType,
		});

		// update reviews table that these are in action right now
		// we have to parsed styles also but for now lets don't do this
		if (!parsedObject.success) {
			throw parsedObject.error.errors;
		}

		const parseddata = parsedObject.data;
		const styledData = {
			testimonialFormId: Number(parseddata.formId),
			textColor: style.textColor,
			tesimoonialCardBg: style.tesimoonialCardBg,
			roundedCorner: style.roundedCorner!.toLocaleString(),
			shadowColor: style.shadowColor,
			starColor: style.starColor,
			gridType: parseddata.gridType,
			parentBgColor: style.parentBgColor!,
		};

		const existingWall = await prisma.reviewStyle.findFirst({
			where: {
				testimonialFormId: Number(formId),
			},
			select: {
				id: true,
			},
		});

		if (existingWall) {
			// await prisma.$transaction(async () =>)

			const embadedId = await prisma.reviewStyle.update({
				where: {
					testimonialFormId: Number(formId),
				},
				data: {
					...styledData,
					selectedReviews: parseddata.embadedIds,
				},
				select: {
					id: true,
				},
			});

			revalidatePath(`reviewwallcached-${formId}`);
			return {
				success: true,
				id: embadedId.id,
			};
		} else {
			const embadedwall = await prisma.reviewStyle.create({
				data: {
					...styledData,
					testimonialFormId: formId,
					selectedReviews: parseddata.embadedIds,
				},
				select: {
					id: true,
				},
			});
			revalidatePath(`reviewwallcached-${formId}`);
			return {
				success: true,
				id: embadedwall.id,
			};
		}
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				errorMsg: `Invalid Inputs at ${JSON.stringify(error.cause)}`,
				statusCode: 400,
			};
		}
		const err = await handlerError(error);

		return {
			success: false,
			message: err.errorMsg,
			status: err.statusCode,
		};
	}
};

export const saveEmbadedId = async ({
	embadedId,
	formId,
}: {
	embadedId: string;
	formId: number;
}) => {
	try {
		const { id } = await getUserSession();

		await prisma.testimonialForm.update({
			where: {
				adminId: Number(id),
				id: Number(formId),
			},
			data: {
				embadedId,
			},
		});
		return {
			success: true,
		};
	} catch (error) {
		console.log(error, "err");

		const err = await handlerError(error);

		return {
			messgage: err.errorMsg,
			status: err.statusCode,
			success: false,
		};
	}
};

// const cachedEmbadedWall = async ({ formId }: { formId: number }) => {
// 	const wall = await prisma.embadedWall.findUnique({
// 		where: {
// 			testimonialFormsId: Number(formId),
// 		},
// 		select: {
// 			selectedReviews: true,
// 		},
// 	});

// 	if (!wall || wall.selectedReviews.length === 0) {
// 		return {
// 			textReviewArray: [],
// 			videoReviewArray: [],
// 		};
// 		// {
// 		//     // here Im returing new arrys not getiing access to those that are being declared after it
// 		//     // textReviewArray : [],
// 		//     // videoReviewArray : [] => worst gpt code ever im not going to add this

// 		// }
// 	}

// 	const reviewIds = wall.selectedReviews;

// 	const reviews = await prisma.customerReview.findMany({
// 		where: {
// 			id: { in: reviewIds },
// 		},
// 		include: {
// 			textReview: {
// 				select: {
// 					textReview: true,
// 				},
// 			},
// 			videoReview: {
// 				select: {
// 					videoLink: true,
// 				},
// 			},
// 		},
// 		omit: {
// 			testimonialFormsId: true,
// 			spaceId: true,
// 			adminId: true,
// 			createdAt: true,
// 		},
// 	});

// 	const textReviewArray: TextReviewPropsWallOfLove[] = [];
// 	const videoReviewArray: VideoReviewPropsWallOflove[] = [];

// 	for (const rvs of reviews) {
// 		if (rvs.textReview) {
// 			textReviewArray.push({
// 				id: rvs.id,
// 				textReview: rvs.textReview.textReview,
// 				customerName: rvs.customerName,
// 				customerCompany: rvs.customerCompany,
// 				stars: rvs.stars,
// 				imageSrc: rvs.customerImageUrl,
// 			});
// 		} else if (rvs.videoReview) {
// 			videoReviewArray.push({
// 				id: rvs.id,
// 				videoLink: rvs.videoReview.videoLink,
// 				customerCompany: rvs.customerCompany,
// 				customerName: rvs.customerName,
// 				stars: rvs.stars,
// 			});
// 		}
// 	}

// 	return {
// 		textReviewArray,
// 		videoReviewArray,
// 	};
// };

// export const getEmbadedWall = async ({ formId }: { formId: number }) => {
// 	try {
// 		const cachedFn = await cachedEmbadedWall({ formId: formId });

// 		const { textReviewArray, videoReviewArray } = cachedFn;

// 		const textReviewArrayWithURL = textReviewArray.map((rev) => ({
// 			...rev,
// 			imageSrc: `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${rev.imageSrc}`,
// 		}));

// 		const videoReviewWithURL = videoReviewArray.map((rev) => ({
// 			...rev,
// 			videoLink: `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${rev.videoLink}`,
// 		}));
// 		return {
// 			success: true,
// 			textReviewArrayWithURL,
// 			videoReviewWithURL,
// 		};
// 	} catch (error) {
// 		console.log(error);

// 		const err = await handlerError(error);
// 		return {
// 			success: false,
// 			message: err.errorMsg,
// 			status: err.statusCode,
// 		};
// 	}
// };

export const fetchEmbadedId = cache(async ({ formId }: { formId: number }) => {
	try {
		const res = await prisma.testimonialForm.findUnique({
			where: {
				id: Number(formId),
			},
			select: {
				embadedId: true,
			},
		});

		return {
			embadedId: res?.embadedId,
			success: true,
		};
	} catch (error) {
		const err = await handlerError(error);

		return {
			success: false,
			message: err.errorMsg,
			status: err.statusCode,
		};
	}
});

const cachedAllReviews = ({
	formId,
	adminId,
}: {
	formId: number;
	adminId: number;
}) =>
	unstable_cache(
		async () => {
			return await prisma.customerReview.findMany({
				where: {
					testimonialFormsId: Number(formId),
					adminId: Number(adminId),
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
				},
			});
		},
		[`review-cached-${formId}-${adminId}`],
		{
			revalidate: 100,
			tags: [`${formId}-review-cached`, `review-cached`],
		},
	);

export const fetchedReviews = async ({
	formId,
	adminId,
}: {
	formId: number;
	adminId: number;
}) => {
	try {
		const res = cachedAllReviews({ formId, adminId });

		const reviews = await res();
		const orderedReviews: OrderedReviewTypes[] = reviews
			.map((r) => {
				if (r.textReview) {
					return {
						id: r.id,
						type: "text",
						data: {
							textreviewid: r.id,
							customerName: r.customerName,
							customerCompany: r.customerCompany,
							textReview: r.textReview.textReview,
							imageSrc: `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${r.customerImageUrl}`,
							stars: r.stars,
						},
					} satisfies OrderedReviewTypes;
				}
				if (r.videoReview) {
					return {
						id: r.id,
						type: "video",
						data: {
							videoReviewid: r.id,
							videoLink: `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${r.videoReview.videoLink}`,
							customerCompany: r.customerCompany,
							customerName: r.customerName,
							stars: r.stars,
						},
					} satisfies OrderedReviewTypes;
				}
				return undefined;
			})
			.filter(Boolean) as OrderedReviewTypes[];

		return {
			orderedReviews,
		};
	} catch (error) {
		const err = await handlerError(error);

		return {
			success: false,
			message: err.errorMsg,
			status: err.statusCode,
		};
	}
};

export const getEmbadedReviewsId = async ({ formId }: { formId: number }) => {
	try {
		const res = await prisma.testimonialForm.findUnique({
			where: {
				id: Number(formId),
			},
			select: {
				ReviewStyle: {
					omit: {
						testimonialFormId: true,
					},
				},
			},
		});

		// console.log(reviewIds?.selectedReviews, "review");

		return {
			message:
				"You have generated one emanded Review You can added more to it",
			ids: res?.ReviewStyle?.selectedReviews,
			style: res?.ReviewStyle,
		};
	} catch (error) {
		const err = await handlerError(error);
		return {
			success: false,
			message: err.errorMsg,
			status: err.statusCode,
		};
	}
};

export const deleteSpace = async ({ spaceId }: { spaceId: number }) => {
	try {
		const { id } = await getUserSession();

		await prisma.spaces.delete({
			where: {
				user_ID_space_ID: {
					id: spaceId,
					userId: Number(id),
				},
			},
		});

		revalidateTag(`user-spaces-${id}`);
		revalidateTag(`spaces`);
		return {
			success: true,
			message: "space deleted successfully",
		};
	} catch (error) {
		console.log(error);

		const err = await handlerError(error);
		return {
			success: false,
			status: err.statusCode,
			message: err.errorMsg,
		};
	}
};

export const deleteForm = async ({ formId }: { formId: number }) => {
	try {
		const { id } = await getUserSession();

		const res = await prisma.testimonialForm.delete({
			where: {
				formId_admin_id: {
					adminId: Number(id),
					id: formId,
				},
			},
			select: {
				spaceId: true,
			},
		});

		revalidateTag(`all_testimonials-${id}`);
		revalidateTag(`testimonials`);
		revalidateTag(`user-inidividual-space-testimoials-${res.spaceId}`);
		return {
			success: true,
			message: "form deleted successfully",
		};
	} catch (error) {
		console.log(error);

		const err = await handlerError(error);
		return {
			success: false,
			messsage: err.errorMsg,
			status: err.statusCode,
		};
	}
};

export const getFirstThreeSpaces = async ({ userId }: { userId: number }) => {
	try {
		const recentSpaces = await prisma.spaces.findMany({
			where: {
				userId: userId,
			},
			select: {
				spaceName: true,
				url: true,
				id: true,
				createdAt: true,
				_count: {
					select: {
						testimonialForms: true,
					},
				},
			},
			take: 3,
			orderBy: {
				createdAt: "asc",
			},
		});

		return {
			status: true,
			recentSpaces,
		};
	} catch (error) {
		const err = await handlerError(error);
		return {
			success: false,
			status: err.statusCode,
			message: err.errorMsg,
		};
	}
};
