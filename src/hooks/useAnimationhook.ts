export const useAnimationProps = (direction : "left" | "right" | "up" | "down", duration = 0.5, delay = 0.1 ) => {
    const transition = {
        duration,
        delay,
        ease : "linear"
    }
    const animations = {
        left : {
            initial : { x : -22, opacity : 0},
            whileInView : { x : 0, opacity : 1},
        },
        right : {
            initial : { x : 22, opacity : 0},
            whileInView : { x : 0, opacity : 1},
        },
        up : {
            initial : { y : -12, opacity : 0},
            whileInView : { y : 0, opacity : 1}
        },
        down : {
            initial : { y : 12, opacity : 0},
            whileInView : { y : 0, opacity : 1}
        }
    }


    return {
        ...animations[direction] || animations["left"], 
        transition,
        viewport : { once : true }
    }
}