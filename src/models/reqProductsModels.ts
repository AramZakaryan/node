import {Request} from "express";

/** ZA: ReqProductParamsModel is Model for Params of request Addresses  */
export type ReqProductParamsModel = { title: string }

/** ZA: ReqProductBodyModel is Model for Body of request Product  */
export type ReqProductBodyModel = { title: string }

/** ZA: ReqProductsQueryModel with query { title: string } */
export type ReqProductsQueryType= Request<undefined, undefined, undefined, { title: string }>

/** ZA: ReqProductsParamsType with params { name: string } */
export type ReqProductsParamsType = Request<ReqProductParamsModel>

/** ZA: ReqProductsBodyType with body { title: string } */
export type ReqProductsBodyType = Request<undefined, undefined, ReqProductBodyModel>

/** ZA: ReqProductsParamsBodyType with params { name: string } and with body { title: string */
export type ReqProductsParamsBodyType = Request<ReqProductParamsModel, undefined, ReqProductBodyModel>