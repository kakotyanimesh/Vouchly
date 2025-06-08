import { handlerError } from "@/utils/lib/errorhandler"
import { AWS_Folder_Name, CreateFormTypes, CreateSpaceTypes, SignupTypes } from "@/utils/types/user_types"

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

/**
 * work flow 
 * example : UPLOAD lOGO 
 * FILE and folder name  3 logo folder, video folder and image folder 
 * here folder name is logo folder 
 * make an api req to upload to s3 which returns presigned url and the key which we are going to store in db 
 * then make another put req to that s3 with the file as body then its upload to s3 haha 
 * we have to call this inside api req to create form or submit form 
 */


export const uploadFileToS3 = async (file: File, folderName : AWS_Folder_Name) => {
    try {
        const presignedURL = await fetch("/api/unprotected/uploadtos3", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                fileName : file.name,
                fileType : file.type,
                folderName
            })
        })

        const { uploadURL, key: fileURL } = await presignedURL.json()

        if(!uploadURL || !fileURL){
            throw new Error("No upload URL or FileURL got")
        }

        const uploadtos3 = await fetch(uploadURL, {
            method : "PUT",
            body : file
        })

        if(uploadtos3.status !== 200 ){
            throw new Error("Filed to upload to s3 ")
        }
        return fileURL
    } catch (error) {
        const err = await handlerError(error)

        return {
            success : false,
            message : err.errorMsg,
            status : err.statusCode
        }
    }
}