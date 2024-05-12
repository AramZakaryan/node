import {Request, Router} from "express";
import {ResAddressesType, ResAddressType} from "../models/resAddressesModels";
import {ReqAddressesBodyType, ReqAddressesParamsBodyType, ReqAddressesParamsType} from "../models/reqAddressesModels";
import {addresses, addressRepository} from "../repositories/addressRepository";
import {validationResult} from "express-validator";
import {verifyBodyMiddleware} from "../utils/verifyBodyMiddleware";


export const addressRouter = Router({})

addressRouter.get('/', (req: Request, res: ResAddressesType) => {
    const addresses = addressRepository.fetchAddresses()
    res.send(addresses)
})

addressRouter.get('/:id', (req: ReqAddressesParamsType, res: ResAddressType) => {
    const id = +req.params.id
    const address = addressRepository.findAddress(id)
    address ? res.send(address) : res.sendStatus(404)
})

addressRouter.delete('/:id', (req: ReqAddressesParamsType, res: ResAddressType) => {
    const id = +req.params.id
    const isDeleted = addressRepository.deleteAddress(id)
    isDeleted ? res.sendStatus(204) : res.sendStatus(404)
})

addressRouter.put('/:id', verifyBodyMiddleware("value"),
    (req: ReqAddressesParamsBodyType, res: ResAddressType) => {
        const valResult = validationResult(req)
        if (valResult.isEmpty()) {
            const id = +req.params.id
            const newValue = req.body.value
            const address = addressRepository.updateAddress(id, newValue);
            address ? res.status(201).json(address) : res.sendStatus(404)
        } else {
            res.send({errors: valResult.array()})
        }
    })

addressRouter.post('', verifyBodyMiddleware("value"),
    (req: ReqAddressesBodyType, res: ResAddressType) => {
        const valResult = validationResult(req)
        if (valResult.isEmpty()) {
            const maxId = addresses.reduce((mId, a) => mId < a.id ? a.id : mId, 0);
            const value = req.body.value
            const address = addressRepository.createAddress(value)
            res.status(201).json(address)
        } else {
            res.send({errors: valResult.array()})
        }
    })