import {Request} from "express";

/** ZA: ReqAddressesParamsModel is Model for Params of request Addresses  */
export type ReqAddressesParamsModel = { id: string }

/** ZA: ReqAddressesParamsModel is Model for Body of request Addresses  */
export type ReqAddressesBodyModel = { value: string }

/** ZA: ReqAddressesParamsType with params { id: string } */
export type ReqAddressesParamsType = Request<ReqAddressesParamsModel>

/** ZA: ReqAddressesBodyType with body { value: string } */
export type ReqAddressesBodyType = Request<unknown, unknown, ReqAddressesBodyModel>

/** ZA: ReqAddressesParamsBodyType with params { id: string } and with body { value: string } */
export type ReqAddressesParamsBodyType = Request<ReqAddressesParamsModel, unknown, ReqAddressesBodyModel, unknown>