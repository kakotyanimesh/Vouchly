import { cn } from "@/utils/lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome//free-solid-svg-icons";

export const InputVariants = cva(
	"w-full rounded-xl border focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ",
	{
		variants: {
			variants: {
				primary: "bg-[hsl(var(--tertiary))]/2 placeholder:text-[hsl(var(--secondary-foreground))] text-white border-[hsl(var(--tertiary))]/40 focus:ring-[hsl(var(--tertiary))]",
				secondary:
					"bg-[hsl(var(--primary))]/2 placeholder:text-[hsl(var(--secondary-foreground))] text-white border-[hsl(var(--primary))]/40 focus:ring-[hsl(var(--primary))]",
			},
			sizes: {
				sm: "text-sm h-10",
				// md : ""
			},
		},
		defaultVariants: {
			variants: "secondary",
			sizes: "sm",
		},
	},
);

export interface InputBoxProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof InputVariants> {
	icon?: ReactNode;
	errorMessage?: string;
}

export const InputBox = React.forwardRef<HTMLInputElement, InputBoxProps>(
	({ className, icon, variants, errorMessage, sizes, ...props }, ref) => {
		return (
			<div className="flex flex-col space-y-1">
				<label
					htmlFor=""
					className="text-sm text-[hsl(var(--primary))]"
				>
					{props.name}
				</label>
				<div className="relative">
					{icon && (
						<span
							className={cn(
								"absolute top-3 left-5 text-[hsl(var(--tertiary))]",
							)}
						>
							{icon}
						</span>
					)}

					<input
						ref={ref}
						className={cn(
							"",
							icon ? "px-11" : "px-5",
							className,
							InputVariants({ variants, sizes }),
						)}
						{...props}
						type={props.type}
						required
					/>
					{errorMessage && (
						<p className="text-xs text-red-400 ml-3">
							<FontAwesomeIcon
								icon={faTriangleExclamation}
								// style={{ color: "#e70d0d" }}
							/>
							{errorMessage}
						</p>
					)}
				</div>
			</div>
		);
	},
);

InputBox.displayName = "Input";
