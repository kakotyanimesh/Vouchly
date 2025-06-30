import { ProfileCard } from "@/components/profilecard"
import { Card } from "@/components/ui/card"
import { getUserSession } from "@/utils/lib/user_session"

export default async function Account(){
    const { name, email, id} = await getUserSession()
    return (
        <div className="space-y-5 flex flex-col justify-center items-center mx-10">
            <h1 className="md:text-4xl text-xl text-[hsl(var(--primary))] text-center">Account Settings</h1>
            <Card className="xl:w-[600px] w-[300px] md:w-[500px] md:p-10 px-3 py-5 space-y-4 bg-[hsl(var(--pure-white))]/4 border border-[hsl(var(--primary))]/20 backdrop-blur-3xl">
                <ProfileCard username={name} id={Number(id)} email={email}/>
            </Card>

        </div>
    )
}



