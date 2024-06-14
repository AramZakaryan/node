export type AddressType = {
    id: number
    value: string
    postalCode: string
}

export type ProductType = {
    id: number
    title: string
    quantity: number
}

export type UserType = {
    name?: string,
    age?: number,
    login: string,
    passHash: string,
}

export type UserDbType = UserType & {
    _id: string
}

