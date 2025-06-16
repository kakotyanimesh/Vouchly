
import { Link2, Plus, Rocket } from "lucide-react"
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
                    throw new Error("failed to create space !! Try again later")
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
                className="fixed inset-0 bg-black/70 z-40 h-full"
                />
                <motion.div
                initial={{opacity : 1, scale : 0.5}}
                animate={{opacity : 1, scale : 1}}
                exit={{opacity : 0, scale : 0.9, y : 10}}
                transition={{type : "spring", stiffness: 300, damping : 30}}
                className="fixed bg-[hsl(var(--secondary))] shadow-[0px_0px_6px_0px_#4fd1c5] -translate-x-1/2 -translate-y-1/2 z-50 p-7 space-y-4 md:w-[500px] w-72 top-1/2 left-1/2 rounded-md"
                >
                        <div className="text-left">
                            <h1 className="text-3xl text-[hsl(var(--primary))]">Create space</h1>
                            <p className="text-sm text-[hsl(var(--pure-white))]/60">A space helps you organize your forms and submissions.</p>
                        </div>
                        {/* <Button onClick={() => setOpneModal(false)} variant={"transparent"} sizes={"md"} className="absolute md:right-10 md:top-9 top-2 p-3 text-[hsl(var(--primary))]"><X size={15} strokeWidth={1.6}/></Button> */}
                        <form action={handleSpaceSubmit} className="space-y-2">
                            <InputBox disabled={isPending} name="Space" placeholder="My awesome Space" icon={<Rocket size={15} strokeWidth={1.2}/>}/>
                            <InputBox disabled={isPending} name="Url" placeholder="myawesomespace.com" icon={<Link2 size={15} strokeWidth={1.2}/>}/>
                            <div className="flex items-center md:mt-10 mt-7 md:gap-5 gap-2 justify-end">
                                <Button disabled={isPending} variant={"secondary"} className="flex items-center gap-2 justify-center border-[hsl(var(--primary))]" sizes={"md"}><Plus size={16}/>Create Space</Button>
                                <Button type="button" onClick={() => setOpneModal(false)} variant={"transparent"} sizes={"md"}>Cancel</Button>
                            </div>
                        </form>
                </motion.div>
            </>
        </AnimatePresence>
    )
}