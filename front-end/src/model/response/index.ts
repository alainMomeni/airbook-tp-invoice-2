export interface ResponseModel<T> {
    response: {
        Success : boolean
        Message : string
        Error   ?: string
        Data    ?: T | T[] | {
            Pagination: PaginationType
            Model: T | T[]
        }
    }
}

type PaginationType = {
BaseURL: string
CurrentPage: number

NextPage: number

Offset: number

PreviousPage: number

ThreeAfter: number

TotalPages: number

TwoAfter: number

TwoBelow : number

}