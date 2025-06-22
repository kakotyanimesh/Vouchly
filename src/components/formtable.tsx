/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import { motion } from "motion/react";
import { TableComponent } from "./ui/table";
import { InputBox } from "./ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { TableHeader, TestimoniaTableDataTypes } from "@/utils/types/user_types";

export const FormTable = ({thead, tdata} : {thead : TableHeader[], tdata : TestimoniaTableDataTypes[]} ) => {
    const [searchValue, setSearchValue] = useState("")
    
    const filteredData : TestimoniaTableDataTypes[] = tdata.filter(f => (
        f.Name.toLowerCase().includes(searchValue.toLowerCase()) || f.Description.toLowerCase().includes(searchValue.toLowerCase())
    ))
    
    return (
        <motion.div 
        initial={{opacity : 0, y: 14}}
        animate={{opacity : 1, y : 0}}
        transition={{
            ease : "easeIn"
        }}
        className="pt-7 px-7 pb-5 rounded-2xl bg-[hsl(var(--deep-black))] border-slate-100/10 border flex flex-col gap-4">
            <div>
                <InputBox value={searchValue} onChange={(e) => setSearchValue(e.target.value)} icon={<Search size={14} strokeWidth={1.2}/>} variants={"secondary"} placeholder="search"/> 
            </div>
            {/* @ts-expect-error */}
            <TableComponent tdata={filteredData} thead={thead}/>
            <Button variant={"fetch"} className="self-end">More</Button>
        </motion.div>
    )
}