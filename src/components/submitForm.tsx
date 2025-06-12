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
import { useTransition } from "react"
import { submitTestimonials, uploadToS3 } from "@/app/action/client_action/user"
import { useFileStore } from "@/utils/zustand/testimonialsformstore"
import { toast } from "sonner"
import { ReviewTypes } from "@/utils/types/user_types"

export const SubmitFormComponent = (data : Omit<IndividualFormDivProps,  "createdAt" | "submission" | "token"> & {spaceId : number, adminId : number, formId : number}) => {
    const { storeNumber } = InputBoxesTypesStore()
    
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
            toast.error("user profile picture is empty")
            return
        }
        if(storeNumber === 1 && !videofile){
            toast.error("Video file is empty")
            return
        }
        startTransition(async() => {
            const userPfp = await uploadToS3(imagefile, "user-images") 

            if (!userPfp || !userPfp.uniqueKey) {
                toast.error("user pfp upload failed")
                return
            }
            
            const customerImageUrl = userPfp.uniqueKey
            let customerVideoUrl

            if(storeNumber === 1){
                // too much of if else
                if(!videofile) {
                    toast.error("Video file is required");
                    return;
                }
                const videoLink = await uploadToS3(videofile, "testimonial-videos")

                // i had error here making two !! thanks to ai 3 hrs saved 
                if(!videoLink || !videoLink.uniqueKey){
                    toast.error(userPfp?.message || "Video upload failed");
                    return;
                }
                
                customerVideoUrl = videoLink.uniqueKey
            } 
            // havent make the api route to submit testimonials haha 
            const reviewObject : ReviewTypes = {
                customerEmail,
                stars,
                customerCompany,
                customerName,
                customerImageUrl,
                customerVideoUrl,
                textReview,
                spaceId : data.spaceId,
                formId : data.formId,
                adminId : data.adminId,
                jobTitle
            }

            const submitReview = await submitTestimonials(reviewObject)

            if(submitReview.success){
                toast.success("review submitted")
                resetData()
                resetFile()
            } else {
                toast.error("something went wrong ", submitReview.message)
            }

        })
    }
    return (
        <Card className="w-fit mx-2 rounded-2xl bg-white/10 md:px-14 px-5 py-5 text-center space-y-4 flex flex-col justify-center items-center ">
            <Image src={"/images/logo.png"} width={200} height={100} className="rounded-2xl" alt="form_logo"/>
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
                <div className="flex flex-row items-center gap-2">
                    {Array.from({length : 5}).map((s, k) => (
                        <button 
                            type="button"
                            disabled={isPending}
                            onClick={() => setStars(k + 1)}
                            className={cn("rounded-md p-2 cursor-pointer border", stars > k ? "bg-[hsl(var(--primary))]/40 border-white/20" : "bg-[hsl(var(--primary))]/10 border-black/20")} 
                            key={k} >
                            <Star size={18} className={cn(stars > k ? "text-[hsl(var(--primary))] fill-[hsl(var(--primary))]" : "")}/>
                        </button>
                    ))}
                </div>
                <FileUploda fileType="UserImage" className=""/>
                <VerticalTabSwitcher tabs={tabS} />
                {storeNumber === 0 && <TextReview/>}
                {storeNumber === 1 && <FileUploda disable={isPending} fileType="Video" className="h-32"/>}
                <Button className="w-full">submit</Button>
            </form>
            
        </Card>
    )
}

const tabS = [{title : "Text", key : 0}, {title : "Video", key : 1}]


const TextReview = () => {
    const { textReview, setTextReview} = useTestimonialSubmissionStore()
    return (
        <TextArea 
            // disabled={isPending}
            // onChange={(e) => setDescription(e.target.value) }
            name="Your Review" 
            value={textReview}
            onChange={(e) => setTextReview(e.target.value)}
            // value={Description}
            placeholder="Share Your Experience with our Product/service"/>
    )
}