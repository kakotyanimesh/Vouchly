"use client"
import { cn } from "@/utils/lib/cn"
import { ArrayOfTabs } from "@/utils/types/user_types"
import { InputBoxesTypesStore } from "@/utils/zustand/submittestimonialstate"
import { motion } from "motion/react"
import React, { useEffect, useRef, useState } from "react"


type VarticalSliderProps = React.HTMLAttributes<HTMLDivElement> & {
    tabs : ArrayOfTabs[]
}


export const VerticalTabSwitcher : React.FC<VarticalSliderProps> = ({className, tabs, ...props}) => {

    const { setStoreNumber } = InputBoxesTypesStore()
    const [selectedButtonKey, setSelectedButtonKey] = useState(0)
    const [tabwidth, setTabwidth] = useState<number>(0)
    const [leftIndicator, setLeftIndicator] = useState<number>(0)

    const buttonArrays = useRef<(HTMLButtonElement | null)[]>([])

    useEffect(() => {
      const activeTab = buttonArrays.current.find(t => t?.dataset.keyindex === selectedButtonKey?.toString())
      //  in html we use data-customname to store addittional inforamtion & to retrive we user .dataset.customname use camel case for customname (small letters )

      if(activeTab){
        setTabwidth(activeTab.offsetWidth)
        setLeftIndicator(activeTab.offsetLeft)
      }
    }, [selectedButtonKey])
    
    return (
        <div className={cn("relative inline-flex rounded-xl border h-8 border-[hsl(var(--primary))] w-full", className)} {...props}>

            <motion.div
            layout
            initial={false}
            animate={{
                width : tabwidth,
                x : leftIndicator
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
            }}
            className="absolute bg-[hsl(var(--primary))] z-0 top-0 bottom-0 rounded-xl"
            />
            {
                tabs.map((t, k) => (
                    <button
                    type="button"
                    data-keyindex={t.key}
                    ref={(b) => {
                        buttonArrays.current[k] = b
                    }}
                    key={k}
                    onClick={() => {
                        setSelectedButtonKey(t.key)
                        setStoreNumber(t.key)
                    }}
                    className="w-full z-10 cursor-pointer"
                    >
                        {t.title}
                    </button>
                ))
            }
        </div>
    )
}