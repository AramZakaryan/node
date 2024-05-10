"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = require("express");
const getResFunctions_1 = require("../utils/getResFunctions");
const addressRepository_1 = require("../repositories/addressRepository");
exports.addressRouter = (0, express_1.Router)({});
exports.addressRouter.get('/', (req, res) => {
    res.send(addressRepository_1.addresses.map(getResFunctions_1.getResAddress));
});
exports.addressRouter.get('/:id', (req, res) => {
    const address = addressRepository_1.addresses.find(a => a.id === +req.params.id);
    address ? res.send((0, getResFunctions_1.getResAddress)(address)) : res.sendStatus(404);
});
exports.addressRouter.delete('/:id', (req, res) => {
    const addressId = addressRepository_1.addresses.findIndex(a => a.id === +req.params.id);
    if (addressId > -1) {
        addressRepository_1.addresses.splice(addressId, 1);
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
exports.addressRouter.put('/:id', (req, res) => {
    const address = addressRepository_1.addresses.find(a => a.id === +req.params.id);
    if (address) {
        address.value = req.body.value;
        res
            .status(201)
            .json((0, getResFunctions_1.getResAddress)(address));
    }
    else {
        res.sendStatus(404);
    }
});
exports.addressRouter.post('', (req, res) => {
    const maxId = addressRepository_1.addresses.reduce((mId, a) => mId < a.id ? a.id : mId, 0);
    const address = { id: maxId + 1, value: req.body.value, postalCode: "000000" };
    addressRepository_1.addresses.push(address);
    res
        .status(201)
        .json((0, getResFunctions_1.getResAddress)(addressRepository_1.addresses[addressRepository_1.addresses.length - 1]));
});
