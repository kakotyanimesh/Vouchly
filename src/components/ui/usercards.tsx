"use client";
import React, { ReactNode } from "react";
import { cn } from "@/utils/lib/cn";
import { LinkTag } from "./Link";

type UIcardProps = React.HTMLAttributes<HTMLAnchorElement> & {
	icon: ReactNode;
	title: string;
	iconStyle: string;
	parentColor: string;
	redirectLink: string;
};

export const Usercards: React.FC<UIcardProps> = ({
	className,
	redirectLink,
	iconStyle,
	parentColor,
	icon,
	title,
	...props
}) => {
	return (
		<LinkTag
			href={redirectLink}
			className={cn(
				"cursor-pointer rounded-2xl  w-full flex md:flex-row flex-col items-center md:px-7  md:gap-2 gap-1 py-5",
				className,
				parentColor,
			)}
			{...props}
		>
			<span className={`${iconStyle} rounded-xl p-2`}>{icon}</span>
			<h1 className="text-sm">{title}</h1>
		</LinkTag>
	);
};
