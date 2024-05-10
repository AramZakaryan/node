import {Request} from "express";

/** ZA: ReqProductsQueryType with query { title: string } */
export type ReqProductsQueryType = Request<unknown, unknown, unknown, { title: string }>

/** ZA: ReqProductsParamsType with params { name: string } */
export type ReqProductsParamsType = Request<{ name: string }>