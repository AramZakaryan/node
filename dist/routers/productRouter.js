"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const productRepository_1 = require("../repositories/productRepository");
const validateBody_1 = require("../utils/middlewares/validateBody");
const validateBodyFailed_1 = require("../utils/middlewares/validateBodyFailed");
exports.productRouter = (0, express_1.Router)({});
exports.productRouter.use('/:title', cigaretteMiddleware);
function cigaretteMiddleware(req, res, next) {
    if (req.params.title === "cigarette") {
        res.status(403).json({ title: "We are against cigarettes." });
    }
    else {
        next();
    }
}
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
exports.productRouter.put('/:title', (0, validateBody_1.validateBody)("title"), validateBodyFailed_1.validateBodyFailed, (req, res) => {
    // const valResult = validationResult(req)
    // if (valResult.isEmpty()) {
    const initialTitle = req.params.title;
    const finalTitle = req.body.title;
    const product = productRepository_1.productRepository.updateProduct(initialTitle, finalTitle);
    product ? res.status(201).json(product) : res.sendStatus(404);
    // } else {
    //     res.send({errors: valResult.array()})
    // }
});
exports.productRouter.post('/', (0, validateBody_1.validateBody)("title"), validateBodyFailed_1.validateBodyFailed, (req, res) => {
    // const valResult = validationResult(req)
    // if (valResult.isEmpty()) {
    const title = req.body.title;
    const product = productRepository_1.productRepository.createProduct(title);
    res.status(201).json(product);
    // } else {
    //     res.send({errors: valResult.array()})
    // }
});
