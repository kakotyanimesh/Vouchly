
import { Link2, Plus, Rocket } from "lucide-react"
import { Button } from "./button"
import { InputBox } from "./input"
import { useSpaceModalStore } from "@/utils/zustand/space_state"
import { AnimatePresence, motion } from "motion/react"

export const SpaceModal = () => {
    const { setOpneModal} = useSpaceModalStore()
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
                className="fixed bg-black border-[hsl(var(--primary))]/40 border -translate-x-1/2 -translate-y-1/2 z-50 md:p-10 p-5 space-y-4 md:w-[500px] w-72 top-1/2 left-1/2 rounded-2xl"
                >
                        <div>
                            <h1 className="text-2xl text-[hsl(var(--primary))]">Create space</h1>
                            <p className="text-sm text-[hsl(var(--slate-text))]">A space helps you organize your forms and submissions.</p>
                        </div>
                        {/* <Button onClick={() => setOpneModal(false)} variant={"transparent"} sizes={"md"} className="absolute md:right-10 md:top-9 top-2 p-3 text-[hsl(var(--primary))]"><X size={15} strokeWidth={1.6}/></Button> */}
                        <InputBox name="Space" placeholder="My awesome Space" icon={<Rocket size={15} strokeWidth={1.2}/>}/>
                        <InputBox name="Url" placeholder="myawesomespace.com" icon={<Link2 size={15} strokeWidth={1.2}/>}/>
                        <div className="flex items-center md:mt-10 mt-2 md:gap-5 gap-2 justify-end">
                            <Button onClick={() => setOpneModal(false)} variant={"transparent"} className="flex items-center gap-2 justify-center border-[hsl(var(--primary))] text-[hsl(var(--primary))]" sizes={"md"}><Plus size={16}/>Create Space</Button>
                            <Button onClick={() => setOpneModal(false)} variant={"transparent"} sizes={"md"}>Cancel </Button>
                        </div>
                </motion.div>
            </>
        </AnimatePresence>
    )
}