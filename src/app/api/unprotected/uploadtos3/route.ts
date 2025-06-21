import { S3Config } from "@/utils/config/s3.config";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod/v4";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export async function POST(req:NextRequest) {
    try {
        
        const parsedData = S3Config.safeParse(await req.json())

        if(!parsedData.success){
            throw parsedData.error
        }


        const { fileName, fileType, folderName } = parsedData.data

        const binaryName = fileName.split(".").pop() ?? fileType.split("/").pop() ?? "bin"

        const uniqueKey = `${folderName}/${randomUUID()}.${binaryName}`

        const generatedS3Client = new S3Client({
            region : process.env.AWS_REGION!,
            credentials : {
                accessKeyId : process.env.AWS_IM_USER_ACCESS_KEY!,
                secretAccessKey : process.env.AWS_IM_USER_SECRET_KEY!
            }
        })

        const commnad = new PutObjectCommand({
            Bucket : process.env.AWS_S3_BUCKETNAME!,
            Key : uniqueKey,
            ContentType : fileType
        })

        const generatedUrl = await getSignedUrl(generatedS3Client, commnad, {expiresIn : Number(process.env.PRE_SIGNED_URL_EXPIRE) || 9000})

        return NextResponse.json({
            generatedUrl,
            uniqueKey
        })
    } catch (error) {
        // console.log(error);
        
        if(error instanceof ZodError){
            return NextResponse.json(
                {msg : "Invalid file Type Uploaded"},
                {status : 409}
            )
        }
        return NextResponse.json(
            {msg : "Something went wrong at File Upload"},
            {status : 500}
        )
    }
}