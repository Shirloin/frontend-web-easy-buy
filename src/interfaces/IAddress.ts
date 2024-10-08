import IUser from "./IUser"

export interface IAddress {
    _id: string
    receiverName: string
    receiverPhone: string
    addressLabel: string
    street: string
    user?: IUser
}

export interface ICreateAddress {
    receiverName: string
    receiverPhone: string
    addressLabel: string
    street: string
}