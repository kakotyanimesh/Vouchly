import { widgetIdObject } from "@/utils/config/user.config";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod/v4";

export async function POST(req:NextRequest) {
    try {
        const parsedObject = widgetIdObject.safeParse(await req.json())

        if(!parsedObject.success){
            throw parsedObject.error
        }

        const widgetId = parsedObject.data.widgetId

        // const script = `
        //     (function () {
        //         var s = document. 
        //     }

        //     )()
        // `

        const script = `
            (function () {
            const s = document.currentScript
            const iframe = document.createElement("iframe")
            iframe.id = "wiget_id_${widgetId}"
            iframe.src ="${process.env.NEXT_PUBLIC_NEXT_URL}embadedwall/${widgetId}"
            iframe.width = "100%"
            iframe.style.border = "none"
            iframe.setAttribute("scrolling", "no")
            s.parentNode.insertBefore(iframe, s)
        })()`

        return NextResponse.json(
            {   
                msg : "script created",
                script
            },
            {status : 200}
        )

        

    } catch (error) {
        if(error instanceof ZodError){
            return NextResponse.json(
                {msg : "Invalid Inputs"},
                {status : 409}
            )
        }
        return NextResponse.json(
            {msg : "Something went wrong Please Try again later"},
            {status : 500}
        )
    }
}