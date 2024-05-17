"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressMapper = exports.ProductMapper = void 0;
function ProductMapper(product) {
    return {
        title: product.title
    };
}
exports.ProductMapper = ProductMapper;
function AddressMapper(address) {
    return {
        id: address.id,
        value: address.value
    };
}
exports.AddressMapper = AddressMapper;
