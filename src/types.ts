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


///////// for del

// *..*
type User = {
    id: number
    firstName: string
    lastName: string
}

type Wallet = {
    id: number
    currency: string
    amount: number
    userId: number // owner
}

type WalletUserRecords = {
    walletId: number
    userId: number
}