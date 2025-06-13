"use client"
import { cn } from "@/utils/lib/cn";
import { SpaceCardProps } from "@/utils/types/user_types";
import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {  File, Plus } from "lucide-react";
import { IconDiv } from "./ui/icondiv";
import { SpaceCard } from "./ui/spacecard";
import { SpaceModal } from "./ui/spaceModal";
import { useSpaceModalStore } from "@/utils/zustand/space_state";

type SpaceDivTypes = {
    data : SpaceCardProps[]
} & React.HTMLAttributes<HTMLDivElement>

export const SpaceDiv : React.FC<SpaceDivTypes> = ({className, data, ...props}) => {
    
    const {openModal, setOpneModal} = useSpaceModalStore()

    return (
        <div className={cn("", className)} {...props}>
            {
                data.length === 0 ? <Card className="w-full h-full py-10 items-center flex flex-col space-y-5 justify-center hover:border-dotted hover:border-2 bg-[hsl(var(--seondary))] transition-colors duration-200 ease-linear cursor-pointer group hover:border-[hsl(var(--primary))]">
                    
                    <IconDiv reactNode={<File/>}/>
                    <h1 className="text-sm text-[hsl(var(--primary))]">Create your first space to start collecting testimonials</h1>
                    <Button 
                    onClick={()=> setOpneModal(true)} 
                    variant={"transparent"} 
                    className="flex items-center gap-2 group-hover:bg-[hsl(var(--primary))]/20 " 
                    sizes={"md"}>
                    <Plus size={16}/> Create Space
                    </Button>
                    {
                        openModal && <SpaceModal/>
                    }
                </Card> : 
                <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                    {data.map((d, k) => (
                        <SpaceCard src={d.src} Id={d.Id} key={k} spaceName={d.spaceName} createdAt={d.createdAt} totalForms={d.totalForms}/>
                    ))}
                    
                </div>
            }
        </div>
    )
}