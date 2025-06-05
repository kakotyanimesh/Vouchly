import { handlerError } from "@/utils/lib/errorhandler"
import { CreateFormTypes, CreateSpaceTypes, SignupTypes } from "@/utils/types/user_types"

export const createUser = async (data : SignupTypes) => {
    try {   
        const res = await fetch("/api/auth/signup", {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(data)
        })

        if(!res.ok){
            throw res
        }

        const result = await res.json()

        return {
            success : true,
            message : result.msg
        }
    } catch (error) {
        const err = await handlerError(error)

        return {
            success : false,
            message : err.errorMsg,
            status : err.statusCode
        }
    }
}


export const createSpace = async(data : CreateSpaceTypes) => {
    try {
        const res = await fetch("/api/space", {
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        if(!res.ok){
            throw res
        }

        const resMsg = await res.json()

        return {
            success : true,
            message : resMsg.message
        }
    } catch (error) {
        const err = await handlerError(error)

        return {
            success : false,
            message : err.errorMsg,
            status : err.statusCode
        }
    }
}


export const createForms = async(data : CreateFormTypes) => {
    try {
        const res = await fetch(`/api/space/${data.spaceId}/forms`, {
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        if(!res.ok){
            throw res
        }

        const msg = (await res.json()).message

        
        return {
            success : true,
            message : msg
        }
    } catch (error) {
        const err = await handlerError(error)

        return {
            success : false,
            message : err.errorMsg,
            status : err.statusCode
        }
    }
}