"use client";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { LinkTag } from "./ui/Link";
import { Logo } from "./ui/logo";
import { useState } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useRouter } from "next/navigation";
import { BlurdivPrimary, BlurdivTertiary } from "./ui/animateddivs";

export const Navbar = () => {
	const [openmenu, setOpenmenu] = useState(false);
	const router = useRouter();

	const toggleMenu = () => {
		const newOpenMenuState = !openmenu;
		setOpenmenu(newOpenMenuState);

		if (newOpenMenuState) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	};

	const openMenuVariants: Variants = {
		initial: { opacity: 0, y: "-100%" },
		animate: {
			opacity: 1,
			y: 0,
		},
		exit: { opacity: 0, y: "-100%" },
	};
	return (
		<div className="flex justify-center items-center">
			<div className="flex fixed flex-row p-3 rounded-2xl md:gap-44 gap-20 px-5 mt-28 justify-self-center bg-[hsl(var(--primary))]/20 backdrop-blur-lg z-10 shadow-[0px_0px_2px_0px_#4fd1c5]">
				<div className="flex flex-row gap-10 items-center">
					<Logo className="text-2xl" />
					<div className="lg:flex hidden flex-row justify-between gap-4 items-center ">
						{NavbarArray.map((l, k) => (
							<LinkTag
								className="text-[hsl(var(--pure-white))] hover:text-[hsl(var(--primary))] transition-colors ease-linear duration-200"
								href={l.src}
								key={k}
							>
								{l.name}
							</LinkTag>
						))}
					</div>
				</div>
				<div className="lg:flex flex-row gap-5 hidden">
					<Button
						onClick={() => router.push("/signin")}
						variant={"secondary"}
					>
						Sign in
					</Button>
					<Button
						onClick={() => router.push("/signin")}
						className="md:px-10"
						variant={"primary"}
					>
						Get Started
					</Button>
				</div>
				<Button
					variant={"fetch"}
					onClick={toggleMenu}
					className="lg:hidden flex text-white"
				>
					<Menu />
				</Button>
			</div>
			<AnimatePresence mode="wait">
				{openmenu && (
					<motion.div
						variants={openMenuVariants}
						animate="animate"
						initial="initial"
						exit="exit"
						transition={{
							type: "tween",
							ease: "easeInOut",
							duration: 0.3,
						}}
						className="overflow-y-hidden fixed bg-black flex flex-col inset-0 z-50 justify-center items-center space-y-2"
					>
						<BlurdivTertiary className="fixed -z-10 blur-[190px] size-44 left-1/2 md:left-10" />
						<BlurdivPrimary className="fixed -z-10 blur-[130px] size-80 md:size-96 right-1/2 md:right-0" />
						{NavbarArray.map((l, k) => (
							<motion.h1
								key={k}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									delay: k * 0.3,
									ease: "easeInOut",
									duration: 0.5,
								}}
							>
								<LinkTag
									className="text-xl text-white"
									href={l.src}
								>
									{l.name}
								</LinkTag>
							</motion.h1>
						))}
						<Button
							initial={{ opacity: 0, y: 4 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 1,
								ease: "easeInOut",
								// duration: 0.7,
							}}
							variant={"fetch"}
							onClick={toggleMenu}
							className="lg:hidden flex text-white"
						>
							<X />
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const NavbarArray = [
	{ name: "About", src: "/about" },
	{ name: "Pricing", src: "/pricing" },
	{ name: "Features", src: "/features" },
];
