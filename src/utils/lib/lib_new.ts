
export const nakedURL = ({url} : {url : string}) => {
    if(url.startsWith("https://") || url.startsWith("https://")) return url

    return `https://${url}`
}

export const endcodeURL = (p : string) => {
    return encodeURIComponent(p)
}


export const generateToken = (formId : number, adminId : number) => {
    return Buffer.from(JSON.stringify({formId, adminId})).toString("base64url")
}

export const extractDataFromToken = (token : string) => {
    try {
        return JSON.parse(Buffer.from(token, "base64").toString())
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        
        return null
    }
}

// export const jwtToken = (id : string, adminId : string) => {
//     const payload = {
//         f : id,
//         a : adminId,
//         t: 1,
//     }

//     return jwt.sign(payload, process.env.JWT_SECRET as string, {
//         issuer : process.env.JWT_ISSUER!
//     })
// }


// export const decodeJwt = (token : string) => {
//     try {
//         // console.log(process.env);
        
//         const decoded = jwt.verify(token, process.env.JWT_SECRET  as string, {
//             issuer : process.env.JWT_ISSUER!
//         }) as JwtPayload

//         if(decoded.type !== 1){
//             throw new Error("Invalid Token")
//         }

//         return {
//             formId : decoded.f,
//             // adminId : decoded.a
//         }
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//         return {
//             valid : false,
//             message : 'Invalid token'
//         }
//     }
// }