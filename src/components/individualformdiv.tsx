"use client"
import { Check, Copy, Eye, Link } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { InputBox } from "./ui/input"
import { TextArea } from "./ui/textbox"
import { useEffect, useState } from "react"
import { LinkTag } from "./ui/Link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export interface IndividualFormDivProps {
    Name : string,
    Description : string,
    questions : string[],
    submission : number,
    createdAt : string,
    token : string,
    formId : number
}

export const IndividualFormDiv = (data : IndividualFormDivProps) => {

    const router = useRouter()
    const [copied, setCopied] = useState(false)
    

    useEffect(() => {
        const id = setTimeout(() => {
            setCopied(false)
        }, 2000)
    
      return () => {
        clearTimeout(id)
      }
    }, [copied])
    
    
    return (
        <div className="space-y-5">
            <section className="flex md:flex-row flex-col items-center justify-between">
                <div>
                    <h1 className="font-semibold text-2xl">{data.Name}</h1> 
                    <p className="text-[hsl(var(--secondary-foreground))] text-sm">{data.Description}</p>
                </div>
                <div className="flex flex-row gap-4 items-center">
                    <LinkTag 
                        href={`${process.env.NEXT_PUBLIC_NEXT_URL}/submit/${data.token}`}
                        target="_blank"
                        className="flex flex-row items-center gap-2 bg-[hsl(var(--pure-white))] w-fit rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 md:px-5 px-3 py-2 font-semibold text-sm text-black">
                        <Eye className="" size={14}/>
                        view Public Form
                    </LinkTag>
                    <Button 
                        onClick={() => {
                            navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_NEXT_URL}/submit/${data.token}`)
                            toast.info("URL copied")
                        }}
                        variant={"secondary"} 
                        className="flex flex-row items-center gap-2">
                        <Link size={14}/> Share
                    </Button>
                </div>
            </section>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-7">
                <Card className="md:col-span-2 col-span-1 py-7 px-5  space-y-5 border-[hsl(var(--primary))]/20">
                    <h1 className="text-md font-semibold">Update Your Testimonia Form here </h1>
                    <form className="space-y-5">
                        <InputBox 
                            placeholder={data.Name} 
                            name="New Title"/>
                        <TextArea
                            name="New Description" 
                            placeholder={data.Description}/>
                        
                        <h1 className="text-sm text-[hsl(var(--secondary-foreground))]">Advanced fileds will be added soon </h1>
                        <Button 
                            type="button" 
                            variant={"secondary"} 
                            onClick={() => toast.message("Hold up ⚙️", {description : "This update feature is cooking... check back soon!"})}>
                            Update
                        </Button>
                    </form>
                </Card>
                <div className="space-y-4 col-span-1">
                    <Card className=" py-7 px-5  h-fit space-y-5 border-[hsl(var(--primary))]/20">
                        <section>
                            <h1 className="font-semibold text-2xl">Submissions</h1>
                            <p className="text-[hsl(var(--secondary-foreground))]/70 text-sm">View and manage responses to this form</p>
                        </section>
                        <section>
                            <h1 className="text-4xl font-bold">{data.submission}</h1>
                            <p className="text-[hsl(var(--secondary-foreground))]/70 text-sm">Total submissions</p>
                        </section>
                        <Button 
                        onClick={() => router.push(`/forms/${data.formId}/embaded`)}
                        className="w-full" variant={"secondary"}>View all Submissions</Button>
                    </Card>


                    <Card className="py-7 px-5  h-fit space-y-5 border-[hsl(var(--primary))]/20">
                        <section>
                            <h1 className="font-semibold text-2xl">Sharing & Details</h1>
                            <p className="text-[hsl(var(--secondary-foreground))]/70 text-sm">Share your form and view its identifiers.</p>
                        </section>
                        <section className="flex flex-row gap-2 justify-between">
                            <h1 className="rounded-md border-2 border-[hsl(var(--primary))]/40 p-2 text-[hsl(var(--secondary-foreground))] overflow-x-auto whitespace-nowrap scrollbar-hide">{process.env.NEXT_PUBLIC_NEXT_URL}/submit/{data.token}</h1>
                            <Button variant={"transparent"} sizes={"sm"} onClick={() => {
                                navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_NEXT_URL}/submit/${data.token}`)
                                setCopied(true)
                                toast.info("URL copied")
                            }}>
                                {!copied ? <Copy size={19}/> : <Check size={19}/>}
                            </Button>
                        </section>
                        <p>Created At : {data.createdAt}</p>
                    </Card>
                </div>
            </div>
        </div>
    )
}