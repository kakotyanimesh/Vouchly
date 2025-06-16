import { useFileStore, useFormStore } from "@/utils/zustand/testimonialsformstore"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { FileUploda } from "./ui/fileUpload"
import { InputBox } from "./ui/input"
import { TextArea } from "./ui/textbox"
import { Plus } from "lucide-react"
import { useTransition } from "react"
import { CreateFormTypes } from "@/utils/types/user_types"
import { useParseSpacedata } from "@/hooks/useSpacehook"
import { createForms, uploadToS3 } from "@/app/action/client_action/user"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const  FormDiv = () => {
    const { sId } = useParseSpacedata()
    const router = useRouter()
    const { resetFile, imagefile } = useFileStore()
    const { questions,Name, Description, setName, setDescription, upadatedQuestions, addQuestionsArrray, reset } = useFormStore()


    const [isPending, startTransition] = useTransition()
    const createForm = (e : React.FormEvent) => {
        e.preventDefault()
        if(!imagefile){
            toast.error("Logo file is Empty")
            return
        }
        startTransition(async() => {
            const loadingToast = toast.loading("creating testimonia Form" , {
                position : "bottom-right"
            })

            try {
                const uploadResult = await uploadToS3(imagefile, "form_logos") 

                if (!uploadResult || !uploadResult.uniqueKey) {
                    toast.error(uploadResult?.message || "Logo upload failed: Unique key not returned.", {
                        id : loadingToast
                    });
                    return;
                }

                const brandLogoKey = uploadResult.uniqueKey; 

                const formData : CreateFormTypes = {
                    Name,
                    Description,
                    brandLogo : brandLogoKey,
                    spaceId : Number(sId),
                    questions
                }

                const res = await createForms(formData)

                if(!res.success){
                    throw new Error(res.message || "Error Please try again later ....")
                }

                toast.success("Testimonia created successfully", {
                    id : loadingToast,
                    // position :
                })

                reset()
                resetFile()
                router.push("/space")
            } catch (error) {
                const errmsg = error instanceof Error ? error.message : "Something went wrong"
                toast.error(errmsg, {
                    id : loadingToast
                })
            }
            
        })
    }
    return ( 
        <Card className="h-fit p-5 space-y-5 w-full border-[hsl(var(--primary))]/20">
                    <div>
                        <h1 className="text-2xl font-bold">Form Preview </h1>
                        <p className="text-sm">After the Space is created, it will generate a dedicated page for collecting testimonials.</p>
                    </div>
                    <form onSubmit={createForm} className=" rounded-2xl space-y-5">
                        <InputBox 
                        disabled={isPending}
                        onChange={(e) => setName(e.target.value) }
                        name="Name" 
                        value={Name}
                        placeholder="Your Form Title here..."/>

                        <TextArea 
                        disabled={isPending}
                        onChange={(e) => setDescription(e.target.value) }
                        name="Description" 
                        value={Description}
                        placeholder="A little description about your website"/>

                        {
                            questions.map((q, k) => (
                                <InputBox
                                disabled={isPending}
                                value={q}
                                onChange={(e) => upadatedQuestions(k, e.target.value)}
                                name={`Question No ${k + 1} `} key={k} placeholder={`Write a question for your users`}/>
                            ))
                        }
                        <Button
                        disabled={isPending} 
                        type="button" 
                        variant={"transparent"} 
                        className="w-full justify-center flex" 
                        onClick={() => addQuestionsArrray()}><Plus/></Button>

                        <FileUploda fileType="Logo"/>

                        <Button disabled={isPending}>Save Form</Button>
                    </form>
                </Card>
    )
}