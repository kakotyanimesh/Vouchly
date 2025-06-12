"use client"
import { useRouter } from "next/navigation"
import { Button } from "./button"

export const Successdiv = (data : {
    title : string,
    desc : string,
    buttontitle : string,
    redirectLink : string
}) => {
    const router = useRouter()
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.desc}</p>
            <Button onClick={() => router.push(`/${data.redirectLink}`)}>{data.buttontitle}</Button>
        </div>
    )
}