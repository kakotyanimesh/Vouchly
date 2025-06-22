"use client"
import { useState } from "react"
import { LinkTag } from "./Link"
import { Card } from "./card"
import { Eye, Pencil } from "lucide-react"

export const TableTopUp = ({link} : {link : string}) => {
    const [openManage, setOpenManage] = useState<boolean>(false)

    return (
        <div className="relative">
            <button className="cursor-pointer " onClick={() => setOpenManage(!openManage)}>
            ...
            </button>
            {
                openManage && <Card className="absolute space-y-2 text-xs flex flex-col px-5 py-2 xl:right-28 right-0 w-36">
                    <LinkTag
                    className="flex flex-row items-center gap-2"
                    href={link}><Pencil size={10} />Manage</LinkTag>
                    <LinkTag
                    className="flex flex-row items-center gap-2" 
                    href={link}><Eye size={10} />View In Public</LinkTag>
                </Card>
            }
        </div>
    )
}