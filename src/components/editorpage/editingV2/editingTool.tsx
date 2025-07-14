"use client";
import { addWidgetstoDb, saveEmbadedId } from "@/app/action/server_action/user";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/editorpageelements/colorPicker";
import { DimensionInput } from "@/components/ui/editorpageelements/dimensionInput";
import { useGridStoreV2, useTestimonialStyleStore } from "@/utils/zustand/gridstateV2";
import { Scan } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const EditingTool = () => {
	const router = useRouter();
	const params = useParams()



	
	const resetStyles = useTestimonialStyleStore((state) => state.restyles);
	const {
		tesimoonialCardBg,
		settesimoonialCardBg,
		textColor,
		setTextColor,
		setRoundedCorner,
		roundedCorner,
		shadowColor,
		setShadowColor,
		starColor,
		setStarColor,
		parentBgColor,
		setparentBgColor,
	} = useTestimonialStyleStore();

    const { gridStyleType, selectedReviews } = useGridStoreV2()
	const [isPending, startTransition] = useTransition();

	const saveCustomization = (e: React.FormEvent<HTMLFormElement>) => {
	    e.preventDefault();

	    startTransition(async () => {
	        const toasterId = toast.loading("🛠️ Saving your style magic...");

			const formId = Number(params["formId"])

			if (!formId || Number.isNaN(formId)) {
				toast.error("formId is missing Plese Try again", {
					id: toasterId
				})
				return
			}
	        try {
	            const res = await addWidgetstoDb({
	                formId,
	                style: {
	                    tesimoonialCardBg,
	                    textColor,
	                    roundedCorner,
	                    shadowColor,
	                    parentBgColor,
	                    starColor,
	                },

                    gridType: gridStyleType,
	                embadedIds: selectedReviews.map(sr => sr.id)
	            });

	            if (!res.success || !res.id) {
	                throw new Error(
	                    res.message || "Could not save widget settings",
	                );
	            }

				const saveId = await saveEmbadedId({
	                embadedId: res.id,
	                formId: formId,
	            });

				if (!saveId.success) {
	                throw new Error("Failed to generate script.");
	            }

	            toast.success(
	                "🎉 Testimonial Wall created! Grab your embed from the Widget section.",
	                {
	                    id: toasterId,
	                },
	            );

	            router.push(`/forms/${formId}`);
				resetStyles()
	        
	        } catch (error) {
				console.log(error);
				
	            const err =
	                error instanceof Error
	                    ? `❌ ${error.message}`
	                    : "😓 Something went wrong. Try again.";
	            toast.error(err, {
	                id: toasterId,
	            });
	        }
	    });
	};

    
	return (
		<>
			<form onSubmit={saveCustomization} className="flex lg:flex-row flex-col items-center">
				<div className="lg:flex flex-row items-center justify-between lg:w-[69vw] gap-2 hidden">
					<DimensionInput
						className=""
						label="🍩Rounded Vibes"
						icon={<Scan size={12} />}
						initialValue={roundedCorner}
						onChangeFuntion={(
							e: React.ChangeEvent<HTMLInputElement>,
						) => setRoundedCorner(parseInt(e.target.value))}
					/>
					<ColorPicker
						title="🌈Hero Shade"
						initialValue={parentBgColor}
						onChangeFunction={(
							e: React.ChangeEvent<HTMLInputElement>,
						) => setparentBgColor(e.target.value)}
					/>
					<ColorPicker
						title="🌈Card Bg"
						initialValue={tesimoonialCardBg}
						onChangeFunction={(
							e: React.ChangeEvent<HTMLInputElement>,
						) => settesimoonialCardBg(e.target.value)}
					/>
					<ColorPicker
						title="✨Stars"
						initialValue={starColor}
						onChangeFunction={(
							e: React.ChangeEvent<HTMLInputElement>,
						) => setStarColor(e.target.value)}
					/>
					<ColorPicker
						title="📃Text Shade"
						initialValue={textColor}
						onChangeFunction={(
							e: React.ChangeEvent<HTMLInputElement>,
						) => setTextColor(e.target.value)}
					/>
					<ColorPicker
						title="🛸shadow color"
						initialValue={shadowColor}
						onChangeFunction={(
							e: React.ChangeEvent<HTMLInputElement>,
						) => setShadowColor(e.target.value)}
					/>
				</div>
				<Button disabled={isPending} type="submit" className="lg:ml-10 lg:w-70 w-full mt-2">
					Save Template
				</Button>

				{/* <ColorPicker 
                    title="🌌Meteor Trail" 
                    initialValue={meteorColor} onChangeFunction={(e : React.ChangeEvent<HTMLInputElement>) => setMeteor(e.target.value)}/> */}
				{/* <Button className="w-fit" onClick={() => setOpenFinalWidget()}>Close Customization</Button> */}

				{/* <Button
                    disabled={isPending}
                    className="w-full"
                    variant={"secondary"}
                >
                    {isPending ? <LoadingCircleSpinner /> : "Generate Script"}
                </Button> */}
			</form>
		</>
	);
};
