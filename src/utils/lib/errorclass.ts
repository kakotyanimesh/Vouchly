export class ExceedLimitError extends Error {
    constructor(message : string){
        super(message)
        this.name = "ExceedLimitError"
    }
}

export class AuthError extends Error{
    constructor(message : string){
        super(message)
        this.name  = "Auth error"
    }
}