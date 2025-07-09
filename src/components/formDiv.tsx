import {
	useFileStore,
	useFormStore,
} from "@/utils/zustand/testimonialsformstore";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { FileUploda } from "./ui/fileUpload";
import { InputBox } from "./ui/input";
import { TextArea } from "./ui/textbox";
import { useTransition } from "react";
import { CreateFormTypes } from "@/utils/types/user_types";
import { useParseSpacedata } from "@/hooks/useSpacehook";
import { MdDelete } from "react-icons/md";
import {
	checkTestimonialFormUsages,
	createForms,
	uploadToS3,
} from "@/app/action/client_action/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const FormDiv = () => {
	const { sId } = useParseSpacedata();
	const router = useRouter();
	const { resetFile, imagefile } = useFileStore();
	const {
		questions,
		Name,
		Description,
		setName,
		setDescription,
		upadatedQuestions,
		addQuestionsArrray,
		removeQuestionsArray,
		reset,
	} = useFormStore();

	const [isPending, startTransition] = useTransition();
	const createForm = (e: React.FormEvent) => {
		e.preventDefault();
		if (!imagefile) {
			toast.error("Logo file is Empty");
			return;
		}
		startTransition(async () => {
			const loadingToast = toast.loading("creating testimonia Form", {
				position: "bottom-right",
			});

			try {
				const canUpload = await checkTestimonialFormUsages();
				console.log("canUpload", canUpload);

				if (!canUpload.success) {
					toast.error(canUpload.message, {
						id: loadingToast,
					});
					return;
				}
				const uploadResult = await uploadToS3(imagefile, "form_logos");

				if (!uploadResult || !uploadResult.uniqueKey) {
					toast.error(
						uploadResult?.message ||
							"Logo upload failed: Unique key not returned.",
						{
							id: loadingToast,
						},
					);
					return;
				}

				const brandLogoKey = uploadResult.uniqueKey;

				const formData: CreateFormTypes = {
					Name,
					Description,
					brandLogo: brandLogoKey,
					spaceId: Number(sId),
					questions,
				};

				const res = await createForms(formData);

				if (!res.success) {
					throw new Error(
						res.message || "Error Please try again later ....",
					);
				}

				toast.success("Testimonia created successfully", {
					id: loadingToast,
					// position :
				});

				reset();
				resetFile();
				router.push(`/forms/${res.formId}`);
			} catch (error) {
				const errmsg =
					error instanceof Error
						? error.message
						: "Something went wrong";
				toast.error(errmsg, {
					id: loadingToast,
				});
			}
		});
	};
	return (
		<Card className="h-fit p-5 space-y-5 md:w-1/2 w-full border-[hsl(var(--primary))]/20">
			<div className=" lg:space-y-0 md:space-y-1">
				<h1 className="lg:text-2xl text-xl font-bold">
					Spin up a custom testimonial form
				</h1>
				<p className="lg:text-sm text-xs">
					Once your Space is live, you’ll get a branded page to
					collect authentic feedback via ✍️ text, 📹 video.
				</p>
			</div>
			<form onSubmit={createForm} className=" rounded-2xl space-y-5">
				<InputBox
					disabled={isPending}
					onChange={(e) => setName(e.target.value)}
					name="📝 Form Title"
					value={Name}
					placeholder="Your Form Title here..."
				/>

				<TextArea
					disabled={isPending}
					onChange={(e) => setDescription(e.target.value)}
					name="💬 Welcome Message"
					value={Description}
					placeholder="Say hey 👋 and guide them a bit. Share what kind of testimonial you're looking for and why it matters."
				/>

				{questions.map((q, k) => (
					<Card key={k} className="relative px-3 py-5">
						<InputBox
							disabled={isPending}
							value={q}
							onChange={(e) =>
								upadatedQuestions(k, e.target.value)
							}
							name={`#️⃣ Question ${k + 1} `}
							key={k}
							placeholder={`Write a question for your users`}
						/>
						<Button
							disabled={isPending}
                            onClick={() => removeQuestionsArray(k)}
							variant={"transparent"}
							sizes={"sm"}
                            type="button"
							className="absolute border-0 right-5 top-2 g-gradient-to-r from-teal-400 to-emerald-400"
						>
							<MdDelete className="text-teal-200" />{" "}
						</Button>
					</Card>
				))}
				<Button
					disabled={isPending || questions.length > 3}
					type="button"
					variant={"transparent"}
					className="w-full justify-center flex"
					onClick={() => addQuestionsArrray()}
				>
					➕ Add another question
				</Button>

				<FileUploda disable={isPending} fileType="Logo" />

				<Button disabled={isPending}>Save Form</Button>
			</form>
		</Card>
	);
};
