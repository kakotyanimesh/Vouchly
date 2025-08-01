import { handlerError } from "@/utils/lib/errorhandler";
import {
	AWS_Folder_Name,
	CreateFormTypes,
	CreateSpaceTypes,
	ReviewTypes,
	SignupTypes,
	UpdateFormType,
} from "@/utils/types/user_types";
import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_NEXT_URL}`;

export const createUser = async (data: SignupTypes) => {
	try {
		const res = await fetch("/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw res;
		}

		const result = await res.json();

		return {
			success: true,
			message: result.msg,
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

export const createSpace = async (data: CreateSpaceTypes) => {
	try {
		const res = await fetch("/api/space", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw res;
		}

		const resMsg = await res.json();

		return {
			success: true,
			message: resMsg.message,
			id : resMsg.spaceId,
			spaceName : resMsg.spaceName
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

export const createForms = async (data: CreateFormTypes) => {
	try {
		const res = await fetch(`/api/space/${data.spaceId}/forms`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw res;
		}

		const { msg, formId } = await res.json();

		return {
			success: true,
			formId: formId,
			message: msg,
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

/**
 * work flow
 * example : UPLOAD lOGO
 * FILE and folder name  3 logo folder, video folder and image folder
 * here folder name is logo folder
 * make an api req to upload to s3 which returns presigned url and the key which we are going to store in db
 * then make another put req to that s3 with the file as body then its upload to s3 haha
 * we have to call this inside api req to create form or submit form
 */

export const uploadToS3 = async (file: File, folderName: AWS_Folder_Name) => {
	try {
		const presignedUrl = await axios.post("/api/unprotected/uploadtos3", {
			fileName: file.name,
			fileType: file.type,
			folderName,
		});

		const { generatedUrl, uniqueKey } = presignedUrl.data;

		if (!generatedUrl || !uniqueKey) {
			throw new Error("No presigned url or uniqueKey");
		}

		const uploadingToS3 = await axios.put(generatedUrl, file, {
			headers: {
				"Content-Type": file.type,
			},
		});

		if (uploadingToS3.status !== 200) {
			throw new Error("Error while uploding to s3 status code");
		}

		return { uniqueKey };
	} catch (error) {
		const err = await handlerError(error);
		return {
			success: false,
			message: err.errorMsg,
			status: err.statusCode,
		};
	}
};

export const submitTestimonials = async (data: ReviewTypes) => {
	try {
		const res = await fetch(`/api/unprotected/submittestimonial`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(data),
			// we are sending two extra data here but thats okay for now
		});

		if (!res.ok) {
			throw res;
		}

		const datares = (await res.json()).message;

		return {
			success: true,
			message: datares,
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

// export const createScript = async({widgetId, formId} : {widgetId : string, formId : number}) => {
//     try {
//         const res = await fetch("/api/embaded", {
//             method : "POST",
//             headers : {
//                 "Content-type" : "application/json"
//             },
//             body : JSON.stringify({widgetId : widgetId, formId : Number(formId)})
//         })

//         if(!res.ok){
//             throw new Error("Unable to create Script ")
//         }

//         const { script } = await res.json()

//         return {
//             success : true,
//             script
//         }
//     } catch (error) {
//         const err = await handlerError(error)

//         return {
//             success : false,
//             message : err.errorMsg,
//             status : err.statusCode
//         }
//     }
// }
// not being used haha give me lots of pain

export const getReviews = async ({ embadedId }: { embadedId: string }) => {
	try {
		const res = await fetch(
			`${url}api/unprotected/embadeddisplay/${embadedId}`,
		);
		// console.log(res);

		if (!res.ok) {
			const errdata = await res.json();
			throw new Error(errdata.msg || "No data found Invalid data");
		}
		const data = await res.json();

		return {
			success: true,
			emdadeddata: data.emabdedData,
			reviews: data.reviews,
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

/**
 * now get requests for checking users limit , which for creating spaces , creeating testimonials im doing at the backend first but now as it have to upload images to s3 or videos so i have to check in my first
 * the  problem is here is that we can do all this steps inside "use server also but use server only returns 200 status code which is not that good"
 *
 */

export const checkTestimonialFormUsages = async () => {
	try {
		const res = await fetch(`${url}api/limitcheck/can-upload-formlogo`);

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.msg || "Something went wrong");
		}

		return {
			success: true,
			message: data.msg,
			status: 201,
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

export const checkReviewUsages = async ({
	adminId,
	reviewType,
}: {
	adminId: number;
	reviewType: "video" | "text";
}) => {
	try {
		const res = await fetch(
			`${url}api/limitcheck/can-upload-review?adminId=${adminId}&reviewType=${reviewType}`,
		);

		const data = await res.json();
		if (!res.ok) {
			throw new Error(
				data.msg || "Something went wrong Please stay with us",
			);
		}

		return {
			success: true,
			message: data.msg,
			status: 201,
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

export const updateForm = async (data: UpdateFormType) => {
	try {
		const res = await fetch(`api/space/${data.spaceId}/forms`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw res;
		}

		const { msg, status } = await res.json();
		return {
			succes : true,
			message : msg,
			status : status
		}
	} catch (error) {
		const err = await handlerError(error);
		return {
			success: false,
			message: err.errorMsg,
			status: err.statusCode,
		};
	}
};
