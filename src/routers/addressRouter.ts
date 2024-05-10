import {Request, Router} from "express";
import {ResAddressesType, ResAddressType} from "../models/resAddressesModels";
import {ReqAddressesBodyType, ReqAddressesParamsBodyType, ReqAddressesParamsType} from "../models/reqAddressesModels";
import {AddressType} from "../types";

import {getResAddress} from "../utils/getResFunctions";
import {addresses} from "../repositories/addressRepository";


export const addressRouter = Router({})

addressRouter.get('/',
    (req: Request,
     res: ResAddressesType) => {
        res.send(addresses.map(getResAddress))
    })

addressRouter.get('/:id',
    (req: ReqAddressesParamsType,
     res: ResAddressType) => {
        const address = addresses.find(a => a.id === +req.params.id)
        address ? res.send(getResAddress(address)) : res.sendStatus(404)
    })

addressRouter.delete('/:id',
    (req: ReqAddressesParamsType,
     res: ResAddressType) => {
        const addressId = addresses.findIndex(a => a.id === +req.params.id)
        if (addressId > -1) {
            addresses.splice(addressId, 1)
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

addressRouter.put('/:id',
    (req: ReqAddressesParamsBodyType,
     res: ResAddressType) => {
        const address = addresses.find(a => a.id === +req.params.id);
        if (address) {
            address.value = req.body.value
            res
                .status(201)
                .json(getResAddress(address))
        } else {
            res.sendStatus(404)
        }
    })

addressRouter.post('',
    (req: ReqAddressesBodyType,
     res: ResAddressType) => {
        const maxId = addresses.reduce((mId, a) => mId < a.id ? a.id : mId, 0);
        const address: AddressType = {id: maxId + 1, value: req.body.value, postalCode: "000000"}
        addresses.push(address)
        res
            .status(201)
            .json(getResAddress(addresses[addresses.length - 1]))
    })