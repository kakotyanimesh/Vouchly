"use client"
import Image from "next/image"
import { Card } from "./ui/card"
import { InputBox } from "./ui/input"
import { Button } from "./ui/button"
import { VerticalTabSwitcher } from "./ui/verticaltabswitcher"
import { InputBoxesTypesStore, useTestimonialSubmissionStore } from "@/utils/zustand/submittestimonialstate"
import { FileUploda } from "./ui/fileUpload"
import { TextArea } from "./ui/textbox"
import { IndividualFormDivProps } from "./individualformdiv"
import { Star } from "lucide-react"
import { cn } from "@/utils/lib/cn"
import { useState, useTransition } from "react"
import { submitTestimonials, uploadToS3 } from "@/app/action/client_action/user"
import { useFileStore } from "@/utils/zustand/testimonialsformstore"
import { toast } from "sonner"
import { ReviewTypes } from "@/utils/types/user_types"
import { SubmissionThankyoudiv } from "./ui/thankyoudiv"
import { useRouter } from "next/navigation"
import LoadingCircleSpinner from "./ui/loadingspinner"
import { reviewObject } from "@/utils/config/review.config"

export const SubmitFormComponent = (data : Omit<IndividualFormDivProps, "script" | "createdAt" | "submission" | "token"> & {spaceId : number, adminId : number, formId : number}) => {
    const { storeNumber } = InputBoxesTypesStore()
    const [isSubmitted, setisSubmitted] = useState<boolean>(false)
    const router = useRouter()
    
    
    
    const {imagefile, videofile, resetFile} = useFileStore()

    const {
            stars, setStars, 
            customerName, setCustomerName,
            customerEmail, setCustomerEmail,
            textReview,
            jobTitle, setJobTitle,
            customerCompany, setCustomerCompany,
            resetData
        } = useTestimonialSubmissionStore()
    
    const [isPending, startTransition] = useTransition()

    const handleSubmit = (e : React.FormEvent,) => {
        e.preventDefault()
        if(!imagefile){
            toast.error("Hey! Don`t forget to add a profile picture 📸")
            return
        }
        if(storeNumber === 1 && !videofile){
            toast.error("Oops, your video`s missing 🎬 Wanna try uploading again?")
            return
        }
        startTransition(async() => {
            const toastId = toast.loading("Submitting your review… ⏳", {
                position : "top-right"
            })

            try {
                
                const testimonialObject : ReviewTypes = {
                    customerEmail,
                    stars,
                    customerCompany,
                    customerName,
                    customerImageUrl : "emapty for now will be uploaded after  s3",
                    spaceId : data.spaceId,
                    formId : data.formId,
                    adminId : data.adminId,
                    jobTitle,
                    textReview: storeNumber === 0 ? textReview : undefined, 
                    videoLink: storeNumber === 1 ? "placeholder" : undefined
                }

                const parsedObject = reviewObject.safeParse(testimonialObject)

                if(!parsedObject.success){
                    const validationError = parsedObject.error.errors.map(e => e.message).join('\n')
                    toast.error(`Validation Failed ${validationError}`,{
                        id : toastId
                    })
                    return
                }

                const validateObject : ReviewTypes = parsedObject.data

                const userPfp = await uploadToS3(imagefile, "user-images") 

                if (!userPfp || !userPfp.uniqueKey) {
                    toast.error("Couldn`t upload your profile pic 😓 Try again?")
                    return
                }

                validateObject.customerImageUrl = userPfp.uniqueKey


                if(storeNumber === 1){
                    // too much of if else
                    if(!videofile) {
                        toast.error("A video is required to submit this type of review 🎥", {
                            id : toastId
                        })
                        return;
                    }
                    const videoLink = await uploadToS3(videofile, "testimonial-videos")

                    // i had error here making two !! thanks to ai 3 hrs saved 
                    if(!videoLink || !videoLink.uniqueKey){
                        toast.error(videoLink?.message || "Ugh, video upload didn`t work 😩 Try again?", {
                            id : toastId
                        });
                        return;
                    }

                    validateObject.videoLink = videoLink.uniqueKey
                } else {
                    validateObject.textReview = textReview
                }
                // havent make the api route to submit testimonials haha -> I made it haha -> zod validation here also

                


                const submitReview = await submitTestimonials(validateObject)


                if(!submitReview.success){
                    throw new Error(submitReview.message)
                }

                toast.success("Review submitted! You`re awesome 🫶✨", {
                    id : toastId
                })


                resetFile()
                resetData()

                setisSubmitted(true)

            } catch (error) {
                const errormsg = error instanceof Error ? error.message : "Something went wrong 😵 Give it another shot?"

                toast.error(errormsg, {
                    id : toastId
                })
                
            }

        })
    }
    return (
        <div className="mb-10">
            {/* <Button variant={"fetch"} className="fixed right-10 bottom-10 bg-gradient-to-r from-teal-400 to-emerald-400 text-left text-sm" onClick={() => router.push(process.env.NEXT_PUBLIC_NEXT_URL as string)}>Built by <br /><Logo className="text-xs"/></Button> */}

            
            {!isSubmitted ?
            <Card className="xl:w-[700px] w-fit md:w-[600px] mx-2 rounded-2xl bg-[hsl(var(--pure-white))]/5 border border-[hsl(var(--primary))]/20 backdrop-blur-3xl md:px-14 px-5 py-5 text-center space-y-4 flex flex-col justify-center items-center ">
            
            {/* <div className="z-0 pointer-events-none absolute left-1/2 top-90 w-80 h-72 bg-gradient-to-r from-teal-400/20 to-emerald-400/15 rounded-full blur-3xl"></div>
            <div className="z-0 pointer-events-none absolute right-1/2 top-60  w-80 h-72 bg-gradient-to-r from-purple-500/20 to-violet-500/15 rounded-full blur-3xl"></div>
             */}
            <Image src={data.logoUrl!}  width={100} height={100} className="rounded-2xl max-h-20 object-cover" alt="form_logo"/>
            <div>
                <h1 className="text-2xl font-bold">{data.Name}</h1>
                <p className="text-sm">{data.Description}</p>
            </div>
            <div className="text-start border-l-4 pl-2 border-[hsl(var(--primary))] space-y-2">
                <h1 className="text-md font-semibold">Questions</h1>
                {data.questions.map((q, k) => (
                    <h1 key={k} className="text-sm">• {q}</h1>
                ))}
           </div>
            <form onSubmit={handleSubmit} className="w-full text-left space-y-5">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                    <InputBox
                        disabled={isPending}
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your name" 
                        name="Name" 
                        type="text"/>

                    <InputBox
                        disabled={isPending}
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="Your Email"
                        name="Email" 
                        type="email"/>
                    <InputBox 
                        disabled={isPending}
                        value={customerCompany}
                        onChange={(e) => setCustomerCompany(e.target.value)}
                        placeholder="Your Company"
                        name="Company" 
                        type="text"/>

                    <InputBox
                        value={jobTitle}
                        disabled={isPending}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Job Title"
                        name="Job Title"
                        type="text"/>

                </div>
                <div aria-disabled={isPending} className="flex flex-row items-center gap-2">
                    {Array.from({length : 5}).map((s, k) => (
                        <button 
                            type="button"
                            disabled={isPending}
                            onClick={() => setStars(k + 1)}
                            className={cn("rounded-md p-2 cursor-pointer border", stars > k ? "bg-[hsl(var(--primary))]/40 border-white/20" : "bg-[hsl(var(--primary))]/10 border-black/20")} 
                            key={k} >
                            <Star size={18} className={cn(stars > k ? "fill-[hsl(var(--primary))]" : "", "text-[hsl(var(--primary))]")}/>
                        </button>
                    ))}
                </div>
                <FileUploda disable={isPending} fileType="UserImage" className=""/>
                <VerticalTabSwitcher tabs={tabS} />
                {storeNumber === 0 && <TextReview isdisable={isPending} />}
                {storeNumber === 1 && <FileUploda disable={isPending} fileType="Video" className="h-32"/>}
                <Button className="w-full" variant={"secondary"}>
                    {!isPending ? "submit" : <LoadingCircleSpinner/>}
                </Button>
            </form>
            <Button 
                variant={"fetch"} 
                className="bg-gradient-to-r from-teal-400 to-emerald-400" 
                onClick={() => router.push(process.env.NEXT_PUBLIC_NEXT_URL as string)}>
                Built With <span className="bg-gradient-to-r from-[hsl(var(--card-bg-one))] to-[hsl(var(--card-bg-two))] text-transparent bg-clip-text">Embriefy</span>
            </Button>
        </Card>
        :
        <SubmissionThankyoudiv thankYoumsg="Review submitted! You`re awesome 🫶✨"/>    
        }
        </div>
    )
}

const tabS = [{title : "Text", key : 0}, {title : "Video", key : 1}]


const TextReview = ({isdisable} : {isdisable : boolean}) => {
    const { textReview, setTextReview} = useTestimonialSubmissionStore()
    return (
        <TextArea 
            disabled={isdisable}
            // onChange={(e) => setDescription(e.target.value) }
            name="Your Review" 
            value={textReview}
            onChange={(e) => setTextReview(e.target.value)}
            // value={Description}
            placeholder="Share Your Experience with our Product/service"/>
    )
}