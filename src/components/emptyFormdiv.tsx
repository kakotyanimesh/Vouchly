// "use client"
// import { File, Plus } from "lucide-react"
// import { Card } from "./ui/card"
// import { IconDiv } from "./ui/icondiv"
// import { Button } from "./ui/button"
// import { useTestimonialModalStore } from "@/utils/zustand/testimonial_states"

// export const EmptyFormDiv = ({sName, sId} : {sName : string, sId : string}) => {
//     const { setOpenTModal } = useTestimonialModalStore()
//     return(
//         <>
//             <Card className="w-full h-full py-10 items-center flex flex-col space-y-5 justify-center">
//                 <IconDiv reactNode={<File/>}/>
//                 <h1 className="text-sm text-[hsl(var(--primary))]">Create your first Testimonia Form </h1>
//                 <Button
//                 onClick={() => setOpenTModal(true)}
//                 variant={"transparent"} className="flex items-center gap-2 " sizes={"md"}><Plus size={16}/> Create Testimonia</Button>
//             </Card>
//         </>
//     )
// }