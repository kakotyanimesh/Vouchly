import { useSearchParams } from "next/navigation"

export const useParseSpacedata = () => {
    const searchParams = useSearchParams()

    const data = searchParams.get("data")

    return data ? JSON.parse(decodeURIComponent(data)) : {sName : "", sId : ""}
}