"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = require("express");
const addressRepository_1 = require("../repositories/addressRepository");
exports.addressRouter = (0, express_1.Router)({});
exports.addressRouter.get('/', (req, res) => {
    const addresses = addressRepository_1.addressRepository.fetchAddresses();
    res.send(addresses);
});
exports.addressRouter.get('/:id', (req, res) => {
    const id = +req.params.id;
    const address = addressRepository_1.addressRepository.findAddress(id);
    address ? res.send(address) : res.sendStatus(404);
});
exports.addressRouter.delete('/:id', (req, res) => {
    const id = +req.params.id;
    const isDeleted = addressRepository_1.addressRepository.deleteAddress(id);
    isDeleted ? res.sendStatus(204) : res.sendStatus(404);
});
exports.addressRouter.put('/:id', (req, res) => {
    const id = +req.params.id;
    const newValue = req.body.value;
    const address = addressRepository_1.addressRepository.updateAddress(id, newValue);
    address ? res.status(201).json(address) : res.sendStatus(404);
});
exports.addressRouter.post('', (req, res) => {
    const maxId = addressRepository_1.addresses.reduce((mId, a) => mId < a.id ? a.id : mId, 0);
    const value = req.body.value;
    const address = addressRepository_1.addressRepository.createAddress(value);
    res.status(201).json(address);
});
