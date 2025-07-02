
"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import { GlowingComponent } from "../ui/glowingdiv";
import { GradientText } from "../ui/gradienteText";
import { TextReviewOne } from "../ui/testimonialscomponents/textreviewone";

export const LandingHeader = () => {
	const router = useRouter();
	const headLine = "Build Testimonial Pages";

	const initial = {
		filter: "blur(2px)",
		opacity: 0,
		y: 12,
	};

	const animate = {
		filter: "blur(0)",
		opacity: 1,
		y: 0,
	};
	return (
<<<<<<< HEAD
		<div className="flex justify-center md:my-48 mt-30 mb-20 items-center text-center flex-col md:gap-5 gap-3 relative ">
=======
		<div className="flex justify-center md:my-48 mt-30 mb-20 items-center text-center flex-col md:gap-5 gap-3">
>>>>>>> b49c1076de4aaed573667cf57f95fef19c003d3f
			<h1 className="md:text-6xl text-3xl">
				{headLine.split(" ").map((w, index) => (
					<motion.span
						initial={initial}
						animate={animate}
						transition={{
							duration: 0.8,
							delay: 0.2 * index,
							ease: "easeIn",
						}}
						key={index}
						className="mr-3"
					>
						{w}
					</motion.span>
				))}
				<br />
				<GradientText
					initial={initial}
					animate={animate}
<<<<<<< HEAD
					className="relative"
=======
>>>>>>> b49c1076de4aaed573667cf57f95fef19c003d3f
					transition={{ duration: 0.5, delay: 0.4, ease: "easeIn" }}
				>
					in minutes
					<GlowingComponent
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{
							duration: 1,
							delay: 0.4,
							ease: "easeOut",
						}}
						className="left-1/2 -translate-x-1/2 -mt-1 bg-gradient-to-r from-transparent via-[hsl(var(--primary))] md:w-64 w-40 rounded-4xl h-[2px] to-transparent"
					/>
				</GradientText>
			</h1>
			<motion.p
				initial={initial}
				animate={animate}
				transition={{ duration: 0.5, ease: "linear", delay: 0.1 }}
				className="max-w-md mx-auto px-4 text-sm"
			>
				Transform happy customers into powerful testimonials. Create
				stunning forms, collect video reviews, and showcase them with
				style across all your platforms
			</motion.p>
			<motion.div
				initial={initial}
				animate={animate}
				transition={{ duration: 0.5, ease: "linear", delay: 0.1 }}
				className="space-x-5"
			>
				<Button
					onClick={() => router.push("/signin")}
					variant={"secondary"}
				>
					Start building for Free
				</Button>
				<Button
					onClick={() => router.push("/signin")}
					variant={"primary"}
				>
					Watch Demo{" "}
				</Button>
			</motion.div>
			<TextReviewOne
<<<<<<< HEAD
				className="w-60 md:w-96 xl:w-80 rotate-6 shadow-[5px_5px_12px_0px_#38b2ac] xl:absolute xl:translate-x-6/4 mt-12 xl:-bottom-36"
				initial={{ opacity: 0, y: 20 }}
				viewport={{ once: true }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					type: "spring",
					damping: 20,
					stiffness: 100,
					delay: 0.5,
					duration: 0.9,
				}}
=======
				className="w-60 md:w-96 xl:w-80 absolute xl:right-40 xl:-bottom-10 -bottom-28 md:-bottom-40 rotate-6 shadow-[5px_5px_12px_0px_#38b2ac]"
				initial={{ opacity : 0 , y : 20,}}
                viewport={{once : true}}
                whileInView={{opacity : 1, y : 0}}
                transition={{
                    type : "spring",
                    damping : 20,
                    stiffness : 100,
                    delay : 0.5,
                    duration : 0.9
                }}
>>>>>>> b49c1076de4aaed573667cf57f95fef19c003d3f
				textreviewid={1}
				customerCompany="Embriefy"
				customerName="Animesh kakoty"
				stars={5}
				imageSrc="https://i.pinimg.com/736x/22/c9/fd/22c9fd09af9b520ca3678e441be77723.jpg"
<<<<<<< HEAD
				textReview="Vouchly transformed how we collect and display testimonials. Our conversion rate increased by 30% after adding their vouchly wall to our landing page."
=======
				textReview="Embrify transformed how we collect and display testimonials. Our conversion rate increased by 30% after adding their testimonial wall to our landing page."
>>>>>>> b49c1076de4aaed573667cf57f95fef19c003d3f
			/>
			{/* <GlowingComponent className="left-1/2 bottom-1  from-teal-400/20 to-emerald-400/15"/> */}
			{/* <GlowingComponent className="left-1/2  bottom-20 -translate-x-1/2 from-teal-400/20 to-emerald-400/15 rounded-tl-4xl w-full rounded-tr-4xl "/> */}
		</div>
	);
};

