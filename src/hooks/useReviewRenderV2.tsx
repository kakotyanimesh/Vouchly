import { TextReviewProps, VideoReviewProps } from "@/utils/types/user_types";
import { ManualSlide } from "@/components/ui/testimonialscomponents/gridBuzz";
import { gridStyleType, reviewsType, TestimonialCardStyleProps } from "@/utils/zustand/gridstateV2";
import { TextReviewOne } from "@/components/ui/testimonialscomponents/textreviewone";
import {
	VideoTestimonialOne,
	VideoTestimonialType,
} from "@/components/ui/testimonialscomponents/customvideotestimonial";
import { FlipView } from "@/components/ui/testimonialscomponents/flipview";
import { cn } from "@/utils/lib/cn";
import { MotionProps } from "motion/react";
import { GlassyReview } from "@/components/ui/testimonialscomponents/GlassyReview";
import { GlassyVideoReview } from "@/components/ui/testimonialscomponents/GlassyVideo";

export interface RenderReviewProps {
	review: reviewsType;
	gridType: gridStyleType;
	index: number;
	individualStyles?: string;
	data?: Partial<Omit<TestimonialCardStyleProps, "parentBgColor">>;
	shadowcolor?: string
	motionProps?: MotionProps;
}

export const useOptimizedReviewRender = () => {
	const renderReviews = ({
		review,
		gridType,
		index,
		individualStyles,
		motionProps,
		shadowcolor,
		data
	}: RenderReviewProps) => {
		if (review.type === "text") {
			const txt = review.data as TextReviewProps;
			const sharedProps: TextReviewProps = {
				textreviewid: Number(index),
				customerName: txt.customerName,
				customerCompany: txt.customerCompany,
				textReview: txt.textReview,
				imageSrc: txt.imageSrc,
				stars: txt.stars,
			};
			switch (gridType) {
				case "ManualSlide":
					return <ManualSlide key={index} {...sharedProps} {...data} />;

				case "Default":
					return (
						<TextReviewOne
							{...motionProps}
							className={cn("", individualStyles)}
							key={index}
							{...sharedProps}
							{...data}
						/>
					);

				case "FlipView":
					return (
						<FlipView
							className={individualStyles}
							key={index}
							{...motionProps}
							{...sharedProps}
							{...data}
						/>
					);
				case "AutoSlide":
					return (
						<TextReviewOne
							className="flex-shrink-0 w-72"
							key={index}
							{...motionProps}
							{...sharedProps}
							{...data}
						/>
					);
				case "GlideUp":
					return (
						<TextReviewOne
							className={cn("h-fit", individualStyles)}
							key={index}
							{...sharedProps}
							{...motionProps}
							{...data}
						/>
					);

				case "Luminate":
					return (
						<GlassyReview
							{...sharedProps}
							{...motionProps}
							key={index}
							{...data}
							shadowcolor={shadowcolor}
						/>
					);
				default:
					return (
						<TextReviewOne
							{...motionProps}
							key={index}
							{...sharedProps}
							{...data}
						/>
					);
			}
		} else if (review.type === "video") {
			const vdv = review.data as VideoReviewProps;

			let videoClassName = "h-full min-w-64 flex-shrink-0";
			let localMotionProps: MotionProps = motionProps || {};

			switch (gridType) {
				case "ManualSlide":
					videoClassName = cn("w-72 ", videoClassName);
					break;
				case "Default":
					videoClassName = cn(
						"",
						videoClassName,
					);
					break;
				case "AutoSlide":
					videoClassName = cn("w-72", videoClassName);
					localMotionProps = {
						...localMotionProps,
						...motionProps,
					};
					break;
				case "FlipView":
					videoClassName = cn(
						"h-80 shadow-none",
						videoClassName,
						individualStyles,
					);
					motionProps = { ...motionProps };
					break;
				case "GlideUp":
					videoClassName = cn(
						"w-64 skew-12",
						videoClassName,
						individualStyles,
					);
					break;
				case "Luminate":
					videoClassName = cn(
						// "min-h-50 w-[450px]",
						videoClassName,
						individualStyles,
					);
					break;
				default:
					videoClassName = cn(
						"shadow-[0px_0px_2px_0px_#4fd1c5]",
						videoClassName,
					);
					break;
			}
			const sharedProps: VideoTestimonialType = {
				usercompany: vdv.customerCompany,
				username: vdv.customerName,
				videoSrc: vdv.videoLink,
				stars: vdv.stars,
			};

			switch (gridType) {
				case "Default":
					return (
						<VideoTestimonialOne
							className={videoClassName}
							key={index}
							{...localMotionProps}
							{...sharedProps}
							{...data}
						/>
					);
				case "Luminate":
					return (
						<GlassyVideoReview
							className={videoClassName}
							key={index}
							{...localMotionProps}
							{...sharedProps}
							shadowcolor={shadowcolor}
							{...data}
						/>
					);

				default:
					return (
						<VideoTestimonialOne
							className={videoClassName}
							key={index}
							{...localMotionProps}
							{...sharedProps}
							{...data}
						/>
					);
			}
		}
		return null;
	};
	return { renderReviews };
};
