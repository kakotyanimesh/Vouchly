import { TextReviews } from "@/utils/hardcodeddata/shortcuts";
import { TextReviewOne } from "../ui/testimonialscomponents/textreviewone";
import { VideoTestimonial } from "../ui/testimonialscomponents/videotestimonial";
import animeshvideo from "@/videos/animeshvideo.mp4.json";
import { useAnimationProps } from "@/hooks/useAnimationhook";
import { GradientText } from "../ui/gradienteText";

export const NoCoding = () => {
	const downAnimation = useAnimationProps("down");
	const leftAnimation = useAnimationProps("left");
	const rightAnimation = useAnimationProps("right");
	const upAnimation = useAnimationProps("up");

	return (
		<div className="space-y-2">
			<h1 className="md:text-4xl text-2xl">
				Turn Feedback Into
				<GradientText className="mx-2">Trust</GradientText>
				with
				<span className="mx-2 bg-gradient-to-l from-[hsl(var(--tertiary))]/30 to-[hsl(var(--primary))]/30 rounded-md px-2">
					Embriefy Wall
				</span>
			</h1>
			<div className="space-y-1">
				<div className="grid grid-cols-3 gap-1 md:w-[650px] w-full ">
					<VideoTestimonial
						{...leftAnimation}
						className="md:col-span-1 col-span-3 bg-gradient-to-bl from-[hsl(var(--feature-preview))]/40 to-[hsl(var(--primary))]/60"
						username="Animesh"
						usercompany="Tits.com"
						videoSrc={animeshvideo}
					/>
					{TextReviews.slice(0, 1).map((t, k) => (
						<TextReviewOne
							{...downAnimation}
							textreviewid={t.textreviewid}
							className="md:col-span-1 col-span-3 bg-gradient-to-bl from-[hsl(var(--feature-preview))]/40 to-[hsl(var(--primary))]/60"
							textReview={t.textReview}
							customerName={t.customerName}
							customerCompany={t.customerCompany}
							stars={t.stars}
							imageSrc={t.imageSrc}
							key={k}
						/>
					))}
					<VideoTestimonial
						{...rightAnimation}
						className="md:col-span-1 col-span-3 bg-gradient-to-bl from-[hsl(var(--feature-preview))]/40 to-[hsl(var(--primary))]/60"
						username="Animesh"
						usercompany="Tits.com"
						videoSrc={animeshvideo}
					/>
				</div>
				<div className="grid grid-cols-3 gap-1 md:w-[650px] w-full ">
					{TextReviews.slice(1, 2).map((t, k) => (
						<TextReviewOne
							textreviewid={t.textreviewid}
							{...leftAnimation}
							className="md:col-span-1 col-span-3 bg-gradient-to-bl from-[hsl(var(--feature-preview))]/40 to-[hsl(var(--primary))]/60"
							textReview={t.textReview}
							customerName={t.customerName}
							customerCompany={t.customerCompany}
							stars={t.stars}
							imageSrc={t.imageSrc}
							key={k}
						/>
					))}
					<VideoTestimonial
						{...upAnimation}
						className="md:col-span-1 col-span-3 bg-gradient-to-bl from-[hsl(var(--feature-preview))]/40 to-[hsl(var(--primary))]/60"
						username="Animesh"
						usercompany="Tits.com"
						videoSrc={animeshvideo}
					/>
					{TextReviews.slice(2, 3).map((t, k) => (
						<TextReviewOne
							textreviewid={k + 1}
							className="md:col-span-1 col-span-3 w-full bg-gradient-to-bl from-[hsl(var(--feature-preview))]/40 to-[hsl(var(--primary))]/60"
							{...rightAnimation}
							textReview={t.textReview}
							customerName={t.customerName}
							customerCompany={t.customerCompany}
							stars={t.stars}
							imageSrc={t.imageSrc}
							key={k}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
