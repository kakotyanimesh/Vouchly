import { widgetIdObject } from "@/utils/config/user.config";
import prisma from "@/utils/lib/prisma";
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
        const baseUrl = process.env.NEXT_PUBLIC_NEXT_URL
        const cdnUrl = process.env.CLOUD_FRONT_DOMAIN_NAME

        const parentBgColor = await prisma.reviewStyle.findFirst({
            where : {
                testimonialFormId : parsedObject.data.formId
            },select : {
                parentPageBgColor : true
            }
        })

        
        const script = `
            (function () {
                const scpt = document.currentScript

                function setIframeBg(iframe) {
                        iframe.style.backgroundColor = "${parentBgColor?.parentPageBgColor}" || "transparent"
                        iframe.style.background = "${parentBgColor?.parentPageBgColor}" || "transparent"
                        iframe.allowTransparency = "true"
                }

                function createIframe() {
                    const iframe = document.createElement("iframe")
                    iframe.id = "${widgetId}"
                    iframe.src = "${baseUrl}embadedwall/${widgetId}"
                    iframe.width = "100%"
                    iframe.style.border = "none"
                    setIframeBg(iframe)
                    iframe.setAttribute("frameborder", "0")
                    
                    

                    iframe.style.filter = "none"
                    iframe.style.opacity = 1 
                    iframe.style.overflow = "visible"
                    iframe.style.padding = "0px"
                    iframe.style.margin = "0px"
                    iframe.style.display = "block"
                    scpt.parentNode.insertBefore(iframe, scpt)


                    iframe.onload = function (){
                        setIframeBg(iframe)
                        /**
                         * this code is for try to add transparancy additionally the main bug i got is that background color from my website
                         */
                        try {
                            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
                            if(iframeDoc){
                                iframeDoc.documentElement.style.backgroundColor = "${parentBgColor?.parentPageBgColor}"
                                iframeDoc.body.style.backgroundColor = "${parentBgColor?.parentPageBgColor}"
                                iframeDoc.documentElement.style.background = "${parentBgColor?.parentPageBgColor}"
                                iframeDoc.body.style.background = "${parentBgColor?.parentPageBgColor}"
                            }
                        } catch (error) {
                            console.log("Cross-origin iframe & unable to set bg color");

                        }
                        if(window.iframeResize){
                            iframeResize({
                                log : false,
                                checkOrigin : false,
                                autoResize : true,
                                heightCalculationMethod: 'taggedElement',
                                tolerance: 20,
                                interval: 100,
                                onInit : () => {
                                    setIframeBg(iframe)
                                },
                                onResize : () => {
                                    setIframeBg(iframe)
                                }
                            }, iframe)
                        }
                    }
                    setIframeBg(iframe)
                }

                if(!window.iFrameResize){
                    const script = document.createElement('script')
                    script.src = "${cdnUrl}/js/iframe-resizer.parent.js"
                    script.onload = createIframe
                    script.onerror = function (){
                        console.log("Failed to load script contact the animeshkakoty33@gmail.com");
                        createIframe()
                    }
                    document.head.appendChild(script)
                } else {
                    createIframe()
                }
            })()            
        `


        return NextResponse.json(
            {   
                msg : "script created",
                script
            },
            {status : 200}
        )

        

    } catch (error) {
        console.log(error);
        
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


