import {AddressType, ProductType} from "../types";
import {ResProductModel} from "../models/resProductsModels";
import {ResAddressModel} from "../models/resAddressesModels";

export function getResProduct(product: ProductType): ResProductModel {
    return {title: product.title}
}

export function getResAddress(address: AddressType): ResAddressModel {
    return {id: address.id, value: address.value}
}