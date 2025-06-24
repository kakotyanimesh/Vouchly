"use client"

import { revalidateCached } from "@/app/action/server_action/user"
import { Button } from "./button"

export const RevalidateCachedButton = ({cachedName} : {cachedName : string}) => {
    return <Button className="absolute top-10 md:right-10 right-2" sizes={"sm"} onClick={() => revalidateCached({cachedName})}>Refresh Database</Button>
}