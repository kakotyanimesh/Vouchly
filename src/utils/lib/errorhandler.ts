import axios from "axios";

interface ErrroInterface {
    errorMsg : string,
    statusCode ?: number,
}

export const handlerError = async (error : unknown) : Promise<ErrroInterface> => {
    
    if(error instanceof TypeError && error.message.includes("fetch")){
        return {
            errorMsg : 'Network error ! check your internet connection',
            statusCode : 0
        }
    }

    if(axios.isAxiosError(error)){
        return {
            errorMsg : error.message,
            statusCode : error.status
        }
    }
    
    if(error instanceof Error){
        return {
            errorMsg : error.message,
            statusCode : 403
        }
    }
    if(error instanceof Response){
        const msg = (await error.json()).msg;
        return handlerStatuscode(error.status, msg); 
    }

    // if (error instanceof PrismaClientValidationError) {
	// 	if (error.code === "P2025") {
	// 		return {
	// 			errorMsg:
	// 				"Invalid data provided or You are not authorized to do this",
	// 			statusCode: 404,
	// 		};
	// 	}
	// }
    // if(error instanceof PrismaClientKnownRequestError && error.code === "P2002"){
    //     return {
    //         errorMsg : "Its already in the database",
    //         statusCode :409,
    //     }
    // }

    return {
        errorMsg : "An unexpected error occured",
        statusCode : 500
    }
}

interface ErrorType {
    errorMsg : string,
    statusCode : number
}

const handlerStatuscode = (status : number, message : string) : ErrorType=> {
    switch (status) {
        case 409:
            if(message.includes("User already exists")){
                return {
                    errorMsg : "User with this email id alreay exits",
                    statusCode : 409
                }
            }
            return {
                errorMsg : "status code 409 idk",
                statusCode : 409
            }
    
        case 500:
            if(message.includes("Error @ user. create")) {
                return {
                    errorMsg : "Failed to create an account try again later",
                    statusCode : 500
                }
            }
            if(message === "Db connection error"){
                return {
                    errorMsg :  "Plese try again later db is down",
                    statusCode : 500
                }
            }
            return {
                errorMsg : "Sever down !! try again later",
                statusCode : 500
            }
        // case 400:
        //     if(message.includes("Zod Error")){
        //         return {
        //             errorMsg : "Invalid Input Fields"
        //         }
        //     }
        case 409:
            if(message.includes("exceed")){
                return {
                    errorMsg : message,
                    statusCode : 403
                }
            }
            return {
                errorMsg : "Something went wrong",
                statusCode : 403
            }
        default:
            return {
                errorMsg: message || `Request failed with status ${status}`,
                statusCode: status
            };
    }
}