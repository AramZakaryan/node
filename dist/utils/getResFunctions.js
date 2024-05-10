"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResAddress = exports.getResProduct = void 0;
function getResProduct(product) {
    return { title: product.title };
}
exports.getResProduct = getResProduct;
function getResAddress(address) {
    return { id: address.id, value: address.value };
}
exports.getResAddress = getResAddress;
