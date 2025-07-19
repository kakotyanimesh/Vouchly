import { FallBackText } from "@/components/ui/gradienteText";
import { LinkTag } from "@/components/ui/Link";

export default function NotFound () {
    return (
        <div className="flex justify-center items-center h-screen flex-col space-y-4">
            <FallBackText t1="404" className="text-[100px]"/>
            <FallBackText t1="Page Not Found" className="text-2xl"/>
            <LinkTag href={"/"} variants={"secondary"} sizes={"md"} className="">Home</LinkTag>
        </div>
    )
}