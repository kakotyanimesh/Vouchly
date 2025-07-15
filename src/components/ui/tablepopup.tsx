"use client";
import { useState } from "react";
import { LinkTag } from "./Link";
import { Card } from "./card";
import { Pencil } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { deleteForm } from "@/app/action/server_action/user";
import { toast } from "sonner";

export const TableTopUp = ({ link, formId }: { link: string, formId : number }) => {
	const [openManage, setOpenManage] = useState<boolean>(false);

	return (
		<div className="relative">
			<button
				className="cursor-pointer "
				onClick={() => setOpenManage(!openManage)}
			>
				...
			</button>
			{openManage && (
				<Card className="absolute space-y-2 text-xs flex flex-col px-5 py-2 xl:right-28 right-0 w-36">
					<LinkTag
						className="flex flex-row items-center gap-2"
						href={link}
					>
						<Pencil size={10} />
						Manage
					</LinkTag>
					<button
						// onClick={dSpace}
                        onClick={async() => {
                            const d = await deleteForm({formId})
                            toast.message(d?.messsage)
                        }}
						type="button"
                        className="text-[hsl(var(--primary))] gap-2 flex flex-row items-center bg-transparent text-xs cursor-pointer"
					>
						<MdDelete size={14} />{" "}
                        Delete
					</button>
				</Card>
			)}
		</div>
	);
};
