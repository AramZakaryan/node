import {Response} from "express";
import {ProductType} from "../types";

/** ZA: Model of Product for Client*/
export type ResProductModel = { title: string}

/** ZA: ResProductType based on ProductType*/
export type ResProductType = Response<ResProductModel>

/** ZA: ResProductType based on array of ProductType*/
export type ResProductsType = Response<ResProductModel[]>