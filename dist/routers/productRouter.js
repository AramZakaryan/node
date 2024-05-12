"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const productRepository_1 = require("../repositories/productRepository");
exports.productRouter = (0, express_1.Router)({});
exports.productRouter.get('/', (req, res) => {
    const title = req.query.title;
    const products = productRepository_1.productRepository.filterProducts(title);
    res.send(products);
});
exports.productRouter.get('/:title', (req, res) => {
    const title = req.params.title;
    const product = productRepository_1.productRepository.findProduct(title);
    product ? res.send(product) : res.sendStatus(404);
});
exports.productRouter.delete('/:title', (req, res) => {
    const title = req.params.title;
    const isDeleted = productRepository_1.productRepository.deleteProduct(title);
    isDeleted ? res.sendStatus(204) : res.sendStatus(404);
});
exports.productRouter.put('/:title', (req, res) => {
    const initialTitle = req.params.title;
    const finalTitle = req.body.title;
    const product = productRepository_1.productRepository.updateProduct(initialTitle, finalTitle);
    product ? res.status(201).json(product) : res.sendStatus(404);
});
exports.productRouter.post('/', (req, res) => {
    const title = req.body.title;
    const product = productRepository_1.productRepository.createProduct(title);
    res.status(201).json(product);
});
