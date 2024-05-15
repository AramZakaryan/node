import {Request, Router} from "express";
import {ResAddressesType, ResAddressType} from "../models/resAddressesModels";
import {ReqAddressesBodyType, ReqAddressesParamsBodyType, ReqAddressesParamsType} from "../models/reqAddressesModels";
import {addresses, addressRepositoryMemory} from "../repositories/addressRepositoryMemory";
import {validationResult} from "express-validator";
import {validateBody} from "../utils/middlewares/validateBody";
import {validateBodyFailed} from "../utils/middlewares/validateBodyFailed";


export const addressRouter = Router({})

addressRouter.get('/', (req: Request, res: ResAddressesType) => {
    const addresses = addressRepositoryMemory.fetchAddresses()
    res.send(addresses)
})

addressRouter.get('/:id', (req: ReqAddressesParamsType, res: ResAddressType) => {
    const id = +req.params.id
    const address = addressRepositoryMemory.findAddress(id)
    address ? res.send(address) : res.sendStatus(404)
})

addressRouter.delete('/:id', (req: ReqAddressesParamsType, res: ResAddressType) => {
    const id = +req.params.id
    const isDeleted = addressRepositoryMemory.deleteAddress(id)
    isDeleted ? res.sendStatus(204) : res.sendStatus(404)
})

addressRouter.put('/:id',
    validateBody("value"),
    validateBodyFailed,
    (req: ReqAddressesParamsBodyType, res: ResAddressType) => {
        // const valResult = validationResult(req)
        // if (valResult.isEmpty()) {
            const id = +req.params.id
            const newValue = req.body.value
            const address = addressRepositoryMemory.updateAddress(id, newValue);
            address ? res.status(201).json(address) : res.sendStatus(404)
        // } else {
        //     res.send({errors: valResult.array()})
        // }
    })

addressRouter.post('',
    validateBody("value"),
    validateBodyFailed,
    (req: ReqAddressesBodyType, res: ResAddressType) => {
        // const valResult = validationResult(req)
        // if (valResult.isEmpty()) {
            const maxId = addresses.reduce((mId, a) => mId < a.id ? a.id : mId, 0);
            const value = req.body.value
            const address = addressRepositoryMemory.createAddress(value)
            res.status(201).json(address)
        // } else {
        //     res.send({errors: valResult.array()})
        // }
    })