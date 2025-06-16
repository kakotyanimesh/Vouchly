"use client"

import { revalidateTag } from "next/cache"
import { Button } from "./button"

export const DeleteCached = () => {

    const Del = () => {
        revalidateTag(``)
    }
    return (
        <Button variant={"secondary"} 
            onClick={() => Del()}
        >
            Fetch Database
        </Button>
    )
}