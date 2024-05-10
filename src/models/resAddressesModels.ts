import {Response} from "express";
import {AddressType} from "../types";

/** ZA: Model of Address for Frontend*/
export type ResAddressModel = {
    id: number,
    value: string
}


/** ZA: ResAddressType based on AddressType*/
export type ResAddressType = Response<ResAddressModel>

/** ZA: ResAddressesType based on array of AddressType */
export type ResAddressesType = Response<ResAddressModel[]>