import {Response} from "express";
import {AddressType} from "../types";
import {ValidationError} from "express-validator";

/** ZA: Model of Address for Frontend*/
export type ResAddressModel = {
    id: number,
    value: string
}


/** ZA: ResAddressType based on AddressType*/
export type ResAddressType = Response<ResAddressModel | { errors: ValidationError[] }>

/** ZA: ResAddressesType based on array of AddressType */
export type ResAddressesType = Response<ResAddressModel[]>