export const StatusColor = (status : statusType) => {
    switch (status) {
        case "Approved":
                return "bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] border-[hsl(var(--primary))]/30"
            
        case "Pending":
            return "bg-yellow-600/20 text-yellow-600 border-yellow-600/30"
    
        case "Draft": 
            return "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]  border-[hsl(var(--destructive))]/30"
        case "Dismiss": 
            return "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]  border-[hsl(var(--destructive))]/30"
        default:
            return "bg-[hsl(var(--muted))] text-black"
    }
}

export type statusType = "Approved" | "Pending" | "Draft" | "Dismiss" 