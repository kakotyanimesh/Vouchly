import { FooterLinks } from "@/utils/hardcodeddata/shortcuts"
import { Logo } from "../ui/logo"
import { LinkTag } from "../ui/Link"

export const Footer = () => {
    return (
        <div className="border-t border-[hsl(var(--secondary))] mt-20 md:-mx-20 -mx-5 md:py-14 py-5 flex md:flex-row flex-col justify-between md:px-56 px-5 space-y-4">
            <div className="flex flex-col gap-2">
                <Logo className="text-xl"/>
                <p className="text-xs ">The modern way of collecting & howcase <br /> your customer review</p>
            </div>
            {
                FooterLinks.map((f, k) => (
                    <div key={k}>
                        <h1 className="text-md">{f.fHead}</h1>
                        <div className="flex flex-col">
                            {f.features.map((fE, k) => (
                                <LinkTag className="text-sm" href={`${fE}`} key={k}>{fE}</LinkTag>
                            ))}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}