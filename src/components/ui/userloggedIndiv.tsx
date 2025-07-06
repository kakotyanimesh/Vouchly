import { cn } from "@/utils/lib/cn";
import { SessionProvider, useSession } from "next-auth/react";
import React from "react";
import { LinkTag } from "./Link";

export const UserLoggedIn: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}) => {
	const { data: session, status } = useSession();
	return (
		<SessionProvider session={session}>
			<div className={cn("", className)} {...props}>
				{status === "authenticated" ? (
					<h1>{session.user?.name?.split("")[0]}</h1>
				) : (
					<>
						<LinkTag
							href={"/signin"}
							sizes={"md"}
							variants={"secondary"}
						>
							Sign in
						</LinkTag>
						<LinkTag
							href={"/signin"}
							className="md:px-10"
							variants={"tertiary"}
							sizes={"md"}
						>
							Get Started
						</LinkTag>
					</>
				)}
			</div>
		</SessionProvider>
	);
};
