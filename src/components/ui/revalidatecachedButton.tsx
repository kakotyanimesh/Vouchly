"use client"

import { revalidateCached } from "@/app/action/server_action/user"
import { Button } from "./button"

export const RevalidateCachedButton = ({cachedName} : {cachedName : string}) => {
    return <Button whileHover={{rotate : 2, boxShadow : "0px 0px 2px 4px #0decde"}} className="absolute bottom-5 md:right-10 right-2" sizes={"sm"} onClick={() => revalidateCached({cachedName})}>Refresh Database</Button>
}