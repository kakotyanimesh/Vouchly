import { SubscriptionPlanType } from "@/generated/prisma";
import prisma from "@/utils/lib/prisma";

async function main() {
    const plans = [
        {
            name : SubscriptionPlanType.TRIAL, 
            maxSpace : 1,
            maxTestimonialForm : 2,
            maxReview : 5,
            maxVideoReview : 2
        },
        {
            name : SubscriptionPlanType.PRO,
            maxSpace : 5,
            maxTestimonialForm : 10,
            maxReview : 20,
            maxVideoReview : 3
        },
        {
            name : SubscriptionPlanType.ENTERPRICE,
            maxSpace : -1,
            maxTestimonialForm : -1,
            maxReview : -1,
            maxVideoReview : -1
        }
    ]

    for (const plan of plans) {
        await prisma.subscriptionData.upsert({
            where : {name : plan.name},
            create : plan,
            update : plan
        })
    }
}

main()
    .catch(async(e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    }) 
    .finally(async() => {
        console.log("seed successfull");
        await prisma.$disconnect()
        
    })