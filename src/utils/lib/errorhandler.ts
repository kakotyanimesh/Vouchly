interface ErrroInterface {
    errorMsg : string,
    statusCode ?: number,
}

export const handlerError = async (error : unknown) : Promise<ErrroInterface> => {
    console.log(error);
    
    if(error instanceof TypeError && error.message.includes("fetch")){
        return {
            errorMsg : 'Network error ! check your internet connection',
            statusCode : 0
        }
    }

    if(error instanceof Response){
        const msg = (await error.json()).msg;
        return handlerStatuscode(error.status, msg); 
    }

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
        default:
            return {
                errorMsg: message || `Request failed with status ${status}`,
                statusCode: status
            };
    }
}