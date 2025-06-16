"use client";

import { motion } from "motion/react"; 

export default function LoadingCircleSpinner() {
  return (
    <div className="flex items-center justify-center py-0.5">
        <motion.div
            className="rounded-full size-4 border-2 border-t-[#ff0088]"
            animate={{rotate : 360}}
            transition={{
                repeat : Infinity,
                ease : "linear",
                duration : 0.5
            }}
        />

    </div>
  );
}

