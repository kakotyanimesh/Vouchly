"use client"

import { revalidateCached } from "@/app/action/server_action/user"
import { Button } from "./button"

export const RevalidateCachedButton = ({cachedName} : {cachedName : string}) => {
    return <Button className="absolute top-20 right-10" onClick={() => revalidateCached({cachedName})}>Refresh Database</Button>
}