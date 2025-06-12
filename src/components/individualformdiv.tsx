"use client"
import { Check, Copy, Eye, Link } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { InputBox } from "./ui/input"
import { TextArea } from "./ui/textbox"
import { useState } from "react"
import { LinkTag } from "./ui/Link"
import { toast } from "sonner"

export interface IndividualFormDivProps {
    Name : string,
    Description : string,
    questions : string[],
    submission : number,
    createdAt : string,
    token : string
}

export const IndividualFormDiv = (data : IndividualFormDivProps) => {

    const [copied, setCopied] = useState(false)
    
    
    return (
        <div className="space-y-5">
            <section className="flex flex-row items-center justify-between">
                <div>
                    <h1 className="font-semibold text-2xl">{data.Name}</h1> 
                    <p className="text-[hsl(var(--slate-text))]">{data.Description}.</p>
                </div>
                <div className="flex flex-row gap-4 items-center">
                    <LinkTag 
                        href={`${process.env.NEXT_PUBLIC_NEXT_URL}/${data.token}`}
                        target="_blank"
                        className="flex flex-row items-center gap-2 bg-white w-fit rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 md:px-5 px-3 py-2 font-semibold text-sm text-black">
                        <Eye className="" size={14}/>
                        view Public Form
                    </LinkTag>
                    <Button 
                        onClick={() => {
                            navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_NEXT_URL}/${data.token}`)
                            toast.info("URL copied", {
                                position : "top-left",
                                
                            })
                        }}
                        variant={"secondary"} 
                        className="flex flex-row items-center gap-2">
                        <Link size={14}/> Share
                    </Button>
                </div>
            </section>
            <div className="grid grid-cols-3 gap-7">
                <Card className="col-span-2 py-7 px-5 bg-white/7 space-y-5">
                    <h1>Update Your Testimonia Form here </h1>
                    <form className="space-y-5">
                        <InputBox 
                            placeholder={data.Name} 
                            name="New Title"/>
                        <TextArea
                            name="New Description" 
                            placeholder={data.Description}/>
                        
                        <h1 className="text-sm text-[hsl(var(--slate-text))]">Advanced fileds will be added soon </h1>
                        <Button>Update</Button>
                    </form>
                </Card>
                <div className="space-y-4">
                    <Card className="col-span-1 py-7 px-5 bg-white/7 h-fit space-y-5">
                        <section>
                            <h1 className="font-semibold text-2xl">Submissions</h1>
                            <p className="text-[hsl(var(--slate-text))] text-sm">View and manage responses to this form</p>
                        </section>
                        <section>
                            <h1 className="text-4xl font-bold">{data.submission}</h1>
                            <p className="text-[hsl(var(--slate-text))] text-sm">Total submissions</p>
                        </section>
                        <Button className="w-full" variant={"secondary"}>View all Submissions</Button>
                    </Card>


                    <Card className="col-span-1 py-7 px-5 bg-white/7 h-fit space-y-5">
                        <section>
                            <h1 className="font-semibold text-2xl">Sharing & Details</h1>
                            <p className="text-[hsl(var(--slate-text))] text-sm">Share your form and view its identifiers.</p>
                        </section>
                        <section className="flex flex-row gap-2 justify-between">
                            <h1 className="rounded-md border border-white/20 p-2 text-[hsl(var(--primary))] overflow-x-auto whitespace-nowrap scrollbar-hide">{process.env.NEXT_PUBLIC_NEXT_URL}{data.token}</h1>
                            <Button variant={"transparent"} sizes={"sm"} onClick={() => {
                                navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_NEXT_URL}${data.token}`)
                                setCopied(true)
                                toast.info("URL copied", {
                                    position : "top-left",
                                })
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