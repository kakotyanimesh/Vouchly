import { auth } from "../../../auth"

export const getUserSession = async () => {
    const session = await auth()

    if(!session || !session.user){
        throw new Error("No user session available here")
    }

    const { id, name, email } = session.user

    if(!id || !name || !email ){
        throw new Error("SESSION doesnot have id or email !!unauthorized")
    }

    return {id, name, email }
}