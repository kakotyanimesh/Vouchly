"use client"
import { Check } from "lucide-react"
import { Card } from "./card"
import { Button } from "./button"
import { useRouter } from "next/navigation"
import { Logo } from "./logo"

export const SubmissionThankyoudiv = ({thankYoumsg} : {thankYoumsg : string}) => {
    const router = useRouter()
    
    return (
        <div className="relative">
            <Button variant={"fetch"} className="fixed right-10 bottom-10 bg-gradient-to-r from-teal-400 to-emerald-400" onClick={() => router.push(process.env.NEXT_PUBLIC_NEXT_URL as string)}><Logo className="text-sm"/></Button>

            <Card className="p-10 relative rounded-xl mt-44 flex flex-col items-center justify-center space-y-5 bg-gradient-to-r from-purple-400/20 to-emerald-400/15">
                {/* <div className="z-0 pointer-events-none absolute left-1/2 top-1/2 w-80 h-72 bg-gradient-to-r from-teal-400/20 to-emerald-400/15 rounded-full blur-3xl"></div>
                <div className="z-0 pointer-events-none absolute right-1/2 top-1/2  w-80 h-72 bg-gradient-to-r from-purple-500/20 to-violet-500/15 rounded-full blur-3xl"></div> */}

                <div className="border-teal-400 border-2 bg-gradient-to-r from-teal-400/20 to-emerald-400/15 rounded-full flex items-center justify-center size-16">
                    <Check size={42}/>
                </div>
                <div className="text-center">
                    <h1 className="font-bold text-3xl bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Success !</h1>
                    <h1 className="text-white">{thankYoumsg}</h1>
                </div>
            </Card>

        </div>
    )
}