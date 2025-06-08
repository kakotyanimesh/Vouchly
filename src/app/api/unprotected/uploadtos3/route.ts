import { S3Config } from "@/utils/config/s3.config";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod/v4";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(req:NextRequest) {
    try {
        const parsedObject = S3Config.safeParse(await req.json())

        if(!parsedObject.success){
            throw parsedObject.error
        }

        const { fileName, fileType } = parsedObject.data

        const binaryName = fileName.split(".").pop() ?? fileType.split("/").pop() ?? "bin"

        const individualKey = `${fileName}/${randomUUID()}.${binaryName}`

        const generatedS3Client = new S3Client({
            region : process.env.AWS_REGION,
            credentials : {
                accessKeyId : process.env.AWS_ACCESS_KEY!,
                secretAccessKey : process.env.AWS_SECRET_KEY!
            }
        })

        const presignedCommnad = new PutObjectCommand({
            Bucket : process.env.AWS_BUCKET_NAME,
            Key : individualKey,
            ContentType : fileType
        })

        const preSignedURL = await getSignedUrl(generatedS3Client, presignedCommnad, {expiresIn : Number(process.env.Presigned_Url_expire)})

        return NextResponse.json({
            uploadURL : preSignedURL,
            key : individualKey
        })
    } catch (error) {
        if(error instanceof ZodError){
            return NextResponse.json(
                {msg : "Invalid Files type uploads"},
                {status : 409}
            )
        }

        return NextResponse.json(
            {msg : "Something went wrong at the server level"},
            {status : 500}
        )
    }
}