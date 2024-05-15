import {Response} from "express";
import {ProductType} from "../types";
import {ValidationError} from "express-validator";

/** ZA: Model of Product for Client*/
export type ResProductModel = { title: string }

/** ZA: ResProductType based on ProductType*/
export type ResProductType = Response<ResProductModel | { errors: ValidationError[] }>

/** ZA: ResProductType based on array of ProductType*/
export type ResProductsType = Response<ResProductModel[]>