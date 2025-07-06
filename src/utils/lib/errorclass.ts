export class ExceedLimitError extends Error {
    constructor(message : string){
        super(message)
        this.name = "ExceedLimitError"
    }
}