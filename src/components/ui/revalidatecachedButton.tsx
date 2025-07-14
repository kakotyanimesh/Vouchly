"use client";

import { revalidateCached } from "@/app/action/server_action/user";
import { Button } from "./button";
import { cn } from "@/utils/lib/cn";

export const RevalidateCachedButton = ({
	cachedName,
    className 
}: {
	cachedName: string;
className ?: string
}) => {
	return (
		<Button
			whileHover={{ rotate: 2, boxShadow: "0px 0px 2px 4px #0decde" }}
			className={cn("", className)}
			sizes={"sm"}
			onClick={() => revalidateCached({ cachedName })}
		>
			Refresh Database
		</Button>
	);
};
