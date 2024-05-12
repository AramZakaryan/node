"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRepository = exports.addresses = void 0;
const getResFunctions_1 = require("../utils/getResFunctions");
exports.addresses = [
    { id: 1, value: "Mira 7", postalCode: '1500' },
    { id: 2, value: "Ulentsi 23", postalCode: '1500' },
];
exports.addressRepository = {
    fetchAddresses() {
        return exports.addresses.map(getResFunctions_1.getResAddress);
    },
    findAddress(id) {
        const address = exports.addresses.find(a => a.id === id);
        return address && (0, getResFunctions_1.getResAddress)(address);
    },
    deleteAddress(id) {
        const arrayId = exports.addresses.findIndex(a => a.id === id);
        if (arrayId > -1) {
            exports.addresses.splice(arrayId, 1);
            return true;
        }
    },
    updateAddress(id, newValue) {
        const address = exports.addresses.find(a => a.id === id);
        if (address) {
            address.value = newValue;
            return (0, getResFunctions_1.getResAddress)(address);
        }
    },
    createAddress(value) {
        const maxId = exports.addresses.reduce((mId, a) => mId < a.id ? a.id : mId, 0);
        const address = { id: maxId + 1, value, postalCode: "000000" };
        exports.addresses.push(address);
        return (0, getResFunctions_1.getResAddress)(exports.addresses[exports.addresses.length - 1]);
    }
};
