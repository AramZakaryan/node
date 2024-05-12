import {Request} from "express";

/** ZA: ReqAddressParamsModel is Model for Params of request Addresses  */
export type ReqAddressParamsModel = { id: string }

/** ZA: ReqAddressBodyModel is Model for Body of request Addresses  */
export type ReqAddressBodyModel = { value: string }

/** ZA: ReqAddressesParamsType with params { id: string } */
export type ReqAddressesParamsType = Request<ReqAddressParamsModel>

/** ZA: ReqAddressesBodyType with body { value: string } */
export type ReqAddressesBodyType = Request<unknown, unknown, ReqAddressBodyModel>

/** ZA: ReqAddressesParamsBodyType with params { id: string } and with body { value: string } */
export type ReqAddressesParamsBodyType = Request<ReqAddressParamsModel, unknown, ReqAddressBodyModel, unknown>