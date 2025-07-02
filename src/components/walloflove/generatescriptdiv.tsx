// "use client"

// import { useScriptStore } from "@/utils/zustand/gridState"
// import { Card } from "../ui/card"
// import { Button } from "../ui/button"
// import { useRouter } from "next/navigation"

// export const GeneratedScript = () =>{
//     const {isGenerated, scriptKey} = useScriptStore()
//     const router = useRouter()
//     const script = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_DOMAIN_NAME}/${scriptKey}`
//     return (
//         <>
//             {isGenerated && <Card className="absolute space-y-2 top-1/2 left-1/2 h-fit p-10 -translate-1/2  bg-red-900 w-fit z-40">
//                 <h1>{script}</h1>
//                 <Button
//                     onClick={() => navigator.clipboard.writeText(script)}
//                 >
//                     copy
//                 </Button>
//                 <Button onClick={() => router.back() }>
//                     back
//                 </Button>
//             </Card>}
//         </>
//     )
// }