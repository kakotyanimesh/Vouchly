import { SubscriptionPlanType } from "@/generated/prisma"

export const checkPlan = ({planName} : {planName : SubscriptionPlanType}) => {
    return planName !== "ENTERPRICE" 
}