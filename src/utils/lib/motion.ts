// convert to motion props 
import { MotionProps } from "motion/react";


export const ConverMotionValues = ({shadowColor, k} : {shadowColor : string, k : number}) : MotionProps => {
    return {
        initial : false,
        whileHover : {
            scale : 1.04,
            rotate : k % 2 === 0 ? 2 : -2,
            boxShadow : `0px 0px 8px 2px ${shadowColor}`
        },
        transition : {
            ease : "easeOut",
            duration : 0.5
        }

    }
}