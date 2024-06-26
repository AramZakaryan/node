"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = require("express");
const addressRepositoryMemory_1 = require("../repositories/addressRepositoryMemory");
const validateBody_1 = require("../utils/middlewares/validateBody");
const validateBodyFailed_1 = require("../utils/middlewares/validateBodyFailed");
exports.addressRouter = (0, express_1.Router)({});
exports.addressRouter.get('/', (req, res) => {
    const addresses = addressRepositoryMemory_1.addressRepositoryMemory.fetchAddresses();
    res.send(addresses);
});
exports.addressRouter.get('/:id', (req, res) => {
    const id = +req.params.id;
    const address = addressRepositoryMemory_1.addressRepositoryMemory.findAddress(id);
    address ? res.send(address) : res.sendStatus(404);
});
exports.addressRouter.delete('/:id', (req, res) => {
    const id = +req.params.id;
    const isDeleted = addressRepositoryMemory_1.addressRepositoryMemory.deleteAddress(id);
    isDeleted ? res.sendStatus(204) : res.sendStatus(404);
});
exports.addressRouter.put('/:id', (0, validateBody_1.validateBody)("value"), validateBodyFailed_1.validateBodyFailed, (req, res) => {
    // const valResult = validationResult(req)
    // if (valResult.isEmpty()) {
    const id = +req.params.id;
    const newValue = req.body.value;
    const address = addressRepositoryMemory_1.addressRepositoryMemory.updateAddress(id, newValue);
    address ? res.status(201).json(address) : res.sendStatus(404);
    // } else {
    //     res.send({errors: valResult.array()})
    // }
});
exports.addressRouter.post('', (0, validateBody_1.validateBody)("value"), validateBodyFailed_1.validateBodyFailed, (req, res) => {
    // const valResult = validationResult(req)
    // if (valResult.isEmpty()) {
    const maxId = addressRepositoryMemory_1.addresses.reduce((mId, a) => mId < a.id ? a.id : mId, 0);
    const value = req.body.value;
    const address = addressRepositoryMemory_1.addressRepositoryMemory.createAddress(value);
    res.status(201).json(address);
    // } else {
    //     res.send({errors: valResult.array()})
    // }
});
