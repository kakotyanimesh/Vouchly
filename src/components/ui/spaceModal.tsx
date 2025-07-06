
import { Link2, Plus, Rocket, X } from "lucide-react"
import { Button } from "./button"
import { InputBox } from "./input"
import { useSpaceModalStore } from "@/utils/zustand/space_state"
import { AnimatePresence, motion } from "motion/react"
import { useTransition } from "react"
import { createSpace } from "@/app/action/client_action/user"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const SpaceModal = () => {
    const { setOpneModal} = useSpaceModalStore()
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleSpaceSubmit = (formdata : FormData) => {
        startTransition(async() => {
            const toastId = toast.loading("creating space ..")

            try {
                const spaceName = formdata.get("Space") as string
                const url = formdata.get("Url") as string

                const resSpace = await createSpace({spaceName : spaceName.trim(), url : url.trim()})

                if(!resSpace.success){
                    throw new Error(resSpace.message)
                } 
                router.refresh()
                toast.success("Space Created successfully", {
                    id : toastId
                })
                setOpneModal(false)
            } catch (error) {
                const errmsg = error instanceof Error ? error.message : "something went wrong please try again later"
                toast.error(errmsg, {
                    id : toastId
                })
            }
        })
    }
    return (
        <AnimatePresence mode="wait">
            <>
                <motion.div
                initial={{opacity : 0}}
                animate={{opacity : 1}}
                exit={{opacity : 0}}
                className="fixed inset-0 bg-black/40  z-40 h-full"
                >
                {/* <div className="z-0 pointer-events-none absolute top-40 left-1/2 -translate-x-1/2  w-80 h-72 bg-gradient-to-r from-purple-500/20 to-violet-500/15 rounded-full blur-3xl"></div> */}

                </motion.div>
                
                <motion.div
                initial={{opacity : 1, scale : 0.7}}
                animate={{opacity : 1, scale : 1}}
                exit={{opacity : 0, scale : 0.9, y : 10}}
                transition={{type : "spring", stiffness: 300, damping : 30}}
                className="fixed bg-[hsl(var(--pure-white))]/3 border border-[hsl(var(--primary))]/20 backdrop-blur-3xl -translate-x-1/2 -translate-y-1/2 z-50 px-7 py-7 space-y-4 md:w-[450px] w-72 top-1/2 left-1/2 rounded-xl"
                >
                        <div className="text-left">
                            <h1 className="text-3xl font-semibold">Create space</h1>
                            <p className="text-sm text-[hsl(var(--pure-white))]/60">A space helps you organize your forms and submissions.</p>
                        </div>
                        <Button type="button" disabled={isPending} onClick={() => setOpneModal(false)} variant={"transparent"} sizes={"sm"} className="absolute top-4 right-5"><X size={18}/></Button>
                        {/* <Button onClick={() => setOpneModal(false)} variant={"transparent"} sizes={"md"} className="absolute md:right-10 md:top-9 top-2 p-3 text-[hsl(var(--primary))]"><X size={15} strokeWidth={1.6}/></Button> */}
                        <form action={handleSpaceSubmit} className="space-y-2">
                            <InputBox disabled={isPending} variants={"primary"}  name="Space" placeholder="My awesome Space" icon={<Rocket size={15} strokeWidth={1.2}/>}/>
                            <InputBox disabled={isPending} variants={"primary"} name="Url" placeholder="myawesomespace.com" icon={<Link2 size={15} strokeWidth={1.2}/>}/>
                            <Button disabled={isPending} variant={"secondary"} className="flex items-center gap-2 justify-center border-[hsl(var(--primary))] w-full mt-5" sizes={"md"}><Plus size={16}/>Create Space</Button>
                                
                        </form>
                </motion.div>
            </>
        </AnimatePresence>
    )
}