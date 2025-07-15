import { auth } from "../../../auth"
import { AuthError } from "./errorclass"

export const getUserSession = async () => {
    const session = await auth()

    if(!session || !session.user){
        throw new AuthError("No user session available here");
    }

    const { id, name, email } = session.user

    if(!id || !name || !email ){
        throw new AuthError("SESSION doesnot have id or email !!unauthorized")
    }

    return {id, name, email }
}