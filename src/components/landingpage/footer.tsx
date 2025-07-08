import { FooterLinks } from "@/utils/hardcodeddata/shortcuts";
import { Logo } from "../ui/logo";
import { LinkTag } from "../ui/Link";
import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
	return (
		<div className="border-t border-[hsl(var(--secondary))] mt-20 md:-mx-20 -mx-7 md:py-14 py-5  lg:px-56 px-7 ">
            <div className="flex md:flex-row flex-col justify-between space-y-4">
                <div className="flex flex-col gap-2">
                    <Logo className="text-xl" />
                    <p className="text-xs ">
                        The modern way of collecting & howcase <br /> your customer
                        review
                    </p>
                    <div className="flex flex-row gap-5 items-center">
                        <Link href={"https://x.com/_animeshkakoty"} target="_blank">
                            <FaXTwitter />{" "}
                        </Link>
                        <Link href={"https://github.com/kakotyanimesh"} target="_blank">
                            <FaGithub />{" "}
                        </Link>
                    </div>
                </div>
                {FooterLinks.map((f, k) => (
                    <div key={k}>
                        <h1 className="text-md">{f.fHead}</h1>
                        <div className="flex flex-col">
                            {f.features.map((fE, k) => (
                                <LinkTag className="text-sm" href={`${fE}`} key={k}>
                                    {fE}
                                </LinkTag>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <h1 className="text-center text-xs">@Vouchly I don&apos;t have rights</h1>
		</div>
	);
};
